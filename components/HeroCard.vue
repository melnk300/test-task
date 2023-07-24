<script setup lang="ts">
interface IHeroCardProps {
    name: string
    id: number
    image: string
    species: string
    episode: string[]
}

const props = defineProps<IHeroCardProps>()

let episodes = ref([])

props.episode.forEach(async episode => {
    episodes.value.push(await useApi(`episode/${episode.split('/').at(-1)}`).then(response => {
        return {
            name: response.name,
            id: response.id,
            episode: response.episode
        }
    }))
})
</script>

<template>
    <div class="hero_card">
        <img :src="props.image" alt="">
        <div class="hero_card--info">
            <div class="hero--info_name"><NuxtLink :to="`characters/${props.id}`">{{ props.name }}</NuxtLink></div>
            <div class="hero--info_species">{{ props.species }}</div>
            <div class="hero--info_episodes">
                {{ episodes.slice(0, 5).map(episode => episode.episode).join(', ') }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .hero_card {
        padding: 10px;
        background-color: var(--lighter);
        border-radius: 10px;
        width: 100%;

        display: flex;
        gap: 1em;

        img {
            height: 4em;
            border-radius: 5px;
        }

        .hero--info_name {
            font-size: 1.5em;
        }

        .hero--info_species {
            font-weight: bold;
        }
    }
</style>