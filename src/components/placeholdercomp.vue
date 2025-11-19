<template>
    <h1 class="firstclass">{{ title }}</h1>
    <p>This is a placeholder - hi from azure deployment.</p>
    <p>{{apicall}}</p>
    <secondplaceholder />
</template>

<script lang="ts" >
import secondplaceholder from './secondplaceholder.vue'
export default {
    data(){
        return {
            title: "Placeholder Component Title1",
            apicall: "Data from API will be shown here."
        }
    },
    components: {
        secondplaceholder
    },
    async mounted() {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL, {
                headers: {
                    'x-api-key': import.meta.env.VITE_API_KEY
                }
            });
            console.log("Test", import.meta.env.VITE_API_URL)
            console.log(import.meta.env.VITE_API_KEY)
        const data = await response.text();
        this.apicall = data;
        } catch (error) {
            console.error('Error fetching data:', error);
            this.apicall = 'Failed to load data from API.';
        }
        }
}
</script>

<style scoped>
.firstclass {
    color: blue;
}
</style>