
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoJanery from './assets/LOGO_JANERY.png';

export default function Navigator() {
  const [showHeader, setShowHeader] = useState(true);
  // Detectar landscape en móvil/tablet
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);
  useEffect(() => {
    const check = () => {
      if (typeof window !== 'undefined' && window.matchMedia) {
        setIsLandscapeMobile(window.matchMedia('(orientation: landscape) and (max-width: 1024px)').matches);
      }
    };
    check();
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);
  // Si el usuario da a mostrar, forzar mostrar aunque sea landscape
  const shouldShowHeader = showHeader && (!isLandscapeMobile || showHeader === 'force');
  return (
    <header className="sticky top-0 z-50 font-sans">

      {/* Logo y título con botón ocultar */}
      {(shouldShowHeader || showHeader === 'force') && (
        <div className="w-full bg-gray-900 shadow-md border-b border-gray-700 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
            {/* Logo */}
            <img
              src={logoJanery}
              alt="Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded-full transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-2 drop-shadow-[0_0_4px_rgba(0,255,0,0.6)] hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.9)] hover:drop-shadow-[0_0_18px_rgba(0,255,0,0.7)] cursor-pointer"
              style={{ minWidth: '4rem', minHeight: '4rem' }}
            />
            {/* Título */}
            <div
              className="flex flex-col items-center flex-1 min-w-0 animate-pulse hover:animate-none hover:drop-shadow-[0_0_12px_rgba(0,255,0,0.9)] transition-all duration-300"
            >
              <span
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-green-400 select-none text-center truncate w-full max-w-full"
                style={{ wordBreak: 'break-word' }}
              >
                CAJA DE AHORRO Y CRÉDITO
              </span>
              <span
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-green-400 mt-1 select-none text-center truncate w-full max-w-full"
                style={{ wordBreak: 'break-word' }}
              >
                "JANERY"
              </span>
            </div>
            {/* Botón ocultar */}
            <button
              className="absolute top-2 right-2 bg-green-700 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={() => setShowHeader(false)}
              aria-label="Ocultar cabecera"
            >
              Ocultar
            </button>
          </div>
        </div>
      )}
      {/* Botón mostrar cabecera si está oculta */}
      {!shouldShowHeader && (
        <div className="w-full flex justify-end bg-gray-900 border-b border-gray-700">
          <button
            className="m-2 bg-green-700 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            onClick={() => setShowHeader('force')}
            aria-label="Mostrar cabecera"
          >
            Mostrar cabecera
          </button>
        </div>
      )}

      {/* Barra navegación */}
      <nav className="bg-gray-800 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-14 w-full">
            <div className="flex gap-2 md:gap-4 overflow-x-auto w-full scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-gray-900 px-2">

              <Link to="/movimientos" className="px-4 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-green-700 hover:text-white transition-all duration-300 transform hover:scale-110">
  Movimientos
</Link>

<Link to="/" className="px-4 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-green-700 hover:text-white transition-all duration-300 transform hover:scale-110">
  Balance
</Link>

<Link to="/savings" className="px-4 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-green-700 hover:text-white transition-all duration-300 transform hover:scale-110">
  Ahorros
</Link>

<Link to="/credits" className="px-4 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-green-700 hover:text-white transition-all duration-300 transform hover:scale-110">
  Créditos
</Link>

<Link to="/debts" className="px-4 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-green-700 hover:text-white transition-all duration-300 transform hover:scale-110">
  Deudas
</Link>

            </div>
          </div>
        </div>
      </nav>

    </header>
  );
}