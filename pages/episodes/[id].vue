<script setup lang="ts">
const route = useRoute()
const id = route.params.id
const episode = await useApi(`episode/${id}`)

let seasons = reactive([[], [], [], [], []])
seasons.forEach(async (season, index) => {
    seasons[index] = (await useApi('episode', 1, {episode: `S0${index + 1}`})).results
})

let characters = reactive([])

reactive(episode.characters.forEach(async character => {
    useApi(`character/${character.split('/').at(-1)}`).then(response => {
        characters.push(response)
    })
}))




</script>

<template>
    <div class="page_container">
        <div class="content">
            <div class="episodes">
                <template v-for="(season, index) in seasons">
                    <h2>Seasons {{ index + 1 }}</h2>
                    <ul>
                        <li v-for="episode in season" class="episode"><NuxtLink :to="`/episodes/${episode.id}`">{{ episode.name }} <span>{{ episode.episode }}</span></NuxtLink></li>
                    </ul>
                </template>
            </div>
            <div class="current_episode">
                <h2>{{ episode.name }} <span>{{ episode.episode }}</span></h2>
                <p>{{ episode.air_date }}</p>
            </div>
        </div>
        <div class="characters">
            <HeroCard v-for="character in characters" :key="character.id" :name="character.name" :id="character.id" :image="character.image" :species="character.species" :episode="character.episode" />
        </div>
    </div>
</template>

<style scoped lang="less">
    .page_container {
        width: 1200px;
        margin: 0 auto;
    }

    .content {
        display: grid;
        grid-template-columns: 2fr 3fr;
        height: 400px;
        gap: 1em;
    }

    .episodes {
        overflow: auto;
        border: 3px solid var(--accent);

        li, h2 {
            padding: 10px;
        }

        h2 {
            position: sticky;
            top: 0;
            background-color: var(--primary);
            border-bottom: 3px solid var(--accent);
            border-top: 3px solid var(--accent);
        }
    }

    ul {
        list-style: none;
        padding: 0;
    }

    .episode, h2 {
        text-align: start;
        font-size: 1.4em;

        span {
            font-size: .8em;
        }
    }

    .characters {
        margin-top: 1em;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1em;
    }
</style>