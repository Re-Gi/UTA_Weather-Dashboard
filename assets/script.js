// var searchBtn = ;

function getCoordinates() {
    var inputEl = document.querySelector('input');
    var geoAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputEl.value + "&limit=1&appid=07220a51e95b28fddb66e8043de4c734"

    fetch(geoAPI)
    .then((response) => {
        if(!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then((geoRes) => {
        console.log(geoRes);
        getCurrentWeather(geoRes);
        getForecast(geoRes);
    })
    .catch((error) => {
        console.error(error);
    });
}

function getCurrentWeather(geoRes) {
    var currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?lat=" + geoRes[0].lat + "&lon=" + geoRes[0].lon + "&appid=07220a51e95b28fddb66e8043de4c734&units=imperial";

    fetch(currentWeatherAPI)
    .then((response) => {
        if(!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then((cwRes) => {
        console.log(cwRes);
        displayCurrentWeather(cwRes);
    })
    .catch((error) => {
        console.error(error);
    });
}

function getForecast(geoRes) {
    var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + geoRes[0].lat + "&lon=" + geoRes[0].lon + "&appid=07220a51e95b28fddb66e8043de4c734&units=imperial";

    fetch(forecastAPI)
    .then((response) => {
        if(!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then((fcRes) => {
        console.log(fcRes);
        displayForecast(fcRes);
    })
    .catch((error) => {
        console.error(error);
    });
}

function displayCurrentWeather(data) {
    document.querySelector('#weather-div').setAttribute('style', 'display:block;');

    document.querySelector('#city-name').textContent = data.name + " (" + dayjs.unix(data.dt).format('M/DD/YYYY') + ") ";

    var iconUrl = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';
    document.querySelector('#current-icon').setAttribute('src', iconUrl);

    document.querySelector('#current-temp').textContent = "Temp: " + data.main.temp + "°F";
    document.querySelector('#current-wind').textContent = "Wind: " + data.wind.speed + " MPH";
    document.querySelector('#current-humidity').textContent = "Humidity: " + data.main.humidity + " %";

}

function displayForecast(data) {
    var daysData = [data.list[4], data.list[12], data.list[20], data.list[28], data.list[36]];
    console.log(daysData);
    document.querySelector('#forecast-div').setAttribute('style', 'display:block;');

    daysData.forEach(function(index) {
        var parentDiv = document.querySelector('.forecast-flexbox');
        var dayDiv = document.createElement('div');
        var dateEl = document.createElement('h4');
        var iconEl = document.createElement('img');
        var tempEl = document.createElement('p');
        var windEl = document.createElement('p');
        var humidityEl = document.createElement('p');
        
        dayDiv.setAttribute('class', 'forecast-day');
        var iconUrl = 'https://openweathermap.org/img/wn/' + index.weather[0].icon + '.png';
        iconEl.setAttribute('src', iconUrl);

        dateEl.textContent = dayjs.unix(index.dt).format('M/DD/YYYY');
        tempEl.textContent = "Temp: " + index.main.temp + "°F";
        windEl.textContent = "Wind: " + index.wind.speed + " MPH";
        humidityEl.textContent = "Humidity: " + index.main.humidity + " %";

        parentDiv.appendChild(dayDiv);
        dayDiv.appendChild(dateEl);
        dayDiv.appendChild(iconEl);
        dayDiv.appendChild(tempEl);
        dayDiv.appendChild(windEl);
        dayDiv.appendChild(humidityEl);
    })
}

document.querySelector('.btn-primary').addEventListener('click', getCoordinates)