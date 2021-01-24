import React from "react";
import { Map, TileLayer } from 'react-leaflet'
import './map.css'
import { showDataOnMap }  from '../../util/util'
const MyMap = ({countries,cases='cases',center, zoom }) => {
  return (
    <div className="map">
      <Map className='leaflet-container' center={center} zoom={zoom}scrollWheelZoom={false} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries,cases)}
      </Map>
    </div>
  );
}

export default MyMap;