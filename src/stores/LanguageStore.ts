import { defineStore } from "pinia";

export const useLanguageStore = defineStore("languageStore", {
    state: () => ({
        currentLanguage: "it"
    })
});