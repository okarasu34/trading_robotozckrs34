// ============================================================
// TRADING YARDIMCI FONKSİYONLARI
// ============================================================

/**
 * Simüle edilmiş fiyat üretir (gerçek API bağlantısı olmadan test için)
 */
export function generatePrice(base, volatility = 0.002) {
  return base * (1 + (Math.random() - 0.5) * volatility);
}

/**
 * Stratejiye göre sinyal üretir: BUY / SELL / HOLD
 */
export function generateSignal() {
  const r = Math.random();
  if (r < 0.35) return "BUY";
  if (r < 0.7) return "SELL";
  return "HOLD";
}

/**
 * Açık pozisyon için kar/zarar hesaplar
 * @param {number} entry - Giriş fiyatı
 * @param {number} current - Güncel fiyat
 * @param {string} side - "BUY" | "SELL"
 * @param {number} size - Pozisyon büyüklüğü ($)
 * @returns {number} P&L ($)
 */
export function calcPnL(entry, current, side, size) {
  const diff =
    side === "BUY"
      ? (current - entry) / entry
      : (entry - current) / entry;
  return diff * size * 100;
}

/**
 * Yüzde değişimi hesaplar
 */
export function calcChangePct(current, base) {
  return (((current - base) / base) * 100).toFixed(3);
}

/**
 * Fiyatı sembol tipine göre formatlar
 */
export function formatPrice(price, symbol) {
  if (!price) return "—";
  if (symbol === "BTCUSD") return price.toFixed(0);
  if (symbol === "ETHUSD") return price.toFixed(1);
  return price.toFixed(4);
}

/**
 * Para birimini formatlar
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
