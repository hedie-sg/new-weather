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
    let dateElement = document.querySelector('#date');
    dateElement.innerHTML = newDate(response.data.time * 1000);
    let iconElement = document.querySelector('#icon');
    iconElement.setAttribute(
        'src',
        `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
    iconElement.setAttribute('alt', response.data.condition.description);
}

let apiKey = '2o0f65b4a41b4138505bc7t3f2fa0460';

let apiUrl = `https://api.shecodes.io/weather/v1/current?query=paris&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
