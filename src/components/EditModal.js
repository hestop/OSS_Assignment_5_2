import React, { useState, useEffect, useCallback } from 'react';

function EditModal({ gear, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: gear.name || '',
    category: gear.category || '',
    weight: gear.weight || '',
    material: gear.material || '',
    price: gear.price || '',
    feature: gear.feature || ''
  });

  const [validationState, setValidationState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target.required) {
      if (value.trim()) {
        setValidationState((prevState) => ({
          ...prevState,
          [name]: 'valid'
        }));
      } else {
        setValidationState((prevState) => ({
          ...prevState,
          [name]: 'invalid'
        }));
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = useCallback(() => {
    let isValid = true;
    const newValidationState = {};

    Object.keys(formData).forEach((key) => {
      if (key !== 'feature' && (!formData[key] || !formData[key].toString().trim())) {
        newValidationState[key] = 'invalid';
        isValid = false;
      } else {
        newValidationState[key] = 'valid';
      }
    });

    setValidationState(newValidationState);
    return isValid;
  }, [formData]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const updatedGear = {
      ...gear,
      name: formData.name.trim(),
      category: formData.category.trim(),
      weight: parseInt(formData.weight),
      material: formData.material.trim(),
      price: parseFloat(formData.price),
      feature: formData.feature.trim()
    };

    onSave(updatedGear);
  };

  return (
    <div className="modal-overlay" style={{ display: 'block' }}>
      <div className="edit-modal" style={{ display: 'block' }}>
        <h2 className="text-center mb-4">Edit Gear Information</h2>
        <form onSubmit={handleSubmit} id="editForm" noValidate>
          <div className="mb-3">
            <label className="form-label">Item Name</label>
            <input
              type="text"
              className={`form-control ${
                validationState.name === 'valid' ? 'is-valid' :
                validationState.name === 'invalid' ? 'is-invalid' : ''
              }`}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className={`form-control ${
                validationState.category === 'valid' ? 'is-valid' :
                validationState.category === 'invalid' ? 'is-invalid' : ''
              }`}
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Weight (g)</label>
            <input
              type="number"
              className={`form-control ${
                validationState.weight === 'valid' ? 'is-valid' :
                validationState.weight === 'invalid' ? 'is-invalid' : ''
              }`}
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Material</label>
            <input
              type="text"
              className={`form-control ${
                validationState.material === 'valid' ? 'is-valid' :
                validationState.material === 'invalid' ? 'is-invalid' : ''
              }`}
              name="material"
              value={formData.material}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              className={`form-control ${
                validationState.price === 'valid' ? 'is-valid' :
                validationState.price === 'invalid' ? 'is-invalid' : ''
              }`}
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Feature</label>
            <input
              type="text"
              className="form-control"
              name="feature"
              value={formData.feature}
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary modal-btn">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary modal-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;