import React, {useState, useEffect, useRef, useMemo} from 'react';
import './App.css';
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import * as L from "leaflet";

const LocationMarker = ({markers}) => {
  const LeafIcon = L.Icon.extend({
    options: {}
  });
  const iconList = [
    new LeafIcon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
    }),
    new LeafIcon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
      shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
    }),
    new LeafIcon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
      shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
    }),
    new LeafIcon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
      shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
    })
  ]
  // const [draggable, setDraggable] = useState(true)

  // marker reference
  const markerRef = useRef(null);

  // evenHandler to update lat long of marker draged
  const   eventHandlers = useMemo((markerColor) => ({
    dragend() {
      const marker = markerRef.current
      if(marker != null){
        let latLng = marker._latlng;
        let colorIndex = iconList.findIndex((icon) => {
          return icon.options.iconUrl === markerColor;
        })
        setPosition([...position,{lat:latLng.lat, lng:latLng.lat, icon: iconList[colorIndex] }])
      }
    }
  }),[])

  const [position, setPosition] = useState([{
      lat: 51.505, 
      lng: -0.09,
      icon:iconList[0],
    }]
  )

  // save local storage data in   local storage
  // useEffect(() => {
  //   let localData = markers
  //   if(localData && localData.length > 0){
  //     localData = localData.map(location => {        
  //      let icon = iconList.find(ic =>  ic.options.iconUrl == location.icon.options.iconUrl)
  //      location.icon = icon;
  //      return location
  //     })
  //     localStorage.setItem("position",JSON.stringify([...localData]))
  //     setPosition([...localData])
  //   }
  // },[])
  
  //when we get batch markers from the parent component
  useEffect(() => {
    if(markers && markers.length > 0){
      let temp = position;
      markers.map((mark) => {
        temp.push({lat:Number(mark.lat),lng:Number(mark.lng),icon: mark.icon = iconList[mark.icon]})
      })
      setPosition([...temp]);
    }
  },[markers])

  //
  useEffect(() => {
    if(JSON.parse(localStorage.getItem('position')).length < position.length){
      localStorage.setItem("position",JSON.stringify(position))
    }
  },[position])

  // map events to add marker on map
  const map = useMapEvents({
    click(e) {
      e.latlng.wrap();
      setPosition([...position,{lat: e.latlng.lat,lng: e.latlng.lng, icon:iconList[0]}])
    }
  })

  // update marker color on click
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
    setPosition([...temp]);
  }
  // eventHandlers={{ click: () => {eventHandlers(marker.icon.options.iconUrl)}}}

  return (
    <>
      {
        position && position.map((marker, i) => (  
          <Marker key={`marker-${i}`} eventHandlers = {{ click: () => {onMarkerClick(marker)}}} ref={markerRef} position={[marker.lat,marker.lng]} icon={marker.icon}  >
            <Popup>
              <span onClick={() =>  onMarkerClick(marker)}>
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