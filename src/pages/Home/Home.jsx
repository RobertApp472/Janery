import React, { useState } from 'react';
import '../../index.css';
import balanceData from '../../data/balance.json';
import Sidebar from '../../components/Sidebar.jsx';
import PersonModal from '../../components/PersonModal.jsx';
import { getAllPeople, getPersonData } from '../../utils/personData';

function total(arr) {
  return arr.reduce((sum, item) => sum + (item.monto || 0), 0);
}

export default function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const people = getAllPeople().map(nombre => ({ nombre }));
  const personData = selectedPerson ? getPersonData(selectedPerson) : {};

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

    <div className="flex">

      <Sidebar
        people={people}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(v => !v)}
        onPersonClick={p => {
          setSelectedPerson(p.nombre);
          setSidebarOpen(false);
        }}
      />

      <div className="flex-1 flex flex-col items-center px-4 py-8 min-h-screen w-full bg-gray-900 overflow-x-hidden">

        <h1 className="text-4xl font-bold mb-8 text-green-400 tracking-tight text-center">
          Balance Mensual
        </h1>

        <div className="w-full max-w-6xl flex flex-col gap-8">

          {/* GANANCIAS Y GASTOS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* GANANCIAS */}

            <div className="bg-gray-800 rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-semibold mb-4 text-green-400 text-center">
                Ganancias
              </h2>

              <table className="w-full text-sm text-gray-200">

                <thead>
                  <tr className="bg-gray-700 text-green-300">
                    <th className="py-2 px-3">Código</th>
                    <th className="py-2 px-3">Descripción</th>
                    <th className="py-2 px-3 text-right">Monto</th>
                  </tr>
                </thead>

                <tbody>
                  {ganancias.map((item) => (
                    <tr key={item.codigo}>
                      <td className="py-2 px-3">{item.codigo}</td>
                      <td className="py-2 px-3">{item.descripcion}</td>
                      <td className="py-2 px-3 text-right">
                        ${item.monto.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

              <div className="mt-4 text-right font-bold">
                Total: ${totalGanancias.toFixed(2)}
              </div>

            </div>

            {/* GASTOS */}

            <div className="bg-gray-800 rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-semibold mb-4 text-red-400 text-center">
                Gastos
              </h2>

              <table className="w-full text-sm text-gray-200">

                <thead>
                  <tr className="bg-gray-700 text-red-300">
                    <th className="py-2 px-3">Código</th>
                    <th className="py-2 px-3">Descripción</th>
                    <th className="py-2 px-3 text-right">Monto</th>
                  </tr>
                </thead>

                <tbody>
                  {gastos.map((item) => (
                    <tr key={item.codigo}>
                      <td className="py-2 px-3">{item.codigo}</td>
                      <td className="py-2 px-3">{item.descripcion}</td>
                      <td className="py-2 px-3 text-right">
                        ${item.monto.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

              <div className="mt-4 text-right font-bold">
                Total: ${totalGastos.toFixed(2)}
              </div>

            </div>

          </div>

          {/* BALANCE GENERAL */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {tablasBalance.map(({ label, data, color }) => (

              <div key={label} className="bg-gray-800 rounded-2xl shadow-lg p-6">

                <h2 className={`text-2xl font-semibold mb-4 text-${color}-400 text-center`}>
                  {label}
                </h2>

                <ul className="space-y-2">

                  {data.map((item, i) => (

                    <li key={i} className="flex justify-between">

                      <span>{item.descripcion || item.detalle}</span>

                      <span className={`font-semibold text-${color}-400`}>
                        ${item.monto.toFixed(2)}
                      </span>

                    </li>

                  ))}

                </ul>

              </div>

            ))}

          </div>

          {/* RESULTADO MES */}

          <div className="bg-gray-900 rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-semibold mb-4 text-center text-green-400">
              Resultado del Mes
            </h2>

            <div className="text-center text-4xl font-bold text-green-300">
              ${resultado_mes?.toFixed(2)}
            </div>

          </div>

        </div>

        <PersonModal
          person={selectedPerson}
          data={personData}
          onClose={() => setSelectedPerson(null)}
        />

      </div>

    </div>

  );
}