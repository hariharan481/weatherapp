import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import Current from "./components/current";
import Forecast from "./components/Forecast";

const api =
  "https://api.weatherapi.com/v1/search.json?key=5eb1392b80024f268bd102013231503&q=";
const forecastapi = (city) =>
  `https://api.weatherapi.com/v1/forecast.json?key=5eb1392b80024f268bd102013231503&q=${city}&days=2&aqi=no&alerts=no`;
function App() {
  const [city, setcity] = useState("");
  const [suggestion, setsuggestion] = useState([]);
  const [clicked, setclicked] = useState(false);
  const [forecast, setforecast] = useState();
  const [current, setcurrent] = useState();
  const [location, setlocation] = useState();
  useEffect(() => {
   fetch(api + city)
      .then((res) => res.json())
      .then((resp) => console.log(resp))
    const getdataaftertimeout = setTimeout(() => {
      const fetchcity = async () => {
        const data = await fetch(api + city);
        const resp = await data.json();
        const suugestdata = resp.map(
          (item1) => `${item1.name},${item1.region},${item1.country}`
        );
        setsuggestion(suugestdata);
        console.log(suugestdata);
      };

      if (!clicked && city.length > 2) {
        fetchcity();
      } else {
        setsuggestion([]);
        setclicked(false);
      }
    }, 1000);
    return () => clearTimeout(getdataaftertimeout);
  }, [city]);

  const handleclik = async (e) => {
    setcity(e);

    setclicked(true);

    const dataa = await fetch(forecastapi(city));
    const respp = await dataa.json();
    console.log(respp);
  };

  return (
    <div className="App">
      <React.Fragment>
        <div className="container">
          <div className="header">
            <b>WEATHER - REPORT</b>
          </div>
          <div className="app_body">
            <input
              type="text"
              className="cityname"
              placeholder="Enter The City name"
              onChange={(e) => setcity(e.target.value)}
              value={city}
            />
            {suggestion.length > 0 && (
              <div className="suggestionwraper">
                {suggestion.map((item) => (
                  <div className="sugesstion" onClick={() => handleclik(item)}>
                    {item}
                  </div>
                ))}
              </div>
            )}
            {current && <Current current={current} city={city} />}
            {forecast && <Forecast forecast={forecast} city={city} />}
          </div>
        </div>
        <div className="footer-info">
          <a href="">CLARITIANS</a> | Developed by{"HAriHARAN "}
          <a target="_blank"></a> | Powered by <a target="_blank"></a>
        </div>
      </React.Fragment>
    </div>
  );
}

export default App;
