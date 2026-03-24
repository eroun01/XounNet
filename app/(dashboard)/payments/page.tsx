"use client";
import React, { useState } from "react";
import { Plus, RefreshCw, Smartphone, Building2, CreditCard, Wallet } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { StatCard } from "@/components/dashboard/StatCard";
import { cn } from "@/lib/utils";

const PAYMENTS = [
  { id: "1", ref: "PAY-240324-001", customer: "Kato Brian", amount: 85_000, method: "MTN_MOMO", phone: "+256 774 123 456", status: "COMPLETED", time: "07:45" },
  { id: "2", ref: "PAY-240324-002", customer: "Aisha Namutebi", amount: 120_000, method: "AIRTEL_MONEY", phone: "+256 752 234 567", status: "COMPLETED", time: "06:12" },
  { id: "3", ref: "PAY-240324-003", customer: "Ssemakula Enterprises", amount: 350_000, method: "BANK_TRANSFER", phone: "—", status: "PENDING", time: "05:55" },
  { id: "4", ref: "PAY-240324-004", customer: "Grace Akello", amount: 65_000, method: "MTN_MOMO", phone: "+256 786 456 789", status: "FAILED", time: "05:30" },
  { id: "5", ref: "PAY-240324-005", customer: "David Ogen", amount: 150_000, method: "CARD", phone: "—", status: "COMPLETED", time: "04:50" },
  { id: "6", ref: "PAY-240324-006", customer: "Mukasa Robert", amount: 180_000, method: "WALLET", phone: "—", status: "COMPLETED", time: "04:20" },
];

const METHOD_ICON: Record<string, React.ReactNode> = {
  MTN_MOMO: <Smartphone className="w-3.5 h-3.5 text-yellow-400" />,
  AIRTEL_MONEY: <Smartphone className="w-3.5 h-3.5 text-red-400" />,
  BANK_TRANSFER: <Building2 className="w-3.5 h-3.5 text-blue-400" />,
  CARD: <CreditCard className="w-3.5 h-3.5 text-purple-400" />,
  WALLET: <Wallet className="w-3.5 h-3.5 text-accent" />,
};
const STATUS_BADGE = {
  COMPLETED: <Badge variant="success" dot>Completed</Badge>,
  PENDING: <Badge variant="warning" dot>Pending</Badge>,
  FAILED: <Badge variant="danger" dot>Failed</Badge>,
  PROCESSING: <Badge variant="info" dot>Processing</Badge>,
};

export default function PaymentsPage() {
  const [showSTK, setShowSTK] = useState(false);
  const [stkPhone, setStkPhone] = useState("");
  const [stkAmount, setStkAmount] = useState("");

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-white text-xl font-semibold">Payments</h1>
          <p className="text-surface-400 text-sm mt-0.5">Mobile money, bank & card collections</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowSTK(true)}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold rounded-lg px-4 py-2 transition">
            <Smartphone className="w-4 h-4" /> STK Push
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg px-4 py-2 transition">
            <Plus className="w-4 h-4" /> Record Payment
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Collections" value="UGX 2.1M" change={12.5} changeLabel="vs yesterday" icon={<Wallet className="w-4.5 h-4.5" />} />
        <StatCard title="Success Rate" value="94.2%" change={1.8} changeLabel="vs last week" icon={<CreditCard className="w-4.5 h-4.5" />} iconBg="bg-success/10" accent="text-success" />
        <StatCard title="Failed Payments" value="23" change={-5.2} changeLabel="vs yesterday" icon={<RefreshCw className="w-4.5 h-4.5" />} iconBg="bg-danger/10" accent="text-danger" />
        <StatCard title="Wallet Balance" value="UGX 890K" change={0} changeLabel="total held" icon={<Wallet className="w-4.5 h-4.5" />} iconBg="bg-accent/10" accent="text-accent" />
      </div>

      {/* STK Push Modal */}
      {showSTK && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h3 className="text-white font-semibold text-lg mb-1">Send STK Push</h3>
            <p className="text-surface-400 text-sm mb-5">Customer will receive a payment prompt on their phone</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-surface-300 mb-1.5">Phone Number (MTN/Airtel)</label>
                <input value={stkPhone} onChange={(e) => setStkPhone(e.target.value)}
                  placeholder="+256 7XX XXX XXX"
                  className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3.5 py-2.5 text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
              </div>
              <div>
                <label className="block text-sm text-surface-300 mb-1.5">Amount (UGX)</label>
                <input value={stkAmount} onChange={(e) => setStkAmount(e.target.value)}
                  placeholder="85,000"
                  className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3.5 py-2.5 text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowSTK(false)}
                  className="flex-1 border border-surface-600 text-surface-300 hover:text-white rounded-lg py-2.5 text-sm transition">
                  Cancel
                </button>
                <button className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg py-2.5 text-sm transition">
                  Send Push
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Methods Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "MTN Mobile Money", amount: "UGX 1.2M", count: 48, icon: <Smartphone className="w-4 h-4 text-yellow-400" />, color: "border-yellow-500/20 bg-yellow-500/5" },
          { label: "Airtel Money", amount: "UGX 540K", count: 21, icon: <Smartphone className="w-4 h-4 text-red-400" />, color: "border-red-500/20 bg-red-500/5" },
          { label: "Bank Transfer", amount: "UGX 280K", count: 6, icon: <Building2 className="w-4 h-4 text-blue-400" />, color: "border-blue-500/20 bg-blue-500/5" },
          { label: "Card Payments", amount: "UGX 80K", count: 4, icon: <CreditCard className="w-4 h-4 text-purple-400" />, color: "border-purple-500/20 bg-purple-500/5" },
        ].map((m) => (
          <div key={m.label} className={cn("p-4 rounded-xl border", m.color)}>
            <div className="flex items-center gap-2 mb-2">{m.icon}<p className="text-surface-300 text-xs">{m.label}</p></div>
            <p className="text-white font-semibold">{m.amount}</p>
            <p className="text-surface-500 text-xs mt-0.5">{m.count} transactions</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface-800 border border-surface-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-surface-700 flex items-center justify-between">
          <h3 className="text-white font-semibold text-sm">Today's Transactions</h3>
          <button className="text-surface-400 hover:text-white transition">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-700">
                <th className="text-left text-surface-400 font-medium px-4 py-3">Reference</th>
                <th className="text-left text-surface-400 font-medium px-4 py-3">Customer</th>
                <th className="text-left text-surface-400 font-medium px-4 py-3">Method</th>
                <th className="text-left text-surface-400 font-medium px-4 py-3">Amount</th>
                <th className="text-left text-surface-400 font-medium px-4 py-3">Time</th>
                <th className="text-left text-surface-400 font-medium px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {PAYMENTS.map((p) => (
                <tr key={p.id} className="border-b border-surface-700/50 hover:bg-surface-700/30 transition">
                  <td className="px-4 py-3 text-primary font-mono text-xs">{p.ref}</td>
                  <td className="px-4 py-3 text-white">{p.customer}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-surface-300 text-xs">
                      {METHOD_ICON[p.method]}
                      {p.method.replace("_", " ")}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white font-medium">UGX {p.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-surface-400">{p.time}</td>
                  <td className="px-4 py-3">{STATUS_BADGE[p.status as keyof typeof STATUS_BADGE]}</td>
                  <td className="px-4 py-3">
                    {p.status === "FAILED" && (
                      <button className="text-xs text-warning hover:text-yellow-300 transition flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" /> Retry
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
