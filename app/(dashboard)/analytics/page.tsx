"use client";
import React, { useState } from "react";
import { BarChart3, TrendingUp, TrendingDown, Brain, Sparkles } from "lucide-react";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend, BarChart,
} from "recharts";
import { StatCard } from "@/components/dashboard/StatCard";
import { cn } from "@/lib/utils";

const REVENUE_TREND = [
  { month: "Oct", revenue: 18.2, target: 20, arpu: 10_200 },
  { month: "Nov", revenue: 21.5, target: 22, arpu: 11_100 },
  { month: "Dec", revenue: 19.8, target: 22, arpu: 10_500 },
  { month: "Jan", revenue: 24.1, target: 25, arpu: 11_800 },
  { month: "Feb", revenue: 22.7, target: 25, arpu: 11_400 },
  { month: "Mar", revenue: 26.4, target: 28, arpu: 12_100 },
  { month: "Apr (F)", revenue: 29.2, target: 30, arpu: 13_200, forecast: true },
  { month: "May (F)", revenue: 31.8, target: 33, arpu: 14_100, forecast: true },
];

const CHURN = [
  { month: "Oct", churned: 12, acquired: 80, net: 68 },
  { month: "Nov", churned: 13, acquired: 103, net: 90 },
  { month: "Dec", churned: 16, acquired: 95, net: 79 },
  { month: "Jan", churned: 20, acquired: 110, net: 90 },
  { month: "Feb", churned: 18, acquired: 78, net: 60 },
  { month: "Mar", churned: 15, acquired: 105, net: 90 },
];

const PLAN_MIX = [
  { name: "Home 5Mbps", value: 340, color: "#64748b" },
  { name: "Home 10Mbps", value: 520, color: "#0066ff" },
  { name: "Business 20Mbps", value: 210, color: "#00d4aa" },
  { name: "Corporate 50Mbps", value: 95, color: "#f59e0b" },
  { name: "Corporate 100Mbps", value: 45, color: "#ef4444" },
];

const AI_INSIGHTS = [
  { type: "risk", icon: "⚠️", title: "Churn Risk: 47 customers", detail: "Customers with no login in 14+ days & upcoming billing date. Recommend SMS re-engagement campaign." },
  { type: "opportunity", icon: "🚀", title: "Upgrade opportunity: 89 customers", detail: "89 Home 10Mbps customers consistently hitting data limits. Recommend Business plan upsell campaign." },
  { type: "trend", icon: "📈", title: "Revenue forecast: UGX 31.8M (May)", detail: "Based on current growth trajectory (8.4% MoM). Confidence: 82%." },
  { type: "anomaly", icon: "🔍", title: "41 accounts with unusual traffic patterns", detail: "Potential account sharing detected. Consider bandwidth audit on affected accounts." },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("6M");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Analytics & BI</h1>
          <p className="text-surface-400 text-sm mt-0.5">Business intelligence, forecasts & AI insights</p>
        </div>
        <div className="flex gap-1 bg-surface-800 border border-surface-700 rounded-lg p-1">
          {["1M", "3M", "6M", "1Y"].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={cn("text-xs px-3 py-1.5 rounded-lg transition", period === p ? "bg-primary text-white" : "text-surface-400 hover:text-white")}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="ARPU (Mar)" value="UGX 12,100" change={6.1} changeLabel="vs Feb" icon={<BarChart3 className="w-4.5 h-4.5" />} />
        <StatCard title="Churn Rate" value="0.82%" change={-0.3} changeLabel="vs last month" icon={<TrendingDown className="w-4.5 h-4.5" />} iconBg="bg-success/10" accent="text-success" />
        <StatCard title="LTV (avg)" value="UGX 145K" change={3.2} changeLabel="per customer" icon={<TrendingUp className="w-4.5 h-4.5" />} iconBg="bg-accent/10" accent="text-accent" />
        <StatCard title="NPS Score" value="72" change={5} changeLabel="vs last quarter" icon={<Sparkles className="w-4.5 h-4.5" />} iconBg="bg-info/10" accent="text-info" />
      </div>

      {/* Revenue + ARPU */}
      <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-white font-semibold">Revenue Trend & Forecast</h3>
            <p className="text-surface-400 text-xs mt-0.5">UGX Millions · AI-forecast months shown with dashes</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={REVENUE_TREND} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}M`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} labelStyle={{ color: "#94a3b8" }} />
            <Bar yAxisId="left" dataKey="revenue" fill="#0066ff" opacity={0.8} radius={[3, 3, 0, 0]} name="Revenue (M)" />
            <Line yAxisId="left" type="monotone" dataKey="target" stroke="#334155" strokeDasharray="4 3" strokeWidth={1.5} dot={false} name="Target" />
            <Line yAxisId="right" type="monotone" dataKey="arpu" stroke="#00d4aa" strokeWidth={2} dot={false} name="ARPU" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Churn */}
        <div className="lg:col-span-2 bg-surface-800 border border-surface-700 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4">Churn vs Acquisition</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CHURN} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} labelStyle={{ color: "#94a3b8" }} />
              <Bar dataKey="acquired" fill="#00d4aa" radius={[3, 3, 0, 0]} name="Acquired" />
              <Bar dataKey="churned" fill="#ef4444" radius={[3, 3, 0, 0]} name="Churned" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Plan mix */}
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4">Plan Mix</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={PLAN_MIX} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {PLAN_MIX.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {PLAN_MIX.map(p => (
              <div key={p.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: p.color }} />
                <span className="text-surface-300 text-xs flex-1 truncate">{p.name}</span>
                <span className="text-surface-400 text-xs">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="text-white font-semibold">AI Insights</h3>
          <Badge variant="primary" className="ml-1 text-xs">Powered by XounNet AI</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {AI_INSIGHTS.map((ins, i) => (
            <div key={i} className={cn("p-4 rounded-xl border",
              ins.type === "risk" ? "bg-danger/5 border-danger/20" :
              ins.type === "opportunity" ? "bg-success/5 border-success/20" :
              ins.type === "trend" ? "bg-primary/5 border-primary/20" : "bg-warning/5 border-warning/20")}>
              <p className="text-white text-sm font-medium mb-1">{ins.icon} {ins.title}</p>
              <p className="text-surface-400 text-xs">{ins.detail}</p>
              <button className="mt-2 text-xs text-primary hover:underline">Take action →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Badge({ variant, children, className }: { variant?: string; children: React.ReactNode; className?: string }) {
  const v = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    muted: "bg-surface-700 text-surface-400 border-surface-600",
  } as Record<string, string>;
  return <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border", v[variant ?? "muted"], className)}>{children}</span>;
}
