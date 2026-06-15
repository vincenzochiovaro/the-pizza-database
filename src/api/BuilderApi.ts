import type { DoughIngredients } from "../models/Builder";

export async function GetPresetDataAsync(preset: string, lang: string, doughBallCount: number, doughBallWeight: number, hydration: number, temperature: number, preferment: number | null): Promise<DoughIngredients> {

    try {
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

export async function SubmitScheduleRequestAsync(
    date: string,
    time: string,
    email: string,
    preset: 'Direct' | 'Biga' | 'Express' | null
): Promise<void> {
    try {
        const payload = {
            date,
            time,
            email,
            preset
        };

        const url = `${import.meta.env.VITE_API_URL}api/todo`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': import.meta.env.VITE_API_KEY
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const result = await response.json();
        return result;

    }
    catch (error) {
        console.error("Error submitting schedule request:", error);
        throw error;
    }
}
