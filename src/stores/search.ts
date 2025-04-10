import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore('search', () => {
    const term = ref('')
    const setTerm = (value: string) => {
        term.value = value
    }

    return { term, setTerm }
})