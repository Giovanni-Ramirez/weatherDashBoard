const city = document.querySelector("#location");
const weatherForm = document.querySelector("#weatherSearch");
const todaysWeather = document.querySelector('#todaysWeather');
const forecastEl = document.querySelector('#forecast');
const body = document.querySelector("body");



function getWeather(event) {
    event.preventDefault();
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial&appid=b6c220f04b8582f83e94b9971d818360`;
    const fiveDayWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=imperial&appid=b6c220f04b8582f83e94b9971d818360`;

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentWeather(data);
            bodyImg(data);
        });


    fetch(fiveDayWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            fiveDayForecast(data);
            weatherType(data);
        });

    city.value = '';
}


function currentWeather (data) {
    // Clear the HTML El
    todaysWeather.textContent = '';
    // Card
    const cardWeather = document.createElement('div');
    cardWeather.setAttribute("class", "card text-start");

    // Location
    const weatherHeader = document.createElement('h5');
    weatherHeader.setAttribute('class', 'card-header');
    weatherHeader.textContent = data.name;
    // body
    const cardBodyWeather = document.createElement('div');
    cardBodyWeather.setAttribute('class', 'card-body');
    // Temp
    const temp = document.createElement('p');
    temp.textContent = `Temp: ${Math.round(data.main.temp)}°F`;
    // Wind
    const wind = document.createElement('p');
    wind.textContent = `Wind Speed: ${data.wind.speed}mph`;
    // Humidity
    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    
    cardBodyWeather.append(temp,wind,humidity);

    cardWeather.append(weatherHeader,cardBodyWeather);
    todaysWeather.append(cardWeather);
}

function fiveDayForecast (data) {
    // This clear HTML El
    forecastEl.textContent = '';

    for (i = 0; i < 40; i = i + 8) {
        // date
        let dateTime = data.list[i].dt_txt;
        let date = dateTime.substr(0, 10);
        let newDate = date.replace(/-/gi, '/');
        let dayDate = dayjs(newDate);

        // temp
        let tempDec = data.list[i].main.temp;
        let tempNumber = Math.round(tempDec);
        
        // Creating the card El
        const card = document.createElement('div');
        card.setAttribute('class', 'card m-1 p-1');
        card.setAttribute('style', 'width: 11.5rem');
        // date
        const pDate = document.createElement('p');
        pDate.textContent = newDate;
        // weather img
        const image = document.createElement('img');
        image.setAttribute('src', weatherType(data.list[i].weather[0].main))
        // weather name
        const weather = document.createElement('h5');
        weather.textContent = data.list[i].weather[0].main;
        // Temp
        const tempH4 = document.createElement('h4');
        tempH4.textContent = tempNumber + "°F";
        // Wind
        const wind = document.createElement('p');
        wind.textContent = `W ${data.list[i].wind.speed}`;
        // humidity
        const humidity = document.createElement('p');
        humidity.textContent = `H ${data.list[i].main.humidity}`;

        // appending every thing
        card.append(pDate, image, tempH4, weather, wind, humidity);
        forecastEl.append(card);
        
    }

}

// Need to find a weather type
function weatherType (weather) {
    if (weather == 'Clouds') {
        return "assets/images/cloudy.png";
    } else if (weather == "Clear") {
        return "assets/images/sun.png";
    } else if (weather == "Snow") {
        return "assets/images/snow.png";
    } else if (weather == 'Rain' || weather == "Drizzle") {
        return "assets/images/rainy.png";
    } else {
        return "assets/images/clouds.png";
    }
}

// Body bg img
function bodyImg (data) {
    console.log(data.weather[0]);
    const weatherMain = data.weather[0].main;
    console.log(weatherMain);
    const weatherDescrition = data.weather[0].description;
    console.log(weatherDescrition);
    console.log("bodyImg was runned");

    if (weatherMain == 'Thunderstorm') {
        body.setAttribute("class", "thunder");
        console.log("thunder")
    } else if (weatherMain == "Drizzle" || weatherMain == "Rain") {
        body.setAttribute("class", "rain");
        console.log("rain")
    } else if (weatherMain == "Snow") {
        body.setAttribute("class", "snow");
        console.log("snow")
    } else if (weatherDescrition == "few clouds" || weatherDescrition == "scattered clouds" || weatherMain == "Clear")  {
        body.setAttribute("class", "clear");
        console.log("clear")
    } else if (weatherMain == 'Clouds') {
        body.setAttribute("class", "clouds");
        console.log("clouds")
    }
}

weatherForm.addEventListener("submit", getWeather);

