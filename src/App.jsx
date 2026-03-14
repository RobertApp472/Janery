// App.jsx
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Balance from './pages/Balance';
import Credits from './pages/Credits';
import Debts from './pages/debts';
import Savings from './pages/Savings';
import Navigator from './Navigator';

function App() {
  return (
    <HashRouter>
      <Navigator />
      <Routes>
        <Route path="/" element={<Balance />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/debts" element={<Debts />} />
        <Route path="/savings" element={<Savings />} />
      </Routes>
    </HashRouter>
  );
}

export default App;