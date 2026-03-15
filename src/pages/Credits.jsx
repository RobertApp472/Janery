import React from 'react';
import '../index.css';
import creditosData from '../data/creditos.json';
import emergentesData from '../data/emergentes.json';

// Valor esperado según balance.json
const CREDITOS_POR_COBRAR_BALANCE = 12951.60;


function Creditos() {
  // Créditos normales
  const socios = (creditosData.socios || []).map(item => ({
    nombre: item.nombre,
    normal: item.normal || 0,
    inversion: item.inversion || 0,
    segundoCredito: item.segundo_credito || 0
  }));
  const clientes = (creditosData.clientes || []).map(item => ({
    nombre: item.nombre,
    normal: item.normal || 0,
    inversion: item.inversion || 0,
    segundoCredito: item.segundo_credito || 0
  }));
  const all = [...socios, ...clientes];

  // Créditos emergentes
  const sociosEmergentes = (emergentesData.socios || []).map(item => ({
    nombre: item.nombre,
    monto: item.monto || 0,
    emergente_navidad: item.emergente_navidad || 0
  }));
  const clientesEmergentes = (emergentesData.clientes || []).map(item => ({
    nombre: item.nombre,
    monto: item.monto || 0,
    emergente_navidad: item.emergente_navidad || 0
  }));
  const allEmergentes = [...sociosEmergentes, ...clientesEmergentes];

  // Totales por tipo
  const totalNormal = all.reduce((sum, item) => sum + (item.normal || 0), 0);
  const totalInversion = all.reduce((sum, item) => sum + (item.inversion || 0), 0);
  const totalSegundo = all.reduce((sum, item) => sum + (item.segundoCredito || 0), 0);
  const totalEmergente = allEmergentes.reduce((sum, item) => sum + (item.monto || 0) + (item.emergente_navidad || 0), 0);
  const totalCreditos = totalNormal + totalInversion + totalSegundo + totalEmergente;

  const diferencia = (totalCreditos - CREDITOS_POR_COBRAR_BALANCE).toFixed(2);
  const cuadra = Math.abs(totalCreditos - CREDITOS_POR_COBRAR_BALANCE) < 0.01;

  return (
    <div className="container">
      <h1 className="title">Créditos</h1>
      <div className="card">
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Primera fila: Normal e Inversión */}
          <div style={{ flex: 1, minWidth: 320 }}>
            <h2>Créditos Normales</h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Normal</th>
                </tr>
              </thead>
              <tbody>
                {all.filter(item => item.normal > 0).map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre}</td>
                    <td className="value">${item.normal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="total">Total Normal: ${totalNormal.toFixed(2)}</p>
          </div>
          <div style={{ flex: 1, minWidth: 320 }}>
            <h2>Créditos Inversión</h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Inversión</th>
                </tr>
              </thead>
              <tbody>
                {all.filter(item => item.inversion > 0).map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre}</td>
                    <td className="value">${item.inversion.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="total">Total Inversión: ${totalInversion.toFixed(2)}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          {/* Segunda fila: Segundo Crédito y Emergentes */}
          <div style={{ flex: 1, minWidth: 320 }}>
            <h2>Segundo Crédito</h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>2° Crédito</th>
                </tr>
              </thead>
              <tbody>
                {all.filter(item => item.segundoCredito > 0).map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre}</td>
                    <td className="value">${item.segundoCredito.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="total">Total 2° Crédito: ${totalSegundo.toFixed(2)}</p>
          </div>
          <div style={{ flex: 1, minWidth: 320 }}>
            <h2>Créditos Emergentes</h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Emergente</th>
                  <th>Emergente Navidad</th>
                </tr>
              </thead>
              <tbody>
                {allEmergentes.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre}</td>
                    <td className="value">${(item.monto || 0).toFixed(2)}</td>
                    <td className="value">${(item.emergente_navidad || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="total">Total Emergente: ${totalEmergente.toFixed(2)}</p>
          </div>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <hr style={{margin: '2rem 0'}} />
          <p className="total">Total Créditos: ${totalCreditos.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Creditos;