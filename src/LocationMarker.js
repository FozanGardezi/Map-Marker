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
 
  // const localUser = JSON.parse(localStorage.getItem('position')) || 
  //   [{
  //     lat: 51.505, 
  //     lng: -0.09,
  //     icon:iconList[0],
  //   }];
  // console.log(localUser)
  // const [position, setPosition] = useState(localUser)

  const [position, setPosition] = useState([{
      lat: 51.505, 
      lng: -0.09,
      icon:iconList[0],
    }]
    // ,() => {
    //   const localData = localStorage.getItem('position');
    //   console.log("localStorage: ", localData)
    //   return localData ? 
    //     JSON.parse(localData) : 
    //     [{
    //       lat: 51.505, 
    //       lng: -0.09,
    //       icon:iconList[0],
    //     }];
    // }
  )
  // const [position, setPosition] = useState([{
  //   lat: 51.505, 
  //   lng: -0.09,
  //   icon:iconList[0],
  // }]);

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem('position'));
    console.log(localData);
    if(localData && localData.length > 0){
      localData = localData.map(location => {        
       let icon = iconList.find(ic =>  ic.options.iconUrl == location.icon.options.iconUrl)
       location.icon = icon;
       return location
      })
      localStorage.setItem("position",JSON.stringify([...localData]))
      console.log(localData);
      setPosition([...localData])
    }
  },[])
  
  useEffect(() => {
    if(markers !== undefined && markers !== null){
      let temp = position;
      markers.map((mark) => {
        temp.push({lat:Number(mark.lat),lng:Number(mark.lng),icon: mark.icon = iconList[mark.icon]})
      })
      setPosition([...temp]);
    }
  },[markers])

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('position')), position);
    if(JSON.parse(localStorage.getItem('position')).length < position.length){
      localStorage.setItem("position",JSON.stringify(position))
    }
    console.log("position:",position)
  },[position])

  const map = useMapEvents({
    click(e) {
      console.log(position)
      setPosition([...position,{lat: e.latlng.lat,lng: e.latlng.lng, icon:iconList[0]}])
    },
  })

  const onMarkerClick = (marker) => {
    const markerIndex = position.findIndex((pos) =>{
      return pos.lat === marker.lat && pos.lng === marker.lng;
    });
    let temp = position;
    let colorIndex = iconList.findIndex((icon) => {
      return icon.options.iconUrl == marker.icon.options.iconUrl;
    })
    if(colorIndex === (iconList.length -1) ){
      temp[markerIndex].icon = iconList[0]
    }else{
      temp[markerIndex].icon = iconList[colorIndex + 1]
    };
    console.log(temp)
    setPosition([...temp]);
  }


  return (
    <>
      {
        console.log(position)
      }
      {
        position && position.map((marker, i) => (  
          <Marker key={`marker-${i}`} position={[marker.lat,marker.lng]} icon={marker.icon}  eventHandlers = {{ click: () => {onMarkerClick(marker)}}}>
            <Popup>
              <span>
                Click to change color
              </span>
            </Popup>
          </Marker>
        ))
      }
    </>
  )
}

export default LocationMarker;