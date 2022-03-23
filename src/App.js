import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const App = () => {
  let z = 8;
  let x = 127;
  let y = 25;
  return (
    <div className="App">
      <div id ="map">
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{height:"100%"}}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
          </MapContainer>
      </div>
    </div>
  );
}

export default App;
