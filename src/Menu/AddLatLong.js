import React,{useState}  from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { AddLatLongContainer, AddLatLongForm, Input, Select } from "./AddLatLongStyled";

const AddLatLong = ({batchMarkers, handleSubmit, setBatchMarkers}) => {
    const [markers, setMarkers] = useState([{ lat: "", lng: "", icon: "0" }]);
    const handleSelect=(e)=>{
        e.preventDefault();
        handleSubmit(markers)
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
            <form onSubmit={handleSelect}>
                {markers.map((mark,i) => {
                    return (
                        <div>
                            <input required type="number" placeholder="Enter Latitude" step="any" name="lat" onChange={e => handleInputChange(e, i)}/>
                            <input required type="number" placeholder="Enter Longitude" step="any" name="lng" onChange={e => handleInputChange(e, i)}/>
                            <select required name="icon" id="icon" onChange={e => handleInputChange(e, i)}>
                                <option value="0">Red</option>
                                <option value="1">Blue</option>
                                <option value="2">Green</option>
                                <option value="3">Yellow</option>
                            </select>&nbsp;&nbsp;
                            <input type="file"></input>
                            {markers.length !== 1 && <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveClick(i)} color="red"/>}&nbsp;&nbsp;
                                {/* className="mr10 fa fa-time danger"
                                onClick={() => handleRemoveClick(i)}>Remove</i>} */}
                            {markers.length - 1 === i && <FontAwesomeIcon icon={faPlus} onClick={addMore} color="green" />}
                            {/* className="fa fa-plus success" onClick={addMore}>Add</i>} */}
                            <div className="btn-box">
                            </div>
                        </div>
                    )
                })}
                <input type="submit" value="Add" />
            </form>
        </div>
    );
    
}

export default AddLatLong;