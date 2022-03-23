import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import * as L from "leaflet";

const LocationMarker = () => {
  const LeafIcon = L.Icon.extend({
    options: {}
  });
  const iconList = [
    new LeafIcon({iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"}),
    new LeafIcon({iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png"}),
    new LeafIcon({iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"}),
    new LeafIcon({iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png"})
  ]
  const [position, setPosition] = useState([
    {
      lat: 51.505, 
      lng: -0.09,
      icon:iconList[0],
    }
  ])
  const map = useMapEvents({
    click(e) {
      console.log(e)
      console.log(position)
      setPosition([...position,{lat: e.latlng.lat,lng: e.latlng.lng, icon:iconList[0]}])
    },
  })

  const onMarkerClick = (marker) => {
    console.log("heejjasc")
    const markerIndex = position.findIndex((pos) =>{
      return pos.lat == marker.lat && pos.lng == marker.lng;
    });
    let temp = position;
    let colorIndex = iconList.findIndex((icon) => {
      return icon.options.iconUrl ==marker.icon.options.iconUrl;
    })
    if(colorIndex === (iconList.length -1) ){
      temp[markerIndex].icon = iconList[0]
    }else{
      temp[markerIndex].icon = iconList[colorIndex + 1]
    };
    setPosition([...temp]);
  }
  return (
    <>
      {
        position.map((marker, i) => (  
          <Marker key={`marker-${i}`} position={[marker.lat,marker.lng]} icon={marker.icon}  eventHandlers = {{ click: () => {onMarkerClick(marker)}}}>
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
  return (
    <div className="App">
      <div id ="map" style={{height:"400px"}}>
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{height:"100%"}} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
