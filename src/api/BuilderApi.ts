import type { BuilderTemplateData, DoughIngredients } from "../models/Builder";

export async function GetPresetDataAsync(preset:string): Promise<DoughIngredients> {
    const doughIngredients: DoughIngredients = {
        water: 300,
        flour: 500,
        salt: 10,
        yeast: 5,
    };
    console.log('fetching preset BUILDER API', preset);
    return doughIngredients;
}

export async function GetTemplateDataByLangAsync(lang:string): Promise<BuilderTemplateData> {

    // mock
    if(lang === 'it') {
    const templateDataIt: BuilderTemplateData = {
        water: "acqua",
        flour: "farina",
        salt: "sale",
        yeast: "lievito",
        stepsTitle: "preparazione",
        step1: "1. In una ciotola capiente, mescola la farina e il sale.",
        step2: "2. Sciogli il lievito nell'acqua tiepida e aggiungilo alla miscela di farina.",
        step3: "3. Impasta fino a ottenere un impasto liscio ed elastico, poi lascialo lievitare per 1-2 ore."
    };

    return templateDataIt
}else {
        const templateDataEng: BuilderTemplateData = {
        water: "water",
        flour: "flour",
        salt: "salt",
        yeast: "yeast",
        stepsTitle: "preparation",
        step1: "1. In a large bowl, mix the flour and salt together.",
        step2: "2. Dissolve the yeast in warm water and add it to the flour mixture.",
        step3: "3. Knead until you have a smooth, elastic dough, then let it rise for 1-2 hours."
    };
    return templateDataEng
}

}