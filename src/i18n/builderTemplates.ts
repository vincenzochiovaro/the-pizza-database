import type { BuilderTemplateData } from './models/builderTemplateModel.ts';

export function getBuilderTemplate(lang: string): BuilderTemplateData {
    if (lang === 'it') {
        const templateDataIt: BuilderTemplateData = {
            water: "Acqua",
            flour: "Farina",
            salt: "Sale",
            yeast: "Lievito",
            stepsTitle: "Preparazione",
            preset1: "Settaggio 1",
            preset2: "Settaggio 2",
            preset3: "Settaggio 3",
            preset1Description: "Descrizione del Settaggio 1",
            preset2Description: "Descrizione del Settaggio 2",
            preset3Description: "Descrizione del Settaggio 3"
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
            preset1: "Preset 1",
            preset2: "Preset 2",
            preset3: "Preset 3",
            preset1Description: "Description of Preset 1",
            preset2Description: "Description of Preset 2",
            preset3Description: "Description of Preset 3"
        };
        return templateDataEng
    }
}