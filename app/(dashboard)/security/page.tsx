"use client";
import React, { useState } from "react";
import { Shield, Lock, AlertTriangle, Eye } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { cn } from "@/lib/utils";

const ROLES = [
  { name: "Super Admin", users: 1, permissions: ["ALL"] },
  { name: "ISP Admin", users: 2, permissions: ["customers.*", "billing.*", "network.*", "payments.*", "reports.*"] },
  { name: "Finance", users: 3, permissions: ["billing.*", "payments.*", "reports.read"] },
  { name: "NOC Engineer", users: 4, permissions: ["network.*", "noc.*", "customers.read"] },
  { name: "Support Agent", users: 6, permissions: ["tickets.*", "customers.read", "billing.read"] },
  { name: "Field Agent", users: 12, permissions: ["customers.create", "payments.create", "vouchers.sell"] },
];

const RESOURCES = ["customers", "billing", "payments", "network", "noc", "vouchers", "agents", "analytics", "tickets", "settings"];

const AUDIT_LOGS = [
  { user: "admin@xounnet.com", action: "LOGIN", resource: "auth", ip: "197.157.34.22", time: "07:42 AM", risk: false },
  { user: "finance@xounnet.com", action: "INVOICE_CREATE", resource: "billing", ip: "197.157.34.50", time: "07:15 AM", risk: false },
  { user: "noc@xounnet.com", action: "SESSION_TERMINATE", resource: "network", ip: "197.157.34.51", time: "06:55 AM", risk: false },
  { user: "unknown@external.com", action: "LOGIN_FAILED", resource: "auth", ip: "41.202.219.45", time: "06:30 AM", risk: true },
  { user: "admin@xounnet.com", action: "ROLE_UPDATE", resource: "security", ip: "197.157.34.22", time: "06:10 AM", risk: false },
];

const FRAUD_ALERTS = [
  { customer: "Mukasa Robert", type: "ACCOUNT_SHARING", severity: "HIGH", detail: "Same account logged in from 4 different IPs within 1 hour", time: "2h ago", resolved: false },
  { customer: "Grace Akello", type: "MULTIPLE_LOGINS", severity: "MEDIUM", detail: "12 failed login attempts from different countries", time: "5h ago", resolved: false },
  { customer: "Unknown", type: "UNUSUAL_TRAFFIC", severity: "CRITICAL", detail: "Bandwidth usage 50× normal baseline — possible botnet", time: "22m ago", resolved: false },
];

export default function SecurityPage() {
  const [tab, setTab] = useState("RBAC");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Security & Access Control</h1>
          <p className="text-surface-400 text-sm mt-0.5">RBAC, audit logs & fraud detection</p>
        </div>
        <Badge variant="danger" className="flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          3 Active Fraud Alerts
        </Badge>
      </div>

      <div className="flex gap-1 bg-surface-800 border border-surface-700 rounded-xl p-1 w-fit">
        {["RBAC", "Audit Logs", "Fraud Alerts"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("text-sm px-4 py-1.5 rounded-lg transition", tab === t ? "bg-primary text-white" : "text-surface-400 hover:text-white")}>
            {t}
          </button>
        ))}
      </div>

      {tab === "RBAC" && (
        <div className="space-y-4">
          <div className="bg-surface-800 border border-surface-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-surface-700">
              <h3 className="text-white font-semibold text-sm">Roles & Permissions Matrix</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-700">
                    <th className="text-left text-surface-400 font-medium px-4 py-3">Role</th>
                    <th className="text-left text-surface-400 font-medium px-4 py-3">Users</th>
                    {RESOURCES.map(r => (
                      <th key={r} className="text-center text-surface-400 font-medium px-3 py-3 text-xs capitalize">{r}</th>
                    ))}
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {ROLES.map((role) => (
                    <tr key={role.name} className="border-b border-surface-700/50 hover:bg-surface-700/30 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5 text-primary" />
                          <span className="text-white font-medium text-xs">{role.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-surface-400 text-xs">{role.users}</td>
                      {RESOURCES.map(res => {
                        const hasAll = role.permissions.includes("ALL");
                        const hasFull = role.permissions.some(p => p === `${res}.*`);
                        const hasRead = role.permissions.some(p => p.startsWith(res));
                        const access = hasAll || hasFull ? "full" : hasRead ? "partial" : "none";
                        return (
                          <td key={res} className="px-3 py-3 text-center">
                            {access === "full" ? (
                              <span className="text-success">●</span>
                            ) : access === "partial" ? (
                              <span className="text-warning text-xs">◐</span>
                            ) : (
                              <span className="text-surface-600">○</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="px-4 py-3">
                        <button className="text-xs text-primary hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex gap-2 text-xs text-surface-400">
            <span className="text-success">● Full access</span>
            <span className="text-warning">◐ Partial access</span>
            <span className="text-surface-600">○ No access</span>
          </div>
        </div>
      )}

      {tab === "Audit Logs" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-700">
                  {["User", "Action", "Resource", "IP Address", "Time", "Risk"].map(h => (
                    <th key={h} className="text-left text-surface-400 font-medium px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AUDIT_LOGS.map((log, i) => (
                  <tr key={i} className={cn("border-b border-surface-700/50 hover:bg-surface-700/30 transition", log.risk && "bg-danger/5")}>
                    <td className="px-4 py-3 text-surface-300 text-xs font-mono">{log.user}</td>
                    <td className="px-4 py-3"><Badge variant={log.action.includes("FAILED") ? "danger" : "muted"}>{log.action}</Badge></td>
                    <td className="px-4 py-3 text-surface-400 text-xs">{log.resource}</td>
                    <td className="px-4 py-3 text-surface-300 font-mono text-xs">{log.ip}</td>
                    <td className="px-4 py-3 text-surface-500 text-xs">{log.time}</td>
                    <td className="px-4 py-3">{log.risk ? <Badge variant="danger">High Risk</Badge> : <span className="text-surface-600 text-xs">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "Fraud Alerts" && (
        <div className="space-y-3">
          {FRAUD_ALERTS.map((a, i) => (
            <div key={i} className={cn("p-5 rounded-xl border",
              a.severity === "CRITICAL" ? "bg-danger/5 border-danger/30" :
              a.severity === "HIGH" ? "bg-warning/5 border-warning/30" : "bg-info/5 border-info/30"
            )}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={cn("w-5 h-5 mt-0.5 shrink-0",
                    a.severity === "CRITICAL" ? "text-danger" : a.severity === "HIGH" ? "text-warning" : "text-info")} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-semibold text-sm">{a.customer}</p>
                      <Badge variant={a.severity === "CRITICAL" ? "danger" : a.severity === "HIGH" ? "warning" : "info"}>{a.severity}</Badge>
                      <Badge variant="muted">{a.type.replace("_", " ")}</Badge>
                    </div>
                    <p className="text-surface-300 text-sm">{a.detail}</p>
                    <p className="text-surface-500 text-xs mt-1">{a.time}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="text-xs border border-surface-700 text-surface-300 hover:text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1"><Eye className="w-3 h-3" />Investigate</button>
                  <button className="text-xs bg-success/10 text-success border border-success/20 px-3 py-1.5 rounded-lg hover:bg-success/20 transition">Resolve</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
