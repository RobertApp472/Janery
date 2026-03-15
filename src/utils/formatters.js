// formatters.js
export function formatMoney(value) {
  return `$${Number(value).toFixed(2)}`;
}
