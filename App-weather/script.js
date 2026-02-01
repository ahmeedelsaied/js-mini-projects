const input = document.getElementById("cityInput");
const btn = document.getElementById("searchBtn");

const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const condition = document.querySelector(".condition");
const icon = document.querySelector(".icon");

const loading = document.querySelector(".loader");
const errorMsg = document.querySelector(".error");

const apiKey = "API_KEY_HERE ";

// Button click
btn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

// Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

// Main function
async function getWeather(city) {
  showLoading();

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
    );

    const data = await response.json();

    if (data.error) {
      showError();
      return;
    }

    showResult(data);
    localStorage.setItem("lastCity", city);
    input.value = "";
  } catch (error) {
    showError();
  }
}

// UI functions

function showLoading() {
  loading.style.display = "block";
  errorMsg.style.display = "none";
}

function showError() {
  loading.style.display = "none";
  errorMsg.style.display = "block";
}

function showResult(data) {
  loading.style.display = "none";
  errorMsg.style.display = "none";

  cityName.innerText = data.location.name;
  temp.innerText = `Temperature: ${data.current.temp_c} °C`;
  condition.innerText = data.current.condition.text;
  icon.src = "https:" + data.current.condition.icon;
}

// Load last city
const savedCity = localStorage.getItem("lastCity");

if (savedCity) {
  getWeather(savedCity);
}
