import React from 'react';
import '../../index.css';
import creditosData from '../../data/creditos.json';
import emergentesData from '../../data/emergentes.json';

const CREDITOS_POR_COBRAR_BALANCE = 12951.60;

function prepararCreditos(data) {
  const socios = (data.socios || []).map(item => ({
    nombre: item.nombre,
    normal: item.normal || 0,
    inversion: item.inversion || 0,
    segundo_credito: item.segundo_credito || 0
  }));

  const clientes = (data.clientes || []).map(item => ({
    nombre: item.nombre,
    normal: item.normal || 0,
    inversion: item.inversion || 0,
    segundo_credito: item.segundo_credito || 0
  }));

  return [...socios, ...clientes];
}

function prepararEmergentes(data) {
  const socios = (data.socios || []).map(item => ({
    nombre: item.nombre,
    monto: item.monto || 0,
    emergente_navidad: item.emergente_navidad || 0
  }));

  const clientes = (data.clientes || []).map(item => ({
    nombre: item.nombre,
    monto: item.monto || 0,
    emergente_navidad: item.emergente_navidad || 0
  }));

  return [...socios, ...clientes];
}

function getTotal(data, key) {
  return data.reduce((sum, item) => sum + (item[key] || 0), 0);
}

export default function Credits() {
  // Calcular total de créditos por socio (solo socios, no clientes)
  const sociosCreditos = (creditosData.socios || []).map(socio => ({
    nombre: socio.nombre,
    total: (socio.normal || 0) + (socio.inversion || 0) + (socio.segundo_credito || 0)
  }));

  const creditos = prepararCreditos(creditosData);
  const emergentes = prepararEmergentes(emergentesData);

  const totalNormal = getTotal(creditos, 'normal');
  const totalInversion = getTotal(creditos, 'inversion');
  const totalSegundo = getTotal(creditos, 'segundo_credito');

  const totalEmergente = emergentes.reduce(
    (sum, item) => sum + (item.monto || 0) + (item.emergente_navidad || 0),
    0
  );

  const totalCreditos = totalNormal + totalInversion + totalSegundo + totalEmergente;

  const diferencia = (totalCreditos - CREDITOS_POR_COBRAR_BALANCE).toFixed(2);
  const cuadra = Math.abs(totalCreditos - CREDITOS_POR_COBRAR_BALANCE) < 0.01;

  const tipos = [
    { key: 'normal', label: 'Créditos Normales' },
    { key: 'inversion', label: 'Créditos Inversión' },
    { key: 'segundo_credito', label: 'Segundo Crédito' }
  ];

  return (
    <div className="flex flex-col items-center px-4 py-8 min-h-screen w-full bg-gray-900 overflow-x-hidden">

      <h1 className="text-4xl font-bold mb-8 text-green-400 tracking-tight text-center">
        Créditos
      </h1>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Créditos normales: dos tablas por fila */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-green-400 text-center uppercase tracking-wide">
            Créditos Normales
          </h2>
          <table className="w-full border-collapse text-sm text-gray-200">
            <thead>
              <tr className="bg-gray-700 text-green-300">
                <th className="py-2 px-3 border border-gray-600 text-left">Nombre</th>
                <th className="py-2 px-3 border border-gray-600 text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              {creditos.map((item, idx2) => (
                <tr
                  key={idx2}
                  className="even:bg-gray-800 odd:bg-gray-700 hover:bg-green-900/30 transition-colors"
                >
                  <td className="py-2 px-3 font-medium text-green-300">
                    {item.nombre}
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-green-400">
                    ${(item.normal || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right font-bold text-green-200">
            Total: ${getTotal(creditos, 'normal').toFixed(2)}
          </div>
        </div>
        {/* Segundo Crédito y Total por Socio: dos tablas por fila */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-green-400 text-center uppercase tracking-wide">
            Segundo Crédito
          </h2>
          <table className="w-full border-collapse text-sm text-gray-200">
            <thead>
              <tr className="bg-gray-700 text-green-300">
                <th className="py-2 px-3 border border-gray-600 text-left">Nombre</th>
                <th className="py-2 px-3 border border-gray-600 text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              {creditos.map((item, idx2) => (
                <tr
                  key={idx2}
                  className="even:bg-gray-800 odd:bg-gray-700 hover:bg-green-900/30 transition-colors"
                >
                  <td className="py-2 px-3 font-medium text-green-300">
                    {item.nombre}
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-green-400">
                    ${(item.segundo_credito || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right font-bold text-green-200">
            Total: ${getTotal(creditos, 'segundo_credito').toFixed(2)}
          </div>
        </div>
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-green-400 text-center uppercase tracking-wide">
            Créditos Inversión
          </h2>
          <table className="w-full border-collapse text-sm text-gray-200">
            <thead>
              <tr className="bg-gray-700 text-green-300">
                <th className="py-2 px-3 border border-gray-600 text-left">Nombre</th>
                <th className="py-2 px-3 border border-gray-600 text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              {creditos.map((item, idx2) => (
                <tr
                  key={idx2}
                  className="even:bg-gray-800 odd:bg-gray-700 hover:bg-green-900/30 transition-colors"
                >
                  <td className="py-2 px-3 font-medium text-green-300">
                    {item.nombre}
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-green-400">
                    ${(item.inversion || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right font-bold text-green-200">
            Total: ${getTotal(creditos, 'inversion').toFixed(2)}
          </div>
        </div>
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-green-400 text-center uppercase tracking-wide">
            Total de Créditos por Socio
          </h2>
          <table className="w-full border-collapse text-sm text-gray-200">
            <thead>
              <tr className="bg-gray-700 text-green-300">
                <th className="py-2 px-3 border border-gray-600 text-left">Nombre</th>
                <th className="py-2 px-3 border border-gray-600 text-right">Total Créditos</th>
              </tr>
            </thead>
            <tbody>
              {sociosCreditos.map((item, idx) => (
                <tr
                  key={idx}
                  className="even:bg-gray-800 odd:bg-gray-700 hover:bg-green-900/30 transition-colors"
                >
                  <td className="py-2 px-3 font-medium text-green-300">
                    {item.nombre}
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-green-400">
                    ${item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Créditos emergentes: ocupa una fila completa */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-green-400 text-center uppercase tracking-wide">
            Créditos Emergentes
          </h2>
          <table className="w-full border-collapse text-sm text-gray-200">
            <thead>
              <tr className="bg-gray-700 text-green-300">
                <th className="py-2 px-3 border border-gray-600 text-left">Nombre</th>
                <th className="py-2 px-3 border border-gray-600 text-right">Monto</th>
                <th className="py-2 px-3 border border-gray-600 text-right">Navidad</th>
              </tr>
            </thead>
            <tbody>
              {emergentes.map((item, idx) => (
                <tr
                  key={idx}
                  className="even:bg-gray-800 odd:bg-gray-700 hover:bg-green-900/30 transition-colors"
                >
                  <td className="py-2 px-3 font-medium text-green-300">
                    {item.nombre}
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-green-400">
                    ${(item.monto || 0).toFixed(2)}
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-green-400">
                    ${(item.emergente_navidad || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right font-bold text-green-200">
            Total: ${totalEmergente.toFixed(2)}
          </div>
        </div>

        {/* Totales */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 text-center">

          <div className="text-xl font-bold text-green-300 mb-2">
            Total Créditos: ${totalCreditos.toFixed(2)}
          </div>

          <div className={`text-lg font-bold ${cuadra ? 'text-green-400' : 'text-red-400'}`}>
            Diferencia con Balance: ${diferencia}
          </div>

        </div>

      </div>

    </div>
  );
}