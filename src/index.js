import { fetchLocalisationWeather } from "./api"
import './style.css'


document.getElementById('search-btn').addEventListener('click', async () => {
    const locationInput = document.getElementById('location-input').value.trim();
    
    if (!locationInput) {
        document.getElementById('error-message').textContent = "Veuillez entrer une ville.";
        document.getElementById('error-message').style.display = 'block';
        return;
    }

    document.getElementById('error-message').style.display = 'none';

    const weatherData = await fetchLocalisationWeather(locationInput);

    if (weatherData) {
        document.getElementById('location-name').textContent = weatherData.location;
        document.getElementById('temperature').querySelector('span').textContent = weatherData.temperature.current;
        document.getElementById('conditions').textContent = weatherData.weather.conditions;
        document.getElementById('precipitation').querySelector('span').textContent = weatherData.weather.precipitation.probability;
        document.getElementById('wind-speed').querySelector('span').textContent = weatherData.weather.wind.speed;
        
        // Afficher l'icône météo
        document.getElementById('weather-icon').src = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/icons/${weatherData.weather.icon}.png`;

        // Afficher la section météo
        document.getElementById('weather-info').style.display = 'block';
    } else {
        document.getElementById('error-message').textContent = "Impossible de récupérer les données météo.";
        document.getElementById('error-message').style.display = 'block';
    }
});