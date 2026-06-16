export type BuilderPreset = 'Direct' | 'Biga' | 'Express' | null;

const PRESET_LEAD_HOURS: Record<Exclude<BuilderPreset, null>, number> = {
    Direct: 8,
    Biga: 18,
    Express: 3,
};

export function getPresetLeadHours(preset: BuilderPreset): number {
    if (!preset) {
        return 0;
    }

    return PRESET_LEAD_HOURS[preset] ?? 0;
}

export function getMinScheduleDateTime(preset: BuilderPreset, now = new Date()): Date {
    const minimum = new Date(now);
    minimum.setMinutes(minimum.getMinutes() + 10);
    minimum.setSeconds(0, 0);
    minimum.setHours(minimum.getHours() + getPresetLeadHours(preset));
    return minimum;
}

const pad = (value: number) => String(value).padStart(2, '0');

export function normalizeDateInput(date: Date): string {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function normalizeTimeInput(date: Date): string {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function normalizeDateTimeInput(date: Date): string {
    return `${normalizeDateInput(date)}T${normalizeTimeInput(date)}`;
}
