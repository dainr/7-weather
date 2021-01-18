const API_KEY = 'key=434d0e58097f424f9ed234609211401&q=';
const URL = 'https://api.weatherapi.com/v1/';
const current = 'current.json?';
const forecast = 'forecast.json?';
const form = document.getElementById('form');

//https://api.weatherapi.com/v1/current.json?key=434d0e58097f424f9ed234609211401&q=London

function getDate() {
    let date = new Date();
    let dayofWeek = [
        'Sunday',
        'Monday',
        'Tuesaday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    let day = dayofWeek[date.getDay()];
    let dayInt = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${day} ${month}-${dayInt}-${year}`;
}

function displayWeatherInfo(data) {
    const sub1 = document.querySelector('.sub1');
    const sub2 = document.querySelector('.sub2');

    sub1.innerHTML = `
    <p>${data.location.name}, ${data.location.region}</p>
    <p>${getDate()}</p>
    <div class='weather-data'><img src='${data.current.condition.icon}' class='weather-con'/> <p>${data.current.condition.text}</p></div>
    <p><span>F:${data.current.temp_f}</span> | <span>C:${data.current.temp_c}</span></p>
    `;

    sub2.innerHTML = `
    <p>Precipitation: ${data.current.precip_in}</p>
    <p>Humidity: ${data.current.humidity}%</p>
    <p>Wind: ${data.current.wind_mph} mph</p>
    `;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = document.getElementById('city');
    const city = input.value;

    if (input.value === '') {
        alert('please enter a city or zip code');
    } else {
        getCurrentData(city);
    }

    input.value = '';
});

function getCurrentData(city) {
    fetch(URL + current + API_KEY + city).then((response) => {
        return response.json();
    }).then((data) => {
        displayWeatherInfo(data);
    }).catch((error) => {
        console.error(error);
    });
};
