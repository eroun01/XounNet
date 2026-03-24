"use client";
import React from "react";
import {
  DollarSign, Users, Wifi, FileText, Activity,
  ArrowRight, CheckCircle, Clock, AlertTriangle,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend,
} from "recharts";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/shared/Badge";
import { formatCurrency, formatRelativeTime } from "@/lib/utils/formatters";
import Link from "next/link";

// ── Mock data ─────────────────────────────────────────────────────────────────
const revenueData = [
  { month: "Oct", revenue: 18_200_000, target: 20_000_000 },
  { month: "Nov", revenue: 21_500_000, target: 22_000_000 },
  { month: "Dec", revenue: 19_800_000, target: 22_000_000 },
  { month: "Jan", revenue: 24_100_000, target: 25_000_000 },
  { month: "Feb", revenue: 22_700_000, target: 25_000_000 },
  { month: "Mar", revenue: 26_400_000, target: 28_000_000 },
];

const customerGrowth = [
  { month: "Oct", active: 1_420, new: 80, churned: 12 },
  { month: "Nov", active: 1_510, new: 103, churned: 13 },
  { month: "Dec", active: 1_590, new: 95, churned: 16 },
  { month: "Jan", active: 1_680, new: 110, churned: 20 },
  { month: "Feb", active: 1_740, new: 78, churned: 18 },
  { month: "Mar", active: 1_830, new: 105, churned: 15 },
];

const recentPayments = [
  { id: "1", customer: "Kato Brian", amount: 85_000, method: "MTN MoMo", status: "COMPLETED", time: "2026-03-24T06:45:00Z" },
  { id: "2", customer: "Aisha Namutebi", amount: 120_000, method: "Airtel Money", status: "COMPLETED", time: "2026-03-24T06:12:00Z" },
  { id: "3", customer: "Ssemakula John", amount: 200_000, method: "Bank Transfer", status: "PENDING", time: "2026-03-24T05:55:00Z" },
  { id: "4", customer: "Grace Akello", amount: 65_000, method: "MTN MoMo", status: "FAILED", time: "2026-03-24T05:30:00Z" },
  { id: "5", customer: "David Ogen", amount: 150_000, method: "Card", status: "COMPLETED", time: "2026-03-24T04:50:00Z" },
];

const activeAlerts = [
  { id: "1", msg: "Router KLA-MAIN-01 CPU at 92%", severity: "warning", time: "3m ago" },
  { id: "2", msg: "Link down: Entebbe branch uplink", severity: "critical", time: "8m ago" },
  { id: "3", msg: "Unusual traffic spike on 41 accounts", severity: "warning", time: "22m ago" },
];

const paymentStatusBadge = {
  COMPLETED: <Badge variant="success" dot>Completed</Badge>,
  PENDING: <Badge variant="warning" dot>Pending</Badge>,
  FAILED: <Badge variant="danger" dot>Failed</Badge>,
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-white text-xl font-semibold">Overview</h1>
        <p className="text-surface-400 text-sm mt-0.5">Monday, 24 March 2026</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Revenue (Mar)"
          value="UGX 26.4M"
          change={16.3}
          changeLabel="vs Feb"
          icon={<DollarSign className="w-4.5 h-4.5" />}
          iconBg="bg-primary/10"
          accent="text-primary"
        />
        <StatCard
          title="Active Customers"
          value="1,830"
          change={5.2}
          changeLabel="vs last month"
          icon={<Users className="w-4.5 h-4.5" />}
          iconBg="bg-accent/10"
          accent="text-accent"
        />
        <StatCard
          title="Active Sessions"
          value="847"
          change={-2.1}
          changeLabel="vs yesterday"
          icon={<Wifi className="w-4.5 h-4.5" />}
          iconBg="bg-info/10"
          accent="text-info"
        />
        <StatCard
          title="Pending Invoices"
          value="UGX 4.1M"
          change={-8.4}
          changeLabel="vs last week"
          icon={<FileText className="w-4.5 h-4.5" />}
          iconBg="bg-warning/10"
          accent="text-warning"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-surface-800 border border-surface-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-semibold">Revenue vs Target</h3>
              <p className="text-surface-400 text-xs mt-0.5">Last 6 months</p>
            </div>
            <Link href="/analytics" className="text-primary text-xs hover:underline flex items-center gap-1">
              Full report <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066ff" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0066ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }}
                labelStyle={{ color: "#94a3b8" }}
                formatter={(v) => [`UGX ${(typeof v === 'number' ? v / 1_000_000 : 0).toFixed(1)}M`, ""]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#0066ff" strokeWidth={2}
                fill="url(#revGrad)" name="Revenue" />
              <Area type="monotone" dataKey="target" stroke="#334155" strokeWidth={1.5}
                fill="none" strokeDasharray="4 3" name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Customer growth */}
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-semibold">Customer Growth</h3>
              <p className="text-surface-400 text-xs mt-0.5">New vs churned</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={customerGrowth} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }}
                labelStyle={{ color: "#94a3b8" }} />
              <Bar dataKey="new" fill="#00d4aa" radius={[3, 3, 0, 0]} name="New" />
              <Bar dataKey="churned" fill="#ef4444" radius={[3, 3, 0, 0]} name="Churned" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent payments */}
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Recent Payments</h3>
            <Link href="/payments" className="text-primary text-xs hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentPayments.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-700 flex items-center justify-center text-surface-300 text-xs font-bold shrink-0">
                  {p.customer[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{p.customer}</p>
                  <p className="text-surface-500 text-xs">{p.method} · {formatRelativeTime(p.time)}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">UGX {p.amount.toLocaleString()}</p>
                  {paymentStatusBadge[p.status as keyof typeof paymentStatusBadge]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network alerts */}
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Network Alerts</h3>
            <Link href="/noc" className="text-primary text-xs hover:underline flex items-center gap-1">
              NOC <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {activeAlerts.map((a) => (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg bg-surface-700/50 border border-surface-700">
                {a.severity === "critical" ? (
                  <AlertTriangle className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                ) : (
                  <Activity className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-surface-200 text-sm">{a.msg}</p>
                  <p className="text-surface-500 text-xs mt-0.5">{a.time}</p>
                </div>
                <Badge variant={a.severity === "critical" ? "danger" : "warning"}>
                  {a.severity}
                </Badge>
              </div>
            ))}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-surface-700">
            {[
              { label: "Routers Online", value: "12/14", icon: <CheckCircle className="w-4 h-4 text-success" /> },
              { label: "Active Sessions", value: "847", icon: <Wifi className="w-4 h-4 text-info" /> },
              { label: "Uptime", value: "99.8%", icon: <Clock className="w-4 h-4 text-accent" /> },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="flex justify-center mb-1">{s.icon}</div>
                <p className="text-white text-sm font-semibold">{s.value}</p>
                <p className="text-surface-500 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
