import React from 'react';
import "weather-icons/css/weather-icons.css";

const Weather = (props) => {
  return (
    <div className="text-center">
      
      <h1>{props.city}</h1>
      <h3>{props.country}</h3>

      
      <i className={`wi ${props.weatherIcon} display-1`}></i>

      
      <h2>{props.temp_celsius}&deg;C</h2>

     
      <p>{props.description}</p>

     
      <h3>
        <span className="px-4">{props.temp_min}&deg;</span>
        <span className="px-4">{props.temp_max}&deg;</span>
      </h3>
    </div>
  );
};

export default Weather;
