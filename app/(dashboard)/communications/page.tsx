"use client";
import React, { useState } from "react";
import { Plus, MessageSquare, Mail, Smartphone, Send } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { cn } from "@/lib/utils";

const TEMPLATES = [
  { id: "1", name: "Payment Reminder", channel: "SMS", body: "Dear {name}, your XounNet invoice of UGX {amount} is due on {date}. Pay now: *165*...", vars: ["name", "amount", "date"], active: true },
  { id: "2", name: "Subscription Expiry", channel: "SMS", body: "Hi {name}, your {plan} subscription expires on {date}. Renew now to stay connected.", vars: ["name", "plan", "date"], active: true },
  { id: "3", name: "Welcome Email", channel: "EMAIL", body: "Welcome to XounNet, {name}! Your account {account} is now active.", vars: ["name", "account"], active: true },
  { id: "4", name: "Payment Confirmed", channel: "WHATSAPP", body: "✅ Payment of UGX {amount} received for your XounNet account. Thank you, {name}!", vars: ["amount", "name"], active: true },
  { id: "5", name: "Suspension Notice", channel: "SMS", body: "Dear {name}, your XounNet account has been suspended due to non-payment. Pay now to reconnect.", vars: ["name"], active: true },
];

const CAMPAIGNS = [
  { id: "1", name: "March Re-engagement", channel: "SMS", template: "Payment Reminder", status: "COMPLETED", sent: 145, failed: 3, scheduled: "Mar 1, 09:00" },
  { id: "2", name: "April Promo — 20% off", channel: "SMS", template: "Custom", status: "DRAFT", sent: 0, failed: 0, scheduled: "Apr 1, 08:00" },
  { id: "3", name: "Expiry Alert (7 days)", channel: "WHATSAPP", template: "Subscription Expiry", status: "RUNNING", sent: 68, failed: 2, scheduled: "Daily 08:00" },
];

const CHANNEL_ICON: Record<string, React.ReactNode> = {
  SMS: <Smartphone className="w-3.5 h-3.5 text-yellow-400" />,
  WHATSAPP: <MessageSquare className="w-3.5 h-3.5 text-green-400" />,
  EMAIL: <Mail className="w-3.5 h-3.5 text-blue-400" />,
};

const CAMPAIGN_BADGE = {
  COMPLETED: <Badge variant="success" dot>Completed</Badge>,
  DRAFT: <Badge variant="muted" dot>Draft</Badge>,
  RUNNING: <Badge variant="info" dot>Running</Badge>,
  SCHEDULED: <Badge variant="warning" dot>Scheduled</Badge>,
};

export default function CommunicationsPage() {
  const [tab, setTab] = useState("Templates");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TEMPLATES[0] | null>(null);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Communications</h1>
          <p className="text-surface-400 text-sm mt-0.5">SMS, WhatsApp & email campaigns</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg px-4 py-2 transition">
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Sent This Month", value: "4,821", icon: <Send className="w-4 h-4 text-primary" /> },
          { label: "Delivery Rate", value: "97.3%", icon: <MessageSquare className="w-4 h-4 text-success" /> },
          { label: "WhatsApp Msgs", value: "1,204", icon: <MessageSquare className="w-4 h-4 text-green-400" /> },
          { label: "Active Campaigns", value: "3", icon: <Smartphone className="w-4 h-4 text-accent" /> },
        ].map(s => (
          <div key={s.label} className="bg-surface-800 border border-surface-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">{s.icon}<p className="text-surface-400 text-xs">{s.label}</p></div>
            <p className="text-white font-bold text-lg">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-surface-800 border border-surface-700 rounded-xl p-1 w-fit">
        {["Templates", "Campaigns", "Logs"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("text-sm px-4 py-1.5 rounded-lg transition", tab === t ? "bg-primary text-white" : "text-surface-400 hover:text-white")}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Templates" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Template list */}
          <div className="space-y-2">
            {TEMPLATES.map(t => (
              <div key={t.id}
                onClick={() => setSelectedTemplate(t)}
                className={cn("p-4 bg-surface-800 border rounded-xl cursor-pointer hover:border-surface-600 transition",
                  selectedTemplate?.id === t.id ? "border-primary" : "border-surface-700")}>
                <div className="flex items-center gap-2 mb-2">
                  {CHANNEL_ICON[t.channel]}
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <span className="ml-auto text-xs text-surface-400">{t.channel}</span>
                </div>
                <p className="text-surface-400 text-xs line-clamp-2">{t.body}</p>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {t.vars.map(v => <span key={v} className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">{`{${v}}`}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* Template editor */}
          <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
            {selectedTemplate ? (
              <div className="space-y-4">
                <h3 className="text-white font-semibold">{selectedTemplate.name}</h3>
                <div>
                  <label className="block text-surface-300 text-xs mb-1.5">Channel</label>
                  <div className="flex items-center gap-2 text-surface-300 text-sm">{CHANNEL_ICON[selectedTemplate.channel]} {selectedTemplate.channel}</div>
                </div>
                <div>
                  <label className="block text-surface-300 text-xs mb-1.5">Message Body</label>
                  <textarea defaultValue={selectedTemplate.body} rows={5}
                    className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2.5 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary hover:bg-primary-hover text-white text-sm rounded-lg py-2 transition">Save Template</button>
                  <button className="border border-surface-700 text-surface-300 hover:text-white text-sm rounded-lg px-4 py-2 transition flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" /> Test Send
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-surface-500 text-sm">
                Select a template to edit
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "Campaigns" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-700">
                  {["Campaign", "Channel", "Template", "Scheduled", "Sent", "Failed", "Status"].map(h => (
                    <th key={h} className="text-left text-surface-400 font-medium px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAMPAIGNS.map(c => (
                  <tr key={c.id} className="border-b border-surface-700/50 hover:bg-surface-700/30 transition">
                    <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-1.5">{CHANNEL_ICON[c.channel]}<span className="text-surface-300 text-xs">{c.channel}</span></div></td>
                    <td className="px-4 py-3 text-surface-400 text-xs">{c.template}</td>
                    <td className="px-4 py-3 text-surface-400 text-xs">{c.scheduled}</td>
                    <td className="px-4 py-3 text-success">{c.sent}</td>
                    <td className="px-4 py-3 text-danger">{c.failed}</td>
                    <td className="px-4 py-3">{CAMPAIGN_BADGE[c.status as keyof typeof CAMPAIGN_BADGE]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "Logs" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
          <p className="text-surface-400 text-sm mb-4">Notification delivery logs — all SMS, WhatsApp & email messages sent with delivery status.</p>
          <div className="space-y-2">
            {[
              { to: "+256 774 123 456", msg: "Payment Reminder", channel: "SMS", status: "DELIVERED", time: "10:02 AM" },
              { to: "+256 752 234 567", msg: "Subscription Expiry", channel: "WHATSAPP", status: "READ", time: "09:45 AM" },
              { to: "kato@example.com", msg: "Invoice #INV-2403001", channel: "EMAIL", status: "DELIVERED", time: "09:30 AM" },
              { to: "+256 786 456 789", msg: "Suspension Notice", channel: "SMS", status: "FAILED", time: "09:15 AM" },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-surface-700/40 rounded-lg">
                {CHANNEL_ICON[l.channel]}
                <div className="flex-1">
                  <p className="text-white text-xs">{l.to}</p>
                  <p className="text-surface-500 text-xs">{l.msg}</p>
                </div>
                <Badge variant={l.status === "DELIVERED" || l.status === "READ" ? "success" : "danger"} dot>{l.status}</Badge>
                <span className="text-surface-500 text-xs">{l.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
