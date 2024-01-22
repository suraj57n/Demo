import React, { useState, useEffect } from 'react';
import { Marker } from '@react-google-maps/api';

function Simulation({ formationData, selectedFormation }) {
  const [currentFormation, setCurrentFormation] = useState(1);
  const [isSimulationRunning, setSimulationRunning] = useState(false);

  const formationsArray = Object.entries(formationData.formations);

  useEffect(() => {
    if (isSimulationRunning) {
      const timer = setTimeout(() => {
        if (currentFormation < formationsArray.length) {
          setCurrentFormation(currentFormation + 1);
        } else {
          setSimulationRunning(false);
        }
      }, 2000); // Adjust the duration as needed

      return () => clearTimeout(timer);
    }
  }, [currentFormation, isSimulationRunning, formationsArray]);

  const startSimulation = () => {
    setSimulationRunning(true);
  };

  return (
    <div className="simulation-container">
      <div className="map-container">
        {formationsArray
          .filter(([formationNumber]) => formationNumber <= selectedFormation)
          .map(([formationNumber, formationMarkers]) =>
            formationNumber === currentFormation ? (
              formationMarkers.map((marker, idx) => (
                <Marker key={idx} position={marker} />
              ))
            ) : null
          )}
      </div>
      <div className="timeline">
        <button onClick={startSimulation}>Start Simulation</button>
        <div>Formation {currentFormation}</div>
        <div>Time: {currentFormation * 2} seconds</div>
      </div>
    </div>
  );
}

export default Simulation;
