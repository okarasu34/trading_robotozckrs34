// ============================================================
// PİYASA & STRATEJİ SABİTLERİ
// ============================================================

export const MARKETS = [
  { symbol: "EURUSD", name: "EUR/USD", type: "forex", icon: "💱" },
  { symbol: "GBPUSD", name: "GBP/USD", type: "forex", icon: "💱" },
  { symbol: "BTCUSD", name: "BTC/USD", type: "crypto", icon: "₿" },
  { symbol: "ETHUSD", name: "ETH/USD", type: "crypto", icon: "Ξ" },
  { symbol: "AAPL", name: "Apple", type: "stock", icon: "📈" },
  { symbol: "GOLD", name: "Gold", type: "commodity", icon: "🥇" },
  { symbol: "OIL", name: "Oil (WTI)", type: "commodity", icon: "🛢️" },
];

export const STRATEGIES = [
  { id: "rsi_macd", name: "RSI + MACD", desc: "Momentum & trend kombinasyonu", timeframe: "1H" },
  { id: "bollinger", name: "Bollinger Bands", desc: "Volatilite kırılmaları", timeframe: "4H" },
  { id: "ema_cross", name: "EMA Crossover", desc: "Hareketli ortalama kesişimi", timeframe: "15M" },
  { id: "scalp", name: "Scalping", desc: "Hızlı kısa pozisyonlar", timeframe: "5M" },
];

export const BASE_PRICES = {
  EURUSD: 1.0842,
  GBPUSD: 1.2654,
  BTCUSD: 68420,
  ETHUSD: 3280,
  AAPL: 182.5,
  GOLD: 2345,
  OIL: 78.3,
};

export const TYPE_COLORS = {
  forex: "#38bdf8",
  crypto: "#f59e0b",
  stock: "#a78bfa",
  commodity: "#34d399",
};

export const DEFAULT_RISK = {
  riskPct: 2,
  stopLossPct: 1.5,
  takeProfitPct: 3,
};

export const INITIAL_BALANCE = 10000;
