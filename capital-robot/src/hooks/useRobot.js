import { useState, useEffect, useRef, useCallback } from "react";
import { BASE_PRICES, DEFAULT_RISK, INITIAL_BALANCE } from "../utils/constants";
import { generatePrice, generateSignal, calcPnL } from "../utils/trading";

// ============================================================
// ROBOT ANA HOOK — tüm state ve mantık burada
// ============================================================
export function useRobot() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [robotActive, setRobotActive] = useState(false);
  const [activeStrategy, setActiveStrategy] = useState("rsi_macd");
  const [selectedMarkets, setSelectedMarkets] = useState(["EURUSD", "BTCUSD", "GOLD"]);

  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [equity, setEquity] = useState(INITIAL_BALANCE);
  const [openPositions, setOpenPositions] = useState([]);
  const [trades, setTrades] = useState([]);
  const [stats, setStats] = useState({ wins: 0, losses: 0, totalPnl: 0, trades: 0 });
  const [prices, setPrices] = useState({ ...BASE_PRICES });
  const [logs, setLogs] = useState([]);

  const [riskPct, setRiskPct] = useState(DEFAULT_RISK.riskPct);
  const [stopLossPct, setStopLossPct] = useState(DEFAULT_RISK.stopLossPct);
  const [takeProfitPct, setTakeProfitPct] = useState(DEFAULT_RISK.takeProfitPct);

  const intervalRef = useRef(null);

  const addLog = useCallback((msg, type = "info") => {
    const time = new Date().toLocaleTimeString("tr-TR");
    setLogs((prev) => [...prev.slice(-80), { time, msg, type }]);
  }, []);

  // Fiyat güncellemeleri
  useEffect(() => {
    if (!robotActive) return;
    const priceInterval = setInterval(() => {
      setPrices((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          next[k] = generatePrice(
            next[k],
            k.includes("BTC") || k.includes("ETH") ? 0.006 : 0.002
          );
        });
        return next;
      });
    }, 2000);
    return () => clearInterval(priceInterval);
  }, [robotActive]);

  // Equity güncelle
  useEffect(() => {
    if (openPositions.length === 0) { setEquity(balance); return; }
    const unrealized = openPositions.reduce((sum, p) => {
      return sum + calcPnL(p.entry, prices[p.symbol] || p.entry, p.side, p.size);
    }, 0);
    setEquity(Math.round((balance + unrealized) * 100) / 100);
  }, [prices, openPositions, balance]);

  // Robot işlem mantığı
  useEffect(() => {
    if (!robotActive) return;
    intervalRef.current = setInterval(() => {
      selectedMarkets.forEach((sym) => {
        const signal = generateSignal(activeStrategy);
        const price = prices[sym];
        if (!price) return;

        // Stop loss / take profit kontrolü
        setOpenPositions((prev) => {
          const remaining = [];
          prev
            .filter((p) => p.symbol === sym)
            .forEach((pos) => {
              const pnl = calcPnL(pos.entry, price, pos.side, pos.size);
              const pnlPct =
                pos.side === "BUY"
                  ? ((price - pos.entry) / pos.entry) * 100
                  : ((pos.entry - price) / pos.entry) * 100;

              if (pnlPct <= -stopLossPct || pnlPct >= takeProfitPct) {
                const closed = {
                  ...pos,
                  exitPrice: price,
                  pnl: Math.round(pnl * 100) / 100,
                  closedAt: new Date().toLocaleTimeString("tr-TR"),
                  status: pnlPct >= takeProfitPct ? "TP" : "SL",
                };
                setTrades((t) => [closed, ...t.slice(0, 49)]);
                setBalance((b) => Math.round((b + pnl) * 100) / 100);
                setStats((s) => ({
                  wins: pnl > 0 ? s.wins + 1 : s.wins,
                  losses: pnl <= 0 ? s.losses + 1 : s.losses,
                  totalPnl: Math.round((s.totalPnl + pnl) * 100) / 100,
                  trades: s.trades + 1,
                }));
                addLog(
                  `${closed.status === "TP" ? "✅ TP" : "🛑 SL"} ${sym} ${pos.side} kapatıldı — PnL: ${pnl > 0 ? "+" : ""}${Math.round(pnl * 100) / 100}$`,
                  pnl > 0 ? "success" : "danger"
                );
              } else {
                remaining.push(pos);
              }
            });
          return [...prev.filter((p) => p.symbol !== sym), ...remaining];
        });

        // Yeni pozisyon aç
        if (signal !== "HOLD") {
          const alreadyOpen = openPositions.some((p) => p.symbol === sym);
          if (!alreadyOpen && Math.random() > 0.6) {
            const size = Math.round((balance * riskPct) / 100 * 10) / 10;
            const newPos = {
              id: Date.now() + Math.random(),
              symbol: sym,
              side: signal,
              entry: price,
              size,
              openedAt: new Date().toLocaleTimeString("tr-TR"),
              strategy: activeStrategy,
            };
            setOpenPositions((prev) => [...prev, newPos]);
            addLog(
              `📊 ${sym} ${signal} @ ${price.toFixed(4)} — Boyut: $${size}`,
              "trade"
            );
          }
        }
      });
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [robotActive, selectedMarkets, activeStrategy, prices, balance, openPositions, riskPct, stopLossPct, takeProfitPct, addLog]);

  const connect = async (apiKey, apiSecret) => {
    if (!apiKey || !apiSecret) {
      addLog("⚠️ API Key ve Secret girin!", "warn");
      return false;
    }
    setConnecting(true);
    addLog("🔌 Capital.com API'ye bağlanıyor... (Paper Trading modu)", "info");
    await new Promise((r) => setTimeout(r, 1800));
    setConnected(true);
    setConnecting(false);
    addLog("✅ Bağlantı başarılı — Paper Trading modu aktif", "success");
    addLog(`💰 Simülasyon bakiyesi: $${balance.toLocaleString()}`, "info");
    return true;
  };

  const toggleRobot = () => {
    setRobotActive((r) => {
      addLog(!r ? "▶️ Robot başlatıldı — Piyasalar taranıyor..." : "⏹ Robot durduruldu", !r ? "success" : "warn");
      return !r;
    });
  };

  const toggleMarket = (symbol) => {
    setSelectedMarkets((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  return {
    // State
    connected, connecting, robotActive,
    activeStrategy, setActiveStrategy,
    selectedMarkets, toggleMarket,
    balance, equity, openPositions, trades, stats, prices, logs,
    riskPct, setRiskPct,
    stopLossPct, setStopLossPct,
    takeProfitPct, setTakeProfitPct,
    // Actions
    connect, toggleRobot, addLog,
  };
}
