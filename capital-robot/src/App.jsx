import { useState } from "react";
import { useRobot } from "./hooks/useRobot";
import TopBar from "./components/TopBar";
import Dashboard from "./components/Dashboard";
import Setup from "./components/Setup";
import { Positions, History, Logs } from "./components/Panels";
import "./index.css";

// ============================================================
// ANA UYGULAMA
// ============================================================
export default function App() {
  const [tab, setTab] = useState("dashboard");
  const robot = useRobot();

  const TABS = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "setup", label: "⚙️ Kurulum" },
    { id: "positions", label: `📂 Pozisyonlar${robot.openPositions.length > 0 ? ` (${robot.openPositions.length})` : ""}` },
    { id: "history", label: `📋 Geçmiş${robot.trades.length > 0 ? ` (${robot.trades.length})` : ""}` },
    { id: "logs", label: "🖥️ Loglar" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080c14",
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      color: "#94a3b8",
      display: "flex",
      flexDirection: "column",
    }}>
      <TopBar
        connected={robot.connected}
        robotActive={robot.robotActive}
        equity={robot.equity}
        totalPnl={robot.stats.totalPnl}
      />

      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: "1px solid #1e293b", background: "#0a0f1a", padding: "0 20px" }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "10px 16px", background: "transparent", border: "none",
            borderBottom: `2px solid ${tab === t.id ? "#38bdf8" : "transparent"}`,
            color: tab === t.id ? "#38bdf8" : "#475569",
            cursor: "pointer", fontSize: 12, fontFamily: "inherit",
            transition: "all 0.15s", marginBottom: -1,
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* İçerik */}
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        {tab === "dashboard" && (
          <Dashboard
            connected={robot.connected}
            robotActive={robot.robotActive}
            toggleRobot={robot.toggleRobot}
            setTab={setTab}
            balance={robot.balance}
            equity={robot.equity}
            stats={robot.stats}
            prices={robot.prices}
            openPositions={robot.openPositions}
            activeStrategy={robot.activeStrategy}
            selectedMarkets={robot.selectedMarkets}
            riskPct={robot.riskPct}
            stopLossPct={robot.stopLossPct}
            takeProfitPct={robot.takeProfitPct}
          />
        )}
        {tab === "setup" && (
          <Setup
            connected={robot.connected}
            connecting={robot.connecting}
            connect={robot.connect}
            selectedMarkets={robot.selectedMarkets}
            toggleMarket={robot.toggleMarket}
            activeStrategy={robot.activeStrategy}
            setActiveStrategy={robot.setActiveStrategy}
            riskPct={robot.riskPct} setRiskPct={robot.setRiskPct}
            stopLossPct={robot.stopLossPct} setStopLossPct={robot.setStopLossPct}
            takeProfitPct={robot.takeProfitPct} setTakeProfitPct={robot.setTakeProfitPct}
          />
        )}
        {tab === "positions" && (
          <Positions openPositions={robot.openPositions} prices={robot.prices} />
        )}
        {tab === "history" && (
          <History trades={robot.trades} />
        )}
        {tab === "logs" && (
          <Logs logs={robot.logs} />
        )}
      </div>
    </div>
  );
}
