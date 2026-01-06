import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GamesPage from '../pages/Games';

const GamesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GamesPage />} />
      <Route path="/games" element={<GamesPage />} />
    </Routes>
  );
};

export default GamesRoutes;