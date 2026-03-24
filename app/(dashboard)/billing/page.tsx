"use client";
import React, { useState } from "react";
import { Plus, Download, RefreshCw, Zap, FileText, Calendar, DollarSign } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { StatCard } from "@/components/dashboard/StatCard";
import { cn } from "@/lib/utils";

const TABS = ["Plans", "Subscriptions", "Invoices", "Tax Engine"];

const PLANS = [
  { id: "1", name: "Home 5Mbps", type: "SHARED", down: 5, up: 2, price: 60_000, cycle: "Monthly", subs: 340, active: true },
  { id: "2", name: "Home 10Mbps", type: "SHARED", down: 10, up: 5, price: 85_000, cycle: "Monthly", subs: 520, active: true },
  { id: "3", name: "Business 20Mbps", type: "DEDICATED", down: 20, up: 10, price: 180_000, cycle: "Monthly", subs: 210, active: true },
  { id: "4", name: "Corporate 50Mbps", type: "DEDICATED", down: 50, up: 25, price: 350_000, cycle: "Monthly", subs: 95, active: true },
  { id: "5", name: "Corporate 100Mbps", type: "DEDICATED", down: 100, up: 50, price: 600_000, cycle: "Monthly", subs: 45, active: true },
  { id: "6", name: "Hotspot Daily", type: "HOTSPOT", down: 10, up: 5, price: 2_000, cycle: "Daily", subs: 180, active: true },
];

const INVOICES = [
  { id: "INV-2403001", customer: "Kato Brian", amount: 85_000, status: "PAID", due: "2026-03-01", period: "Mar 2026" },
  { id: "INV-2403002", customer: "Aisha Namutebi", amount: 85_000, status: "PAID", due: "2026-03-01", period: "Mar 2026" },
  { id: "INV-2403003", customer: "Ssemakula Enterprises", amount: 350_000, status: "OVERDUE", due: "2026-03-15", period: "Mar 2026" },
  { id: "INV-2403004", customer: "Grace Akello", amount: 60_000, status: "SENT", due: "2026-03-30", period: "Mar 2026" },
  { id: "INV-2403005", customer: "David Ogen", amount: 85_000, status: "DRAFT", due: "2026-04-01", period: "Apr 2026" },
];

const INV_BADGE = {
  PAID: <Badge variant="success" dot>Paid</Badge>,
  OVERDUE: <Badge variant="danger" dot>Overdue</Badge>,
  SENT: <Badge variant="info" dot>Sent</Badge>,
  DRAFT: <Badge variant="muted" dot>Draft</Badge>,
};

export default function BillingPage() {
  const [tab, setTab] = useState("Plans");

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-white text-xl font-semibold">Billing Engine</h1>
          <p className="text-surface-400 text-sm mt-0.5">Manage plans, invoices & subscriptions</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 border border-surface-700 text-surface-300 hover:text-white hover:border-surface-500 text-sm rounded-lg px-3 py-2 transition">
            <RefreshCw className="w-3.5 h-3.5" /> Run Billing
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg px-4 py-2 transition">
            <Plus className="w-4 h-4" /> New Invoice
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Monthly Recurring" value="UGX 156M" change={8.2} changeLabel="MoM" icon={<DollarSign className="w-4.5 h-4.5" />} />
        <StatCard title="Paid This Month" value="UGX 142M" change={5.4} changeLabel="vs target" icon={<FileText className="w-4.5 h-4.5" />} iconBg="bg-success/10" accent="text-success" />
        <StatCard title="Overdue" value="UGX 14M" change={-3.1} changeLabel="vs last month" icon={<Calendar className="w-4.5 h-4.5" />} iconBg="bg-danger/10" accent="text-danger" />
        <StatCard title="Active Subscriptions" value="1,390" change={3.8} changeLabel="vs last month" icon={<Zap className="w-4.5 h-4.5" />} iconBg="bg-accent/10" accent="text-accent" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-800 border border-surface-700 rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("text-sm px-4 py-1.5 rounded-lg transition",
              tab === t ? "bg-primary text-white" : "text-surface-400 hover:text-white")}>{t}</button>
        ))}
      </div>

      {/* Plans tab */}
      {tab === "Plans" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-surface-700">
            {PLANS.map((p) => (
              <div key={p.id} className="p-5 hover:bg-surface-700/30 transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold">{p.name}</h3>
                    <Badge variant={p.type === "DEDICATED" ? "primary" : p.type === "HOTSPOT" ? "accent" : "muted"} className="mt-1">
                      {p.type}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">UGX {p.price.toLocaleString()}</p>
                    <p className="text-surface-400 text-xs">/{p.cycle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-surface-400 mb-3">
                  <span>↓ {p.down} Mbps</span>
                  <span>↑ {p.up} Mbps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-surface-400 text-xs">{p.subs} subscribers</span>
                  <div className="flex gap-2">
                    <button className="text-xs text-primary hover:underline">Edit</button>
                    <button className="text-xs text-surface-400 hover:text-white">Disable</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoices tab */}
      {tab === "Invoices" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-700">
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Invoice #</th>
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Customer</th>
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Period</th>
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Amount</th>
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Due</th>
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {INVOICES.map((inv) => (
                  <tr key={inv.id} className="border-b border-surface-700/50 hover:bg-surface-700/30 transition">
                    <td className="px-4 py-3 text-primary font-mono text-xs">{inv.id}</td>
                    <td className="px-4 py-3 text-white">{inv.customer}</td>
                    <td className="px-4 py-3 text-surface-400">{inv.period}</td>
                    <td className="px-4 py-3 text-white font-medium">UGX {inv.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-surface-400">{inv.due}</td>
                    <td className="px-4 py-3">{INV_BADGE[inv.status as keyof typeof INV_BADGE]}</td>
                    <td className="px-4 py-3">
                      <button className="text-surface-400 hover:text-white transition">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "Tax Engine" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-6 space-y-6">
          <h3 className="text-white font-semibold">Tax Engine Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: "VAT Rate", value: "18%", desc: "Uganda standard VAT rate" },
              { label: "Excise Duty (OTT)", value: "12%", desc: "Over-the-top services tax" },
              { label: "Withholding Tax", value: "6%", desc: "Applied to business payments" },
              { label: "Grace Period", value: "7 days", desc: "After due date before late fee" },
            ].map((t) => (
              <div key={t.label} className="p-4 bg-surface-700/50 rounded-xl border border-surface-700">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-white font-medium">{t.label}</p>
                  <span className="text-primary font-bold">{t.value}</span>
                </div>
                <p className="text-surface-400 text-xs">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Subscriptions" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-6">
          <p className="text-surface-400 text-sm">Subscription management view — assign plans to customers, set billing dates, auto-suspend rules, grace periods.</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ label: "Auto-Renew ON", v: "1,240" }, { label: "Expiring in 7d", v: "68" }, { label: "In Grace Period", v: "23" }, { label: "Auto-Suspended", v: "47" }].map((s) => (
              <div key={s.label} className="p-4 bg-surface-700/50 rounded-xl border border-surface-700 text-center">
                <p className="text-white text-xl font-bold">{s.v}</p>
                <p className="text-surface-400 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
