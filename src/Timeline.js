import React from "react";

function Timeline({ formationData, selectedFormation, onSelectFormation }) {
  if (!formationData || !formationData.formations) {
    return null; // Return null or another message if formationData is not available
  }

  const formationsArray = Object.entries(formationData.formations);

  return (
    <div className="timeline">
      {formationsArray.map(([formationNumber, formationMarkers]) => (
        <div
          key={formationNumber}
          className={`formation ${formationNumber < selectedFormation ? "complete" : ""}`}
        >
          Formation {formationNumber}
          {formationNumber < selectedFormation && <span>&#10003;</span>}
          <button onClick={() => onSelectFormation(Number(formationNumber))}>
            Select
          </button>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
