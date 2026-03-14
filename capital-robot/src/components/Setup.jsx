import { useState } from "react";
import { MARKETS, STRATEGIES, TYPE_COLORS } from "../utils/constants";

// ============================================================
// KURULUM SEKMESİ
// ============================================================
export default function Setup({
  connected, connecting, connect,
  selectedMarkets, toggleMarket,
  activeStrategy, setActiveStrategy,
  riskPct, setRiskPct,
  stopLossPct, setStopLossPct,
  takeProfitPct, setTakeProfitPct,
}) {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");

  const handleConnect = () => connect(apiKey, apiSecret);

  const inputStyle = {
    width: "100%", padding: "10px 14px",
    background: "#080c14", border: "1px solid #1e293b",
    borderRadius: 8, color: "#e2e8f0",
    fontFamily: "inherit", fontSize: 12, outline: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 700 }}>

      {/* API Bağlantısı */}
      <div style={{ background: "#0d1525", border: "1px solid #1e293b", borderRadius: 10, padding: 20 }}>
        <div style={{ fontSize: 11, color: "#38bdf8", letterSpacing: 2, marginBottom: 16 }}>
          🔌 CAPITAL.COM API BAĞLANTISI
        </div>
        <div style={{
          background: "#0a1628", border: "1px solid #1e3a5f",
          borderRadius: 8, padding: "10px 14px",
          fontSize: 11, color: "#38bdf8", marginBottom: 16, lineHeight: 1.7,
        }}>
          💡 Capital.com → Settings → API → Create API Key adımlarını takip edin.<br />
          ⚠️ Paper trading modunda gerçek para riski YOKTUR.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 10, color: "#475569", display: "block", marginBottom: 6, letterSpacing: 1 }}>
              API KEY
            </label>
            <input
              value={apiKey} onChange={(e) => setApiKey(e.target.value)}
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ fontSize: 10, color: "#475569", display: "block", marginBottom: 6, letterSpacing: 1 }}>
              API SECRET
            </label>
            <input
              value={apiSecret} onChange={(e) => setApiSecret(e.target.value)}
              type="password" placeholder="••••••••••••••••••••"
              style={inputStyle}
            />
          </div>
          <button onClick={handleConnect} disabled={connecting || connected} style={{
            padding: "12px",
            background: connected ? "#052e16" : "#1d4ed8",
            border: `1px solid ${connected ? "#16a34a" : "#3b82f6"}`,
            color: connected ? "#22c55e" : "#fff",
            borderRadius: 8, cursor: connected ? "default" : "pointer",
            fontSize: 13, fontFamily: "inherit", fontWeight: 600,
          }}>
            {connecting ? "Bağlanıyor..." : connected ? "✅ Bağlandı — Paper Trading Aktif" : "🔌 Bağlan"}
          </button>
        </div>
      </div>

      {/* Piyasa Seçimi */}
      <div style={{ background: "#0d1525", border: "1px solid #1e293b", borderRadius: 10, padding: 20 }}>
        <div style={{ fontSize: 11, color: "#38bdf8", letterSpacing: 2, marginBottom: 14 }}>
          📊 AKTİF PİYASALAR
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {MARKETS.map((m) => {
            const active = selectedMarkets.includes(m.symbol);
            return (
              <button key={m.symbol} onClick={() => toggleMarket(m.symbol)} style={{
                padding: "7px 14px",
                background: active ? "#0a1628" : "transparent",
                border: `1px solid ${active ? TYPE_COLORS[m.type] : "#1e293b"}`,
                color: active ? TYPE_COLORS[m.type] : "#475569",
                borderRadius: 20, cursor: "pointer",
                fontSize: 12, fontFamily: "inherit", transition: "all 0.15s",
              }}>
                {m.icon} {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Strateji Seçimi */}
      <div style={{ background: "#0d1525", border: "1px solid #1e293b", borderRadius: 10, padding: 20 }}>
        <div style={{ fontSize: 11, color: "#38bdf8", letterSpacing: 2, marginBottom: 14 }}>
          🧠 STRATEJİ SEÇİMİ
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {STRATEGIES.map((s) => (
            <button key={s.id} onClick={() => setActiveStrategy(s.id)} style={{
              padding: "14px",
              background: activeStrategy === s.id ? "#0a1628" : "transparent",
              border: `1px solid ${activeStrategy === s.id ? "#38bdf8" : "#1e293b"}`,
              borderRadius: 8, cursor: "pointer",
              textAlign: "left", fontFamily: "inherit", transition: "all 0.15s",
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: activeStrategy === s.id ? "#38bdf8" : "#94a3b8", marginBottom: 4 }}>
                {s.name}
              </div>
              <div style={{ fontSize: 10, color: "#475569", marginBottom: 6 }}>{s.desc}</div>
              <div style={{
                display: "inline-block", fontSize: 9,
                color: "#f59e0b", background: "#1c1000",
                border: "1px solid #92400e", borderRadius: 4, padding: "2px 6px",
              }}>
                {s.timeframe}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Risk Yönetimi */}
      <div style={{ background: "#0d1525", border: "1px solid #1e293b", borderRadius: 10, padding: 20 }}>
        <div style={{ fontSize: 11, color: "#38bdf8", letterSpacing: 2, marginBottom: 14 }}>
          🛡️ RİSK YÖNETİMİ
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {[
            { label: "RİSK / İŞLEM (%)", val: riskPct, set: setRiskPct, min: 0.5, max: 10, step: 0.5, color: "#f59e0b" },
            { label: "STOP LOSS (%)", val: stopLossPct, set: setStopLossPct, min: 0.5, max: 10, step: 0.5, color: "#f87171" },
            { label: "TAKE PROFIT (%)", val: takeProfitPct, set: setTakeProfitPct, min: 1, max: 20, step: 0.5, color: "#34d399" },
          ].map((r, i) => (
            <div key={i}>
              <label style={{ fontSize: 9, color: "#475569", display: "block", marginBottom: 6, letterSpacing: 1 }}>
                {r.label}
              </label>
              <input
                type="range" min={r.min} max={r.max} step={r.step} value={r.val}
                onChange={(e) => r.set(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: r.color }}
              />
              <div style={{ fontSize: 16, fontWeight: 600, color: r.color, marginTop: 4 }}>{r.val}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
