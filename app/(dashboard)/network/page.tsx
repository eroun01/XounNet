"use client";
import React, { useState } from "react";
import { Plus, Cpu, HardDrive, Thermometer, Wifi, Network, Server, Activity } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { cn } from "@/lib/utils";
import { formatDuration, formatBandwidth, formatBytes } from "@/lib/utils/formatters";

const TABS = ["Routers", "Sessions", "IPAM", "Provisioning"];

const ROUTERS = [
  { id: "1", name: "KLA-MAIN-01", model: "CCR2004-16G-2S+", ip: "10.0.0.1", status: "ONLINE", uptime: 2_592_000, cpu: 92, mem: 45, temp: 52, sessions: 280, txBps: 45_000_000, rxBps: 120_000_000, location: "Kampala HQ" },
  { id: "2", name: "KLA-MAIN-02", model: "CCR1036-8G-2S+", ip: "10.0.0.2", status: "ONLINE", uptime: 1_296_000, cpu: 38, mem: 62, temp: 45, sessions: 195, txBps: 28_000_000, rxBps: 75_000_000, location: "Kampala HQ" },
  { id: "3", name: "ENT-BRANCH-01", model: "RB4011iGS+", ip: "10.1.0.1", status: "DEGRADED", uptime: 604_800, cpu: 71, mem: 78, temp: 61, sessions: 87, txBps: 8_000_000, rxBps: 22_000_000, location: "Entebbe Branch" },
  { id: "4", name: "GULU-BR-01", model: "CCR1036-8G-2S+", ip: "10.2.0.1", status: "OFFLINE", uptime: 0, cpu: 0, mem: 0, temp: 0, sessions: 0, txBps: 0, rxBps: 0, location: "Gulu Branch" },
  { id: "5", name: "MBARARA-BR-01", model: "RB3011UiAS", ip: "10.3.0.1", status: "ONLINE", uptime: 345_600, cpu: 22, mem: 35, temp: 38, sessions: 64, txBps: 5_500_000, rxBps: 14_000_000, location: "Mbarara Branch" },
];

const IP_POOLS = [
  { id: "1", name: "Kampala-Pool-1", network: "192.168.1.0/24", total: 254, used: 198, gateway: "192.168.1.1" },
  { id: "2", name: "Kampala-Pool-2", network: "192.168.2.0/24", total: 254, used: 145, gateway: "192.168.2.1" },
  { id: "3", name: "Entebbe-Pool", network: "10.1.1.0/24", total: 254, used: 87, gateway: "10.1.1.1" },
  { id: "4", name: "Gulu-Pool", network: "10.2.1.0/24", total: 254, used: 0, gateway: "10.2.1.1" },
];

const STATUS_BADGE = {
  ONLINE: <Badge variant="success" dot>Online</Badge>,
  OFFLINE: <Badge variant="danger" dot>Offline</Badge>,
  DEGRADED: <Badge variant="warning" dot>Degraded</Badge>,
  MAINTENANCE: <Badge variant="muted" dot>Maintenance</Badge>,
};

function UsageBar({ value, warn = 70, danger = 90 }: { value: number; warn?: number; danger?: number }) {
  const color = value >= danger ? "bg-danger" : value >= warn ? "bg-warning" : "bg-success";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-surface-600 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
      <span className={cn("text-xs", value >= danger ? "text-danger" : value >= warn ? "text-warning" : "text-surface-300")}>
        {value}%
      </span>
    </div>
  );
}

