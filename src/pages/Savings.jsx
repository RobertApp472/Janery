import aperturaCuentaData from '../data/ahorro_apertura_cuenta.json';
import React from 'react';
import '../index.css';
import ahorrosData from '../data/ahorros.json';
import letrasData from '../data/ahorros_letras.json';
import plazoFijoData from '../data/ahorros_plazo_fijo.json';
import encajeData from '../data/encaje.json';


function sumAhorros(arr, key = 'saldo') {
  return arr.reduce((sum, item) => sum + (item[key] || 0), 0);
}

function sumLetras(arr) {
  return arr.reduce((sum, item) => sum + (item.saldo || 0), 0);
}

function sumPlazoFijo(arr) {
  return arr.reduce((sum, item) => {
    if (Array.isArray(item.montos)) {
      return sum + item.montos.reduce((s, v) => s + v, 0);
    } else if (typeof item.monto === 'number') {
      return sum + item.monto;
    }
    return sum;
  }, 0);
}

function Ahorros() {
  const totalAhorros = sumAhorros(ahorrosData);
  const totalAperturaCuenta = sumAhorros(aperturaCuentaData);
  const totalLetras = sumLetras(letrasData);
  const totalEncaje = sumAhorros(encajeData, 'monto');
  const totalPlazoFijo = sumPlazoFijo(plazoFijoData);
  const totalGeneral = totalAhorros + totalLetras + totalEncaje + totalAperturaCuenta;

  return (
    <div className="container">
      <h1 className="title">Ahorros </h1>
      <div className="card">
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Primera fila: Ahorros y Ahorros a Letras */}
          <div style={{ flex: 1, minWidth: 320 }}>
            <h2>Ahorros personales </h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {ahorrosData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre}</td>
                    <td className="value">${(item.saldo || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="total">Total Ahorros: ${totalAhorros.toFixed(2)}</p>
          </div>
          <div style={{ flex: 1, minWidth: 320 }}>
            <h2>Ahorros a Letras</h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {letrasData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre}</td>
                    <td className="value">${(item.saldo || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>

            </table>
            <p className="total">Total Letras: ${totalLetras.toFixed(2)}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          {/* Segunda fila: Encaje y Plazo Fijo */}
          <div style={{ flex: 1, minWidth: 320 }}>
            <h2>Encaje</h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                {encajeData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre}</td>
                    <td className="value">${(item.monto || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="total">Total Encaje: ${totalEncaje.toFixed(2)}</p>
          </div>
          <div style={{ flex: 1, minWidth: 320 }}>
            <h2>Ahorros Plazo Fijo</h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                {plazoFijoData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre}</td>
                    <td className="value">
                      {Array.isArray(item.montos)
                        ? item.montos.map((m, i) => <span key={i}>${m.toFixed(2)} </span>)
                        : (item.monto !== undefined ? `$${item.monto.toFixed(2)}` : '')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="total">Total Plazo Fijo: ${totalPlazoFijo.toFixed(2)}</p>
            <p className="total">Total Ahorros: ${totalAhorros.toFixed(2)}</p>
            <h3>Ahorro Apertura de Cuenta</h3>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {aperturaCuentaData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre}</td>
                    <td className="value">${(item.saldo || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="total">Total Apertura Cuenta: ${totalAperturaCuenta.toFixed(2)}</p>
          </div>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <p className="total">Ahorros personales + Letras + Encaje: ${totalGeneral.toFixed(2)}</p>
          <p className="total">Total Plazo Fijo: ${totalPlazoFijo.toFixed(2)}</p>
          <p className="total">Total: ${(totalGeneral + totalPlazoFijo).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Ahorros;