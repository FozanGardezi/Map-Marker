import React,{useState}  from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'


const AddLatLong = ({batchMarkers, handleSubmit}) => {
    const [value,setValue]=useState('');
    const handleSelect=(e)=>{
        e.preventDefault();
        let tempMarkers = [{lat: e.target.lat.value,lng: e.target.lng.value,icon: e.target.color.value}]
        handleSubmit([...tempMarkers])
        console.log(e.target.lat.value,e.target.lng.value,e.target.color.value);
    }
    return (
        <div>
            <form onSubmit={handleSelect}>
                <input type="text" name="lat"/>
                <input type="text" name="lng"/>
                <select name="cars" id="cars" name="color">
                    <option value="0">Red</option>
                    <option value="1">Blue</option>
                    <option value="2">Green</option>
                    <option value="3">Yellow</option>
                </select>
                {/* <DropdownButton
                    alignRight
                    title="Dropdown right"
                    id="dropdown-menu-align-right"
                    onSelect={handleSelect}>
                    <Dropdown.Item eventKey="0">red</Dropdown.Item>
                    <Dropdown.Item eventKey="1">blue</Dropdown.Item>
                    <Dropdown.Item eventKey="2">green</Dropdown.Item>
                    <Dropdown.Item eventKey="3">yellow</Dropdown.Item>
                </DropdownButton> */}
                <input type="submit" value="Submit" />
            </form>
            {/* <button type="button" onClick={{}}>Add Another Marker</button> */}
        </div>
    );
    
}

export default AddLatLong;