export default function NetworkPage() {
  const [tab, setTab] = useState("Routers");

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-white text-xl font-semibold">Network Management</h1>
          <p className="text-surface-400 text-sm mt-0.5">MikroTik routers · FreeRADIUS · IPAM</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg px-4 py-2 transition shrink-0">
          <Plus className="w-4 h-4" /> Add Router
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Routers Online", value: `${ROUTERS.filter(r => r.status === "ONLINE").length}/${ROUTERS.length}`, icon: <Server className="w-4.5 h-4.5" />, color: "bg-success/10 text-success" },
          { label: "Active Sessions", value: `${ROUTERS.reduce((a, r) => a + r.sessions, 0)}`, icon: <Wifi className="w-4.5 h-4.5" />, color: "bg-primary/10 text-primary" },
          { label: "Total Bandwidth", value: formatBandwidth(ROUTERS.reduce((a, r) => a + r.txBps + r.rxBps, 0)), icon: <Activity className="w-4.5 h-4.5" />, color: "bg-accent/10 text-accent" },
          { label: "IP Utilization", value: "73%", icon: <Network className="w-4.5 h-4.5" />, color: "bg-warning/10 text-warning" },
        ].map((s) => (
          <div key={s.label} className="bg-surface-800 border border-surface-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-surface-400 text-xs">{s.label}</p>
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", s.color.split(" ")[0])}><span className={s.color.split(" ")[1]}>{s.icon}</span></div>
            </div>
            <p className="text-white font-bold text-xl">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-800 border border-surface-700 rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("text-sm px-4 py-1.5 rounded-lg transition", tab === t ? "bg-primary text-white" : "text-surface-400 hover:text-white")}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Routers" && (
        <div className="space-y-3">
          {ROUTERS.map((r) => (
            <div key={r.id} className="bg-surface-800 border border-surface-700 rounded-xl p-4 hover:border-surface-600 transition">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={cn("w-3 h-3 rounded-full shrink-0",
                    r.status === "ONLINE" ? "bg-success" : r.status === "DEGRADED" ? "bg-warning" : "bg-danger")} />
                  <div className="min-w-0">
                    <p className="text-white font-semibold">{r.name}</p>
                    <p className="text-surface-400 text-xs">{r.model} · {r.ip} · {r.location}</p>
                  </div>
                  {STATUS_BADGE[r.status as keyof typeof STATUS_BADGE]}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-surface-400 text-xs mb-1 flex items-center gap-1"><Cpu className="w-3 h-3" />CPU</p>
                    <UsageBar value={r.cpu} />
                  </div>
                  <div>
                    <p className="text-surface-400 text-xs mb-1 flex items-center gap-1"><HardDrive className="w-3 h-3" />RAM</p>
                    <UsageBar value={r.mem} />
                  </div>
                  <div>
                    <p className="text-surface-400 text-xs mb-1 flex items-center gap-1"><Thermometer className="w-3 h-3" />Temp</p>
                    <span className={cn("text-xs", r.temp > 55 ? "text-danger" : r.temp > 45 ? "text-warning" : "text-surface-300")}>
                      {r.temp ? `${r.temp}°C` : "—"}
                    </span>
                  </div>
                  <div>
                    <p className="text-surface-400 text-xs mb-1">Sessions</p>
                    <p className="text-white text-xs font-medium">{r.sessions}</p>
                  </div>
                  <div>
                    <p className="text-surface-400 text-xs mb-1">Uptime</p>
                    <p className="text-white text-xs">{r.uptime ? formatDuration(r.uptime) : "—"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "IPAM" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-700">
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Pool Name</th>
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Network</th>
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Gateway</th>
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Utilization</th>
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Used / Total</th>
                </tr>
              </thead>
              <tbody>
                {IP_POOLS.map((pool) => (
                  <tr key={pool.id} className="border-b border-surface-700/50 hover:bg-surface-700/30 transition">
                    <td className="px-4 py-3 text-white font-medium">{pool.name}</td>
                    <td className="px-4 py-3 text-surface-300 font-mono text-xs">{pool.network}</td>
                    <td className="px-4 py-3 text-surface-300 font-mono text-xs">{pool.gateway}</td>
                    <td className="px-4 py-3"><UsageBar value={Math.round((pool.used / pool.total) * 100)} /></td>
                    <td className="px-4 py-3 text-surface-300">{pool.used} / {pool.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "Sessions" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
          <p className="text-surface-400 text-sm">Live session list from FreeRADIUS — PPPoE & Hotspot sessions with bandwidth usage, MAC address, connected time.</p>
          <div className="mt-4 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-surface-700/40 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-white text-xs font-mono w-28">user{String(i + 100).padStart(4, "0")}</span>
                <span className="text-surface-400 text-xs font-mono flex-1">192.168.{i + 1}.{10 + i}</span>
                <span className="text-surface-400 text-xs">{formatBandwidth((i + 1) * 2_500_000)}</span>
                <Badge variant="success">PPPoE</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Provisioning" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-5 space-y-4">
          <h3 className="text-white font-semibold">Zero-Touch Provisioning</h3>
          <p className="text-surface-400 text-sm">Auto-provision new subscribers to MikroTik routers via API. Set credentials, assign IP from pool, apply QoS profile.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Auto-provisioned today", value: "14", color: "text-success" },
              { label: "Pending provisioning", value: "3", color: "text-warning" },
              { label: "Failed provisioning", value: "1", color: "text-danger" },
            ].map((s) => (
              <div key={s.label} className="p-4 bg-surface-700/50 rounded-xl border border-surface-700 text-center">
                <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
                <p className="text-surface-400 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
