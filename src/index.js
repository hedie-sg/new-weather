function newDate(timetemp) {
    let date = new Date(timetemp);

    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    let day = days[date.getDay()];
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
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
    let dateElement = document.querySelector('#date');
    dateElement.innerHTML = newDate(response.data.time * 1000);
    let iconElement = document.querySelector('#icon');
    iconElement.setAttribute(
        'src',
        `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
    iconElement.setAttribute('alt', response.data.condition.description);
    celsioseTemprature = response.data.temperature.current;
}

function search(city) {
    let apiKey = '2o0f65b4a41b4138505bc7t3f2fa0460';
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function searchFor(event) {
    event.preventDefault();
    let typeCityElement = document.querySelector('#type-city');
    search(typeCityElement.value);
}

function showFahrenheitTemp(event) {
    event.preventDefault();

    celsioseLink.classList.remove('active');
    fahrenheitLink.classList.add('active');
    let temperatureElement = document.querySelector('#tempt');
    let fahrenheitTemp = (celsioseTemprature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function showCelsioseTemp(event) {
    event.preventDefault();

    celsioseLink.classList.add('active');
    fahrenheitLink.classList.remove('active');
    let temperatureElement = document.querySelector('#tempt');
    temperatureElement.innerHTML = Math.round(celsioseTemprature);
}

let celsioseTemprature = null;

let form = document.querySelector('#search-form');
form.addEventListener('submit', searchFor);

let fahrenheitLink = document.querySelector('#fahrenheit');
fahrenheitLink.addEventListener('click', showFahrenheitTemp);
let celsioseLink = document.querySelector('#celsiuse');
celsioseLink.addEventListener('click', showCelsioseTemp);

search('tehran');
