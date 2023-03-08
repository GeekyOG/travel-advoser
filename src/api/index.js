import axios from 'axios'
const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'




export const getPlacesData = async (sw, ne, type)=>{
    try {
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {params: {
            bl_latitude: sw.lat,
            bl_longitude: ne.lat,
            tr_longitude: sw.lng,
            tr_latitude: ne.lng,
          },
          headers: {
            'X-RapidAPI-Key': '0e3540c589msh58239efe6875602p10f03ejsnb0b82c7b58f7',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }})
        return data
    } catch (error) {
        console.log(error.message);
    }

}

export const getWeatherData = async (lat, lng) => {
    try {
      if (lat && lng) {
        const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
          params: { lat, lon: lng },
          headers: {
            'x-rapidapi-key': "0e3540c589msh58239efe6875602p10f03ejsnb0b82c7b58f7",
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          },
        });
  
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  