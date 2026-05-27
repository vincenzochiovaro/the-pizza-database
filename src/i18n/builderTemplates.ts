import type { BuilderTemplateData } from './models/builderTemplateModel.ts';

export function getBuilderTemplate(lang: string): BuilderTemplateData {
    if (lang === 'it') {
        const templateDataIt: BuilderTemplateData = {
            water: "Acqua",
            waterDay2: "Acqua (Giorno 2)",
            flour: "Farina",
            flourDay2: "Farina (Giorno 2)",
            salt: "Sale",
            saltDay2: "Sale (Giorno 2)",
            yeast: "Lievito secco",
            stepsTitle: "Preparazione Impasto",
            preset1: "Diretto",
            preset2: "Biga",
            preset3: "Espressa",
            preset1Description: "Il grande classico fatto in casa. Tutti gli ingredienti in un unico impasto con 8 ore di lievitazione per un sapore autentico. Ideale per chi cerca la pizza della tradizione.",
            preset2Description: "L'eccellenza. Un pre-impasto preparato il giorno prima per ottenere profumi intensi e un cornicione alveolato. Il segreto per la vera pizza contemporanea.",
            preset3Description: "L'impasto \"dell'ultimo minuto\". Una versione rapida pensata per chi non vuole rinunciare alla pizza anche quando il tempo è poco. Pronta in sole 3 ore.",
            doughBallCountLabel: "Numero di palline",
            doughBallWeightLabel: "Peso per pallina (gr)",
            hydrationLabel: "Idratazione (%)",
            prefermentLabel: "Prefermento (%)",
            temperatureLabel: "Temperatura",
            homeOvenLabel: "Forno di Casa",
            professionalOvenLabel: "Forno Professionale"
        };

        return templateDataIt
    }
    else {
        const templateDataEng: BuilderTemplateData = {
            water: "Water",
            waterDay2: "Water (Day 2)",
            flour: "Flour",
            flourDay2: "Flour (Day 2)",
            salt: "Salt",
            saltDay2: "Salt (Day 2)",
            yeast: "Dry Yeast",
            stepsTitle: "Dough Prep",
            preset1: "Direct",
            preset2: "Biga",
            preset3: "Express",
            preset1Description: "The gold standard for home bakers. All ingredients are mixed in one go, followed by an 8-hour fermentation to unlock the classic aroma. Perfect for a traditional, crispy homemade pizza.",
            preset2Description: "The ultimate artisan choice. A portion of the dough is prepared 24 hours in advance to develop complex, nutty flavors and a cloud-like crust. Essential for the airy \"Contemporary Neapolitan\" style.",
            preset3Description: "The \"Emergency Dough\". A high-speed version of the direct method designed for when time is short. While it skips the long maturation, it delivers fantastic results in just 3 hours.",
            doughBallCountLabel: "Number of doughballs",
            doughBallWeightLabel: "Doughball weight (gr)",
            hydrationLabel: "Hydration (%)",
            prefermentLabel: "Preferment (%)",
            temperatureLabel: "Temperature",
            homeOvenLabel: "Home Oven",
            professionalOvenLabel: "Professional Oven"
        };
        return templateDataEng
    }
}