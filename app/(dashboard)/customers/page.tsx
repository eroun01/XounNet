"use client";
import React, { useState } from "react";
import { Search, Plus, Filter, MoreVertical, Star, Shield, Phone } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CUSTOMERS = [
  { id: "1", account: "XN-001023", name: "Kato Brian", type: "INDIVIDUAL", phone: "+256 774 123 456", district: "Kampala", plan: "Business 20Mbps", status: "ACTIVE", credit: 87, kyc: true, balance: 0 },
  { id: "2", account: "XN-001024", name: "Aisha Namutebi", type: "INDIVIDUAL", phone: "+256 752 234 567", district: "Wakiso", plan: "Home 10Mbps", status: "ACTIVE", credit: 72, kyc: true, balance: 45_000 },
  { id: "3", account: "XN-001025", name: "Ssemakula Enterprises", type: "BUSINESS", phone: "+256 700 345 678", district: "Kampala", plan: "Corporate 50Mbps", status: "ACTIVE", credit: 95, kyc: true, balance: 0 },
  { id: "4", account: "XN-001026", name: "Grace Akello", type: "INDIVIDUAL", phone: "+256 786 456 789", district: "Gulu", plan: "Home 5Mbps", status: "SUSPENDED", credit: 35, kyc: false, balance: 150_000 },
  { id: "5", account: "XN-001027", name: "David Ogen", type: "INDIVIDUAL", phone: "+256 775 567 890", district: "Lira", plan: "Home 10Mbps", status: "ACTIVE", credit: 68, kyc: true, balance: 0 },
  { id: "6", account: "XN-001028", name: "Mukasa Robert", type: "INDIVIDUAL", phone: "+256 703 678 901", district: "Kampala", plan: "Business 20Mbps", status: "INACTIVE", credit: 50, kyc: true, balance: 0 },
  { id: "7", account: "XN-001029", name: "Nakato Fiona", type: "INDIVIDUAL", phone: "+256 756 789 012", district: "Entebbe", plan: "Home 10Mbps", status: "PENDING_KYC", credit: 0, kyc: false, balance: 0 },
  { id: "8", account: "XN-001030", name: "Kirabo Tech Ltd", type: "BUSINESS", phone: "+256 789 890 123", district: "Kampala", plan: "Corporate 100Mbps", status: "ACTIVE", credit: 91, kyc: true, balance: 0 },
];

const STATUS_BADGE = {
  ACTIVE: <Badge variant="success" dot>Active</Badge>,
  INACTIVE: <Badge variant="muted" dot>Inactive</Badge>,
  SUSPENDED: <Badge variant="danger" dot>Suspended</Badge>,
  PENDING_KYC: <Badge variant="warning" dot>Pending KYC</Badge>,
};

function CreditBar({ score }: { score: number }) {
  const color = score >= 70 ? "bg-success" : score >= 40 ? "bg-warning" : "bg-danger";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-surface-600 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${score}%` }} />
      </div>
      <span className="text-surface-300 text-xs">{score}</span>
    </div>
  );
}

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = CUSTOMERS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.account.includes(search) ||
      c.phone.includes(search);
    const matchStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-white text-xl font-semibold">Customers</h1>
          <p className="text-surface-400 text-sm mt-0.5">{CUSTOMERS.length} total customers</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg px-4 py-2 transition shrink-0">
          <Plus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 flex-1 max-w-md focus-within:border-primary transition">
          <Search className="w-4 h-4 text-surface-400 shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, account, phone…"
            className="bg-transparent text-sm text-white placeholder-surface-500 outline-none w-full"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["ALL", "ACTIVE", "SUSPENDED", "INACTIVE", "PENDING_KYC"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-lg border transition",
                statusFilter === s
                  ? "bg-primary/15 border-primary/30 text-primary"
                  : "border-surface-700 text-surface-400 hover:border-surface-600 hover:text-white"
              )}
            >
              {s === "ALL" ? "All" : s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-800 border border-surface-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-700">
                <th className="text-left text-surface-400 font-medium px-4 py-3">Customer</th>
                <th className="text-left text-surface-400 font-medium px-4 py-3 hidden md:table-cell">Account</th>
                <th className="text-left text-surface-400 font-medium px-4 py-3 hidden lg:table-cell">Phone</th>
                <th className="text-left text-surface-400 font-medium px-4 py-3 hidden lg:table-cell">Plan</th>
                <th className="text-left text-surface-400 font-medium px-4 py-3">Status</th>
                <th className="text-left text-surface-400 font-medium px-4 py-3 hidden xl:table-cell">Credit</th>
                <th className="text-left text-surface-400 font-medium px-4 py-3 hidden xl:table-cell">KYC</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-surface-700/50 hover:bg-surface-700/30 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                        {c.name[0]}
                      </div>
                      <div>
                        <Link href={`/customers/${c.id}`} className="text-white hover:text-primary transition font-medium">
                          {c.name}
                        </Link>
                        <p className="text-surface-500 text-xs">{c.type} · {c.district}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-surface-400 font-mono text-xs hidden md:table-cell">{c.account}</td>
                  <td className="px-4 py-3 text-surface-300 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-surface-500" />
                      {c.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-surface-300 hidden lg:table-cell">{c.plan}</td>
                  <td className="px-4 py-3">{STATUS_BADGE[c.status as keyof typeof STATUS_BADGE]}</td>
                  <td className="px-4 py-3 hidden xl:table-cell"><CreditBar score={c.credit} /></td>
                  <td className="px-4 py-3 hidden xl:table-cell">
                    {c.kyc ? (
                      <span className="flex items-center gap-1 text-success text-xs"><Shield className="w-3.5 h-3.5" /> Verified</span>
                    ) : (
                      <span className="text-warning text-xs">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-surface-400 hover:text-white transition p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-surface-700 flex items-center justify-between">
          <p className="text-surface-500 text-xs">Showing {filtered.length} of {CUSTOMERS.length}</p>
          <div className="flex gap-1.5">
            <button className="px-3 py-1.5 text-xs border border-surface-700 rounded-lg text-surface-400 hover:border-surface-600 hover:text-white transition">Prev</button>
            <button className="px-3 py-1.5 text-xs border border-surface-700 rounded-lg text-surface-400 hover:border-surface-600 hover:text-white transition">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
