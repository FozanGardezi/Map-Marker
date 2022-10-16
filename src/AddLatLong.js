import React,{useState}  from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddMarker } from "./Actions";
// import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'


const AddLatLong = ({batchMarkers, handleSubmit, setBatchMarkers}) => {
    const marker = useSelector(marker =>  marker.markers)
    const dispatch = useDispatch();
    const [markers, setMarkers] = useState([{ lat: "", lng: "", icon: "0" }]);
    const handleSelect=(e)=>{
        e.preventDefault();
        handleSubmit(markers)
        // dispatch(AddMarker(markers))
    }
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...markers];
        list[index][name] = value;
        setMarkers(list);
    };
    const handleRemoveClick = index => {
        const list = [...markers];
        list.splice(index, 1);
        setMarkers(list);
    };
    const addMore = () => {
        setMarkers([...markers, {lat: "", lng:"", icon: "0"}])
    }
    return (
        <div>
            <form onSubmit={
                () => {
                    dispatch(AddMarker())
                    
                }}
            >
                {markers.map((mark,i) => {
                    return (
                        <>
                            <input required type="number" placeholder="Enter Latitude" step="any" name="lat" onChange={e => handleInputChange(e, i)}/>
                            <input required type="number" placeholder="Enter Longitude" step="any" name="lng" onChange={e => handleInputChange(e, i)}/>
                            <select required name="icon" id="icon" onChange={e => handleInputChange(e, i)}>
                                <option value="0">Red</option>
                                <option value="1">Blue</option>
                                <option value="2">Green</option>
                                <option value="3">Yellow</option>
                            </select>
                            <div className="btn-box">
                                {markers.length !== 1 && <button
                                    className="mr10"
                                    onClick={() => handleRemoveClick(i)}>Remove</button>}
                                {markers.length - 1 === i && <button onClick={addMore}>Add</button>}
                            </div>
                        </>
                    )
                })}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
    
}

export default AddLatLong;