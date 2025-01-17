document.addEventListener("DOMContentLoaded", function() {
    const weatherSearch = document.querySelector('.weather_search');
    const weatherCity = document.querySelector('.weather_city');
    const weatherDay = document.querySelector('.weather_day');
    const weatherTemperature = document.querySelector('.weather_temperature .value');
    const weatherHumidity = document.querySelector('.weather_indicator--humidity .value');
    const weatherWind = document.querySelector('.weather_indicator--wind .value');
    const weatherPressure = document.querySelector('.weather_indicator--preesure .value');
    const weatherImage = document.querySelector('.weather_image');
    const forecastItems = document.querySelectorAll('.weather_forecast_item');
    
 
    weatherSearch.addEventListener('change', function(event) {
        const city = event.target.value;
        fetchWeatherData(city);
    });

    function fetchWeatherData(city) {
        const apiKey = '26d2ab581a35c3b7f0b1b0444b9a8f3f'; 
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

        fetch(weatherUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found'); 
                }
                return response.json();
            })
            .then(data => updateWeatherInfo(data))
            .catch(error => {s
                console.error('Error fetching weather data:', error);
                alert('City not found. Please try again.'); 
            });

        fetch(forecastUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found'); 
                }
                return response.json();
            })
            .then(data => updateForecast(data))
            .catch(error => {
                console.error('Error fetching forecast data:', error);
                alert('Kota Tidak Ada. Mohon Di Coba Lagi');
            });
    }

  
    function updateWeatherInfo(data) {
        weatherCity.textContent = data.name;
        weatherDay.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        weatherTemperature.textContent = Math.round(data.main.temp);
        weatherHumidity.textContent = data.main.humidity;
        weatherWind.textContent = `Wind: ${data.wind.deg}°, ${data.wind.speed} m/s`;
        weatherPressure.textContent = data.main.pressure;
        weatherImage.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }


    function updateForecast(data) {
        const forecastData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
        forecastItems.forEach((item, index) => {
            if (forecastData[index]) {
                const forecastDay = new Date(forecastData[index].dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
                const forecastTemperature = Math.round(forecastData[index].main.temp);
                const forecastIcon = forecastData[index].weather[0].icon;

                item.querySelector('.weather_forecast_day').textContent = forecastDay;
                item.querySelector('.weather_forecast_temperature .value').textContent = `+${forecastTemperature}`;
                item.querySelector('.weather_forecast_icon').src = `http://openweathermap.org/img/wn/${forecastIcon}@2x.png`;
            }
        });
    }
});
