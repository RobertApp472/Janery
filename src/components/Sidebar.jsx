import React from 'react';

// Sidebar aparece en todas las pantallas, el botón de toggle solo en móvil
export default function Sidebar({ people, onPersonClick, isOpen, toggleSidebar }) {
  // Ordenar alfabéticamente los nombres
  const sortedPeople = [...people].sort((a, b) => a.nombre.localeCompare(b.nombre));
  return (
    <>
      {/* Botón para mostrar/ocultar sidebar (solo móvil) */}
      <button
        className="fixed top-4 left-4 z-50 bg-gray-900 border-2 border-green-400 rounded-full p-2 shadow-lg md:hidden hover:bg-green-100"
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Ocultar barra lateral' : 'Mostrar barra lateral'}
      >
        <span className="text-green-400 font-bold">☰</span>
      </button>

      {/* Sidebar (visible en todas las pantallas) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-xl z-40 transition-transform duration-300 border-r-4 border-green-400
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block`}
      >
        <div className="flex justify-between items-center p-4 border-b border-green-700 bg-gray-800">
          <h2 className="text-lg font-bold text-green-400 tracking-wide">Personas</h2>
          <button onClick={toggleSidebar} className="text-green-400 font-bold text-xl md:hidden hover:text-green-300">
            ×
          </button>
        </div>
        <ul className="p-4 space-y-2 overflow-y-auto h-[calc(100%-64px)]">
          {sortedPeople.map((person) => (
            <li key={person.nombre}>
              <button
                className="w-full text-left px-4 py-2 rounded-lg bg-gray-800 text-green-200 hover:bg-green-900 hover:text-green-300 focus:bg-green-800 focus:text-green-100 transition-colors font-semibold shadow-sm"
                onClick={() => onPersonClick(person)}
              >
                {person.nombre}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
