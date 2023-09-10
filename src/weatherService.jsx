const API_KEY = 'b7891b3dbd9cb21c5b230af2375f3e6d';

const makeIconUrl= (iconID) => `https://openweathermap.org/img/wn/${iconID}@2x.png`



const getWeatherData = async (city,units = 'metric') =>{
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`

    const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

    const {weather,  main:{temp, feels_like, temp_min, temp_max, pressure, humidity},
    wind:{speed},
    sys:{country},
    name,

} = data;

const {description,icon} = weather[0]

return {
    description,
    iconURL:makeIconUrl(icon),
    temp,
    feels_like,
    temp_max,
    temp_min,
    pressure,
    humidity,
    speed,
    country,
    name
}
}

export {getWeatherData}