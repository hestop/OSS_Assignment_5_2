import React from 'react';
import GearCard from './GearCard.js';
import "../index.css";

function GearList({ gearData, onDeleteGear, onEditGear }) {
  return (
    <div className="row" id="gearContainer">
      {gearData.map(gear => (
        <GearCard
          key={gear.id}
          gear={gear}
          onDeleteGear={onDeleteGear}
          onEditGear={onEditGear}
        />
      ))}
    </div>
  );
}

export default GearList;