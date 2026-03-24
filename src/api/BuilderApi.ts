import type { DoughIngredients } from "../models/Builder";

export async function GetPresetDataAsync(preset: string, lang: string, doughBallCount: number, doughBallWeight: number): Promise<DoughIngredients> {

    try {
        // MOCK DATA
        // const doughIngredients: DoughIngredients = {
        //     water: 300,
        //     flour: 500,
        //     salt: 10,
        //     yeast: 5,
        //     step1: lang === 'it' ? "Mescolare acqua e lievito" : "Mix water and yeast",
        //     step2: lang === 'it' ? "Aggiungere la farina e il sale" : "Add flour and salt",
        //     step3: lang === 'it' ? "Impastare fino ad ottenere un impasto liscio ed elastico" : "Knead until you get a smooth and elastic dough"
        // };

        // return doughIngredients;
        const params = new URLSearchParams({
            preset: preset,
            lang: lang,
            doughBallCount: doughBallCount.toString(),
            doughBallWeight: doughBallWeight.toString()
        });

        const url = `${import.meta.env.VITE_API_URL}api/GetPresetData?${params}`;
        const response = await fetch(url, {
            headers: {
                'x-api-key': import.meta.env.VITE_API_KEY
            }
        });

        const data = await response.json();
        return data;

    }
    catch (error) {
        console.error("Error fetching preset data:", error);
        throw error;
    }


}
