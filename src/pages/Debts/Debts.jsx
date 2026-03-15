import React from 'react';
import '../../index.css';
import deudasData from '../../data/deudas.json';
import { quitarTildes } from '../../utils/helpers';

const MESES = ['enero', 'febrero', 'marzo', 'abril'];

function getDeudaPorMes(deudas, mes, tipoKey) {
  const mesNorm = quitarTildes(mes.toLowerCase());
  const deudaMes = deudas.find(d => d.mes && quitarTildes(d.mes.toLowerCase()) === mesNorm);
  return deudaMes && typeof deudaMes[tipoKey] === 'number' ? deudaMes[tipoKey] : 0;
}

function getTotalPorTipo(socio, tipoKey) {
  return socio.deudas.reduce((sum, d) => sum + (d[tipoKey] || 0), 0);
}

export default function Debts() {
  const tipos = [
    { key: 'interes_emergente', label: 'Interés Emergente', font: 'font-inter' },
    { key: 'aporte_mensual', label: 'Aporte Mensual', font: 'font-poppins' },
    { key: 'aporte_especial', label: 'Aporte Especial', font: 'font-roboto-slab' }
  ];

  return (
    <div className="flex flex-col items-center px-4 py-8 min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-green-400 tracking-tight text-center">
        Deudas por Socio y Mes
      </h1>

      <div className="w-full max-w-6xl flex flex-col gap-8">
        {tipos.map(tipo => (
          <div
            key={tipo.key}
            className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
          >
            <h2 className={`text-2xl font-semibold mb-4 text-green-400 text-center uppercase tracking-wide ${tipo.font}`}>
              {tipo.label}
            </h2>

            <table className={`w-full border-collapse text-sm text-gray-200 ${tipo.font}`}>
              <thead>
                <tr className="bg-gray-700 text-green-300">
                  <th className="py-2 px-3 border border-gray-600 text-left">Socio</th>
                  {MESES.map((mes, i) => (
                    <th
                      key={mes}
                      className={`py-2 px-3 border ${i % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'} border-gray-600 text-right`}
                    >
                      {mes.charAt(0).toUpperCase() + mes.slice(1)}
                    </th>
                  ))}
                  <th className="py-2 px-3 border border-green-500 bg-green-700 text-right font-bold text-green-200">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {deudasData.map((socio, idx) => (
                  <tr
                    key={idx}
                    className={`even:bg-gray-800 odd:bg-gray-700 hover:bg-green-900/30 transition-colors`}
                  >
                    <td className="py-2 px-3 font-medium text-green-300">{socio.nombre}</td>
                    {MESES.map((mes, i) => (
                      <td
                        key={mes + socio.nombre}
                        className={`py-2 px-3 text-right font-semibold text-green-400`}
                      >
                        {getDeudaPorMes(socio.deudas, mes, tipo.key).toFixed(2)}
                      </td>
                    ))}
                    <td className="py-2 px-3 text-right font-bold text-green-200">
                      {getTotalPorTipo(socio, tipo.key).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}