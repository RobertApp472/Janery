import React from 'react';
import '../index.css';
import deudasData from '../data/deudas.json';

// Función auxiliar para quitar tildes
function quitarTildes(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const MESES = ['enero', 'febrero', 'marzo', 'abril'];
const MESES_BG = ['#e6f7f7', '#d1fae5', '#e6f7f7', '#d1fae5'];

// Función para obtener deuda de un tipo por mes
function getDeudaPorMes(deudas, mes, tipoKey) {
  const mesNorm = quitarTildes(mes.toLowerCase());
  const deudaMes = deudas.find(d => d.mes && quitarTildes(d.mes.toLowerCase()) === mesNorm);
  return deudaMes && typeof deudaMes[tipoKey] === 'number' ? deudaMes[tipoKey] : 0;
}

// Función para total por socio y tipo
function getTotalPorTipo(socio, tipoKey) {
  return socio.deudas.reduce((sum, d) => sum + (d[tipoKey] || 0), 0);
}

function Debts() {
  const tipos = [
    { key: 'interes_emergente', label: 'Interés Emergente' },
    { key: 'aporte_mensual', label: 'Aporte Mensual' },
    { key: 'aporte_especial', label: 'Aporte Especial' }
  ];

  return (
    <div className="container">
      <h1 className="title">Deudas por Socio y Mes</h1>

      {tipos.map(tipo => (
        <div key={tipo.key} className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ textAlign: 'center' }}>{tipo.label}</h2>
          <table>
            <thead>
              <tr>
                <th>Socio</th>
                {MESES.map((mes, i) => (
                  <th key={mes} style={{ background: MESES_BG[i] }}>
                    {mes.charAt(0).toUpperCase() + mes.slice(1)}
                  </th>
                ))}
                <th className="total" style={{ background: '#dbeafe' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {deudasData.map((socio, idx) => (
                <tr key={idx}>
                  <td>{socio.nombre}</td>
                  {MESES.map((mes, i) => (
                    <td key={mes + socio.nombre} className="value" style={{ background: MESES_BG[i] }}>
                      {getDeudaPorMes(socio.deudas, mes, tipo.key).toFixed(2)}
                    </td>
                  ))}
                  <td className="total" style={{ fontWeight: 'bold' }}>
                    {getTotalPorTipo(socio, tipo.key).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Debts;