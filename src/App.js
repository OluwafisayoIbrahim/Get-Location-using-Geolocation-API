import React from 'react';
import './App.css';
import axios from 'axios';

const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
const API_key = `0f15198fe4e0c444ad9f8d2a949c3f68`


function App() {
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');
  const [responseData, setResponseData] = React.useState({})
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    })

    const finalAPIEndpoint = `${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_key}`
    axios.get(finalAPIEndpoint)
    .then((response) => {
      console.log(response.data)
      setResponseData(response.data)
    })
  }, [latitude, longitude])
  return (
    <div className="App">
      <h1>{responseData.name}</h1>
      <p>Temperature: {responseData.main.temp}°C</p>
          <p>Weather: {responseData.weather[0].description}</p>
          <p>Humidity: {responseData.main.humidity}%</p>
          <p>Wind Speed: {responseData.wind.speed} m/s</p>
    </div>
  );
}

export default App;
