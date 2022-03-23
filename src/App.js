import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { marker, popup } from 'leaflet';

const LocationMarker = () => {
  const [position, setPosition] = useState([
    {
      lat: 51.505, 
      lng: -0.09,
    }
  ])
  const map = useMapEvents({
    
    click(e) {
      console.log(e)
      console.log(position)
      setPosition([...position,e.latlng])

    },
  })

  return (
    <>
      {
        position.map((marker, i) => (  
          <Marker key={`marker-${i}`} position={marker}>
            <Popup>
              <span>
                A pretty CSS3 popup. <br /> Easily customizable.
              </span>
            </Popup>
          </Marker>
        ))
      }
    </>
  )
}

const App = () => {
  let x = 127;
  let z = 8;
  let y = 25;
  const {markers, setMarkers } = useState([[51.505, -0.09]])

  return (
    <div className="App">
      <div id ="map">
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{height:"100%"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* {markers.map((marker) => {
            <Marker>
              <popup>Hello</popup>
            </Marker>
          })} */}

          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
