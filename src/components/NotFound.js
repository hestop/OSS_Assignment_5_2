import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/index');
  };

  return (
    <div className="container text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button className="btn btn-primary" onClick={handleGoHome}>
        Go to Home
      </button>
    </div>
  );
}

export default NotFound;