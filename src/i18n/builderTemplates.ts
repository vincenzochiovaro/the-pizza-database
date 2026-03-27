import type { BuilderTemplateData } from './models/builderTemplateModel.ts';

export function getBuilderTemplate(lang: string): BuilderTemplateData {
    if (lang === 'it') {
        const templateDataIt: BuilderTemplateData = {
            water: "Acqua",
            flour: "Farina",
            salt: "Sale",
            yeast: "Lievito secco",
            stepsTitle: "Preparazione",
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
            flour: "Flour",
            salt: "Salt",
            yeast: "Dry Yeast",
            stepsTitle: "Steps",
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