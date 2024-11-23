import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ShowList from './components/pages/ShowList';
import NotFound from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/index" />} />
      <Route path="/index" element={<ShowList />} />
      <Route path="/add" element={<ShowList showAddModal={true} />} />
      <Route path="/update/:id" element={<ShowList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;