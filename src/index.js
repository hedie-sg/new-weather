function displayTemperature(response) {
    console.log(response.data);
    let temptElement = document.querySelector('#tempt');
    temptElement.innerHTML = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector('#city');
    cityElement.innerHTML = response.data.city;
    let descriptElement = document.querySelector('#description');
    descriptElement.innerHTML = response.data.condition.description;
    let humidityElement = document.querySelector('#humidity');
    humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
    let windElement = document.querySelector('#wind');
    windElement.innerHTML = `wind: ${Math.round(response.data.wind.speed)}Km/h`;
}

let apiKey = '2o0f65b4a41b4138505bc7t3f2fa0460';

let apiUrl = `https://api.shecodes.io/weather/v1/current?query=paris&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
