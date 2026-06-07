const city = document.querySelector(".search input");
const btnEL = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const inputEl = document.querySelector(".input");

const apiKey = "8800f1c5f73696c7b1f59d3292ca234c";
 const url = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

btnEL.addEventListener("click", (e) => {
  if (city.value == "") {
    alert("Please enter a city");
    return;
  } else {
    checkweather(city.value);
    city.value = "";
  }
});
inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key == "Enter") {
    checkweather(e.target.value);
  }
});
async function checkweather(city) {
  try {
    // const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${apiKey}

     const res = await fetch(url + city + `&appid=${apiKey}`);
    // const res = await fetch(url);
    if (res.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      document.querySelector(".error").style.display = "none";
      document.querySelector(".author").style.display = "none";
      const data = await res.json();
      document.querySelector(".city").textContent = data.name;
      document.querySelector(".temp").textContent =
        Math.round(data.main.temp) + "0 °c";
      document.querySelector(".humidity").textContent =
        data.main.humidity + "%";
      document.querySelector(".wind").textContent = data.wind.speed + " Km/h";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "./images/clouds.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "./images/drizzle2.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "./images/rain.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "./images/sunny.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "./images/mist.png";
      }
      document.querySelector(".weather").style.display = "block";
    }
  } catch (error) {
    document.querySelector(".error").textContent = "Check internet connection.";
  }
}
