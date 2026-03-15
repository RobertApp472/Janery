import React from 'react';
import '../../index.css';

import ahorrosData from '../../data/ahorros.json';
import letrasData from '../../data/ahorros_letras.json';
import plazoFijoData from '../../data/ahorros_plazo_fijo.json';
import encajeData from '../../data/encaje.json';
import aperturaCuentaData from '../../data/ahorro_apertura_cuenta.json';

function sumAhorros(arr, key = 'saldo') {
  return arr.reduce((sum, item) => sum + (item[key] || 0), 0);
}

function sumPlazoFijo(arr) {
  return arr.reduce((sum, item) => {
    if (Array.isArray(item.montos)) {
      return sum + item.montos.reduce((s, v) => s + v, 0);
    }
    if (typeof item.monto === 'number') {
      return sum + item.monto;
    }
    return sum;
  }, 0);
}

export default function Savings() {

  const totalAhorros = sumAhorros(ahorrosData);
  const totalLetras = sumAhorros(letrasData);
  const totalEncaje = sumAhorros(encajeData, 'monto');
  const totalApertura = sumAhorros(aperturaCuentaData);
  const totalPlazoFijo = sumPlazoFijo(plazoFijoData);

  const totalGeneral =
    totalAhorros +
    totalLetras +
    totalEncaje +
    totalApertura +
    totalPlazoFijo;

  const tablas = [
    { label: 'Ahorros Personales', data: ahorrosData, key: 'saldo' },
    { label: 'Ahorros a Letras', data: letrasData, key: 'saldo' },
    { label: 'Encaje', data: encajeData, key: 'monto' },
    { label: 'Apertura de Cuenta', data: aperturaCuentaData, key: 'saldo' }
  ];

  return (
    <div className="flex flex-col items-center px-4 py-8 min-h-screen w-full bg-gray-900 overflow-x-hidden">

      <h1 className="text-4xl font-bold mb-8 text-green-400 tracking-tight text-center">
        Ahorros
      </h1>

      <div className="w-full max-w-6xl flex flex-col gap-8">

        {/* GRID DE 2 TABLAS POR FILA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {tablas.map((tabla, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
            >

              <h2 className="text-2xl font-semibold mb-4 text-green-400 text-center uppercase tracking-wide">
                {tabla.label}
              </h2>

              <table className="w-full border-collapse text-sm text-gray-200">

                <thead>
                  <tr className="bg-gray-700 text-green-300">
                    <th className="py-2 px-3 border border-gray-600 text-left">
                      Nombre
                    </th>
                    <th className="py-2 px-3 border border-gray-600 text-right">
                      Monto
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tabla.data.map((item, i) => (
                    <tr
                      key={i}
                      className="even:bg-gray-800 odd:bg-gray-700 hover:bg-green-900/30 transition-colors"
                    >

                      <td className="py-2 px-3 font-medium text-green-300">
                        {item.nombre}
                      </td>

                      <td className="py-2 px-3 text-right font-semibold text-green-400">
                        ${(item[tabla.key] || 0).toFixed(2)}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

              <div className="mt-4 text-right font-bold text-green-200">
                Total: ${sumAhorros(tabla.data, tabla.key).toFixed(2)}
              </div>

            </div>
          ))}

        </div>

        {/* PLAZO FIJO */}

        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">

          <h2 className="text-2xl font-semibold mb-4 text-green-400 text-center uppercase tracking-wide">
            Plazo Fijo
          </h2>

          <table className="w-full border-collapse text-sm text-gray-200">

            <thead>
              <tr className="bg-gray-700 text-green-300">
                <th className="py-2 px-3 border border-gray-600 text-left">Nombre</th>
                <th className="py-2 px-3 border border-gray-600 text-right">Monto</th>
              </tr>
            </thead>

            <tbody>
              {plazoFijoData.map((item, idx) => (
                <tr
                  key={idx}
                  className="even:bg-gray-800 odd:bg-gray-700 hover:bg-green-900/30 transition-colors"
                >

                  <td className="py-2 px-3 font-medium text-green-300">
                    {item.nombre}
                  </td>

                  <td className="py-2 px-3 text-right font-semibold text-green-400">
                    ${sumPlazoFijo([item]).toFixed(2)}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          <div className="mt-4 text-right font-bold text-green-200">
            Total Plazo Fijo: ${totalPlazoFijo.toFixed(2)}
          </div>

        </div>

        {/* TOTAL GENERAL */}

        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
          <div className="text-xl font-bold text-green-300">
            Total General: ${totalGeneral.toFixed(2)}
          </div>
        </div>

      </div>

    </div>
  );
}