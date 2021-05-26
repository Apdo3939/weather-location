import React, { useEffect, useState } from 'react';
import axios from 'axios';
import gitImg from './git.jpg';

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
        <h3 className="app-text">Você precisa habilitar a localização no browser o/</h3>
      </>
    )
  } else if (weather === false) {
    return (
      < >
        <h3 className="app-text" >Carregando o clima...</h3>
      </>
    )
  }
  else {
    return (

      <div className="app-container">
        <div className="app-header">
          <h3 className="app-header-text">Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
        </div >
        <div className="app-tabel-container">
          <ul className="app-tabel">
            <li className="app-tabel-row">Temperatura atual: {weather['main']['temp']}°</li>
            <li className="app-tabel-row">Temperatura máxima: {weather['main']['temp_max']}°</li>
            <li className="app-tabel-row">Temperatura minima: {weather['main']['temp_min']}°</li>
            <li className="app-tabel-row">Pressão: {weather['main']['pressure']} hpa</li>
            <li className="app-tabel-row">Umidade: {weather['main']['humidity']}%</li>
          </ul>
        </div>
        <div className="app-footer">
          <h3 className="app-footer-text">Desenvolvido para fins acadêmicos por Alexandre pereira</h3>
          <a href="https://github.com/Apdo3939/weather-location" target="new">
            <h5 className="app-footer-text-git">GitHub</h5>
          </a>
        </div >
      </div>
    );
  }
}
export default App;
