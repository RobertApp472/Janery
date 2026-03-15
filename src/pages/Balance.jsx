import React from 'react';
import '../index.css';
import balanceData from '../data/balance.json'; // tu JSON unificado

function Balance() {
  const { ganancias, gastos, activo_corriente, activos_fijos = [], pasivos, capital, resultado_mes } = balanceData;

  // Función para calcular total
  const total = (arr) => arr.reduce((sum, item) => sum + item.monto, 0).toFixed(2);

  // Total activos
  const totalActivos = (parseFloat(total(activo_corriente)) + parseFloat(total(activos_fijos))).toFixed(2);

  // Total pasivo + capital
  const totalPasivoCapital = (parseFloat(total(pasivos)) + parseFloat(total(capital))).toFixed(2);

  return (
    <div className="container">
      <h1 className="title">Balance Mensual</h1>

      {/* Ganancias / Gastos */}
      <div className="tables">
        <div className="card">
          <h2>Ganancias</h2>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {ganancias.map((item) => (
                <tr key={item.codigo}>
                  <td>{item.codigo}</td>
                  <td>{item.descripcion}</td>
                  <td className="value">${item.monto.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total">Total ganancias: ${total(ganancias)}</p>
        </div>

        <div className="card">
          <h2>Gastos</h2>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {gastos.map((item) => (
                <tr key={item.codigo}>
                  <td>{item.codigo}</td>
                  <td>{item.descripcion}</td>
                  <td className="value">${item.monto.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total">Total costos: ${total(gastos)}</p>
        </div>
      </div>

      <p className="result">
        Resultado del mes: ${resultado_mes.toFixed(2)}
      </p>

      {/* Balance General */}
      <h1 className="title">Balance General</h1>
      <div className="balance-general">
        <div className="subcard">
          <h3>Activo Corriente</h3>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {activo_corriente.map((item) => (
                <tr key={item.codigo}>
                  <td>{item.codigo}</td>
                  <td>{item.descripcion}</td>
                  <td className="value">${item.monto.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total">Total Activo corriente: ${total(activo_corriente)}</p>

          <h3>Activo Fijos</h3>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {activos_fijos.map((item) => (
                <tr key={item.codigo}>
                  <td>{item.codigo}</td>
                  <td>{item.descripcion}</td>
                  <td className="value">${item.monto.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total">Total Activos Fijos: ${total(activos_fijos)}</p>

          <p className="total">Total Activos: ${totalActivos}</p>
        </div>

        <div className="subcard">
          <h3>Pasivos</h3>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {pasivos.map((item) => (
                <tr key={item.codigo}>
                  <td>{item.codigo}</td>
                  <td>{item.descripcion}</td>
                  <td className="value">${item.monto.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total">Total Pasivos: ${total(pasivos)}</p>

          <h3>Capital (Patrimonio)</h3>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {capital.map((item) => (
                <tr key={item.codigo}>
                  <td>{item.codigo}</td>
                  <td>{item.descripcion}</td>
                  <td className="value">${item.monto.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total">Total Capital: ${total(capital)}</p>

          <p className="total">Total Pasivo + Capital: ${totalPasivoCapital}</p>
        </div>
      </div>
    </div>
  );
}

export default Balance;