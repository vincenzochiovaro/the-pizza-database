import type { BuilderTemplateData } from './models/builderTemplateModel.ts';

export function getBuilderTemplate(lang: string): BuilderTemplateData {
    if (lang === 'it') {
        const templateDataIt: BuilderTemplateData = {
            water: "Acqua",
            flour: "Farina",
            salt: "Sale",
            yeast: "Lievito",
            stepsTitle: "Preparazione",
            preset1: "Diretto",
            preset2: "Biga",
            preset3: "Espressa",
            preset1Description: "Pronta in 8 ore",
            preset2Description: "Pronta in 24 ore",
            preset3Description: "Pronta in 3 ore"
        };

        return templateDataIt
    }
    else {
        const templateDataEng: BuilderTemplateData = {
            water: "Water",
            flour: "Flour",
            salt: "Salt",
            yeast: "Yeast",
            stepsTitle: "Preparation",
            preset1: "Direct",
            preset2: "Biga",
            preset3: "Express",
            preset1Description: "Ready in 8 hours",
            preset2Description: "Ready in 24 hours",
            preset3Description: "Ready in 3 hours"
        };
        return templateDataEng
    }
}