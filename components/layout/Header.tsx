"use client";
import React, { useState } from "react";
import { Menu, Search, Bell, Wifi, WifiOff, ChevronDown, LogOut, User, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui.store";
import { useNetworkStore } from "@/store/network.store";

interface HeaderProps {
  title?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export function Header({ title, breadcrumb }: HeaderProps) {
  const router = useRouter();
  const { setMobileSidebar } = useUIStore();
  const { connected } = useNetworkStore();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.replace("/login");
  }

  return (
    <header className="h-14 bg-surface-800 border-b border-surface-700 flex items-center gap-3 px-4 shrink-0">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setMobileSidebar(true)}
        className="lg:hidden text-surface-400 hover:text-white transition p-1"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-2 min-w-0">
        {breadcrumb ? (
          breadcrumb.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-surface-600">/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="text-surface-400 hover:text-white text-sm transition truncate">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-surface-200 text-sm font-medium truncate">{crumb.label}</span>
              )}
            </React.Fragment>
          ))
        ) : title ? (
          <h2 className="text-surface-200 text-sm font-medium truncate">{title}</h2>
        ) : null}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-surface-700 border border-surface-600 rounded-lg px-3 py-1.5 w-52 focus-within:border-primary transition">
        <Search className="w-3.5 h-3.5 text-surface-400 shrink-0" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search…"
          className="bg-transparent text-sm text-white placeholder-surface-500 outline-none w-full"
        />
      </div>

      {/* WS Status */}
      <div
        className={cn(
          "hidden sm:flex items-center gap-1.5 text-xs rounded-full px-2.5 py-1 border",
          connected
            ? "bg-success/10 border-success/30 text-success"
            : "bg-danger/10 border-danger/30 text-danger"
        )}
      >
        {connected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
        {connected ? "Live" : "Offline"}
      </div>

      {/* Notifications */}
      <button className="relative text-surface-400 hover:text-white transition p-1.5">
        <Bell className="w-5 h-5" />
        <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-danger rounded-full" />
      </button>

      {/* User menu */}
      <div className="relative">
        <button
          onClick={() => setUserMenuOpen((v) => !v)}
          className="flex items-center gap-2 hover:bg-surface-700 rounded-lg px-2 py-1.5 transition"
        >
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <span className="hidden sm:block text-surface-200 text-sm">Admin</span>
          <ChevronDown className="w-3.5 h-3.5 text-surface-400" />
        </button>

        {userMenuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
            <div className="absolute right-0 top-full mt-1.5 w-44 bg-surface-800 border border-surface-700 rounded-xl shadow-xl z-20 py-1">
              <Link
                href="/settings"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-surface-300 hover:bg-surface-700 hover:text-white transition"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <Link
                href="/security"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-surface-300 hover:bg-surface-700 hover:text-white transition"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <div className="border-t border-surface-700 mt-1 pt-1">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-danger hover:bg-danger/10 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
