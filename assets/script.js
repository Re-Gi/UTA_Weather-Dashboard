//get coordinates: http://api.openweathermap.org/geo/1.0/direct?q={city}}&limit=1&appid=07220a51e95b28fddb66e8043de4c734
//get current weather: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=07220a51e95b28fddb66e8043de4c734
//get 5-day forecast: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=07220a51e95b28fddb66e8043de4c734

var searchBtn = document.querySelector('.btn-primary');
var inputEl = document.querySelector('input');

function getCoordinates() {
    console.log("getting coords: " + inputEl.value);
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
    })
    .catch((error) => {
        console.error(error);
    });
}

searchBtn.addEventListener('click', getCoordinates)