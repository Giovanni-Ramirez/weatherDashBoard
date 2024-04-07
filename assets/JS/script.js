const city = document.querySelector("#location");
const weatherForm = document.querySelector("#weatherSearch");
const todaysWeather = document.querySelector('#todaysWeather');

// b6c220f04b8582f83e94b9971d818360

function getWeather(event) {
    event.preventDefault();
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial&appid=b6c220f04b8582f83e94b9971d818360`;

    console.log('I was clicked')
    fetch(weatherUrl)
        .then(function (response) {
            console.log(response.status);
            return response.json();
        })
        .then(function (data) {
            
            currentWeather(data);
            fiveDayWeather(data);
        });
}


function currentWeather (data) {

    todaysWeather.textContent = '';
    const cardWeather = document.createElement('div');
    cardWeather.setAttribute("class", "card text-start");


    const weatherHeader = document.createElement('h5');
    weatherHeader.setAttribute('class', 'card-header');
    weatherHeader.textContent = data.name;

    const cardBodyWeather = document.createElement('div');
    cardBodyWeather.setAttribute('class', 'card-body');
    
    const temp = document.createElement('p');
    temp.textContent = `Temp: ${data.main.temp}°F`;
    const wind = document.createElement('p');
    wind.textContent = `Wind Speed: ${data.wind.speed}mph`;
    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    
    cardBodyWeather.append(temp,wind,humidity);

    cardWeather.append(weatherHeader,cardBodyWeather);
    todaysWeather.append(cardWeather);
}

function fiveDayWeather (data) {

}

weatherForm.addEventListener("submit", getWeather);

