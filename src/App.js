import React, {useEffect, useState} from 'react'
import {CssBaseline, Grid} from '@material-ui/core'
import Header from './components/header/Header';
import List from './components/list/List';
import Map from './components/map/Map';
import { getPlacesData, getWeatherData } from './api';




function App() {
  const [places, setPlaces] = useState([])
  const [cordinates, setCordinates] =useState(null)
  const [bounds, setBounds] = useState({ne:0, sw:0})
  const [isLoading, setIsLoading] = useState(false)
  const [childClicked, setChildClicked] = useState(null)
  const [type, setType] =useState('restaurants');
  const [rating, setRating] =useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
          setCordinates({lat: latitude, lng: longitude})
    })
  }, [])
  
  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);


  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true)
      getWeatherData(cordinates.lat, cordinates.lng)
        .then((data) => setWeatherData(data));

      getPlacesData(bounds.sw, bounds.ne, type)
      .then((data)=>{
        setIsLoading(false)
        setFilteredPlaces([])
        setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0))
      })
    }
    
    

  }, [bounds, type])




  
  return (
    <>
      <CssBaseline>
      <Header setCordinates={setCordinates}/>
      <Grid container spacing={3} style={{width: "100%"}}>
        <Grid item xs={12} md={4}>
          <List 
           places={filteredPlaces.length ? filteredPlaces : places}
           childClicked={childClicked}
           isLoading={isLoading}
           type = {type}
           setType ={setType}
           rating = {rating}
           setRating= {setRating}
          />

        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
           setCordinates={setCordinates}
           setBounds={setBounds}
           cordinates={cordinates}
           places={filteredPlaces.length ? filteredPlaces : places}
           setChildClicked={setChildClicked}
           weatherData={weatherData}
          />
        </Grid>
      </Grid>
    
      </CssBaseline>
      
    </>
  );
}

export default App;
