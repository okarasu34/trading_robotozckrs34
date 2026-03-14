// ============================================================
// TOP BAR BİLEŞENİ
// ============================================================
export default function TopBar({ connected, robotActive, equity, totalPnl }) {
  const equityColor = equity >= 10000 ? "#34d399" : "#f87171";
  const pnlColor = totalPnl >= 0 ? "#34d399" : "#f87171";

  return (
    <div style={{
      background: "#0a0f1a",
      borderBottom: "1px solid #1e293b",
      padding: "0 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 52,
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, #1d4ed8, #0ea5e9)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
        }}>⚡</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", letterSpacing: 1 }}>
            CAPITAL ROBOT
          </div>
          <div style={{ fontSize: 9, color: "#475569", letterSpacing: 2 }}>
            PAPER TRADING v1.0
          </div>
        </div>
      </div>

      {/* Stats + Status */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {connected && (
          <>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "#475569" }}>EQUITY</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: equityColor }}>
                ${equity.toLocaleString()}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "#475569" }}>P&L</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: pnlColor }}>
                {totalPnl >= 0 ? "+" : ""}{totalPnl.toFixed(2)}$
              </div>
            </div>
          </>
        )}

        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "4px 12px", borderRadius: 20,
          background: connected ? "#052e16" : "#1c0a00",
          border: `1px solid ${connected ? "#16a34a" : "#92400e"}`,
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: connected ? "#22c55e" : "#f59e0b",
            animation: connected && robotActive ? "blink 1s infinite" : "none",
          }} />
          <span style={{ fontSize: 11, color: connected ? "#22c55e" : "#f59e0b" }}>
            {connected ? (robotActive ? "ÇALIŞIYOR" : "HAZIR") : "BAĞLI DEĞİL"}
          </span>
        </div>
      </div>
    </div>
  );
}
