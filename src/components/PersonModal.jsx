import React from 'react';


export default function PersonModal({ person, data, onClose }) {
  if (!person) return null;
  const {
    creditos = [],
    emergentes = [],
    ahorros = [],
    ahorrosLetras = [],
    ahorrosPlazoFijo = [],
    encaje = [],
    deudas = [],
    esSocio = false
  } = data || {};

  // Agrupar ahorros por tipo
  const ahorrosPorTipo = {};
  ahorros.forEach(a => { ahorrosPorTipo['Ahorro Personal'] = (ahorrosPorTipo['Ahorro Personal'] || 0) + a.monto; });
  ahorrosLetras.forEach(a => { ahorrosPorTipo['Ahorro Letras'] = (ahorrosPorTipo['Ahorro Letras'] || 0) + a.saldo; });
  ahorrosPlazoFijo.forEach(a => {
    if (a.monto) ahorrosPorTipo['Plazo Fijo'] = (ahorrosPorTipo['Plazo Fijo'] || 0) + a.monto;
    if (Array.isArray(a.montos)) a.montos.forEach(m => { ahorrosPorTipo['Plazo Fijo'] = (ahorrosPorTipo['Plazo Fijo'] || 0) + m; });
  });
  encaje.forEach(e => { ahorrosPorTipo['Encaje'] = (ahorrosPorTipo['Encaje'] || 0) + e.monto; });

  // Deudas: Interés emergente, aportes mensuales y especiales solo si es socio
  const interesEmergente = deudas.find(d => d.tipo === 'Interés Emergente');
  const aporteMensual = deudas.find(d => d.tipo === 'Aporte Mensual');
  const aporteEspecial = deudas.find(d => d.tipo === 'Aporte Especial');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-2 relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-green-400 text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">{person}</h2>

        {/* Créditos */}
        {creditos.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-green-300 mb-2">Créditos</h3>
            <table className="w-full border-collapse text-sm text-gray-200 mb-2">
              <thead>
                <tr className="bg-gray-700 text-green-300">
                  <th className="py-2 px-3 border border-gray-600 text-left">Tipo</th>
                  <th className="py-2 px-3 border border-gray-600 text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                {creditos.map((c, i) => (
                  <tr key={i} className="even:bg-gray-800 odd:bg-gray-700">
                    <td className="py-1 px-3">{c.tipo}</td>
                    <td className="py-1 px-3 text-right font-semibold text-green-400">${c.monto.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Créditos Emergentes */}
        {emergentes.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-yellow-300 mb-2">Créditos Emergentes</h3>
            <table className="w-full border-collapse text-sm text-gray-200 mb-2">
              <thead>
                <tr className="bg-gray-700 text-yellow-200">
                  <th className="py-2 px-3 border border-gray-600 text-left">Tipo</th>
                  <th className="py-2 px-3 border border-gray-600 text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                {emergentes.map((e, i) => (
                  <tr key={i} className="even:bg-gray-800 odd:bg-gray-700">
                    <td className="py-1 px-3">{e.tipo}</td>
                    <td className="py-1 px-3 text-right font-semibold text-yellow-300">${e.monto.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Ahorros agrupados */}
        {Object.keys(ahorrosPorTipo).length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Ahorros</h3>
            <table className="w-full border-collapse text-sm text-gray-200 mb-2">
              <thead>
                <tr className="bg-gray-700 text-blue-200">
                  <th className="py-2 px-3 border border-gray-600 text-left">Tipo</th>
                  <th className="py-2 px-3 border border-gray-600 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(ahorrosPorTipo).map(([tipo, monto]) => (
                  <tr key={tipo} className="even:bg-gray-800 odd:bg-gray-700">
                    <td className="py-1 px-3">{tipo}</td>
                    <td className="py-1 px-3 text-right font-semibold text-blue-300">${monto.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Deudas y aportes */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-red-300 mb-2">Deudas y Aportes</h3>
          <table className="w-full border-collapse text-sm text-gray-200 mb-2">
            <thead>
              <tr className="bg-gray-700 text-red-200">
                <th className="py-2 px-3 border border-gray-600 text-left">Tipo</th>
                <th className="py-2 px-3 border border-gray-600 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {interesEmergente && (
                <tr className="even:bg-gray-800 odd:bg-gray-700">
                  <td className="py-1 px-3">Interés Emergente</td>
                  <td className="py-1 px-3 text-right font-semibold text-red-300">${interesEmergente.monto.toFixed(2)}</td>
                </tr>
              )}
              {esSocio && (
                <>
                  <tr className="even:bg-gray-800 odd:bg-gray-700">
                    <td className="py-1 px-3">Aporte Mensual</td>
                    <td className="py-1 px-3 text-right font-semibold text-red-300">${aporteMensual ? aporteMensual.monto.toFixed(2) : '0.00'} {aporteMensual && aporteMensual.monto > 0 ? '(Pendiente)' : '(Pagado)'}</td>
                  </tr>
                  <tr className="even:bg-gray-800 odd:bg-gray-700">
                    <td className="py-1 px-3">Aporte Especial</td>
                    <td className="py-1 px-3 text-right font-semibold text-red-300">${aporteEspecial ? aporteEspecial.monto.toFixed(2) : '0.00'} {aporteEspecial && aporteEspecial.monto > 0 ? '(Pendiente)' : '(Pagado)'}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
