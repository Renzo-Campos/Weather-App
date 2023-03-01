const API_KEY = "bfa207fa1c219ffda6d1267262b64204";

const fetchData = position => {
   const { latitude, longitude } = position.coords;
   fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
     .then(response => response.json())
     .then(data => setWeatherData(data))
}


// let imageFondo = document.body.style.backgroundImage = "url(assets/clear-sky.svg)";


const setWeatherData = data => {
  console.log(data);
  const weatherData = {
    location: data.name,
    description: data.weather[0].main,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    date: getDate()
  }

  const weather = weatherData.description;
  console.log(weather);

 const setBackgroundImg = (weather) => {
    let body = document.getElementById("body");
    let imgIcon = document.getElementById("icon");

     if (weather === "Clear"){
       body.style.backgroundImage = "url(assets/clear-sky.svg)";
       imgIcon.src = "./assets/clear-icon.svg";
     } else if (weather === "Clouds"){
       body.style.backgroundImage = "url(assets/cloudy.svg)";
       imgIcon.src = "./assets/clouds-icon.svg";
     } else if (weather === "Rainy"){
       body.style.backgroundImage = "url(assets/rain.svg)";
       imgIcon.src = "./assets/rain-icon.svg";
     } else {
       body.style.backgroundImage = "url(assets/lightning-storm.svg)";
     }
  } 
  
  Object.keys(weatherData).forEach( key => {
    document.getElementById(key).textContent = weatherData[key];
  });

  setBackgroundImg(weather);

  cleanUp();
}


const cleanUp = () => {
  let container = document.getElementById("container");
  let loader = document.getElementById("loader");

  loader.style.display = "none";
  container.style.display = "flex";
}

const getDate = () => {
  let date = new Date();
  return `${ ("0" + date.getDate()).slice(-2) }-${ ( "0" + (date.getMonth() + 1)).slice(-2) }-${date.getFullYear()}`;
}

const onLoad = () => {
  navigator.geolocation.getCurrentPosition(fetchData);
}