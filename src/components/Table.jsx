import React from 'react';

export default function Table({ columns, data, color = "green", className = '', highlightRows = [] }) {

  const headerColor = `text-${color}-300`;
  const cellColor = `text-${color}-400`;
  const hoverColor = `hover:bg-${color}-900/30`;

  return (
    <div className={`overflow-x-auto font-sans ${className}`.trim()}>
      <table className="w-full border-collapse text-sm text-gray-200">
        <thead>
          <tr className={`bg-gray-700 ${headerColor}`}>
            {columns.map((col) => (
              <th
                key={col}
                className="py-3 px-4 border border-gray-600 text-left font-semibold"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            const isHighlighted = highlightRows.includes(idx);
            return (
              <tr
                key={idx}
                className={
                  `${isHighlighted ? 'bg-yellow-300/40 !text-black' : 'even:bg-gray-800 odd:bg-gray-700'} ${hoverColor} transition-colors`
                }
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    className={`py-2 px-4 border border-gray-600 ${cellColor}`}
                  >
                    {row[col]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}