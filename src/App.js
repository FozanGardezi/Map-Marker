import React, {useState,useEffect} from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import * as L from "leaflet";
import AddLatLong from './AddLatLong';

const LocationMarker = ({markers}) => {
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
  useEffect(() => {
    setPosition([...JSON.parse(localStorage.getItem("position"))])
    if(markers !== undefined && markers !== null){
      let temp = position;
      markers.map((mark) => {
        temp.push({lat:Number(mark.lat),lng:Number(mark.lng),icon: mark.icon = iconList[mark.icon]})
      })
      setPosition([...temp]);
    }
  },[markers])

  useEffect(() => {
    localStorage.setItem("position",JSON.stringify(position))
  },[position])

  const map = useMapEvents({
    click(e) {
      console.log(e)
      console.log(position)
      setPosition([...position,{lat: e.latlng.lat,lng: e.latlng.lng, icon:iconList[0]}])
    },
  })
  const onMarkerClick = (marker) => {
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

export default App;
