"use client";
import React, { useState } from "react";
import { Plus, Download, QrCode, Ticket, RefreshCw } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { cn } from "@/lib/utils";

const BATCHES = [
  { id: "1", name: "March Hotspot Batch", plan: "Hotspot Daily 2000", count: 500, sold: 342, used: 298, prefix: "XN-D", created: "2026-03-01" },
  { id: "2", name: "Weekly Plan Batch", plan: "Hotspot Weekly 8000", count: 200, sold: 178, used: 156, prefix: "XN-W", created: "2026-03-10" },
  { id: "3", name: "Monthly Hotspot", plan: "Hotspot Monthly 25000", count: 100, sold: 45, used: 40, prefix: "XN-M", created: "2026-03-15" },
];

const VOUCHERS = [
  { code: "XN-D-8K29X", plan: "Hotspot Daily", price: 2_000, status: "AVAILABLE" },
  { code: "XN-D-3M7YQ", plan: "Hotspot Daily", price: 2_000, status: "USED" },
  { code: "XN-D-9P4WL", plan: "Hotspot Daily", price: 2_000, status: "ACTIVE" },
  { code: "XN-W-2N6RT", plan: "Hotspot Weekly", price: 8_000, status: "AVAILABLE" },
  { code: "XN-W-5K1ZV", plan: "Hotspot Weekly", price: 8_000, status: "EXPIRED" },
];

const STATUS_BADGE = {
  AVAILABLE: <Badge variant="success" dot>Available</Badge>,
  ACTIVE: <Badge variant="info" dot>Active</Badge>,
  USED: <Badge variant="muted" dot>Used</Badge>,
  EXPIRED: <Badge variant="danger" dot>Expired</Badge>,
  VOID: <Badge variant="muted" dot>Void</Badge>,
};

