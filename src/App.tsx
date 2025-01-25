import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Routes, Route } from 'react-router-dom';
import ThreeNumberDivination from './components/Divination/ThreeNumberDivination';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/divination/three-number" element={<ThreeNumberDivination />} />
    </Routes>
  );
};

export default App;
