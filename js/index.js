let searchTerm = document.querySelector("#searchInput");
let forcast = [];
let forecastDays = [];
let searchArr = [];
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

fetch('https://api.geoapify.com/v1/ipinfo?apiKey=d8d0fd43644c419192f128a17711dfbe')
.then(response => response.json())
.then(data => {
let countryCode = data.city.name
    current(countryCode)
    forecast (countryCode)
})

async function current(countryCode) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=87b10478bacb4e699f9132723230708&q=${countryCode}&days=3`);
    response = await response.json()

    forcast = response
    displayCurrent(forcast)
}

async function forecast (countryCode){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=87b10478bacb4e699f9132723230708&q=${countryCode}&days=3`);
    response = await response.json()
    forecastDays = response.forecast.forecastday
    displayForecast(forecastDays)
}



function displayCurrent(forcast) {
   
       
    let currentDay = "";
    
        let dateString = forcast.location.localtime
        let dateDay = new Date(dateString);
        let dayName = days[dateDay.getDay()];
        let date = new Date();
        let getMonth = date.toLocaleString('default', { month: 'long', });
        let day = new Date(dateString);
        let getDate = day.getDate()

        currentDay += `
        <div class="card bg-opacity-50 bg-white border-0 ">
        <div class="weather-header d-flex justify-content-between p-2 ">
          <div class="day">${dayName}</div>
          <div class="date">${getDate} ${getMonth}</div>
        </div>
        <div class="card-body">
          <h6 class="location text-dark py-3">${forcast.location.name}</h6>
          <div class="degree d-flex align-items-center justify-content-between">
            <h1 class="mb-3 main-degree">${forcast.current.temp_c}<sup>o</sup>C</h1>
            <img src="${forcast.current.condition.icon}">
          </div>
          <p class="custom text-info mt-5">${forcast.current.condition.text}</p>
          <p class="card-text ">
            <small class="text-body-secondary me-3"><img src="https://routeweather.netlify.app/images/icon-umberella.png"/> ${forcast.current.precip_in}%</small>
            <small class="text-body-secondary me-3">
            <img src="https://routeweather.netlify.app/images/icon-wind.png"/>
            ${forcast.current.wind_kph}km/h
            </small>
            <small class="text-body-secondary ">
            <img src="https://routeweather.netlify.app/images/icon-compass.png"/>
              ${forcast.current.wind_dir}
              </small>
          </p>
        </div>
      </div>
        
      `
    document.querySelector(".card-group").innerHTML = currentDay;
}

function displayForecast(forecastDays) {
    let currentDay = "";
    for (let i = 1; i < forecastDays.length; i++){
        let dateString = forecastDays[i].date
        let dateDay = new Date(dateString);
        let dayName = days[dateDay.getDay()];
        currentDay += `
           
        <div class="card bg-opacity-50 bg-white border-0 ">
            <div class="weather-header d-flex justify-content-center p-2 ">
              <div class="day">${dayName}</div>
            </div>
            <div class="card-body text-center">
            <img src="${forecastDays[i].day.condition.icon}">
              <div
                class="degree"
              >
                <h3 class="mt-4">${forecastDays[i].day.maxtemp_c}<sup>o</sup>C</h3>
                <h6 class="text-dark-emphasis mt-2 ">${forecastDays[i].day.mintemp_c}<sup>o</sup>C</h6>
                
              </div>
              <p class="custom text-info mt-5">${forecastDays[i].day.condition.text}</p>
            
            </div>
          </div>
        `
        
    }
    
    document.querySelector(".card-group").innerHTML += currentDay;
}
function search() {
    current(this.value)
    forecast(this.value)
}
document.querySelector('#searchInput').addEventListener('input',search)



  
