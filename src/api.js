const API_BASE_ROUTE = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const API_KEY = "6L75Q5BSJ9UWNHXFB6L3775S9"

export const fetchLocalisationWeather = async (localisation) => {
    try {
        const url = `${API_BASE_ROUTE}${localisation}?key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des données");

        const localisationData = await response.json();
        console.log(localisationData.days)
        const dayData = localisationData.days?.[0]; 

        if (!dayData) throw new Error("Données météo introuvables");

        return {
            currentDay : {
                location: localisationData.resolvedAddress, 
                temperature: {
                    current: dayData.temp,
                    min: dayData.tempmin,
                    max: dayData.tempmax,
                    feelsLike: dayData.feelslike,
                },
                weather: {
                    conditions: dayData.conditions,
                    icon: dayData.icon,
                    precipitation: {
                        probability: dayData.precipprob,
                        amount: dayData.precip,
                    },
                    wind: {
                        speed: dayData.windspeed,
                        direction: dayData.winddir,
                    },
                },
                description: dayData.description,
            },
            nextDaysData : localisationData.days?.[1-5]

        };
    } catch (error) {
        console.error("Erreur lors de la récupération des prévisions météo :", error);
        return null;
    }
};
