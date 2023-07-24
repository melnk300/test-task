import { defineStore } from "pinia";

export const useFilterStore = defineStore({
    id: "filter",
    state: () => ({
        name: null,
        status: null,
    }),
    actions: {
        setName(name: string | null) {
            this.name = name;
        },
        setStatus(status: string | null) {
            this.status = status;
        },
    },
    persist: true,
});