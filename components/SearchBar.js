import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { WeatherContext } from '../context/WeatherProvider';

const SearchBar = () => {
  const { weather, setWeather } = useContext(WeatherContext);
  const [ coords, setCoords ] = useState({ lat: null, lon: null });

  useEffect(() => {

    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {

        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);

        setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
      });
    } else {
      console.log("Not Available");
    }

    
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}& exclude=hourly,daily&appid=4d7af40322905c50c7b0301437e23b21`);

      console.log(res);

      setWeather(res.data);
    }

    if(coords.lat && coords.lon) {
      getData();
    }
  }, [coords])

  return (
    <div className="wrapper">
      <div className="cityInputWrapper">
        <input placeholder="City Here" className="cityInput" />
        <button className="searchIcon"><FontAwesomeIcon icon="search" /></button>
      </div>
      <button className="locationButton">
        <span><FontAwesomeIcon icon="location-arrow" /></span>
      </button>

      <style jsx>{`
        .wrapper {
          display: flex;
          padding: 16px;

          width: 100%;
        }

        .cityInputWrapper {
          display: flex;
          flex-grow: 10;
          padding: 12px 24px;

          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 1000px;

          font-size: 1.2rem;
        }

        .cityInput {
          flex-grow: 10;

          background-color: transparent;
          border: 0px none transparent;

          font-size: 1.2rem;

          outline: none;
        }

        .searchIcon {
          width: 1.5rem;
          height: 1.5rem;
          padding: 0;
          margin-left: 1rem;

          color: rgba(0, 0, 0, 0.2);

          border: none;
          outline: none;
          transition: 0.2s;
        }

        .searchIcon:hover {
          cursor: pointer;
          color: rgba(0, 0, 0, 0.3);
        }

        .locationButton {
          width: 3rem;
          height: 3rem;
          margin-left: 1rem;
          padding: 0.8rem 0.8rem 0.7rem 0.7rem;

          background-color: transparent;
          color: rgba(0, 0, 0, 0.2);

          border: none;
          border-radius: 1000px;
          outline: none;
          transition: 0.2s;
        }

        .locationButton:hover {
          background-color: rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
      `}</style>
    </div>

    
  ) 
}

export default SearchBar;