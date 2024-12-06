import React, { Component } from 'react';
import './App.css';
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from './Components/Weather';
import Form from './Components/Form';
import thunderstormImg from './assets/thunderstorm.jpg';
import drizzleImg from './assets/drizzle.jpg';
import rainImg from './assets/rain.jpg';
import snowImg from './assets/snow.jpg';
import clearImg from './assets/clear.jpg';
import cloudsImg from './assets/clouds.jpg';
import defaultImg from './assets/default.jpg';

const API_KEY = "7707bf6d4b078c85efcd4bc92126658c";

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
      backgroundImage: "",
      showWeather: false 
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_Weathericon(icons, rangeID) {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeID === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }

  updateBackground(weatherCondition) {
    let imageUrl;

    switch (weatherCondition.toLowerCase()) {
      case "thunderstorm":
        imageUrl = thunderstormImg;
        break;
      case "drizzle":
        imageUrl = drizzleImg;
        break;
      case "rain":
        imageUrl = rainImg;
        break;
      case "snow":
        imageUrl = snowImg;
        break;
      case "clear":
        imageUrl = clearImg;
        break;
      case "clouds":
        imageUrl = cloudsImg;
        break;
      default:
        imageUrl = defaultImg;
    }

    this.setState({ backgroundImage: `url(${imageUrl})` });
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=` + API_KEY
      );
      const response = await api_call.json();
      console.log(response);

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false,
        showWeather: true 
      });

      this.get_Weathericon(this.weatherIcon, response.weather[0].id);

      
      this.updateBackground(response.weather[0].main);
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const appStyle = {
      backgroundImage: this.state.backgroundImage,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      minHeight: "100vh", 
      color: "white",
      overflow: "hidden" 
    };

    return (
      <div style={appStyle}>
        
        <Form loadweather={this.getWeather} error={this.state.error} />

        
        <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: "70vh" }}>
          {this.state.showWeather && (
            <Weather
              city={this.state.city}
              country={this.state.country}
              temp_celsius={this.state.celsius}
              temp_max={this.state.temp_max}
              temp_min={this.state.temp_min}
              description={this.state.description}
              weatherIcon={this.state.icon}
            />
          )}

          
         
          
        </div>
      </div>
    );
  }
}

export default App;
