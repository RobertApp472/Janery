import React from 'react';
import '../index.css';

function Balance() {
  // Datos Ganancias/Gastos actualizados
  const ganancias = [
    { codigo: "4,1", descripcion: "Intereses ganados en créditos", valor: 77.66 },
    { codigo: "4,2", descripcion: "Interés de Mora cobradas", valor: 0 },
    { codigo: "4,3", descripcion: "Multas cobradas", valor: 0 },
    { codigo: "4,4", descripcion: "Intereses bancarios", valor: 0 },
    { codigo: "4,5", descripcion: "Ingresos por actividades", valor: 0 },
    { codigo: "4,6", descripcion: "Venta de formularios", valor: 0 },
    { codigo: "4,7", descripcion: "Otros Ingresos", valor: 50 },
  ];

  const gastos = [
    { codigo: "5,1", descripcion: "Intereses de los ahorros captados", valor: 8.55 },
    { codigo: "5,2", descripcion: "Intereses de Préstamos externos", valor: 0 },
    { codigo: "5,3", descripcion: "Gastos bancarios", valor: 0 },
    { codigo: "5,4", descripcion: "Gastos de Personal", valor: 10 },
    { codigo: "5,5", descripcion: "Gastos de suministros", valor: 0 },
    { codigo: "5,6", descripcion: "Gastos de transportes", valor: 0 },
    { codigo: "5,7", descripcion: "Gastos de alimentación", valor: 0 },
    { codigo: "5,8", descripcion: "Otros gastos operativos", valor: 0 },
    { codigo: "5,9", descripcion: "Gastos de provisión", valor: 0 },
  ];

  // Balance General actualizado
  const activosCorrientes = [
    { codigo: "1,1", descripcion: "Caja (dinero en efectivo)", valor: 578.79 },
    { codigo: "1,2", descripcion: "Bancos (libreta de ahorros)", valor: 0 },
    { codigo: "1,3", descripcion: "Inversiones (certificados en Coacs)", valor: 0 },
    { codigo: "1,4", descripcion: "Créditos por cobrar", valor: 12951.6 },
    { codigo: "1,41", descripcion: "Cartera de crédito sin retraso", valor: 12951.6 },
    { codigo: "1,42", descripcion: "Saldo de cartera de crédito con retraso", valor: 0 },
    { codigo: "1,99", descripcion: "Provisión de cartera", valor: 0 },
    { codigo: "1,5", descripcion: "Otras cuentas por cobrar", valor: 0 },
  ];

  const pasivos = [
    { codigo: "2,1", descripcion: "Ahorros captados", valor: 1467.84 },
    { codigo: "2,2", descripcion: "Plazo Fijo", valor: 1361.3 },
    { codigo: "2,3", descripcion: "Cuentas Por Pagar", valor: 0 },
    { codigo: "2,4", descripcion: "Créditos externos por Pagar", valor: 0 },
    { codigo: "2,5", descripcion: "Fondo de Desgravamen", valor: 958.43 },
    { codigo: "2,6", descripcion: "Fondo Solidario", valor: 0 },
  ];

  const activosFijos = [
    { codigo: "1,6", descripcion: "Local", valor: 0 },
    { codigo: "1,7", descripcion: "Muebles y equipos", valor: 0 },
    { codigo: "1,8", descripcion: "Otros Activos", valor: 0 },
  ];

  const capital = [
    { codigo: "3,1", descripcion: "Aportes iniciales", valor: 350 },
    { codigo: "3,2", descripcion: "Aportes mensuales y adicionales", valor: 7302.87 },
    { codigo: "3,3", descripcion: "Capitalizaciones", valor: 0 },
    { codigo: "3,4", descripcion: "Donaciones", valor: 0 },
    { codigo: "3,5", descripcion: "Reservas", valor: 1719.12 },
    { codigo: "3,6", descripcion: "Resultado del mes", valor: 109.11 },
    { codigo: "3,7", descripcion: "Resultado acumulado", valor: 261.72 },
  ];

  // Función para calcular total
  const total = (arr) => arr.reduce((sum, item) => sum + item.valor, 0).toFixed(2);

  // Total activos
  const totalActivos = (parseFloat(total(activosCorrientes)) + parseFloat(total(activosFijos))).toFixed(2);

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
                  <td className="value">${item.valor.toFixed(2)}</td>
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
                  <td className="value">${item.valor.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total">Total costos: ${total(gastos)}</p>
        </div>
      </div>

      <p className="result">
        Resultado del mes: ${(total(ganancias) - total(gastos)).toFixed(2)}
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
              {activosCorrientes.map((item) => (
                <tr key={item.codigo}>
                  <td>{item.codigo}</td>
                  <td>{item.descripcion}</td>
                  <td className="value">${item.valor.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total">Total Activo corriente: ${total(activosCorrientes)}</p>

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
              {activosFijos.map((item) => (
                <tr key={item.codigo}>
                  <td>{item.codigo}</td>
                  <td>{item.descripcion}</td>
                  <td className="value">${item.valor.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            </table>
            <p className="total">Total Activos Fijos: ${total(activosFijos)}</p>

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
                  <td className="value">${item.valor.toFixed(2)}</td>
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
                  <td className="value">${item.valor.toFixed(2)}</td>
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
