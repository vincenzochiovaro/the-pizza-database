import type { DoughIngredients } from "../models/Builder";

export async function GetPresetDataAsync(preset: string, lang: string): Promise<DoughIngredients> {
    // MOCK TODO: replace with actual API call
    const doughIngredients: DoughIngredients = {
        water: 300,
        flour: 500,
        salt: 10,
        yeast: 5,
        step1: lang === 'it' ? "Mescolare acqua e lievito" : "Mix water and yeast",
        step2: lang === 'it' ? "Aggiungere la farina e il sale" : "Add flour and salt",
        step3: lang === 'it' ? "Impastare fino ad ottenere un impasto liscio ed elastico" : "Knead until you get a smooth and elastic dough"
    };
    console.log('fetching preset BUILDER API', preset);
    return doughIngredients;
}
