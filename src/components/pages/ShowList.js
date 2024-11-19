import React, { useState, useEffect } from 'react';
import GearList from '../GearList.js';
import EditModal from '../EditModal.js';
import AddModal from '../AddModal.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../../index.css";


function ShowList() {
  const [gearData, setGearData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentGear, setCurrentGear] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const API_URL = 'https://6729689c6d5fa4901b6d0b4f.mockapi.io/my_data';

  useEffect(() => {
    loadGearData();
  }, []);

  const loadGearData = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setGearData(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleDeleteGear = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            setGearData(gearData.filter(gear => gear.id !== id));
          } else {
            alert('Failed to delete the gear item.');
          }
        })
        .catch(error => console.error('Error deleting gear:', error));
    }
  };

  const handleOpenEditModal = (gear) => {
    setCurrentGear(gear);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentGear(null);
  };

  const handleUpdateGear = (updatedGear) => {
    fetch(`${API_URL}/${updatedGear.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedGear)
    })
      .then(response => response.json())
      .then(data => {
        setGearData(gearData.map(gear => (gear.id === data.id ? data : gear)));
        handleCloseEditModal();
      })
      .catch(error => console.error('Error updating gear:', error));
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddGear = (newGear) => {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGear)
    })
      .then(response => response.json())
      .then(data => {
        setGearData([...gearData, data]);
        handleCloseAddModal();
      })
      .catch(error => console.error('Error adding gear:', error));
  };

  return (
    <div>
      <div className="top-banner top-mar">
        <h1 className="text-center">My Backpacking Gears</h1>
      </div>

      <nav className="navbar navbar-expand-sm bg-black navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link btn" onClick={handleOpenAddModal}>Add</button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-5">
        <GearList
          gearData={gearData}
          onDeleteGear={handleDeleteGear}
          onEditGear={handleOpenEditModal}
        />
      </div>

      {showEditModal && currentGear && (
        <EditModal
          gear={currentGear}
          onClose={handleCloseEditModal}
          onSave={handleUpdateGear}
        />
      )}

      {showAddModal && (
        <AddModal
          onClose={handleCloseAddModal}
          onSave={handleAddGear}
        />
      )}

      <footer className="foot text-white text-center d-flex align-items-center justify-content-center">
        <p>My Backpacking Gears &copy; 2024</p>
      </footer>
    </div>
  );
}

export default ShowList;