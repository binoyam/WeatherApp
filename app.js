const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCard = document.querySelector(".weather");
const errorTxt = document.querySelector(".error");
const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const apiKey = "a375ae98626bdcb99df704d9912e241a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else {
        var data = await response.json();
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "./images/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "./images/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "./images/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "./images/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "./images/mist.png";
        }
        weatherCard.style.display = "block";
        errorTxt.style.display = "none";
    }
    cityName.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°C";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " Km/h";
}
searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", e => {
    e.preventDefault();
    if (e.keyCode === 13) {
        checkWeather(searchBox.value);
    }
});