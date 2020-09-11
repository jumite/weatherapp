const api ={
    key:"6b4e031691a0f5a79ae26bda0e0de172",
    baseurl:"https://api.openweathermap.org/data/2.5/"
}
let searchValue = '';

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery); 

function setQuery(evt) {
if(evt.keyCode == 13) {
  this.searchValue = searchbox.value;
   getResults(searchbox.value)
    }
}

function getResults(query){
    
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json()
    })
    .then((result)=>{
      let data= JSON.stringify(result);
      saveData(this.searchValue, data)
      displayResults(result)
    })
    .catch(()=>{
      localWeather = localStorage.getItem(query);
      let error = document.querySelector('.error');
      error.innerText = "";
      
      if(localWeather)
        displayResults(JSON.parse(localWeather));
      else {
        error.innerText = "You are offline, city was not saved in memory"
      }
    }
    );
}

function displayResults(weather){
     
    let city =document.querySelector('.location .city');
    city.innerText=`${weather.name},${weather.sys.country}`;

    let top =new Date ();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(top);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}&#176;C`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}&#176;C / ${Math.round(weather.main.temp_max)}&#176;C`;


    
  }

  function saveData(key, value){
    localStorage.setItem(key, value);
  }


function getstore(weather){
    let result =localStorage.getItem(weather);
    weather = JSON.stringify(weather);
    


}

function dateBuilder (d) {
   let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"];
   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

   let day = days[d.getDay()];  
   let date = d.getDate();
   let month = months[d.getMonth()];
   let year = d.getFullYear();


   return `${day} ${date} ${month} ${year}`;
      
 }

 if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-workers.js')
          .then((reg) => {
            console.log('Service worker registered.', reg);
          })
          .catch(()=>{
              console.log("Error registering service worker")
          });
    });
  }