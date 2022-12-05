import React from "react";
import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  const [searchValue, setSearchValue] = useState("Mumbai");

  const [weatherData, setweatherData] = useState([]);

  const getWeatherInfo = () => {
    fetchData();
  };

  const fetchData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=d982efa98b33c091c1485aecd3251071`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { temp, humidity, pressure } = data.main;
        const { name } = data;
        const { speed } = data.wind;
        const { main: weatherhood } = data.weather[0];
        const { country, sunset } = data.sys;

        const newWeatherInfo = {
          temp,
          humidity,
          pressure,
          name,
          speed,
          weatherhood,
          country,
          sunset,
        };

        setweatherData(newWeatherInfo);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  let sec = weatherData.sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <div id="app">
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="hero-btn" onClick={getWeatherInfo}>
          Search
        </button>
      </div>

      <article>
        <div className="icon-cnt">
          <i className="wi wi-day-cloudy"></i>
        </div>

        <div className="temp-cnt">
          <div className="temp">
            <span className="deg"> {weatherData.temp}&deg;</span>
            <span className="con">
              <span>{weatherData.weatherhood}</span>
              <p>
                {weatherData.name}, {weatherData.country}
              </p>
            </span>
          </div>

          <div className="date">{new Date().toLocaleString()}</div>
        </div>

        <div className="last-cnt">
          <div className="last-cnt-1">
            <i className="wi wi-sunset" />
            <span><p>{timeStr}</p>
              <p>Sunset</p>
            </span>
          </div>

          <div className="last-cnt-1">
            <i className="wi wi-humidity" />
            <span>
              <p>Humidity</p><p>{weatherData.humidity}</p>
            </span>
          </div>

          <div className="last-cnt-1">
            <i className="wi wi-hail" />
            <span>
              <p>Pressure</p><p>{weatherData.pressure}</p>
            </span>
          </div>

          <div className="last-cnt-1">
            <i className="wi wi-strong-wind" />
            <span><p>Wind</p>
              <p>{weatherData.speed}</p>
            </span>
          </div>
        </div>
      </article>
      <p className="watermark">M Siddhesh</p>
    </div>
  );
};

export default App;
