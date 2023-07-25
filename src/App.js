import React, {useState} from 'react';
import './App.css'
import axios from 'axios';

export default function App(){
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=0cd31a773aaa38153c94ff52fbeb0bed`
  
  const searchLocation = (event) =>{
    if(event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
    }
  }

  return(
    <div className='app'>
      <div className='container'>
         <div className='search'>
          <input 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type='text'
          />
         </div>

        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        
        {data.name != undefined && 
          <div className='bottom'>
            <div className='feels'>
              {data.main ? <h2>{data.main.feels_like.toFixed()}°C</h2> : null}
              <p>Feels like</p>
            </div>
            <div className='humidity'>
              {data.main ? <h2>{data.main.humidity}%</h2> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <h2>{data.wind.speed} MPH</h2> : null}
            <p>Wind Speed</p>
            </div>
            </div>
        }

      </div>
    </div>
  );
}


