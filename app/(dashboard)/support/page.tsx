"use client";
import React, { useState } from "react";
import { Plus, Search, MessageCircle, Wrench, Phone } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { cn } from "@/lib/utils";

const TICKETS = [
  { id: "TK-2403001", customer: "Kato Brian", title: "No internet since yesterday", category: "CONNECTIVITY", priority: "HIGH", status: "OPEN", assignee: "NOC Team", time: "2h ago" },
  { id: "TK-2403002", customer: "Grace Akello", title: "Billing amount dispute", category: "BILLING", priority: "MEDIUM", status: "IN_PROGRESS", assignee: "Finance", time: "5h ago" },
  { id: "TK-2403003", customer: "Ssemakula Enterprises", title: "Speed much lower than subscribed", category: "SPEED", priority: "HIGH", status: "IN_PROGRESS", assignee: "NOC Team", time: "1d ago" },
  { id: "TK-2403004", customer: "Nakato Fiona", title: "Router not provided after installation", category: "EQUIPMENT", priority: "MEDIUM", status: "OPEN", assignee: "Unassigned", time: "1d ago" },
  { id: "TK-2403005", customer: "David Ogen", title: "Need to upgrade plan", category: "OTHER", priority: "LOW", status: "RESOLVED", assignee: "Support", time: "3d ago" },
];

const WORK_ORDERS = [
  { id: "WO-001", customer: "Nakato Fiona", type: "INSTALLATION", tech: "Wasswa John", scheduled: "Mar 25, 09:00", status: "SCHEDULED" },
  { id: "WO-002", customer: "Mwesigwa Peter", type: "MAINTENANCE", tech: "Nambi Grace", scheduled: "Mar 24, 14:00", status: "IN_PROGRESS" },
  { id: "WO-003", customer: "Kirabo Tech Ltd", type: "UPGRADE", tech: "Ssali Paul", scheduled: "Mar 26, 10:00", status: "SCHEDULED" },
];

const PRIORITY_BADGE = {
  CRITICAL: <Badge variant="danger">Critical</Badge>,
  HIGH: <Badge variant="warning">High</Badge>,
  MEDIUM: <Badge variant="info">Medium</Badge>,
  LOW: <Badge variant="muted">Low</Badge>,
};
const STATUS_BADGE = {
  OPEN: <Badge variant="info" dot>Open</Badge>,
  IN_PROGRESS: <Badge variant="warning" dot>In Progress</Badge>,
  RESOLVED: <Badge variant="success" dot>Resolved</Badge>,
  CLOSED: <Badge variant="muted" dot>Closed</Badge>,
};
const WO_STATUS = {
  SCHEDULED: <Badge variant="info" dot>Scheduled</Badge>,
  IN_PROGRESS: <Badge variant="warning" dot>In Progress</Badge>,
  COMPLETED: <Badge variant="success" dot>Completed</Badge>,
};

