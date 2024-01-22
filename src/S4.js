import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Polygon, Marker } from "@react-google-maps/api";
import Simulation from "./Simulation";
import Timeline from "./Timeline"; // Import the Timeline component
import axios from 'axios';

const containerStyle = {
  width: "80%",
  height: "500px",
};

const center = {
  lat: 17.397053,
  lng: 78.490183,
};

function S4() {
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [formationData, setFormationData] = useState(null);
  const [selectedFormation, setSelectedFormation] = useState(1);
  const [showSimulation, setShowSimulation] = useState(false);
  const [fcount,setfcount]=useState(0);
  const [simulationMarkers, setSimulationMarkers] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  const [droneC,setdroneC]=useState(0);

  const [currentFormation, setCurrentFormation] = useState(1);
  
  const [markers, setMarkers] = useState([]);
  const [animationInterval, setAnimationInterval] = useState(null);
  const [animationSpeed] = useState(500); 
  const [letters, setLetters] = useState([]);
  const [completedFormations, setCompletedFormations] = useState([0]);
  const [inputString,setinputString]=useState();


  useEffect(() => {
    // Fetch formation data from "Drone1.json"
    fetch("/Drone1.json")
      .then((response) => response.json())
      .then((data) => {
        setFormationData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching formation data:", error);
      });

    // Fetch polygon points from "Drone.js"
    fetch("/Drone.json")
      .then((response) => response.json())
      .then((data) => {
        setdroneC(data.drones);

        setPolygonPoints(data.Geofence);
        setfcount(data.formationCount);
        setLetters(data.letters);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching polygon points:", error);
      });
  }, []);
  console.log("lalal",polygonPoints);
  console.log("formationData:", formationData);

  const startAnimation = () => {
    if (formationData && formationData.formations) {
      // Start animation to move between formations
      const formationCount = Object.keys(formationData.formations).length;

      setAnimationInterval(
        setInterval(() => {
          setCurrentFormation((prevFormation) => {
            if (prevFormation < formationCount) {
              setCompletedFormations((completedFormations) => [
                ...completedFormations,
                prevFormation,
              ]);
              return prevFormation + 1;
            } else {
              clearInterval(animationInterval);
              return prevFormation;
            }
          });
        }, animationSpeed)
      );
    }
  };

  const save1211 = () => {
    console.log("clicked saved");
    const url = "http://localhost:5000/receive_data";
  
    const dataToSend = {
      geofence: polygonPoints,
      foemationCount:fcount,
      droneCount:droneC,
      droneMarkers: formationData,
      MSG:letters,
      inputString:inputString
    };
  
    axios.post(url, dataToSend)
       .then(response => {
           console.log("Response:", response.data);
       })
       .catch(error => {
           console.error("There was an error sending the data:", error);
       });
  }
  const launch=()=>{
    console.log("clickde launch");
    const url="http://localhost:5000/launch"
    const dataToSend={
      message:"yes"
    }

    axios.post(url, dataToSend)
    .then(response => {
        console.log("Response:", response.data);
    })
    .catch(error => {
        console.error("There was an error sending the data:", error);
    });

  }

  
  
  return (
    <div>
      <div className="total">
        <div className="map122">
          <LoadScript googleMapsApiKey="">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={19}
              mapTypeId="satellite"
            >
              {polygonPoints.length >= 4 && (
                <Polygon
                  paths={polygonPoints}
                  options={{
                    fillColor: "lightgrey",
                    fillOpacity: 0.4,
                    strokeColor: "grey",
                    strokeWeight: 2,
                    clickable: false,
                    draggable: false,
                    editable: false,
                    geodesic: false,
                    zIndex: 1,
                  }}
                />
              )}
              {formationData &&
                formationData.formations[currentFormation] &&
                formationData.formations[currentFormation].map((marker, idx) => (
                  <Marker key={idx} position={marker} label={letters[idx]}/>
                ))}
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="contains">
      
          <br />
          
          <div>
          <button onClick={startAnimation}>Start Animation</button>
          </div>
          <div className="formation-boxes">
            {Array.from({ length: fcount }, (_, index) => (
              <div
                key={index}
                className={`formation-box ${
                  completedFormations.includes(index) ? "completed" : ""
                }`}
              >
                {index + 1+'🚁'}
              </div>
            ))}
           
          </div>
          <div>
              <label>
                Enter Drone String name:
              </label>
              <input type="text" placeholder="enter with , delimiter" 
              value={inputString}
              onChange={(e) => setinputString(e.target.value)}
              ></input>
            </div>
          <div>
            <button onClick={save1211}>Save Mission data</button>
          </div>
          <div>
            <button onClick={launch}>Launch mission</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default S4;
