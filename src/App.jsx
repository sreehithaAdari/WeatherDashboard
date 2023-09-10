import { useEffect, useState , useCallback } from 'react';
import hi from './assets/hi.jpg'
import Description from './components/Description';
import { getWeatherData } from './weatherService';


function App() {


  const [weather,setWeather] = useState(null)
  const [units,setUnits] = useState('metric')
  const [city,setCity] = useState('Delhi')
  const [unitText, setUnitText] = useState('\u00B0C');
  

  
  const fetchWeatherData = useCallback(async () => {
    const data = await getWeatherData(city, units);
    setWeather(data);
  }, [units, city]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);



  const handleUnitClick = () => {
    // Toggle units between metric and imperial
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);

    // Toggle unit text between C and F
    const newUnitText = newUnits === 'metric' ? '\u00B0C' : '\u00B0F';
    setUnitText(newUnitText);
  };

const enterCity = (e) => {
  if (e.key === 'Enter') {
    
    setCity(e.currentTarget.value)
    e.target.blur(); 
  }
};
  

  return (
    <div className="app" style={{backgroundImage:`url(${hi})`}}>
      <div className="overlay">
        {
          weather && (
            <div className="container">
          <div className="section section__inputs">
              <input type="text" name='city' placeholder='Enter city' onKeyDown={enterCity}/>

              <button onClick={handleUnitClick}>{unitText}</button>
          </div>
          <div className="section section__temperature">
            <div className="icon">
              <h3>{`${weather.name},${weather.country}`}</h3>
              <img src={weather.iconURL} alt="icon" />
              <h3>{weather.description}</h3>
            </div>
            <div className="temperature">
              <h1>{`${weather.temp.toFixed()}${units === 'metric' ? '\u00B0C' : '\u00B0F'}`}</h1>
            </div>
          </div>
          {/* bottom description */}
          <Description weather={weather} units={units}/>
        </div>

          )
        }
        
      </div>

      
    </div>
  );
}

export default App;
