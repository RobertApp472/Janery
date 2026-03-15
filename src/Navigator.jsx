import { Link } from 'react-router-dom'

export default function Navigator() {
  return (
    <nav className="bg-gray-200 p-4 flex gap-4">
      <Link to="/movimientos">Movimientos</Link>
      <Link to="/">Balance</Link>
      <Link to="/savings">Ahorros</Link>
      <Link to="/credits">Créditos</Link>
      <Link to="/debts">Deudas</Link>
    </nav>
  )
}
