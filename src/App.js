import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

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
        <h3 className= "App">Você precisa habilitar a localização no browser o/</h3>
      </>
    )
  } else if (weather === false) {
    return (
      < >
        <h3 className= "App" >Carregando o clima...</h3>
      </>
    )
  }
  else {
    return (
      <>
        <h3 className= "App App-header">Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
        <ul className= "App App-tabel">
          <li className= "App-row">Temperatura atual: {weather['main']['temp']}°</li>
          <li className= "App-row">Temperatura máxima: {weather['main']['temp_max']}°</li>
          <li className= "App-row">Temperatura minima: {weather['main']['temp_min']}°</li>
          <li className= "App-row">Pressão: {weather['main']['pressure']} hpa</li>
          <li className= "App-row">Umidade: {weather['main']['humidity']}%</li>
        </ul>
      </>
    );
  }
}
export default App;
