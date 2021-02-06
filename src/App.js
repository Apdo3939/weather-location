import React, { useEffect, useState } from 'react';
import axios from 'axios';

//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,

function App() {

  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  }, [])

  if (location === false) {
    return (
      <>
        Você precisa habilitar a localização no browser o/
      </>
    )
  } else if (weather === false) {
    return (
      <>
        Carregando o clima...
      </>
    )
  }
  else {
    return (
      <>
        <h3>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
        <hr />
        <ul>
          <li>Temperatura atual: {weather['main']['temp']}°</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
          <li>Temperatura minima: {weather['main']['temp_min']}°</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li>
          <li>Umidade: {weather['main']['humidity']}%</li>
        </ul>
        <hr />
      </>
    );
  }
}
export default App;
