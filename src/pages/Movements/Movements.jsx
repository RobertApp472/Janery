import React, { useState } from 'react';
import '../../index.css';
import movimientosData from '../../data/mounth_moviments.json';
import Table from '../../components/Table.jsx';
import Button from '../../components/Button.jsx';

export default function Movements() {

  const movimientos = movimientosData;
  const [highlight, setHighlight] = useState(null); // 'ingresos' | 'egresos' | null

  const totalIngresos = movimientos.reduce(
    (sum, m) => sum + (m.ingreso || 0),
    0
  );

  const totalEgresos = movimientos.reduce(
    (sum, m) => sum + (m.egreso || 0),
    0
  );

  const saldoFinal =
    movimientos.length > 0
      ? movimientos[movimientos.length - 1].saldo
      : 0;

  const columns = ['Detalle', 'Persona', 'Ingreso', 'Egreso', 'Saldo'];

  // Para resaltar filas
  const data = movimientos.map((mov, idx) => ({
    Detalle: mov.detalle,
    Persona: mov.persona,
    Ingreso: mov.ingreso > 0 ? `+${mov.ingreso.toFixed(2)}` : '',
    Egreso: mov.egreso > 0 ? `-${mov.egreso.toFixed(2)}` : '',
    Saldo: mov.saldo.toFixed(2),
    _rowIndex: idx,
    _isIngreso: mov.ingreso > 0,
    _isEgreso: mov.egreso > 0
  }));

  // Determinar qué filas resaltar
  let highlightRows = [];
  if (highlight === 'ingresos') {
    highlightRows = data.filter(d => d._isIngreso).map(d => d._rowIndex);
  } else if (highlight === 'egresos') {
    highlightRows = data.filter(d => d._isEgreso).map(d => d._rowIndex);
  }

  return (

    <div className="flex flex-col items-center px-4 py-8 min-h-screen bg-gray-900">

      <h1 className="text-4xl font-bold mb-8 text-green-400 tracking-tight text-center">
        Movimientos del Mes
      </h1>

      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-6xl">

        {/* TABLA */}
        <Table columns={columns} data={data} className="text-green-300" highlightRows={highlightRows} />

        {/* TOTALES */}

        <div className="flex flex-wrap gap-8 justify-center mt-6">
          <Button
            variant={highlight === 'ingresos' ? 'secondary' : 'primary'}
            className="border border-blue-700 px-6 py-3 text-blue-300 font-bold"
            onClick={() => setHighlight(highlight === 'ingresos' ? null : 'ingresos')}
          >
            Total ingresos: ${totalIngresos.toFixed(2)}
          </Button>

          <Button
            variant={highlight === 'egresos' ? 'secondary' : 'primary'}
            className="border border-red-700 px-6 py-3 text-red-400 font-bold"
            onClick={() => setHighlight(highlight === 'egresos' ? null : 'egresos')}
          >
            Total egresos: ${totalEgresos.toFixed(2)}
          </Button>

          <div className="border border-green-700 rounded-xl px-6 py-3 text-green-400 font-bold">
            Saldo final: ${saldoFinal.toFixed(2)}
          </div>
        </div>

      </div>

    </div>

  );
}