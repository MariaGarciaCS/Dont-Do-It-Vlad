
//Elements 
const errorElement = document.querySelector(".error p");
const iconElement = document.getElementById("icon");
const tempElement = document.getElementById("temp");
const descriptionElement = document.getElementById("description");
const verdictElement = document.getElementById("verdict");
const titleElement = document.querySelector(".title h1");

const KELVIN = 273.15;
const key = "d5f650a12496a128d373b97788be25bb";

const weather = {};
let okToRun = false;

weather.temperature = {
    unit : "farenhei"
}

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    errorElement.style.display = "block";
    errorElement.innerHTML = "<p>Browser does not Support Geolocation</p>";
}

function kelvinToFahrenheit( temperature ){
    return Math.floor( ( (temperature - KELVIN) * 9/5 ) + 32 );
}
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}
function showError(error){
    errorElement.style.display = "block";
    errorElement.innerHTML = `<p> ${error.message} </p>`;
}
function displayWeather(){
    iconElement.src = `img/${weather.iconId}.png`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
    descriptionElement.innerHTML = weather.description;

    verdictElement.innerHTML = getVerdict(weather.temperature.value);

    if (okToRun){
        titleElement.innerHTML = "Ok Do It Vlad";
    }
    else{
        titleElement.innerHTML = "Don't Do It Vlad"
    }
}
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = kelvinToFahrenheit(data.current.temp);
            weather.description = data.current.weather[0].description;
            weather.iconId = data.current.weather[0].icon;
        })
        .then(function(){
            displayWeather();
        });
}
function isRaining(){
    pass;
}

function getVerdict(temp){
    if (temp >= 87){
        okToRun = false; 
        return "Its too hot to run";
    }
    else{
        okToRun = true;
        return "Enjoy your run, Vlad!"
    }
}
