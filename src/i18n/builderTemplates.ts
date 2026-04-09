import type { BuilderTemplateData } from './models/builderTemplateModel.ts';

export function getBuilderTemplate(lang: string): BuilderTemplateData {
    if (lang === 'it') {
        const templateDataIt: BuilderTemplateData = {
            water: "Acqua",
            waterDay2: "Acqua (Giorno 2)",
            flour: "Farina",
            flourDay2: "Farina (Giorno 2)",
            salt: "Sale",
            saltDay2: "Sale (Giorno 2)",
            yeast: "Lievito secco",
            stepsTitle: "Preparazione Impasto",
            preset1: "Diretto",
            preset2: "Biga",
            preset3: "Espressa",
            preset1Description: "Pronta in 8 ore",
            preset2Description: "Pronta in 24 ore",
            preset3Description: "Pronta in 3 ore",
            doughBallCountLabel: "Numero di palline",
            doughBallWeightLabel: "Peso per pallina (gr)",
            hydrationLabel: "Idratazione (%)",
            prefermentLabel: "Prefermento (%)",
            temperatureLabel: "Temperatura"
        };

        return templateDataIt
    }
    else {
        const templateDataEng: BuilderTemplateData = {
            water: "Water",
            waterDay2: "Water (Day 2)",
            flour: "Flour",
            flourDay2: "Flour (Day 2)",
            salt: "Salt",
            saltDay2: "Salt (Day 2)",
            yeast: "Dry Yeast",
            stepsTitle: "Dough Prep",
            preset1: "Direct",
            preset2: "Biga",
            preset3: "Express",
            preset1Description: "Ready in 8 hours",
            preset2Description: "Ready in 24 hours",
            preset3Description: "Ready in 3 hours",
            doughBallCountLabel: "Number of doughballs",
            doughBallWeightLabel: "Doughball weight (gr)",
            hydrationLabel: "Hydration (%)",
            prefermentLabel: "Preferment (%)",
            temperatureLabel: "Temperature"
        };
        return templateDataEng
    }
}