export default function VouchersPage() {
  const [showGenerate, setShowGenerate] = useState(false);
  const [tab, setTab] = useState("Batches");

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-white text-xl font-semibold">Vouchers & Hotspot</h1>
          <p className="text-surface-400 text-sm mt-0.5">Generate, manage & sell vouchers</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 border border-surface-700 text-surface-300 hover:text-white hover:border-surface-500 text-sm rounded-lg px-3 py-2 transition">
            <Download className="w-3.5 h-3.5" /> Export PDF
          </button>
          <button onClick={() => setShowGenerate(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg px-4 py-2 transition">
            <Plus className="w-4 h-4" /> Generate Batch
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Generated", value: "800", icon: <Ticket className="w-4.5 h-4.5" />, color: "text-primary" },
          { label: "Available", value: "235", icon: <Ticket className="w-4.5 h-4.5" />, color: "text-success" },
          { label: "Sold This Month", value: "565", icon: <Ticket className="w-4.5 h-4.5" />, color: "text-accent" },
          { label: "Revenue (Vouchers)", value: "UGX 1.8M", icon: <Ticket className="w-4.5 h-4.5" />, color: "text-warning" },
        ].map((s) => (
          <div key={s.label} className="bg-surface-800 border border-surface-700 rounded-xl p-4">
            <p className="text-surface-400 text-xs mb-2">{s.label}</p>
            <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-800 border border-surface-700 rounded-xl p-1 w-fit">
        {["Batches", "Vouchers", "Captive Portal"].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("text-sm px-4 py-1.5 rounded-lg transition", tab === t ? "bg-primary text-white" : "text-surface-400 hover:text-white")}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Batches" && (
        <div className="space-y-3">
          {BATCHES.map((b) => (
            <div key={b.id} className="bg-surface-800 border border-surface-700 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold">{b.name}</h3>
                  <p className="text-surface-400 text-xs mt-0.5">{b.plan} · Prefix: {b.prefix} · Created {b.created}</p>
                </div>
                <div className="flex gap-6 text-center">
                  <div><p className="text-white font-bold">{b.count}</p><p className="text-surface-500 text-xs">Total</p></div>
                  <div><p className="text-success font-bold">{b.sold}</p><p className="text-surface-500 text-xs">Sold</p></div>
                  <div><p className="text-accent font-bold">{b.used}</p><p className="text-surface-500 text-xs">Used</p></div>
                  <div><p className="text-warning font-bold">{b.count - b.sold}</p><p className="text-surface-500 text-xs">Available</p></div>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs flex items-center gap-1 text-primary hover:underline"><QrCode className="w-3.5 h-3.5" />QR Codes</button>
                  <button className="text-xs flex items-center gap-1 text-surface-400 hover:text-white"><Download className="w-3.5 h-3.5" />Export</button>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-surface-500 mb-1">
                  <span>{Math.round((b.sold / b.count) * 100)}% sold</span>
                  <span>{Math.round((b.used / b.sold) * 100)}% of sold used</span>
                </div>
                <div className="h-1.5 bg-surface-600 rounded-full overflow-hidden flex">
                  <div className="bg-accent h-full" style={{ width: `${(b.used / b.count) * 100}%` }} />
                  <div className="bg-success h-full" style={{ width: `${((b.sold - b.used) / b.count) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Vouchers" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-700">
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Code</th>
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Plan</th>
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Price</th>
                  <th className="text-left text-surface-400 font-medium px-4 py-3">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {VOUCHERS.map((v) => (
                  <tr key={v.code} className="border-b border-surface-700/50 hover:bg-surface-700/30 transition">
                    <td className="px-4 py-3 text-white font-mono text-xs font-bold">{v.code}</td>
                    <td className="px-4 py-3 text-surface-300">{v.plan}</td>
                    <td className="px-4 py-3 text-white">UGX {v.price.toLocaleString()}</td>
                    <td className="px-4 py-3">{STATUS_BADGE[v.status as keyof typeof STATUS_BADGE]}</td>
                    <td className="px-4 py-3">
                      <button className="text-surface-400 hover:text-white"><QrCode className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "Captive Portal" && (
        <div className="bg-surface-800 border border-surface-700 rounded-xl p-6 space-y-4">
          <h3 className="text-white font-semibold">Captive Portal Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              {[{ label: "Portal Title", value: "XounNet Hotspot" }, { label: "Logo URL", value: "/logo.png" }, { label: "Redirect URL", value: "https://xounnet.com" }].map((f) => (
                <div key={f.label}>
                  <label className="block text-surface-300 text-xs mb-1">{f.label}</label>
                  <input defaultValue={f.value} className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-primary hover:bg-primary-hover text-white text-sm rounded-lg py-2 transition">Save Changes</button>
                <button className="border border-surface-700 text-surface-300 hover:text-white text-sm rounded-lg px-4 py-2 transition">Preview</button>
              </div>
            </div>
            <div className="bg-surface-900 border border-surface-600 rounded-xl p-4 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-2">
                  <Ticket className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-semibold text-sm">XounNet Hotspot</p>
                <p className="text-surface-400 text-xs mt-1">Enter your voucher code</p>
                <input placeholder="XN-D-XXXXX" className="mt-3 w-full bg-surface-800 border border-surface-600 rounded-lg px-3 py-2 text-white text-sm text-center focus:outline-none" />
                <button className="mt-2 w-full bg-primary text-white text-xs rounded-lg py-2">Connect</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate batch modal */}
      {showGenerate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl space-y-4">
            <h3 className="text-white font-semibold text-lg">Generate Voucher Batch</h3>
            {[{ label: "Batch Name", placeholder: "e.g. April Hotspot Batch" }, { label: "Plan", placeholder: "Select plan" }, { label: "Quantity", placeholder: "e.g. 500" }, { label: "Code Prefix", placeholder: "e.g. XN-D" }].map((f) => (
              <div key={f.label}>
                <label className="block text-surface-300 text-xs mb-1">{f.label}</label>
                <input placeholder={f.placeholder} className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2.5 text-white text-sm placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowGenerate(false)} className="flex-1 border border-surface-600 text-surface-300 hover:text-white rounded-lg py-2.5 text-sm transition">Cancel</button>
              <button className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg py-2.5 text-sm transition">Generate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
