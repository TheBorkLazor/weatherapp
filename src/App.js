import React, { useEffect, useState } from "react";
import Weather from './components/weather';

export default function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      try {
        if (lat !== null && long !== null) {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=c924cf8feb20d9a536b4d89ed2c796d7`);
          const result = await response.json();
          setData(result);
          console.log(result);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
      {data && data.main ? (
        <Weather weatherData={data} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}