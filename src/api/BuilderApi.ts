import type { DoughIngredients } from "../models/Builder";

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