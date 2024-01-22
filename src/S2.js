import {React ,useState}from "react";
import { GoogleMap, LoadScript, OverlayView, Polygon ,Marker} from '@react-google-maps/api';
import './App.css';
import backim11 from './backim2.jpeg'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import new12 from './new12.png'

const containerStyle = {
    width: '80%',
    height: '500px'
  };
  
  const center = {
    lat: 17.397053,
    lng: 78.490183
  };
  

function S2(){
    const [droneCount, setDroneCount] = useState(0);
    const [displayedDrones, setDisplayedDrones] = useState(0); 
    const [formationCount, setFormationCount] = useState(0);
    const [droneLetters, setDroneLetters] = useState("");
    const [polygonPoints, setPolygonPoints] = useState([]);

    const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/k');
  };

  //Geofence
  
  const handleMapClick = event => {
    
      console.log("Map clicked!"); 
   // This should log on every map click

    const newPoint = { lat: event.latLng.lat(), lng: event.latLng.lng() };

    if (polygonPoints.length < 4) {
        setPolygonPoints(points => [...points, newPoint]);
        //return;
    }


};



    function handleDisplayAndSave() {
        setDisplayedDrones(droneCount);
        const jsonData = { 
            drones: droneCount,
            formationCount: formationCount ,
            letters: droneLetters,
            Geofence:polygonPoints
        };
    
        fetch('http://localhost:5001/save-drones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Data saved successfully");
            }
        });
    }
    
    

    return(
      
        <div className="total" >
            <div className="map122">

            <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={19}
        onClick={handleMapClick}
        mapTypeId='satellite'
        
      >
         {polygonPoints.length > 0 &&
              polygonPoints.map((point, index) => (
                <Marker key={index} position={point} />
              ))}
         {polygonPoints.length >= 4 && (
    <Polygon
        paths={polygonPoints}
        options={{
            fillColor: 'lightgrey',
            fillOpacity: 0.4, 
            strokeColor: 'grey',
            strokeWeight: 2,
            clickable: false,
            draggable: false,
            editable: false,
            geodesic: false,
            zIndex: 1
        }}
    />
)}
      </GoogleMap>
     

<br></br>

        </LoadScript>
                </div>
                <div className="contains"   style={{ backgroundImage: `url(${new12})` }}>
                <input 
        type="number" 
        placeholder="Enter number drones" 
        onChange={(e) => setDroneCount(parseInt(e.target.value, 10))} 
    />
                <input 
    type="number" 
    placeholder="Enter number formation" 
    onChange={(e) => setFormationCount(parseInt(e.target.value, 10))} 
/>
<input 
    type="text" 
    placeholder="Enter drone letters" 
    value={droneLetters}
    onChange={(e) => {
        if (e.target.value.length <= droneCount) {
            setDroneLetters(e.target.value);
        }
        else{
            alert("Enter only",droneCount);
        }
    }} 
/>


            
            <button onClick={handleDisplayAndSave}>Display and Save</button>
            <div>
            
                <div>
                    {/* Display drones */}
                    {Array.from({ length: displayedDrones }).map((_, index) => (
                        <span key={index}>🚁</span>
                    ))}
                </div>
            
            </div>
            <br></br>
            <div>
      {/* Other content of S2 */}
      <button onClick={handleButtonClick}>Next</button>
    </div>
            
            </div>
            
            
        </div>
        
      

    )
}


export default S2;