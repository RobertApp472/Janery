// App.jsx
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Credits from './pages/Credits';
import Debts from './pages/Debts';
import Savings from './pages/Savings';
import Movements from './pages/Movements';
import Navigator from './Navigator';

function App() {
  return (
    <>
      <HashRouter>
        <Navigator />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/debts" element={<Debts />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/movimientos" element={<Movements />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;