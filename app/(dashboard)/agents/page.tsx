"use client";
import React, { useState } from "react";
import { Plus, DollarSign, Users, UserCheck, TrendingUp } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { StatCard } from "@/components/dashboard/StatCard";
import { cn } from "@/lib/utils";

const AGENTS = [
  { id: "1", name: "Ssali Moses", phone: "+256 774 100 001", level: 1, customers: 145, sales: 12_325_000, commission: 1_232_500, commRate: 10, status: "ACTIVE", wallet: 680_000 },
  { id: "2", name: "Nakazibwe Ruth", phone: "+256 752 100 002", level: 1, customers: 98, sales: 8_330_000, commission: 833_000, commRate: 10, status: "ACTIVE", wallet: 420_000 },
  { id: "3", name: "Okello James", phone: "+256 703 100 003", level: 2, customers: 54, sales: 4_590_000, commission: 367_200, commRate: 8, status: "ACTIVE", wallet: 190_000 },
  { id: "4", name: "Nakigozi Sandra", phone: "+256 786 100 004", level: 2, customers: 32, sales: 2_720_000, commission: 217_600, commRate: 8, status: "INACTIVE", wallet: 50_000 },
  { id: "5", name: "Mwesigwa Peter", phone: "+256 775 100 005", level: 3, customers: 18, sales: 1_530_000, commission: 91_800, commRate: 6, status: "ACTIVE", wallet: 45_000 },
];

const STATUS_BADGE = {
  ACTIVE: <Badge variant="success" dot>Active</Badge>,
  INACTIVE: <Badge variant="muted" dot>Inactive</Badge>,
  SUSPENDED: <Badge variant="danger" dot>Suspended</Badge>,
};

export default function AgentsPage() {
  const [tab, setTab] = useState("Agents");
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Agents & Resellers</h1>
          <p className="text-surface-400 text-sm mt-0.5">Multi-level agent & franchise network</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg px-4 py-2 transition">
          <Plus className="w-4 h-4" /> Add Agent
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Agents" value="47" change={12} changeLabel="this month" icon={<UserCheck className="w-4.5 h-4.5" />} />
        <StatCard title="Agent Revenue" value="UGX 29M" change={8.4} changeLabel="vs last month" icon={<DollarSign className="w-4.5 h-4.5" />} iconBg="bg-success/10" accent="text-success" />
        <StatCard title="Commissions Paid" value="UGX 2.7M" change={6.2} changeLabel="this month" icon={<TrendingUp className="w-4.5 h-4.5" />} iconBg="bg-accent/10" accent="text-accent" />
        <StatCard title="Customers via Agents" value="347" change={15.3} changeLabel="vs last month" icon={<Users className="w-4.5 h-4.5" />} iconBg="bg-info/10" accent="text-info" />
      </div>

      <div className="flex gap-1 bg-surface-800 border border-surface-700 rounded-xl p-1 w-fit">
        {["Agents", "Commissions", "Hierarchy"].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("text-sm px-4 py-1.5 rounded-lg transition", tab === t ? "bg-primary text-white" : "text-surface-400 hover:text-white")}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Agents" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-700">
                  {["Agent", "Level", "Customers", "Total Sales", "Commission", "Rate", "Wallet", "Status"].map(h => (
                    <th key={h} className="text-left text-surface-400 font-medium px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AGENTS.map((a) => (
                  <tr key={a.id} className="border-b border-surface-700/50 hover:bg-surface-700/30 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{a.name[0]}</div>
                        <div>
                          <p className="text-white text-sm font-medium">{a.name}</p>
                          <p className="text-surface-500 text-xs">{a.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge variant={a.level === 1 ? "primary" : a.level === 2 ? "accent" : "muted"}>L{a.level}</Badge></td>
                    <td className="px-4 py-3 text-white font-medium">{a.customers}</td>
                    <td className="px-4 py-3 text-white">UGX {(a.sales / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3 text-success">UGX {(a.commission / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3 text-surface-300">{a.commRate}%</td>
                    <td className="px-4 py-3 text-accent">UGX {(a.wallet / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3">{STATUS_BADGE[a.status as keyof typeof STATUS_BADGE]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "Hierarchy" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-5 space-y-3">
          <h3 className="text-white font-semibold">Agent Hierarchy Tree</h3>
          {AGENTS.filter(a => a.level === 1).map(parent => (
            <div key={parent.id} className="border border-surface-700 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{parent.name[0]}</div>
                <div><p className="text-white font-semibold text-sm">{parent.name}</p><p className="text-surface-500 text-xs">Level 1 · {parent.customers} customers</p></div>
                <Badge variant="primary" className="ml-auto">L1 Master</Badge>
              </div>
              <div className="ml-10 mt-3 space-y-2">
                {AGENTS.filter(a => a.level === 2).slice(0, 2).map(sub => (
                  <div key={sub.id} className="flex items-center gap-3 p-2 bg-surface-700/40 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xs">{sub.name[0]}</div>
                    <div className="flex-1"><p className="text-surface-200 text-xs">{sub.name}</p><p className="text-surface-500 text-xs">Level 2 · {sub.customers} customers</p></div>
                    <Badge variant="accent">L2</Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Commissions" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
          <p className="text-surface-400 text-sm mb-4">Commission ledger — payments automatically credited to agent wallets on each successful customer payment.</p>
          <div className="space-y-2">
            {AGENTS.map(a => (
              <div key={a.id} className="flex items-center gap-4 p-3 bg-surface-700/40 rounded-lg">
                <span className="text-white text-sm flex-1">{a.name}</span>
                <span className="text-surface-400 text-xs">{a.commRate}% rate</span>
                <span className="text-success font-medium text-sm">UGX {a.commission.toLocaleString()}</span>
                <button className="text-xs bg-success/10 text-success border border-success/20 px-2 py-1 rounded-lg hover:bg-success/20 transition">Pay Out</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
