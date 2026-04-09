import type { DoughIngredients } from "../models/Builder";

export async function GetPresetDataAsync(preset: string, lang: string, doughBallCount: number, doughBallWeight: number, hydration: number, temperature: number, preferment: number | null): Promise<DoughIngredients> {

    try {
        // BUG TODO need to Watch page after changing language to update the steps
        const params = new URLSearchParams({
            preset: preset,
            lang: lang,
            doughBallCount: doughBallCount.toString(),
            doughBallWeight: doughBallWeight.toString(),
            hydration: hydration.toString(),
            temperature: temperature.toString()
        });

        params.append('preferment', preferment?.toString() ?? '');

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
