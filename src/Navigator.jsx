import { Link } from 'react-router-dom';
import logoJanery from './assets/LOGO_JANERY.png';

export default function Navigator() {
  return (
    <header className="sticky top-0 z-50 font-sans">

      {/* Logo y título */}
      <div className="w-full bg-gray-900 shadow-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">

          {/* Logo */}
            <img
  src={logoJanery}
  alt="Logo"
  className="
  w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48
  object-cover rounded-full
  transition-all duration-500 ease-out
  hover:scale-110
  hover:-translate-y-2
  drop-shadow-[0_0_4px_rgba(0,255,0,0.6)]
  hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.9)]
  hover:drop-shadow-[0_0_18px_rgba(0,255,0,0.7)]
  cursor-pointer
  "
/>
          {/* Título */}
          <div
            className="
            flex flex-col items-center w-full
            animate-pulse
            hover:animate-none
            hover:drop-shadow-[0_0_12px_rgba(0,255,0,0.9)]
            transition-all duration-300
            "
          >

            <span
              className="
              text-4xl sm:text-5xl md:text-6xl
              font-extrabold uppercase tracking-wide
              text-green-400
              select-none
              text-center
              "
            >
              CAJA DE AHORRO Y CRÉDITO
            </span>

            <span
              className="
              text-4xl sm:text-5xl md:text-6xl
              font-extrabold uppercase tracking-wide
              text-green-400
              mt-1
              select-none
              text-center
              "
            >
              "JANERY"
            </span>

          </div>
        </div>
      </div>

      {/* Barra navegación */}
      <nav className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-14">
            <div className="flex gap-2 md:gap-4">

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