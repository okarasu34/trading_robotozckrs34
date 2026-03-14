import { useRef, useEffect } from "react";
import { calcPnL, formatPrice } from "../utils/trading";

// ============================================================
// AÇIK POZİSYONLAR
// ============================================================
export function Positions({ openPositions, prices }) {
  return (
    <div style={{ background: "#0d1525", border: "1px solid #1e293b", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #1e293b", fontSize: 11, color: "#94a3b8", letterSpacing: 2 }}>
        AÇIK POZİSYONLAR ({openPositions.length})
      </div>
      {openPositions.length === 0 ? (
        <div style={{ padding: 40, textAlign: "center", color: "#475569", fontSize: 12 }}>
          Açık pozisyon yok. Robot çalışırken pozisyonlar burada görünür.
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1e293b" }}>
              {["SEMBOL", "YÖN", "GİRİŞ", "GÜNCEL", "P&L", "BOYUT", "STRATEJİ", "AÇILIŞ"].map((h) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#475569", fontSize: 10, letterSpacing: 1, fontWeight: 500 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {openPositions.map((p) => {
              const curr = prices[p.symbol] || p.entry;
              const pnl = calcPnL(p.entry, curr, p.side, p.size);
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid #0f172a", animation: "slideIn 0.2s ease" }}>
                  <td style={{ padding: "10px 14px", color: "#e2e8f0", fontWeight: 600 }}>{p.symbol}</td>
                  <td style={{ padding: "10px 14px", color: p.side === "BUY" ? "#34d399" : "#f87171" }}>{p.side}</td>
                  <td style={{ padding: "10px 14px", color: "#94a3b8" }}>{formatPrice(p.entry, p.symbol)}</td>
                  <td style={{ padding: "10px 14px", color: "#e2e8f0" }}>{formatPrice(curr, p.symbol)}</td>
                  <td style={{ padding: "10px 14px", color: pnl >= 0 ? "#34d399" : "#f87171", fontWeight: 600 }}>
                    {pnl >= 0 ? "+" : ""}{pnl.toFixed(2)}$
                  </td>
                  <td style={{ padding: "10px 14px", color: "#94a3b8" }}>${p.size}</td>
                  <td style={{ padding: "10px 14px", color: "#38bdf8", fontSize: 10 }}>{p.strategy}</td>
                  <td style={{ padding: "10px 14px", color: "#475569", fontSize: 10 }}>{p.openedAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ============================================================
// KAPALI İŞLEM GEÇMİŞİ
// ============================================================
export function History({ trades }) {
  return (
    <div style={{ background: "#0d1525", border: "1px solid #1e293b", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #1e293b", fontSize: 11, color: "#94a3b8", letterSpacing: 2 }}>
        KAPALI İŞLEMLER ({trades.length})
      </div>
      {trades.length === 0 ? (
        <div style={{ padding: 40, textAlign: "center", color: "#475569", fontSize: 12 }}>
          Henüz kapanmış işlem yok.
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1e293b" }}>
              {["SEMBOL", "YÖN", "GİRİŞ", "ÇIKIŞ", "P&L", "DURUM", "KAPANIS"].map((h) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#475569", fontSize: 10, letterSpacing: 1, fontWeight: 500 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trades.map((t, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #0f172a" }}>
                <td style={{ padding: "10px 14px", color: "#e2e8f0", fontWeight: 600 }}>{t.symbol}</td>
                <td style={{ padding: "10px 14px", color: t.side === "BUY" ? "#34d399" : "#f87171" }}>{t.side}</td>
                <td style={{ padding: "10px 14px", color: "#94a3b8" }}>{formatPrice(t.entry, t.symbol)}</td>
                <td style={{ padding: "10px 14px", color: "#94a3b8" }}>{formatPrice(t.exitPrice, t.symbol)}</td>
                <td style={{ padding: "10px 14px", color: t.pnl >= 0 ? "#34d399" : "#f87171", fontWeight: 600 }}>
                  {t.pnl >= 0 ? "+" : ""}{t.pnl}$
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{
                    fontSize: 10, padding: "2px 8px", borderRadius: 4,
                    background: t.status === "TP" ? "#052e16" : "#2d0a0a",
                    color: t.status === "TP" ? "#22c55e" : "#f87171",
                    border: `1px solid ${t.status === "TP" ? "#16a34a" : "#dc2626"}`,
                  }}>
                    {t.status}
                  </span>
                </td>
                <td style={{ padding: "10px 14px", color: "#475569", fontSize: 10 }}>{t.closedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ============================================================
// LOG PANELİ
// ============================================================
export function Logs({ logs }) {
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

  return (
    <div style={{
      background: "#060a10", border: "1px solid #1e293b",
      borderRadius: 10, padding: 14,
      fontFamily: "monospace", fontSize: 12,
      height: "60vh", overflowY: "auto",
    }}>
      {logs.length === 0 && (
        <div style={{ color: "#475569" }}>Henüz log yok. Bağlanın ve robotu başlatın.</div>
      )}
      {logs.map((l, i) => (
        <div key={i} style={{
          padding: "3px 0",
          color: l.type === "success" ? "#22c55e"
            : l.type === "danger" ? "#f87171"
            : l.type === "warn" ? "#f59e0b"
            : l.type === "trade" ? "#38bdf8"
            : "#64748b",
          animation: "slideIn 0.15s ease",
        }}>
          <span style={{ color: "#334155", marginRight: 10 }}>[{l.time}]</span>
          {l.msg}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
