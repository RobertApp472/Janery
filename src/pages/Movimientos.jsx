import React from 'react';
import '../index.css';
import movimientosData from '../data/mounth_moviments.json';


function Movimientos() {
  // El archivo no tiene fecha, se muestra en orden original
  const movimientos = movimientosData;
  const totalIngresos = movimientos.reduce((sum, m) => sum + (m.ingreso || 0), 0);
  const totalEgresos = movimientos.reduce((sum, m) => sum + (m.egreso || 0), 0);
  const saldoFinal = movimientos.length > 0 ? movimientos[movimientos.length - 1].saldo : 0;

  return (
    <div className="container">
      <h1 className="title">Movimientos del Mes</h1>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Detalle</th>
              <th>Persona</th>
              <th>Ingreso</th>
              <th>Egreso</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((mov, idx) => (
              <tr key={idx}>
                <td>{mov.detalle}</td>
                <td>{mov.persona}</td>
                <td className="value" style={{ color: mov.ingreso > 0 ? '#2563eb' : undefined }}>
                  {mov.ingreso > 0 ? `+${mov.ingreso.toFixed(2)}` : ''}
                </td>
                <td className="value" style={{ color: mov.egreso > 0 ? '#dc2626' : undefined }}>
                  {mov.egreso > 0 ? `-${mov.egreso.toFixed(2)}` : ''}
                </td>
                <td className="value">{mov.saldo.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <p className="total" style={{ background: '#e0e7ff', color: '#2563eb' }}>Total ingresos: ${totalIngresos.toFixed(2)}</p>
          <p className="total" style={{ background: '#fee2e2', color: '#dc2626' }}>Total egresos: ${totalEgresos.toFixed(2)}</p>
          <p className="total">Saldo final: ${saldoFinal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Movimientos;
