import { BASE_PRICES, MARKETS, STRATEGIES, TYPE_COLORS } from "../utils/constants";
import { calcChangePct, formatPrice } from "../utils/trading";

// ============================================================
// DASHBOARD SEKMESİ
// ============================================================
export default function Dashboard({
  connected, robotActive, toggleRobot, setTab,
  balance, equity, stats, prices, openPositions,
  activeStrategy, selectedMarkets, riskPct, stopLossPct, takeProfitPct,
}) {
  const winRate = stats.trades > 0 ? Math.round((stats.wins / stats.trades) * 100) : 0;
  const equityColor = equity >= 10000 ? "#34d399" : "#f87171";
  const pnlColor = stats.totalPnl >= 0 ? "#34d399" : "#f87171";
  const strat = STRATEGIES.find((s) => s.id === activeStrategy);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Ana istatistikler */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "BAŞLANGIÇ BAKİYE", value: "$10,000", color: "#94a3b8" },
          { label: "GÜNCEL EQUITY", value: `$${equity.toLocaleString()}`, color: equityColor },
          { label: "TOPLAM P&L", value: `${stats.totalPnl >= 0 ? "+" : ""}${stats.totalPnl.toFixed(2)}$`, color: pnlColor },
          { label: "WIN RATE", value: `${winRate}%`, color: winRate >= 50 ? "#34d399" : "#f87171" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "#0d1525", border: "1px solid #1e293b",
            borderRadius: 10, padding: "14px 16px",
            animation: `slideIn 0.3s ease ${i * 0.05}s both`,
          }}>
            <div style={{ fontSize: 9, color: "#475569", letterSpacing: 2, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 600, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Detay istatistikler */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "TOPLAM İŞLEM", value: stats.trades },
          { label: "KAZANAN", value: stats.wins, color: "#34d399" },
          { label: "KAYBEDEN", value: stats.losses, color: "#f87171" },
          { label: "AÇIK POZİSYON", value: openPositions.length, color: "#38bdf8" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "#0d1525", border: "1px solid #1e293b",
            borderRadius: 10, padding: "12px 16px",
          }}>
            <div style={{ fontSize: 9, color: "#475569", letterSpacing: 2, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: s.color || "#e2e8f0" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Canlı fiyatlar */}
      <div style={{ background: "#0d1525", border: "1px solid #1e293b", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #1e293b", fontSize: 11, color: "#94a3b8", letterSpacing: 2 }}>
          CANLI FİYATLAR
          {robotActive && (
            <span style={{ color: "#22c55e", animation: "blink 1s infinite", marginLeft: 8 }}>● CANLI</span>
          )}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 1, background: "#1e293b" }}>
          {MARKETS.map((m) => {
            const price = prices[m.symbol];
            const change = calcChangePct(price, BASE_PRICES[m.symbol]);
            const isUp = change >= 0;
            const isSelected = selectedMarkets.includes(m.symbol);
            return (
              <div key={m.symbol} style={{
                background: "#0d1525", padding: "12px 14px",
                borderLeft: isSelected ? `3px solid ${TYPE_COLORS[m.type]}` : "3px solid transparent",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span style={{ fontSize: 10, color: TYPE_COLORS[m.type] }}>{m.icon} {m.name}</span>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", marginTop: 3 }}>
                      {formatPrice(price, m.symbol)}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 11,
                    color: isUp ? "#34d399" : "#f87171",
                    background: isUp ? "#052e16" : "#2d0a0a",
                    padding: "2px 6px", borderRadius: 4, marginTop: 2,
                  }}>
                    {isUp ? "▲" : "▼"} {Math.abs(change)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Robot kontrol */}
      {connected ? (
        <div style={{
          background: "#0d1525", border: "1px solid #1e293b",
          borderRadius: 10, padding: "20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 13, color: "#e2e8f0", marginBottom: 4 }}>
              Robot Durumu —{" "}
              <span style={{ color: TYPE_COLORS.forex }}>{strat?.name}</span>
            </div>
            <div style={{ fontSize: 11, color: "#475569" }}>
              {selectedMarkets.length} piyasa aktif · Risk/işlem: %{riskPct} · SL: %{stopLossPct} · TP: %{takeProfitPct}
            </div>
          </div>
          <button
            onClick={toggleRobot}
            style={{
              padding: "12px 28px",
              background: robotActive ? "#2d0a0a" : "#052e16",
              border: `1px solid ${robotActive ? "#dc2626" : "#16a34a"}`,
              color: robotActive ? "#f87171" : "#22c55e",
              borderRadius: 8, cursor: "pointer",
              fontSize: 13, fontFamily: "inherit", fontWeight: 600,
              animation: robotActive ? "pulse 2s infinite" : "none",
            }}
          >
            {robotActive ? "⏹ DURDUR" : "▶ BAŞLAT"}
          </button>
        </div>
      ) : (
        <div style={{
          background: "#0d1525", border: "1px dashed #1e3a5f",
          borderRadius: 10, padding: "30px",
          textAlign: "center", color: "#475569",
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔌</div>
          <div style={{ fontSize: 13, marginBottom: 8, color: "#94a3b8" }}>Henüz bağlantı yok</div>
          <div style={{ fontSize: 11 }}>Kurulum sekmesinden API bilgilerini girin</div>
          <button onClick={() => setTab("setup")} style={{
            marginTop: 16, padding: "8px 20px",
            background: "transparent", border: "1px solid #38bdf8",
            color: "#38bdf8", borderRadius: 8, cursor: "pointer",
            fontSize: 12, fontFamily: "inherit",
          }}>
            ⚙️ Kuruluma Git
          </button>
        </div>
      )}
    </div>
  );
}
