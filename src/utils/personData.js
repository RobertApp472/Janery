
import creditosData from '../data/creditos.json';
import emergentesData from '../data/emergentes.json';
import ahorrosData from '../data/ahorros.json';
import deudasData from '../data/deudas.json';
import ahorrosLetras from '../data/ahorros_letras.json';
import ahorrosPlazoFijo from '../data/ahorros_plazo_fijo.json';
import encajeData from '../data/encaje.json';
import sociosList from '../data/Socios.json';

export function getAllPeople() {
  const set = new Set();
  creditosData.socios?.forEach(s => set.add(s.nombre));
  creditosData.clientes?.forEach(c => set.add(c.nombre));
  emergentesData.socios?.forEach(s => set.add(s.nombre));
  emergentesData.clientes?.forEach(c => set.add(c.nombre));
  ahorrosData.forEach(a => set.add(a.nombre));
  ahorrosLetras.forEach(a => set.add(a.nombre));
  ahorrosPlazoFijo.forEach(a => set.add(a.nombre));
  encajeData.forEach(e => set.add(e.nombre));
  deudasData.forEach(d => set.add(d.nombre));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function getPersonData(nombre) {
  // Créditos normales, inversión, segundo crédito
  const creditos = [];
  creditosData.socios?.forEach(s => {
    if (s.nombre === nombre) {
      if (s.normal) creditos.push({ tipo: 'Normal', monto: s.normal });
      if (s.inversion) creditos.push({ tipo: 'Inversión', monto: s.inversion });
      if (s.segundo_credito) creditos.push({ tipo: 'Segundo Crédito', monto: s.segundo_credito });
    }
  });
  creditosData.clientes?.forEach(c => {
    if (c.nombre === nombre) {
      if (c.normal) creditos.push({ tipo: 'Normal', monto: c.normal });
      if (c.inversion) creditos.push({ tipo: 'Inversión', monto: c.inversion });
      if (c.segundo_credito) creditos.push({ tipo: 'Segundo Crédito', monto: c.segundo_credito });
    }
  });
  // Crédito emergente
  const emergentes = [];
  emergentesData.socios?.forEach(s => {
    if (s.nombre === nombre && s.monto) emergentes.push({ tipo: 'Emergente', monto: s.monto });
    if (s.nombre === nombre && s.emergente_navidad) emergentes.push({ tipo: 'Emergente Navidad', monto: s.emergente_navidad });
  });
  emergentesData.clientes?.forEach(c => {
    if (c.nombre === nombre && c.monto) emergentes.push({ tipo: 'Emergente', monto: c.monto });
    if (c.nombre === nombre && c.emergente_navidad) emergentes.push({ tipo: 'Emergente Navidad', monto: c.emergente_navidad });
  });

  // Ahorros personales
  const ahorros = [];
  ahorrosData.forEach(a => {
    if (a.nombre === nombre) ahorros.push({ monto: a.saldo });
  });
  // Ahorros de letras
  const ahorrosLetrasPersona = ahorrosLetras.filter(a => a.nombre === nombre);
  // Plazo fijo
  const ahorrosPlazoFijoPersona = ahorrosPlazoFijo.filter(a => a.nombre === nombre);
  // Encaje
  const encaje = encajeData.filter(e => e.nombre === nombre);

  // --- NUEVA LÓGICA DE DEUDAS Y APORTES ---
  // Solo los socios pueden tener aportes mensuales y especiales
  const sociosNombres = sociosList.map(s => s.nombre);
  const esSocio = sociosNombres.includes(nombre);

  // Deudas: interés emergente, aportes mensual y especial
  let deudas = [];
  let tieneDeuda = false;
  let mesesDeuda = 0;
  let totalInteresEmergente = 0;
  let pendienteMensual = 0;
  let pendienteEspecial = 0;

  // Reglas para aportes especiales pagados (solo ana, robert, mery, hansel han pagado especial de febrero)
  const pagaronEspecialFeb = ["ANA", "ROBERT", "MERY", "HANSEL"];

  const personaDeuda = deudasData.find(d => d.nombre === nombre);
  if (personaDeuda && personaDeuda.deudas && personaDeuda.deudas.length > 0) {
    tieneDeuda = true;
    deudas = [];
    // Sumar interés emergente de todos los meses
    totalInteresEmergente = personaDeuda.deudas.reduce((acc, dd) => acc + (dd.interes_emergente || 0), 0);

    if (esSocio) {
      // Aportes mensuales: enero y febrero
      const meses = ["enero", "febrero"];
      pendienteMensual = 0;
      meses.forEach(mes => {
        const mesData = personaDeuda.deudas.find(dd => dd.mes === mes);
        if (!mesData || !mesData.aporte_mensual || mesData.aporte_mensual === 0) {
          pendienteMensual += 2.5;
        }
      });

      // Aporte especial: solo febrero, solo pagado por ana, robert, mery, hansel
      if (meses.includes("febrero")) {
        if (!pagaronEspecialFeb.includes(nombre)) {
          pendienteEspecial = 10;
        }
      }
    }

    // Deudas array para mostrar en el modal
    deudas.push({ tipo: 'Interés Emergente', monto: totalInteresEmergente });
    if (esSocio) {
      deudas.push({ tipo: 'Aporte Mensual', monto: pendienteMensual });
      deudas.push({ tipo: 'Aporte Especial', monto: pendienteEspecial });
    }
  } else {
    // Si no tiene datos, mostrar pendientes solo si es socio
    if (esSocio) {
      pendienteMensual = 2 * 2.5; // enero y febrero
      pendienteEspecial = 10; // solo febrero
      deudas = [
        { tipo: 'Interés Emergente', monto: 0 },
        { tipo: 'Aporte Mensual', monto: pendienteMensual },
        { tipo: 'Aporte Especial', monto: pendienteEspecial }
      ];
    } else {
      deudas = [
        { tipo: 'Interés Emergente', monto: 0 }
      ];
    }
  }

  return { creditos, emergentes, ahorros, ahorrosLetras: ahorrosLetrasPersona, ahorrosPlazoFijo: ahorrosPlazoFijoPersona, encaje, deudas, tieneDeuda, mesesDeuda, esSocio };
}
