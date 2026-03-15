// helpers.js
export function quitarTildes(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
