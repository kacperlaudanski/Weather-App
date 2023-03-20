const searchBar = document.getElementById('search-bar'); 
const searchButton = document.getElementById('search-button'); 
const city = document.querySelector('.weather-city'); 
const temp = document.querySelector('.temp'); 
const shortWeatherDescription = document.querySelector('.short-description'); 
const humidity = document.querySelector('.humidity'); 
const windSpeed = document.querySelector('.wind-speed'); 
const weatherContainer = document.querySelector('.weather-container');  
const loader = document.querySelector('.loader'); 
const errorContainer = document.querySelector('.error')

async function getBackgroundImage(){
    try{
        const res = await fetch('https://source.unsplash.com/random/?city,night');
        const blob = await res.blob(); 
        const url = await URL.createObjectURL(blob); 
        document.body.style.backgroundImage = `url(${url})`
    }catch(err){
        document.body.style.backgroundColor = `#ddd`
        throw Error('Failed to fetch background image', err)
    }
}
getBackgroundImage(); 

function getWeather(location){
    const weather = fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=92DXRKW4L4TWX6SU8HMP2G4RF`)
    .then(res => res.json())
    .then(data => assignData(data))
    .catch(err => {
        loader.classList.add('hidden')
        errorContainer.classList.remove('hidden') 
        searchBar.value = ''
        errorContainer.textContent = 'Error ! Provide the correct name of the city.' 
    })
    weatherDataLoading(); 
}

function assignData(data){
    searchBar.value = ''
    weatherContainer.classList.remove('hidden'); 
    loader.classList.add('hidden')
    city.textContent = data.address;
    temp.textContent = Math.round(((data.currentConditions.temp) - 32) * (5/9))
    shortWeatherDescription.textContent = data.description; 
    humidity.textContent = data.currentConditions.humidity
    windSpeed.textContent = data.currentConditions.windspeed
}

function weatherDataLoading(){
  errorContainer.classList.add('hidden')
  weatherContainer.classList.add('hidden'); 
  loader.classList.remove('hidden'); 
}

window.addEventListener('load', () => {
    getWeather('Poznań'); 
})

searchButton.addEventListener('click', () => {
    getWeather(searchBar.value);
    getBackgroundImage(); 
})
 