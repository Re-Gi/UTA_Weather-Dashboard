// var searchBtn = ;

//when searched, add to local storage as object with city-names and coordinates as values
    //cityHistory = {cityName = {lat:'', lon:'',},}
    //localStorage.setItem('WeatherDashboard-History', cityHistory)
//on page load, localStorage.getItem('weatherDashboard-History);

// var cityHistory = [["San Diego", lat, lon],]


function getHistoryFromStorage() {
    var cityHistory = localStorage.getItem('cityHistory');
    if(cityHistory) {
        cityHistory = JSON.parse(cityHistory);
    } else {
        cityHistory = [];
    }
    return cityHistory;
}

function displayHistory() {
    document.querySelector('#history-card').innerHTML = "";
    var cityHistory = getHistoryFromStorage();

    cityHistory.forEach(function(city) {

        var historyBtnEl = document.createElement('button');
        historyBtnEl.setAttribute('class', "btn btn-history");
        historyBtnEl.textContent = city[0];
        document.querySelector('#history-card').appendChild(historyBtnEl);

    });
}

displayHistory();

// function btnEventHandler(event) {
//     var cityName = event.target.text();
// }

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
        console.log(geoRes[0]);
        getCurrentWeather(geoRes[0]);
        getForecast(geoRes[0]);
        storeCity(geoRes[0]);
    })
    .catch((error) => {
        console.error(error);
    });
}

function storeCity(coords) {
    var cityHistory = getHistoryFromStorage();
    var includesCity = false;

    cityHistory.forEach(function(city) {
        if(city.includes(coords.name)) {
            console.log('includes');
            return includesCity = true;
        }
    })
    
    if(includesCity === false) {
        var newCity = [coords.name, coords.lat, coords.lon];
        cityHistory.push(newCity);
        localStorage.setItem('cityHistory', JSON.stringify(cityHistory));
        displayHistory();
    };
    
}

function getCurrentWeather(coords) {
    var currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?lat=" + coords.lat + "&lon=" + coords.lon + "&appid=07220a51e95b28fddb66e8043de4c734&units=imperial";

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

function getForecast(coords) {
    var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + coords.lat + "&lon=" + coords.lon + "&appid=07220a51e95b28fddb66e8043de4c734&units=imperial";

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

    for(var i=0; i < daysData.length; i++) {
        var daysDivEl = document.querySelector('#day-' + [i]);
        
        var iconUrl = 'https://openweathermap.org/img/wn/' + daysData[i].weather[0].icon + '.png';
        daysDivEl.children[1].setAttribute('src', iconUrl);

        daysDivEl.children[0].textContent = dayjs.unix(daysData[i].dt).format('M/DD/YYYY');
        daysDivEl.children[2].textContent = "Temp: " + daysData[i].main.temp + "°F";
        daysDivEl.children[3].textContent = "Wind: " + daysData[i].wind.speed + " MPH";
        daysDivEl.children[4].textContent = "Humidity: " + daysData[i].main.humidity + " %";
    };
}

document.querySelector('.btn-primary').addEventListener('click', getCoordinates);

// document.querySelector('#history-card').addEventListener('click', btnEventHandler);