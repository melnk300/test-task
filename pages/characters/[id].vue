<script setup lang="ts">
import * as ApiTypes from '@/types/api';

const route = useRoute()

const id = route.params.id

let character = reactive<ApiTypes.ICharacterResults | null>(await useApi(`character/${id}`))

let episodes = ref([])

character?.episode.forEach(async episode => {
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
    <NuxtLayout>
        <div class="page_container">
            <div class="first_page">
                <div class="img">
                    <img class="char_avatar" :src="character.image">
                    <img src="/rick_logo.png" alt="" class="emblem">
                </div>
                <div class="char_info">
                    <div class="info_field">
                        <p class="field_name">Surname</p>
                        <p class="field_value">{{ character.name.split(' ').at(-1) }}</p>
                    </div>
                    <div class="info_field">
                        <p class="field_name">Name</p>
                        <p class="field_value">{{ character.name.split(' ')[0] }}</p>
                    </div>
                    <div class="info_field">
                        <p class="field_name">Patronymic</p>
                        <p class="field_value">{{ character.name.split(' ').slice(1, -1).length ? character.name.split(' ').slice(1, -1).join(' ') : "empty" }}</p>
                    </div>
                    <div class="info_field">
                        <p class="field_name">Type</p>
                        <p class="field_value">{{ character.type || "A common man" }}</p>
                    </div>
                    <div class="info_field">
                        <p class="field_name">Place of birth</p>
                        <p class="field_value">{{ character?.origin.name === "unknown" ? "Somewhere" : character?.origin.name }}, Rick's universe</p>
                    </div>
                    <div class="info_field">
                        <p class="field_name">Date of birth</p>
                        <p class="field_value">{{ new Date(character.created).toLocaleDateString("en-US") }}</p>
                    </div>
                </div>
            </div>
            <hr>
            <div class="second_page">
                <h2>visas</h2>
                <div class="episodes">
                    <div class="episode" v-for="episode in episodes">
                        <p class="episode_reason">
                            Reason:
                            {{ episode.name }}
                        </p>
                        <div class="episode_location">
                            Location:
                            {{ episode.episode }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<style scoped lang="less">
    .page_container { 
        width: 1200px;
        margin: 0 auto;
        margin-top: 80px;
    }

    hr {
        border-color: var(--accent);
    }

    .first_page {
        display: grid;
        grid-template-columns: 400px 1fr;
        gap: 80px;
    }

    .img {
        position: relative;
    }

    .char_avatar {
        width: 100%;
        border-radius: 10px;
    }

    .emblem {
        position: absolute;
        width: 120px;
        top: -20px;
        right: -20px;
    }

    .info_field {
        display: flex;
        gap: 1em;
        align-items: flex-end;

        .field_name {
            font-weight: bold;
        }

        .field_value {
            width: 100%;
            font-size: 1.2em;
            text-align: center;
            border-bottom: 1px solid var(--accent);
        }
    }

    .second_page {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .episodes {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1em;
    }

    .episode {
        border-width: 10px;
        border-color: var(--accent);
        border-style: dashed double;
        color: var(--accent);
        padding: 10px;

        .episode_reason {
            margin: 0;
            font-weight: bold;
            margin-bottom: .5em;
        }
    }
</style>