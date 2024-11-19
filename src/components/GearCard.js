import React from 'react';
import "../index.css";

function GearCard({ gear, onDeleteGear, onEditGear }) {
  const handleDelete = () => {
    onDeleteGear(gear.id);
  };

  const handleEdit = () => {
    onEditGear(gear);
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-header bg-darkgray text-black fw-bold">
          {gear.name}
        </div>
        <img
          src={gear.image}
          className="card-img-top"
          alt={gear.name}
          style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
        />
        <div className="card-body">
          <ul className="list-unstyled">
            <li>Category: {gear.category}</li>
            <li>Weight: {gear.weight}g</li>
            <li>Material: {gear.material}</li>
            <li>Price: ${gear.price}</li>
            <li>Feature: {gear.feature}</li>
          </ul>
          <button
            onClick={handleDelete}
            className="btn btn-delete btn-custom rounded me-2"
          >
            Delete
          </button>
          <button
            onClick={handleEdit}
            className="btn btn-edit btn-custom rounded"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default GearCard;