import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigator from './Navigator.jsx'
import Balance from './pages/Balance.jsx'
import Savings from './pages/Savings.jsx'
import Credits from './pages/Credits.jsx'
import Debts from './pages/debts.jsx'  // ojo: nombre exacto del archivo

function App() {
  return (
    <BrowserRouter>
      <Navigator />
      <Routes>
        <Route path="/" element={<Balance />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/debts" element={<Debts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
