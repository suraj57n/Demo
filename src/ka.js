import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Polygon, Marker, OverlayView } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import './App.css'

function SK() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/s4');
    };
    const containerStyle = {
        width: '80%',
        height: '500px'
    };

    const center = {
        lat: 17.397053,
        lng: 78.490183
    };

    const [polygonPoints, setPolygonPoints] = useState([]);
    const [formationData, setFormationData] = useState({});
    const [selectedFormation, setSelectedFormation] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [formationsData, setFormationsData] = useState({});
    const [markerPositions, setMarkerPositions] = useState([]);
      const [nformation,setnformation]=useState(0);
      const [i,seti]=useState(0);
      const [dronecount,setdronecount]=useState(0);
      const [formationAltitudes, setFormationAltitudes] = useState({});
const [selectedFormationAltitude, setSelectedFormationAltitude] = useState(0);
     
      const onMarkerDragEnd = (index, event) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
    
        setMarkerPositions(prevPositions => {
            const updatedPositions = [...prevPositions];
            updatedPositions[index] = { lat: newLat, lng: newLng,altitude: updatedPositions[index].altitude, };
            return updatedPositions;
        });
    
        setFormationsData(prevFormationsData => {
            const newFormationsData = { ...prevFormationsData };
            newFormationsData[selectedFormation] = markerPositions;
            return newFormationsData;
        });
    };
    

    
    

    const handleFormationClick = (formationNumber) => {
        setSelectedFormation(formationNumber);
        const formationMarkers = formationData[formationNumber] || [];
        console.log("Formation Markers:", formationMarkers); // Check if this logs the correct markers
        setMarkers(formationMarkers);
        setSelectedFormationAltitude(formationAltitudes[formationNumber] || 0);
    };

    const isCollision = (newMarker) => {
        const minDistance = 0.0000000001; // This is an arbitrary value, adjust as needed

        for (const marker of markers) {
            const distance = Math.sqrt(
                Math.pow(newMarker.lat - marker.lat, 2) +
                Math.pow(newMarker.lng - marker.lng, 2)
            );

            if (distance < minDistance) {
                return true;
            }
        }

        return false;
    };

    const handleMapClick = (event) => {
        if (selectedFormation === null) {
            alert('All formations are completed.');
            return;
        }

        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            altitude: selectedFormationAltitude || 0,
        };

        // Check if the new marker collides with existing markers
        if (isCollision(newMarker)) {
            alert('Markers are too close to each other.');
            return;
        }

        if (selectedFormation) {
            const updatedFormationData = { ...formationData };
            updatedFormationData[selectedFormation] = [
                ...(updatedFormationData[selectedFormation] || []),
                newMarker,
            ];
            
            setFormationData(updatedFormationData);
            setMarkers(updatedFormationData[selectedFormation] || []);

            if (updatedFormationData[selectedFormation].length >= dronecount) {
                const nextFormation = selectedFormation + 1;
                if (nextFormation <= nformation+1) {
                    setSelectedFormation(nextFormation);
                } else {
                    //saveToJSON(updatedFormationData);
                    setSelectedFormation(null);
                }
            }
        }
    };

    const saveToJSON = (newData) => {
        const updatedFormations = { formations: { ...newData } };

        // Perform the saving logic here
        console.log("Saving Formations Data:", updatedFormations);

        // You can save this data to your server or use any other method.
        fetch('http://localhost:5001/save-markers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFormations),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Data saved successfully");
            }
        });
    };

    useEffect(() => {
        // Fetch data from Drone.json
        fetch('Drone.json')
            .then(response => response.json())
            .then(data => {
                setPolygonPoints(data.Geofence);
                setnformation(data.formationCount, () => {
                    console.log("lal", nformation, dronecount);
                });
                setdronecount(data.drones);
                console.log("lal",nformation,dronecount);
                
            })
            .catch(error => {
                console.error("Error fetching geofence points:", error);
            });
            console.log("lal",nformation,dronecount);
                
    }, []);

    return (
        <div className="total">
            <div className="map122">
                <LoadScript googleMapsApiKey="">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={19}
                        onClick={handleMapClick}
                        mapTypeId='satellite'
                    >
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
                                    zIndex: 1000
                                }}
                            />
                        )}
                        {markers.map((position, idx) => (
                            <>
                            <div key={idx}>
                                <Marker
                                    
                                    onDragEnd={(event) => onMarkerDragEnd(idx, event)}
                                    position={position}
                                    draggable={true}
                                    //onDragEnd={(event) => onMarkerDragEnd(idx, event)}
                                    zIndex={1000}
                                />
                                <OverlayView
                                    position={position}
                                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                >
                                    <div className="marker-number">
                                        {idx + 1}
                                    </div>
                                </OverlayView>
                                </div>
                            </>
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div>
            <div className="contains">
                
                    {Array.from({ length: nformation }).map((_, index) => (
                        <div className="formationButtons">
                        <button
                            key={index}
                            style={selectedFormation === (index + 1) ? { backgroundColor: 'green', color: 'white' } : {}}
                            onClick={() => handleFormationClick(index + 1)}
                        >
                            Formation {index + 1}
                        </button>
                        <label>
                Altitude:
                <input
                    type="number"
                    value={selectedFormationAltitude}
                    onChange={(e) => setSelectedFormationAltitude(e.target.value)}
                />
            </label>
        </div>
                        ))}
                    <button onClick={() => saveToJSON(formationData)}>Save All Formations</button>

                    <div>
                    <button onClick={handleButtonClick}>next</button>
                </div>
                </div>
                
            </div>
            
        
    );
}

export default SK;
