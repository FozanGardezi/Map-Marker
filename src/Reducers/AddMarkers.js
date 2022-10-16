const markerReducer = (state = [{
    lat: 51.505, 
    lng: -0.09,
    icon: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  }], action) => {
    switch(action.type){
        case 'add':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default markerReducer;

