<template>
    <main class="home-page">
        <div class="container py-4 py-md-5">

            <section class="home-hero text-center">
                <span class="home-kicker">
                    {{ currentLanguage === 'it' ? 'ALIPER · LAVORI IN CORSO' : 'ALIPER · WORK IN PROGRESS' }}
                </span>

                <h1 class="home-title">
                    {{ currentLanguage === 'it' ? 'Benvenuto su Aliper' : 'Welcome to Aliper' }}
                </h1>

                <p class="home-intro">
                    {{ currentLanguage === 'it'
                        ? 'Questa è una pagina temporanea mentre stiamo costruendo la prossima versione di Aliper.'
                        : 'This is a temporary home while the next version of Aliper is being built.' }}
                </p>

                <div class="home-warning">
                    <strong>
                        {{ currentLanguage === 'it'
                            ? 'Questa pagina verrà completamente rifatta entro l’inverno 2027.'
                            : 'This page will be scrapped and reworked by winter 2027.' }}
                    </strong>

                    <span>
                        {{ currentLanguage === 'it'
                            ? 'La homepage definitiva verrà ridisegnata durante la prossima fase di sviluppo.'
                            : 'The final homepage will be redesigned as part of the next stage of development.' }}
                    </span>
                </div>
            </section>

            <section class="tools-section">
                <div class="section-heading text-center">

                    <span class="section-kicker">
                        {{ currentLanguage === 'it' ? 'DISPONIBILE ORA' : 'AVAILABLE NOW' }}
                    </span>

                    <h2>
                        {{ currentLanguage === 'it'
                            ? 'Nel frattempo, dai un’occhiata'
                            : 'While you wait, have a look around' }}
                    </h2>

                    <p>
                        {{ currentLanguage === 'it'
                            ? 'Due strumenti di Aliper sono già disponibili e pronti da utilizzare.'
                            : 'Two parts of Aliper are already available and ready to use.' }}
                    </p>

                </div>

                <div class="row justify-content-center g-4">

                    <div class="col-12 col-md-6 col-xl-5">
                        <article class="tool-card h-100">

                            <div class="tool-icon pizza-icon">
                                🍕
                            </div>

                            <span class="tool-kicker">
                                PIZZA BROWSER
                            </span>

                            <h3>
                                {{ currentLanguage === 'it'
                                    ? 'Cerchi ispirazione per la tua pizza?'
                                    : 'Need some pizza inspiration?' }}
                            </h3>

                            <p>
                                {{ currentLanguage === 'it'
                                    ? 'Sfoglia una raccolta di pizze e scopri diverse combinazioni per trovare idee per la tua prossima pizza.'  : 'Browse a collection of pizzas and discover different combinations when you are looking for ideas for your next pizza.' }}
                            </p>

                            <button @click="goToPizzaBrowser" class="btn tool-button">
                                {{ currentLanguage === 'it'
                                    ? 'Esplora le pizze'
                                    : 'Explore pizzas' }}
                            </button>

                        </article>
                    </div>

                    <div class="col-12 col-md-6 col-xl-5">
                        <article class="tool-card h-100">

                            <div class="tool-icon builder-icon">
                                ⚙
                            </div>

                            <span class="tool-kicker">
                                DOUGH BUILDER
                            </span>

                            <h3>
                                {{ currentLanguage === 'it'
                                    ? 'Più di un semplice calcolatore per l’impasto'
                                    : 'More than just a dough calculator' }}
                            </h3>

                            <p>
                                {{ currentLanguage === 'it'
                                    ? 'Calcola gli ingredienti del tuo impasto e segui un processo guidato passo dopo passo,  dalla preparazione fino alla pizza.'  : 'Calculate your dough ingredients and follow a guided process through each step, from   preparation to the final pizza.' }}
                            </p>

                            <button @click="goToBuilderBrowser" class="btn tool-button">
                                {{ currentLanguage === 'it'
                                    ? 'Apri il Dough Builder'
                                    : 'Open dough builder' }}
                            </button>

                        </article>
                    </div>

                </div>
            </section>

            <footer class="home-footer text-center">
                {{ currentLanguage === 'it'
                    ? 'Homepage temporanea · Presto arriveranno novità'
                    : 'Temporary homepage · More coming soon' }}
            </footer>

        </div>
    </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguageStore } from '../stores/LanguageStore'

