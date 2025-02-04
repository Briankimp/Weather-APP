const CityInput = document.getElementById("city-input");
const CityName = document.getElementById("city");
const Temperature = document.getElementById("temperature");
const Humidity = document.getElementById("humidity");
const WindSpeed = document.getElementById("wind-speed");
const searchButton = document.getElementById("search-btn");

if (navigator.geolocation) {
  console.log("Geolocation API AVailable");
} else {
  console.log("Geolocation unavailable");
}
function fetchLocation() {
  if (navigator.geolocation) {
    console.log("API WORking");
    navigator.geolocation.getCurrentPosition((position) => {
      const Latitude = position.coords.latitude;
      const Longitude = position.coords.longitude;
      console.log(Longitude, Latitude);
      async function AutoDisplay(Latitude, Longitude) {
        const ApiKey = "073f90ec278b65d3d0392cd7ea21c73d";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=${ApiKey}`;
        try {
          const response = await fetch(apiUrl);
          console.log(response);
          if (!response.ok) {
            throw new Error("Something Went Wrong while awaiting response");
          }
          const data = await response.json();
          const CityName = data.name;
          const Temperature = data.main.temp - 273.15;
          const Humidity = data.main.humidity;
          const WindSpeed = data.wind.speed;
          const Weather = data.weather[0].description;
          const description = data.weather[0].main;
          console.log(Temperature);

          document.getElementById("temp").innerText = `${Temperature}`;
          document.getElementById("humidity").innerText = `${Humidity}`;
          document.getElementById("wind-speed").innerText = `${WindSpeed}`;
          document.getElementById("description").innerText = `${description}`;
          document.getElementById("city").innerText = `${CityName}`;
        } catch (error) {
          console.error("Error fetching weather data:", error);
          alert("Error fetching weather data. Please Try again");
        }
      }
      AutoDisplay(Latitude, Longitude);
    });
  }
}

fetchLocation();

searchButton.addEventListener("click", () => {
  const city = CityInput.value;
  if (!city) {
    alert("Please enter city Name");
    return;
  }
  async function fetchCityWeather(city) {
    const ApiKey = "073f90ec278b65d3d0392cd7ea21c73d";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`;
    try {
      const response = await fetch(apiUrl);
      console.log(response);

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }

      const data = await response.json();
      const CityName = data.name;
      const Temperature = data.main.temp - 273.15;
      const Humidity = data.main.humidity;
      const WindSpeed = data.wind.speed;
      // const Weather = data.weather.description;
      // const description = data.weather.main;
      console.log(Temperature);

      document.getElementById("temp").innerText = `${Temperature}`;
      document.getElementById("humidity").innerText = `${Humidity}`;
      document.getElementById("wind-speed").innerText = `${WindSpeed}`;
      document.getElementById("description").innerText = `${description}`;
      document.getElementById("city").innerText = `${CityName}`;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please Try again");
    }
  }
  fetchCityWeather(city);
});
