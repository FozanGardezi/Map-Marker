import React, {useState,useEffect} from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import AddLatLong from './AddLatLong';
import LocationMarker from './LocationMarker';

function useLocalStorage(key) {
  const [state, setState] = useState(localStorage.getItem(key));
  function setStorage(item) {
    localStorage.setItem(key, item);
    setState(item);
  }
  return [state, setStorage];
}

const Map = () => {
  const handleSubmit = (data) => {
    setBatchMarkers([...data])
  }
  // const [item, setItem] = useLocalStorage("position");
  const [batchMarkers, setBatchMarkers] = useState()
    // useEffect(() => {
    //   setBatchMarkers(...JSON.parse(item))
    // },[])
    return (
      <div className="App">
        <div id ="map" style={{height:"600px"}}>
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
  