const router = useRouter()

const languageStore = useLanguageStore()
const currentLanguage = computed(() => languageStore.currentLanguage)

function goToPizzaBrowser() {
    router.push('/pizza-browser')
}

function goToBuilderBrowser() {
    router.push('/builder-browser')
}
</script>

<style scoped>
.home-page {
    min-height: 100vh;
    color: var(--color-text-primary, rgba(255, 255, 255, 0.9));
}

.home-hero {
    max-width: 760px;
    margin: 0 auto;
}

.home-kicker,
.section-kicker,
.tool-kicker {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-weight: var(--font-weight-bold, 700);
}

.home-kicker,
.section-kicker {
    color: rgba(100, 200, 255, 0.8);
}

.home-title {
    margin: 0.5rem 0 0.75rem;
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: var(--font-weight-bold, 700);
}

.home-intro {
    max-width: 600px;
    margin: 0 auto 1.5rem;
    color: rgba(255, 255, 255, 0.65);
    font-size: 1rem;
    line-height: 1.6;
}

/* Temporary warning */

.home-warning {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    max-width: 620px;
    margin: 0 auto;
    padding: 0.8rem 1rem;
    border: 1px solid rgba(220, 53, 69, 0.45);
    border-radius: 0.8rem;
    background: rgba(220, 53, 69, 0.08);
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.8rem;
    line-height: 1.5;
}

.home-warning strong {
    color: #ff6b6b;
}

.tools-section {
    margin: 4rem auto 0;
}

.section-heading {
    margin-bottom: 1.5rem;
}

.section-heading h2 {
    margin: 0.4rem 0;
    font-size: 1.25rem;
}

.section-heading p {
    margin: 0;
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.85rem;
}

.tool-card {
    padding: 1.5rem;
    border-radius: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: linear-gradient(145deg,
            rgba(255, 255, 255, 0.06),
            rgba(255, 255, 255, 0.025));
    backdrop-filter: blur(14px);
    text-align: center;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.tool-icon {
    width: 52px;
    height: 52px;
    margin: 0 auto 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1.35rem;
}

.pizza-icon {
    background: rgba(255, 107, 74, 0.1);
}

.builder-icon {
    background: rgba(100, 200, 255, 0.1);
    color: rgb(100, 200, 255);
}

.tool-kicker {
    color: rgba(100, 200, 255, 0.8);
    font-size: 0.6rem;
}

.tool-card h3 {
    margin: 0.45rem 0 0.55rem;
    font-size: 1rem;
}

.tool-card p {
    min-height: 3.2rem;
    margin-bottom: 1.25rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.78rem;
    line-height: 1.55;
}

.tool-button {
    border: 1px solid rgba(100, 200, 255, 0.28);
    border-radius: 0.65rem;
    background: rgba(100, 200, 255, 0.08);
    color: rgb(100, 200, 255);
    font-size: 0.78rem;
    font-weight: var(--font-weight-semibold, 600);
}

.tool-button:hover {
    border-color: rgba(100, 200, 255, 0.45);
    background: rgba(100, 200, 255, 0.14);
    color: rgb(100, 200, 255);
}

.home-footer {
    margin-top: 3rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.35);
    font-size: 0.65rem;
    letter-spacing: 0.05em;
}

@media (max-width: 768px) {
    .tools-section {
        margin-top: 3rem;
    }

    .tool-card p {
        min-height: auto;
    }
}
</style>