export default function SupportPage() {
  const [tab, setTab] = useState("Tickets");
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Support & Ticketing</h1>
          <p className="text-surface-400 text-sm mt-0.5">Tickets, work orders & call center</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg px-4 py-2 transition">
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Open Tickets", value: "23", color: "text-info" },
          { label: "In Progress", value: "11", color: "text-warning" },
          { label: "Resolved Today", value: "8", color: "text-success" },
          { label: "Avg Response Time", value: "1.4h", color: "text-white" },
        ].map(s => (
          <div key={s.label} className="bg-surface-800 border border-surface-700 rounded-xl p-4">
            <p className="text-surface-400 text-xs mb-1">{s.label}</p>
            <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-surface-800 border border-surface-700 rounded-xl p-1 w-fit">
        {["Tickets", "Work Orders", "Call Center"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("text-sm px-4 py-1.5 rounded-lg transition", tab === t ? "bg-primary text-white" : "text-surface-400 hover:text-white")}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Tickets" && (
        <>
          <div className="flex items-center gap-2 bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 max-w-sm focus-within:border-primary transition">
            <Search className="w-4 h-4 text-surface-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tickets…"
              className="bg-transparent text-sm text-white placeholder-surface-500 outline-none w-full" />
          </div>
          <div className="bg-surface-800 border border-surface-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-700">
                    {["ID", "Customer", "Issue", "Category", "Priority", "Status", "Assignee", "Time"].map(h => (
                      <th key={h} className="text-left text-surface-400 font-medium px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TICKETS.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase())).map(t => (
                    <tr key={t.id} className="border-b border-surface-700/50 hover:bg-surface-700/30 transition">
                      <td className="px-4 py-3 text-primary font-mono text-xs">{t.id}</td>
                      <td className="px-4 py-3 text-white">{t.customer}</td>
                      <td className="px-4 py-3 text-surface-300 max-w-xs truncate">{t.title}</td>
                      <td className="px-4 py-3"><Badge variant="muted">{t.category}</Badge></td>
                      <td className="px-4 py-3">{PRIORITY_BADGE[t.priority as keyof typeof PRIORITY_BADGE]}</td>
                      <td className="px-4 py-3">{STATUS_BADGE[t.status as keyof typeof STATUS_BADGE]}</td>
                      <td className="px-4 py-3 text-surface-400 text-xs">{t.assignee}</td>
                      <td className="px-4 py-3 text-surface-500 text-xs">{t.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "Work Orders" && (
        <div className="space-y-3">
          {WORK_ORDERS.map(wo => (
            <div key={wo.id} className="bg-surface-800 border border-surface-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Wrench className="w-4 h-4 text-accent" />
                  <span className="text-white font-semibold text-sm">{wo.id}</span>
                  <Badge variant={wo.type === "INSTALLATION" ? "primary" : wo.type === "MAINTENANCE" ? "warning" : "accent"}>{wo.type}</Badge>
                </div>
                <p className="text-surface-300 text-sm">{wo.customer}</p>
                <p className="text-surface-500 text-xs mt-0.5">Technician: {wo.tech} · {wo.scheduled}</p>
              </div>
              {WO_STATUS[wo.status as keyof typeof WO_STATUS]}
              <div className="flex gap-2">
                <button className="text-xs text-primary hover:underline">View</button>
                <button className="text-xs text-surface-400 hover:text-white">Reassign</button>
              </div>
            </div>
          ))}
          <button className="w-full flex items-center justify-center gap-2 border border-dashed border-surface-700 rounded-xl p-4 text-surface-400 hover:text-white hover:border-surface-600 transition text-sm">
            <Plus className="w-4 h-4" /> Create Work Order
          </button>
        </div>
      )}

      {tab === "Call Center" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-5 space-y-4">
          <h3 className="text-white font-semibold">Call Center Log</h3>
          <div className="space-y-2">
            {[
              { name: "Kato Brian", phone: "+256 774 123 456", duration: "4m 22s", agent: "Sarah K.", topic: "Connectivity issue", time: "10:45 AM" },
              { name: "David Ogen", phone: "+256 775 567 890", duration: "2m 08s", agent: "Moses S.", topic: "Billing query", time: "09:30 AM" },
              { name: "Nakato Fiona", phone: "+256 756 789 012", duration: "6m 45s", agent: "Sarah K.", topic: "New subscription", time: "08:15 AM" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-surface-700/40 rounded-lg">
                <Phone className="w-4 h-4 text-success shrink-0" />
                <div className="flex-1">
                  <p className="text-white text-sm">{c.name} <span className="text-surface-400 text-xs">{c.phone}</span></p>
                  <p className="text-surface-500 text-xs">{c.topic} · Agent: {c.agent}</p>
                </div>
                <div className="text-right">
                  <p className="text-surface-300 text-xs">{c.duration}</p>
                  <p className="text-surface-500 text-xs">{c.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
