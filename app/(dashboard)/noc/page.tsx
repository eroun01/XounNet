"use client";
import React, { useEffect, useRef, useState } from "react";
import { Activity, AlertTriangle, CheckCircle, Wifi, WifiOff, RefreshCw } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import { Badge } from "@/components/shared/Badge";
import { useNetworkStore } from "@/store/network.store";
import { formatBandwidth } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils";

// Simulate live bandwidth data on client
function useLiveBandwidth() {
  const [data, setData] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      t: i,
      tx: 80_000_000 + Math.random() * 40_000_000,
      rx: 200_000_000 + Math.random() * 80_000_000,
    }))
  );
  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const next = [...prev.slice(1), {
          t: (prev[prev.length - 1]?.t ?? 0) + 1,
          tx: 80_000_000 + Math.random() * 40_000_000,
          rx: 200_000_000 + Math.random() * 80_000_000,
        }];
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return data;
}

const ALERTS = [
  { id: "1", router: "KLA-MAIN-01", type: "HIGH_CPU", severity: "CRITICAL", msg: "CPU at 92% — threshold 85%", time: "3m ago" },
  { id: "2", router: "GULU-BR-01", type: "ROUTER_DOWN", severity: "CRITICAL", msg: "Router offline — no ping response", time: "8m ago" },
  { id: "3", router: "ENT-BRANCH-01", type: "HIGH_TEMPERATURE", severity: "WARNING", msg: "Temperature 61°C — threshold 55°C", time: "15m ago" },
  { id: "4", router: "KLA-MAIN-02", type: "HIGH_MEMORY", severity: "WARNING", msg: "RAM at 78% — threshold 75%", time: "32m ago" },
];

const SESSIONS_LIVE = [
  { user: "user0124", ip: "192.168.1.24", router: "KLA-MAIN-01", tx: 8_500_000, rx: 22_000_000, uptime: 3_600 },
  { user: "user0089", ip: "192.168.1.89", router: "KLA-MAIN-01", tx: 2_100_000, rx: 5_800_000, uptime: 7_200 },
  { user: "user0201", ip: "192.168.2.45", router: "KLA-MAIN-02", tx: 12_000_000, rx: 31_000_000, uptime: 900 },
  { user: "user0177", ip: "10.1.1.77", router: "ENT-BRANCH-01", tx: 1_500_000, rx: 4_200_000, uptime: 5_400 },
  { user: "user0342", ip: "192.168.1.100", router: "KLA-MAIN-01", tx: 6_800_000, rx: 18_500_000, uptime: 2_700 },
];

export default function NOCPage() {
  const { connected } = useNetworkStore();
  const bw = useLiveBandwidth();
  const latest = bw[bw.length - 1];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">NOC Dashboard</h1>
          <p className="text-surface-400 text-sm mt-0.5">Live network monitoring center</p>
        </div>
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium",
          connected
            ? "bg-success/10 border-success/30 text-success"
            : "bg-danger/10 border-danger/30 text-danger"
        )}>
          {connected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          {connected ? "WebSocket Connected" : "Disconnected — Demo Mode"}
        </div>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Routers Online", value: "3/5", color: "text-success" },
          { label: "Active Sessions", value: "626", color: "text-white" },
          { label: "Total TX", value: formatBandwidth(latest?.tx ?? 0), color: "text-primary" },
          { label: "Total RX", value: formatBandwidth(latest?.rx ?? 0), color: "text-accent" },
          { label: "Uptime SLA", value: "99.41%", color: "text-warning" },
        ].map((s) => (
          <div key={s.label} className="bg-surface-800 border border-surface-700 rounded-xl p-4 text-center">
            <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
            <p className="text-surface-400 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Live bandwidth chart */}
      <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold">Live Bandwidth</h3>
            <p className="text-surface-400 text-xs mt-0.5">All routers · 1s refresh</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-primary"><span className="w-3 h-0.5 bg-primary inline-block" />TX</span>
            <span className="flex items-center gap-1.5 text-accent"><span className="w-3 h-0.5 bg-accent inline-block" />RX</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={bw} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="t" hide />
            <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false}
              tickFormatter={(v) => formatBandwidth(v)} />
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }}
              labelFormatter={() => "Now"}
              formatter={(v: number) => [formatBandwidth(v), ""]}
            />
            <Line type="monotone" dataKey="tx" stroke="#0066ff" strokeWidth={2} dot={false} isAnimationActive={false} name="TX" />
            <Line type="monotone" dataKey="rx" stroke="#00d4aa" strokeWidth={2} dot={false} isAnimationActive={false} name="RX" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Alerts + Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Alerts */}
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Active Alerts</h3>
            <Badge variant="danger">{ALERTS.filter(a => a.severity === "CRITICAL").length} Critical</Badge>
          </div>
          <div className="space-y-3">
            {ALERTS.map((a) => (
              <div key={a.id} className={cn(
                "flex items-start gap-3 p-3 rounded-lg border",
                a.severity === "CRITICAL"
                  ? "bg-danger/5 border-danger/20"
                  : "bg-warning/5 border-warning/20"
              )}>
                <AlertTriangle className={cn("w-4 h-4 mt-0.5 shrink-0",
                  a.severity === "CRITICAL" ? "text-danger" : "text-warning")} />
                <div className="flex-1 min-w-0">
                  <p className="text-surface-200 text-xs font-medium">{a.router}</p>
                  <p className="text-surface-400 text-xs mt-0.5">{a.msg}</p>
                  <p className="text-surface-600 text-xs mt-0.5">{a.time}</p>
                </div>
                <button className="text-xs text-surface-400 hover:text-white shrink-0">Resolve</button>
              </div>
            ))}
          </div>
        </div>

        {/* Live sessions */}
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Live Sessions</h3>
            <div className="flex items-center gap-1.5 text-success text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Live
            </div>
          </div>
          <div className="space-y-2">
            {SESSIONS_LIVE.map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-700/50 transition">
                <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                <span className="text-white text-xs font-mono w-20">{s.user}</span>
                <span className="text-surface-400 text-xs font-mono flex-1">{s.ip}</span>
                <div className="text-right">
                  <p className="text-primary text-xs">{formatBandwidth(s.tx)}</p>
                  <p className="text-accent text-xs">{formatBandwidth(s.rx)}</p>
                </div>
                <button className="text-xs text-danger hover:text-red-300 transition ml-2">Kick</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
