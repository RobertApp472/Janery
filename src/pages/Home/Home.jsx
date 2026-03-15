import React from 'react';
import '../../index.css';
import balanceData from '../../data/balance.json';

function total(arr) {
  return arr.reduce((sum, item) => sum + (item.monto || 0), 0);
}

export default function Home() {

  const {
    ganancias,
    gastos,
    activo_corriente,
    activos_fijos = [],
    pasivos,
    capital,
    resultado_mes
  } = balanceData;

  const totalGanancias = total(ganancias);
  const totalGastos = total(gastos);

  const totalActivos = total(activo_corriente) + total(activos_fijos);
  const totalPasivoCapital = total(pasivos) + total(capital);

  const tablasBalance = [
    { label: 'Activo Corriente', data: activo_corriente, color: 'green' },
    { label: 'Activos Fijos', data: activos_fijos, color: 'green' },
    { label: 'Pasivos', data: pasivos, color: 'yellow' },
    { label: 'Capital', data: capital, color: 'yellow' }
  ];

  return (
    <div className="flex flex-col items-center px-4 py-8 min-h-screen bg-gray-900">

      <h1 className="text-4xl font-bold mb-8 text-green-400 tracking-tight text-center">
        Balance Mensual
      </h1>

      <div className="w-full max-w-6xl flex flex-col gap-8">

        {/* GANANCIAS Y GASTOS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* GANANCIAS */}

          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">

            <h2 className="text-2xl font-semibold mb-4 text-green-400 text-center uppercase tracking-wide">
              Ganancias
            </h2>

            <table className="w-full border-collapse text-sm text-gray-200">

              <thead>
                <tr className="bg-gray-700 text-green-300">
                  <th className="py-2 px-3 border border-gray-600 text-left">Código</th>
                  <th className="py-2 px-3 border border-gray-600 text-left">Descripción</th>
                  <th className="py-2 px-3 border border-gray-600 text-right">Monto</th>
                </tr>
              </thead>

              <tbody>
                {ganancias.map((item) => (
                  <tr
                    key={item.codigo}
                    className="even:bg-gray-800 odd:bg-gray-700 hover:bg-green-900/30 transition-colors"
                  >
                    <td className="py-2 px-3 text-green-300">{item.codigo}</td>

                    <td className="py-2 px-3 text-green-300">
                      {item.descripcion}
                    </td>

                    <td className="py-2 px-3 text-right font-semibold text-green-400">
                      ${item.monto.toFixed(2)}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

            <div className="mt-4 text-right font-bold text-green-200">
              Total: ${totalGanancias.toFixed(2)}
            </div>

          </div>

          {/* GASTOS */}

          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">

            <h2 className="text-2xl font-semibold mb-4 text-red-400 text-center uppercase tracking-wide">
              Gastos
            </h2>

            <table className="w-full border-collapse text-sm text-gray-200">

              <thead>
                <tr className="bg-gray-700 text-red-300">
                  <th className="py-2 px-3 border border-gray-600 text-left">Código</th>
                  <th className="py-2 px-3 border border-gray-600 text-left">Descripción</th>
                  <th className="py-2 px-3 border border-gray-600 text-right">Monto</th>
                </tr>
              </thead>

              <tbody>
                {gastos.map((item) => (
                  <tr
                    key={item.codigo}
                    className="even:bg-gray-800 odd:bg-gray-700 hover:bg-red-900/30 transition-colors"
                  >

                    <td className="py-2 px-3 text-red-300">
                      {item.codigo}
                    </td>

                    <td className="py-2 px-3 text-red-300">
                      {item.descripcion}
                    </td>

                    <td className="py-2 px-3 text-right font-semibold text-red-400">
                      ${item.monto.toFixed(2)}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

            <div className="mt-4 text-right font-bold text-red-300">
              Total: ${totalGastos.toFixed(2)}
            </div>

          </div>

        </div>

        {/* BALANCE GENERAL */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {tablasBalance.map((tabla, idx) => (

            <div
              key={idx}
              className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
            >

              <h2 className={`text-2xl font-semibold mb-4 text-${tabla.color}-400 text-center uppercase tracking-wide`}>
                {tabla.label}
              </h2>

              <table className="w-full border-collapse text-sm text-gray-200">

                <thead>
                  <tr className={`bg-gray-700 text-${tabla.color}-300`}>
                    <th className="py-2 px-3 border border-gray-600 text-left">
                      Descripción
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

                      <td className={`py-2 px-3 text-${tabla.color}-300`}>
                        {item.descripcion}
                      </td>

                      <td className={`py-2 px-3 text-right font-semibold text-${tabla.color}-400`}>
                        ${item.monto.toFixed(2)}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ))}

        </div>

        {/* TOTALES */}

        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 text-center">

          <div className="flex flex-wrap gap-8 justify-center">

            <div className="text-green-400 font-bold text-lg">
              Total Activos: ${totalActivos.toFixed(2)}
            </div>

            <div className="text-yellow-300 font-bold text-lg">
              Total Pasivo + Capital: ${totalPasivoCapital.toFixed(2)}
            </div>

            <div className="text-green-300 font-bold text-lg">
              Resultado del Mes: ${resultado_mes.toFixed(2)}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}