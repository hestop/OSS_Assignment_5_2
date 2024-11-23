import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import EditModal from '../EditModal.js';
import AddModal from '../AddModal.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../../index.css";

function ShowList({ showAddModal = false, showEditModal = false }) {
  const [gearData, setGearData] = useState([]);
  const [editGear, setEditGear] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    loadGearData();
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith('/update')) {
      if (id && gearData.length > 0) {
        const gearItem = gearData.find((gear) => gear.id === id);
        if (gearItem) {
          setEditGear(gearItem);
        } else {
          // 아이템을 찾지 못한 경우
          alert('해당 아이템을 찾을 수 없습니다.');
          navigate('/index');
        }
      }
    } else {
      setEditGear(null);
    }
  }, [id, location.pathname, gearData, navigate]);

  const loadGearData = () => {
    axios
      .get('https://6729689c6d5fa4901b6d0b4f.mockapi.io/my_data')
      .then((response) => {
        setGearData(response.data);
      })
      .catch((error) => {
        console.error('Error loading gear data:', error);
      });
  };

  const deleteGear = (id) => {
    if (window.confirm('정말로 이 아이템을 삭제하시겠습니까?')) {
      axios
        .delete(`https://6729689c6d5fa4901b6d0b4f.mockapi.io/my_data/${id}`)
        .then(() => {
          setGearData((prevData) => prevData.filter((gear) => gear.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting gear:', error);
        });
    }
  };

  const handleOpenAddModal = () => {
    navigate('/add');
  };

  const handleCloseAddModal = () => {
    navigate('/index');
  };

  const handleAddGear = (newGear) => {
    axios
      .post('https://6729689c6d5fa4901b6d0b4f.mockapi.io/my_data', newGear)
      .then((response) => {
        setGearData((prevData) => [...prevData, response.data]);
        handleCloseAddModal();
      })
      .catch((error) => {
        console.error('Error adding gear:', error);
      });
  };

  const handleOpenEditModal = (gear) => {
    navigate(`/update/${gear.id}`);
  };

  const handleCloseEditModal = () => {
    setEditGear(null);
    navigate('/index');
  };

  const handleUpdateGear = (updatedGear) => {
    setGearData((prevData) =>
      prevData.map((gear) => (gear.id === updatedGear.id ? updatedGear : gear))
    );
    handleCloseEditModal();
  };

  return (
    <>
      <div className="top-banner top-mar">
        <h1 className="text-center">My Backpacking Gears</h1>
      </div>
      {/* 네비게이션 바 */}
      <nav className="navbar navbar-expand-sm bg-black navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link btn" onClick={handleOpenAddModal}>
                Add
              </button>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-person"></i> Your Account
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* 기어 리스트 */}
      <div className="container mt-5">
        <div className="row" id="gearContainer">
          {gearData.map((gear) => (
            <div key={gear.id} className="col-sm-12 col-md-6 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-darkgray text-black fw-bold">
                  {gear.name}
                </div>
                <img src={gear.image} className="card-img-top" alt={gear.name} />
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li>Category: {gear.category}</li>
                    <li>Weight: {gear.weight}g</li>
                    <li>Material: {gear.material}</li>
                    <li>Price: ${gear.price}</li>
                    <li>Feature: {gear.feature}</li>
                  </ul>
                  <button
                    onClick={() => deleteGear(gear.id)}
                    className="btn btn-delete btn-custom rounded me-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleOpenEditModal(gear)}
                    className="btn btn-edit btn-custom rounded"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 추가 모달 */}
      {location.pathname === '/add' && (
        <AddModal onClose={handleCloseAddModal} onSave={handleAddGear} />
      )}

      {/* 수정 모달 */}
      {editGear && (
        <EditModal
          gear={editGear}
          onClose={handleCloseEditModal}
          onSave={handleUpdateGear}
        />
      )}
    </>
  );
}

export default ShowList;