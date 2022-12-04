import React, {useState,useEffect} from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import AddLatLong from './Menu/AddLatLong';
import LocationMarker from './LocationMarker';
import MenuTabs from './Menu/Tabs';

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
    console.log(data)
    // setBatchMarkers([...data])
  }
  // const [item, setItem] = useLocalStorage("position");
  const [batchMarkers, setBatchMarkers] = useState()
    // useEffect(() => {
    //   setBatchMarkers(...JSON.parse(item))
    // },[])
    return (
      <div style={{display:"flex", flexDirection:"row"}} className='App'>
        <div style={{textAlign:"center", width:"20%"}}>
          <MenuTabs handleSubmit={handleSubmit} />
          {/* <h3>Enter Batch Cordinates</h3>
          <AddLatLong batchMarkers={batchMarkers} handleSubmit={handleSubmit} setBatchMarkers={setBatchMarkers} /> */}
        </div>
        <div id ="map" style={{height:"1200px", width:"80%"}} >
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{height:"100%"}} >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker markers={batchMarkers} />
          </MapContainer>
        </div>
      </div>
    );
  }
  
export default Map;
  
