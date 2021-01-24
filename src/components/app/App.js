import React, { useEffect, useState } from 'react';
import './App.css';
import { FormControl, Select, MenuItem,Card,CardContent } from '@material-ui/core';
import InfoBox from '../infoBox/infoBox'
import Map from '../map/map'
import Tabel from "../table/table";
import { sortData } from "../../util/util";
import LineGraph from '../lineGraph/lineGraph'
// import { set } from 'numeral';

//https://disease.sh/v3/covid-19/countries

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo,setCountryInfo] = useState({})
  const [mapCenter,setMapCenter] = useState({ lat: 33.738045, lng: 73.084488 })
  const [mapZoom,setMapZoom] = useState(4)
  const [mapCountries,setMapCountries] = useState([])
  const [casesType,setCasesType] = useState('cases')

  useEffect(()=>{
    console.log('useEffect-1')
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    })
  },[])

  useEffect(() => {
    console.log('useEffect-2')
    //The code inside here will run once
    //when the component loads and not again
    // run async code, and wait for the regeust
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())// get the response
        .then(data => {
          const countriesList = data.map(country => (
            {
              // id:country.countryInfo._id, not unique
              name: country.country,//united state, pakistan
              value: country.countryInfo.iso2,//uk, pk
              cases:country.cases
            }
          ))
          
          setMapCountries(data)
          //console.log(countriesList)
          const sortedData = sortData(countriesList)
          //setCountries(countriesList)
          setCountries(sortedData)
        })
    }
    getCountriesData()

  }, [])

  // const onMenuItemClickHandler = (code) => {
  //   setCountry(code)
  // }
  //https://disease.sh/v3/covid-19/all>>> gives us the worldwide 
  //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
  const onCountryChangeHandler = async (event) => { 
    //console.log("onChange Triggered")
    const selectCountryCode = event.target.value
    //console.log("SELECTED COUNTRY :"+selectCountryCode)
    setCountry(selectCountryCode)
    //console.log("COUNTRY CODE AFTER SETING THE VALUE : "+country)

    const url = selectCountryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${selectCountryCode}`;
    console.log('URL : '+url)
     await fetch(url)// await is not neccessary here but just to be on the safe side -__-
     .then(response => response.json())
     .then(data => {
       console.log(data)
        setCountryInfo(data)
        setMapCenter({lat:data.countryInfo.lat,lng:data.countryInfo.long})
        setMapZoom(5)
     });
    };

  return (
    <div className="container">
      <h4 className="name">@Khattak01-React VERSION:{React.version}</h4>
    <div className="app">
      {/* <h4 className="app__version mr-tb">React version : {React.version}</h4>
      <hr /> */}
      <div className="app__left">
        <div className="app__header">
          <h1 className="mr-tb app__title">COVID19 Tracker</h1>
          <FormControl className="app__dropdown mr-tb">
            <Select className="app__select-btn" variant="outlined" onChange={onCountryChangeHandler} value={country}>
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {/* {countries.map((country, i) => <MenuItem key={i} onClick={()=> onMenuItemClickHandler(country.value)} value={country.value}>{country.name}</MenuItem>)} */}
              { 
                countries.map((country, i) => <MenuItem 
                key={i} 
                value={country.value}>
                {country.name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </div>
        <hr /> 
        <div className="app__stats">
          <InfoBox title="Corona Virus"
          isRed
          active={casesType==='cases'}
          onClick={(e)=> setCasesType('cases')} 
          cases={countryInfo.todayCases} 
          total={countryInfo.cases} 
          />
          <InfoBox title="Recovered cases"
          active={casesType==='recovered'}
          onClick={(e)=> setCasesType('recovered')}  
          cases={countryInfo.todayRecovered} 
          total={countryInfo.recovered} 
          />
          <InfoBox title="Deaths"
          isRed
          active={casesType==='deaths'}
          onClick={(e)=> setCasesType('deaths')} 
          cases={countryInfo.todayDeaths} 
          total={countryInfo.deaths} 
          />
        </div>
        <hr />
        <Map
        countries={mapCountries} 
        zoom={mapZoom} 
        center={mapCenter}
        cases={casesType}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by Country</h3>
        <Tabel countries={countries}/>
          <h3 className="mr-tb">WorldWide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
    </div>
  );
}

export default App;
