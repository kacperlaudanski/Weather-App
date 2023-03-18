const searchBar = document.getElementById('search-bar'); 
const searchButton = document.getElementById('search-button'); 
const city = document.querySelector('.weather-city'); 
const temp = document.querySelector('.temp'); 
const shortWeatherDescription = document.querySelector('.short-description'); 
const humidity = document.querySelector('.humidity'); 
const windSpeed = document.querySelector('.wind-speed');  

async function getBackgroundImage(){
    const res = await fetch('https://source.unsplash.com/random/?city,night');
    const blob = await res.blob(); 
    const url = await URL.createObjectURL(blob); 
    document.body.style.backgroundImage = `url(${url})`
}
getBackgroundImage(); 


/*function getUserLocation(callback){
    navigator.geolocation.getCurrentPosition(callback)
}*/

async function getWeather(location){
    const weather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=92DXRKW4L4TWX6SU8HMP2G4RF`); 
    const res = await weather.json(); 
    assignData(res);
}

function assignData(data){
    city.textContent = data.address;
    temp.textContent = Math.round(((data.currentConditions.temp) - 32) * (5/9))
    shortWeatherDescription.textContent = data.description 
    humidity.textContent = data.currentConditions.humidity
    windSpeed.textContent = data.currentConditions.windspeed
}

searchButton.addEventListener('click', () => {
    getWeather(searchBar.value);
    getBackgroundImage(); 
})
 