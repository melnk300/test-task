<script setup lang="ts">
import * as ApiTypes from '@/types/api';
import { storeToRefs } from 'pinia';

const filterStore = useFilterStore()
const { status, name } = storeToRefs(filterStore)

const page = ref<number>(1)

let characters = ref<ApiTypes.ICharacterResults[]>([]);

useApi('character', 1, {status: status.value, name: name.value}).then(response => {
    characters.value = response.results
})

useApi('character', 2, {status: status.value, name: name.value}).then(response => {
    characters.value.push(...response.results)
})

window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        page.value++
        useApi('character', page.value, {status: status.value, name: name.value}).then(response => {
            characters.value.push(...response.results)
        })
    }
}

watch(status, () => {
    characters.value = []
    useApi('character', 1, {status: status.value, name: name.value}).then(response => {
        page.value = 1
        characters.value = response.results
    })
})

watch(name, () => {
    characters.value = []
    useApi('character', 1, {status: status.value, name: name.value}).then(response => {
        page.value = 1
        characters.value = response.results
    })
})

</script>

<template>
    <div class="page_container">
        <div class="content">
            <h2>All characters</h2>
            <div class="hero_cards">
                <HeroCard v-for="character in characters" :key="character.id" :name="character.name" :id="character.id" :image="character.image" :species="character.species" :episode="character.episode" />
            </div>
        </div>
        <div class="sidebar">
            <h2>FIlter</h2>
            <form>
                <label for="status">
                    Status
                    <select name="status" id="status" v-model="status" placeholder="Charecter status">
                        <option value="" default>All</option>
                        <option value="alive">Alive</option>
                        <option value="dead">Dead</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </label>
                <label for="name">
                    Name
                    <input type="text" name="name" id="name" v-model="name" placeholder="Character name">
                </label>
                
            </form>
        </div>
    </div>
</template>

<style scoped lang="less">
    .page_container {
        width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 1em;
    }

    .hero_cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1em;
    }

    form {
        background-color: var(--lighter);
        padding: 10px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 1em;

        label {
            display: flex;
            flex-direction: column;
            font-weight: bold;
        }

        input, select {
            background: none;
            border: none;
            border-bottom: 1px solid var(--text);
            color: var(--text);
            font-size: 1.2em;
        }
    }

</style>