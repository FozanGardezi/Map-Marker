import React, {useState,useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import AddLatLong from './AddLatLong';
import LocationMarker from './LocationMarker';

const Map = () => {
    const [batchMarkers, setBatchMarkers] = useState([])
    const handleSubmit = (data) => {
      setBatchMarkers([...data])
    }
    console.log(batchMarkers)
    return (
      <div className="App">
        <div id ="map" style={{height:"400px"}}>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{height:"100%"}} >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker markers={batchMarkers} />
          </MapContainer>
          <div>
            <h3>Enter Batch Cordinates</h3>
            <AddLatLong batchMarkers={batchMarkers} handleSubmit={handleSubmit} setBatchMarkers={setBatchMarkers} />
          </div>
        </div>
      </div>
    );
  }
  
export default Map;
  
