var flipped = false;

async function getCoords() {
  const cityName = document.getElementById('cityInput').value;
  
  const geoUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`;
  
  try {
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (geoData.length > 0) {
      const lat = geoData[0].lat;
      const lon = geoData[0].lon;
      
      document.getElementById('lat').innerText = lat;
      document.getElementById('lon').innerText = lon;

      getWeather(lat, lon);
    }
  } catch (e) { console.error("Geocoding failed", e); }
}

async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    const weather = data.current_weather;

    const temp = weather.temperature;
    const wind = weather.windspeed;
    const code = weather.weathercode; // sunny, rainy, etc

    let isSun = (code <= 3); 
    let isClouds = (code >= 1 && code <= 45);
    let isRain = (code >= 51 && code <= 67);
    let isSnow = (code >= 71 && code <= 77);

    console.log(`Stats: Wind:${wind}, Sun:${isSun}, Rain:${isRain}, Snow:${isSnow}`);

    // change ground to snow
    if (isSnow) {
      document.getElementById('ground').style.backgroundColor = "white";
    }

  } catch (e) { console.error("Weather fetch failed", e); }
}

function buttonClick() {
    if (typeof kindle !== 'undefined') {
        if (flipped) {
            kindle.device.setOrientation("portraitUp");
            flipped = false;
        } else {
            kindle.device.setOrientation("portraitDown");
            flipped = true;
        }
    } else {
        console.log("Orientation flip requested! (Kindle SDK not found, skipping hardware call)");
        flipped = !flipped; 
    }
}