// App.jsx
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar.jsx';
import PersonModal from './components/PersonModal.jsx';
import creditosData from './data/creditos.json';
import emergentesData from './data/emergentes.json';
import ahorrosData from './data/ahorros.json';
import deudasData from './data/deudas.json';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Credits from './pages/Credits';
import Debts from './pages/Debts';
import Savings from './pages/Savings';
import Movements from './pages/Movements';
import Navigator from './Navigator';

function App() {
  // Unificar y ordenar nombres
  const people = useMemo(() => {
    const set = new Set();
    // Créditos
    creditosData.socios?.forEach(s => set.add(s.nombre));
    creditosData.clientes?.forEach(c => set.add(c.nombre));
    // Emergentes
    emergentesData.socios?.forEach(s => set.add(s.nombre));
    emergentesData.clientes?.forEach(c => set.add(c.nombre));
    // Ahorros
    ahorrosData.forEach(a => set.add(a.nombre));
    // Deudas
    deudasData.forEach(d => set.add(d.nombre));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  // En móvil, la barra lateral debe estar abierta por defecto
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [sidebarOpen, setSidebarOpen] = useState(isMobile);
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Filtrar datos de la persona seleccionada
  const personData = useMemo(() => {
    if (!selectedPerson) return {};
    // Créditos
    const creditos = [];
    creditosData.socios?.forEach(s => {
      if (s.nombre === selectedPerson) {
        if (s.normal) creditos.push({ tipo: 'Normal', monto: s.normal });
        if (s.inversion) creditos.push({ tipo: 'Inversión', monto: s.inversion });
        if (s.segundo_credito) creditos.push({ tipo: 'Segundo Crédito', monto: s.segundo_credito });
      }
    });
    creditosData.clientes?.forEach(c => {
      if (c.nombre === selectedPerson) {
        if (c.normal) creditos.push({ tipo: 'Normal', monto: c.normal });
        if (c.inversion) creditos.push({ tipo: 'Inversión', monto: c.inversion });
        if (c.segundo_credito) creditos.push({ tipo: 'Segundo Crédito', monto: c.segundo_credito });
      }
    });
    // Emergentes
    const emergentes = [];
    emergentesData.socios?.forEach(s => {
      if (s.nombre === selectedPerson) {
        if (s.monto) emergentes.push({ tipo: 'Emergente', monto: s.monto });
        if (s.emergente_navidad) emergentes.push({ tipo: 'Navidad', monto: s.emergente_navidad });
      }
    });
    emergentesData.clientes?.forEach(c => {
      if (c.nombre === selectedPerson) {
        if (c.monto) emergentes.push({ tipo: 'Emergente', monto: c.monto });
        if (c.emergente_navidad) emergentes.push({ tipo: 'Navidad', monto: c.emergente_navidad });
      }
    });
    // Ahorros
    const ahorros = ahorrosData.filter(a => a.nombre === selectedPerson).map(a => ({ tipo: 'Ahorro', monto: a.saldo }));
    // Deudas
    const deudas = [];
    deudasData.forEach(d => {
      if (d.nombre === selectedPerson && d.deudas) {
        d.deudas.forEach(dd => {
          if (dd.interes_emergente) deudas.push({ tipo: 'Interés Emergente', monto: dd.interes_emergente });
          if (dd.aporte_mensual) deudas.push({ tipo: 'Aporte Mensual', monto: dd.aporte_mensual });
          if (dd.aporte_especial) deudas.push({ tipo: 'Aporte Especial', monto: dd.aporte_especial });
        });
      }
    });
    return { creditos, emergentes, ahorros, deudas };
  }, [selectedPerson]);

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