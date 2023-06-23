//Current Date
let now = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let dayNumber = now.getDate();

  let year = now.getFullYear();
  return `${dayName} ${month} ${dayNumber}th ${year}`;
}

document.querySelector("span#current-date").innerHTML = formatDate(now);

//Current Time
function formatTime(time) {
  function addZero(digit) {
    if (digit < 10) {
      digit = "0" + digit;
    }
    return digit;
  }

  let hours = addZero(now.getHours());

  let minutes = addZero(now.getMinutes());
  return `${hours}:${minutes}`;
}

document.querySelector("span#current-time").innerHTML = formatTime(now);

// City Search
function displayCityData(response) {
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `Wind Speed: ${windSpeed} m/s`;

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "63214c4281922e3bb72fdf12dada7734";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCityData);
}

function submitInput(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("form#city-search");
form.addEventListener("submit", submitInput);

// Current Location Button
function searchLocation(position) {
  let apiKey = "63214c4281922e3bb72fdf12dada7734";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCityData);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("#reset-button");
button.addEventListener("click", getCurrentLocation);

searchCity("Lagos");
