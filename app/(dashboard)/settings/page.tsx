"use client";
import React, { useState } from "react";
import { Save, Eye, EyeOff, Plus, Globe, Server, Key, Building2, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = ["Company", "Branches", "Payment Gateways", "Network Config", "API Keys"];

function Field({ label, defaultValue, type = "text", placeholder }: { label: string; defaultValue?: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-surface-300 text-xs mb-1.5">{label}</label>
      <input type={type} defaultValue={defaultValue} placeholder={placeholder}
        className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" />
    </div>
  );
}

function SecretField({ label, value }: { label: string; value: string }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block text-surface-300 text-xs mb-1.5">{label}</label>
      <div className="relative">
        <input type={show ? "text" : "password"} defaultValue={value}
          className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2.5 text-white text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" />
        <button type="button" onClick={() => setShow(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-200 transition">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

const BRANCHES = [
  { id: "1", name: "Kampala HQ", address: "Plot 12, Kampala Rd, Kampala", phone: "+256 700 000 001", manager: "John Admin", active: true },
  { id: "2", name: "Entebbe Branch", address: "Entebbe Rd, Entebbe", phone: "+256 700 000 002", manager: "Grace Manager", active: true },
  { id: "3", name: "Gulu Branch", address: "Gulu Town Center", phone: "+256 700 000 003", manager: "Paul Branch", active: false },
];

const API_KEYS = [
  { name: "Mobile App Key", key: "xn_live_mob_k8j2p9x4q7r3", created: "Jan 15, 2026", lastUsed: "2h ago", active: true },
  { name: "Webhook Integration", key: "xn_live_wbh_m3n7s2t8u5v1", created: "Feb 1, 2026", lastUsed: "5m ago", active: true },
  { name: "Billing API", key: "xn_live_bil_a9b4c7d1e6f2", created: "Mar 1, 2026", lastUsed: "Never", active: false },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("Company");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Settings</h1>
          <p className="text-surface-400 text-sm mt-0.5">System configuration & preferences</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg px-4 py-2 transition">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="flex gap-1 flex-wrap bg-surface-800 border border-surface-700 rounded-xl p-1 w-fit">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("text-sm px-3 py-1.5 rounded-lg transition whitespace-nowrap", tab === t ? "bg-primary text-white" : "text-surface-400 hover:text-white")}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Company" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-4.5 h-4.5 text-primary" />
            <h3 className="text-white font-semibold">ISP Company Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Company Name" defaultValue="XounNet Communications Ltd" />
            <Field label="Domain" defaultValue="xounnet.com" />
            <Field label="Country" defaultValue="Uganda" />
            <Field label="Default Currency" defaultValue="UGX" />
            <Field label="Timezone" defaultValue="Africa/Kampala" />
            <Field label="Tax Rate (%)" defaultValue="18" />
            <Field label="Tax Registration Number" defaultValue="1009876543" />
            <Field label="Primary Phone" defaultValue="+256 700 000 000" />
            <div className="md:col-span-2">
              <Field label="Business Email" defaultValue="info@xounnet.com" />
            </div>
            <div className="md:col-span-2">
              <Field label="Physical Address" defaultValue="Plot 12, Kampala Road, Kampala, Uganda" />
            </div>
          </div>
        </div>
      )}

      {tab === "Branches" && (
        <div className="space-y-3">
          {BRANCHES.map(b => (
            <div key={b.id} className="bg-surface-800 border border-surface-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-accent" />
                  <p className="text-white font-semibold text-sm">{b.name}</p>
                  <span className={cn("w-2 h-2 rounded-full", b.active ? "bg-success" : "bg-surface-600")} />
                </div>
                <p className="text-surface-400 text-xs">{b.address}</p>
                <p className="text-surface-500 text-xs mt-0.5">{b.phone} · Manager: {b.manager}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-xs text-primary hover:underline">Edit</button>
                <button className="text-xs text-surface-400 hover:text-white">{b.active ? "Deactivate" : "Activate"}</button>
              </div>
            </div>
          ))}
          <button className="w-full flex items-center justify-center gap-2 border border-dashed border-surface-700 rounded-xl p-4 text-surface-400 hover:text-white hover:border-surface-600 transition text-sm">
            <Plus className="w-4 h-4" /> Add Branch
          </button>
        </div>
      )}

      {tab === "Payment Gateways" && (
        <div className="space-y-4">
          {[
            { name: "MTN Mobile Money", icon: "📱", enabled: true, fields: [{ l: "API Key", v: "MTN_API_KEY_XXXX" }, { l: "API Secret", v: "MTN_SECRET_XXXX" }, { l: "Subscription Key", v: "MTN_SUB_XXXX" }] },
            { name: "Airtel Money", icon: "📱", enabled: true, fields: [{ l: "Client ID", v: "AIRTEL_CID_XXXX" }, { l: "Client Secret", v: "AIRTEL_SEC_XXXX" }] },
            { name: "Flutterwave (Cards)", icon: "💳", enabled: false, fields: [{ l: "Public Key", v: "" }, { l: "Secret Key", v: "" }] },
          ].map(gw => (
            <div key={gw.name} className="bg-surface-800 border border-surface-700 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{gw.icon}</span>
                  <h3 className="text-white font-semibold">{gw.name}</h3>
                </div>
                <div className={cn("flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs",
                  gw.enabled ? "bg-success/10 border-success/30 text-success" : "bg-surface-700 border-surface-600 text-surface-400")}>
                  <span className={cn("w-1.5 h-1.5 rounded-full", gw.enabled ? "bg-success" : "bg-surface-500")} />
                  {gw.enabled ? "Enabled" : "Disabled"}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {gw.fields.map(f => <SecretField key={f.l} label={f.l} value={f.v} />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Network Config" && (
        <div className="space-y-4">
          <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4"><Server className="w-4.5 h-4.5 text-accent" /><h3 className="text-white font-semibold">FreeRADIUS</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="RADIUS Host" defaultValue="radius.xounnet.local" />
              <Field label="Auth Port" defaultValue="1812" />
              <Field label="Acct Port" defaultValue="1813" />
              <SecretField label="Shared Secret" value="radius_shared_secret_here" />
            </div>
          </div>
          <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4"><Server className="w-4.5 h-4.5 text-primary" /><h3 className="text-white font-semibold">MikroTik Default API</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Default API Port" defaultValue="8728" />
              <Field label="API SSL Port" defaultValue="8729" />
              <Field label="Default Username" defaultValue="admin" />
              <SecretField label="Default Password" value="default_mikrotik_password" />
            </div>
          </div>
        </div>
      )}

      {tab === "API Keys" && (
        <div className="space-y-3">
          {API_KEYS.map(k => (
            <div key={k.name} className="bg-surface-800 border border-surface-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <Key className="w-4 h-4 text-warning shrink-0" />
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{k.name}</p>
                <p className="text-surface-400 font-mono text-xs mt-0.5">{k.key.slice(0, 20)}…</p>
                <p className="text-surface-600 text-xs">Created {k.created} · Last used {k.lastUsed}</p>
              </div>
              <div className="flex gap-2 items-center">
                <span className={cn("w-2 h-2 rounded-full", k.active ? "bg-success" : "bg-surface-600")} />
                <span className="text-xs text-surface-400">{k.active ? "Active" : "Inactive"}</span>
                <button className="text-xs text-danger hover:text-red-300 ml-2">Revoke</button>
              </div>
            </div>
          ))}
          <button className="w-full flex items-center justify-center gap-2 border border-dashed border-surface-700 rounded-xl p-4 text-surface-400 hover:text-white hover:border-surface-600 transition text-sm">
            <Plus className="w-4 h-4" /> Generate New API Key
          </button>
        </div>
      )}
    </div>
  );
}
