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
    const templateData: BuilderTemplateData = {
        water: "acqua",
        flour: "farina",
        salt: "sale",
        yeast: "lievito",
        steps: "preparazione"
    };

    console.log('fetching template BUILDER API', lang);

    return templateData;
}