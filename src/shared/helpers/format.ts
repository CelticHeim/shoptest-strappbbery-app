/**
 * Formatea un número como moneda USD
 */
export function formatCurrency(value: number | string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return `$${numValue.toFixed(2)}`;
}

/**
 * Formatea un número con decimales
 */
export function formatNumber(value: number | string, decimals = 2): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return numValue.toFixed(decimals);
}

/**
 * Convierte un valor a número de forma segura
 */
export function toNumber(value: any): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

/**
 * Formatea un número con separadores de miles
 */
export function formatNumberWithCommas(value: number | string): string {
  const numValue = toNumber(value);
  return numValue.toLocaleString('en-US');
}
