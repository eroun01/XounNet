"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Activity, BarChart3, Users, FileText, CreditCard,
  Network, Ticket, UserCheck, LifeBuoy, MessageSquare, Shield, Settings,
  Wifi, ChevronLeft, ChevronRight, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui.store";
import { NAV_SECTIONS } from "@/config/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, Activity, BarChart3, Users, FileText, CreditCard,
  Network, Ticket, UserCheck, LifeBuoy, MessageSquare, Shield, Settings,
};

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, mobileSidebarOpen, toggleSidebar, setMobileSidebar } =
    useUIStore();

  const content = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-5 border-b border-surface-700",
          sidebarCollapsed && "justify-center px-2"
        )}
      >
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Wifi className="w-4 h-4 text-white" />
        </div>
        {!sidebarCollapsed && (
          <div>
            <span className="text-white font-bold text-sm leading-none block">XounNet</span>
            <span className="text-surface-400 text-xs">ISP OS</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            {!sidebarCollapsed && (
              <p className="text-surface-500 text-[10px] font-semibold uppercase tracking-widest px-2 mb-1">
                {section.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = ICON_MAP[item.icon] ?? LayoutDashboard;
                const active = item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileSidebar(false)}
                      title={sidebarCollapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors group",
                        active
                          ? "bg-primary/15 text-primary font-medium"
                          : "text-surface-300 hover:bg-surface-700 hover:text-white",
                        sidebarCollapsed && "justify-center px-2"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-4.5 h-4.5 shrink-0",
                          active ? "text-primary" : "text-surface-400 group-hover:text-white"
                        )}
                      />
                      {!sidebarCollapsed && item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse toggle (desktop) */}
      <div className="border-t border-surface-700 p-2">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-lg text-surface-400 hover:bg-surface-700 hover:text-white transition"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-surface-800 border-r border-surface-700 h-full",
          "transition-all duration-200",
          sidebarCollapsed ? "w-14" : "w-56"
        )}
      >
        {content}
      </aside>

      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebar(false)}
          />
          <aside className="relative z-50 w-64 bg-surface-800 border-r border-surface-700 h-full flex flex-col">
            <button
              onClick={() => setMobileSidebar(false)}
              className="absolute top-4 right-4 text-surface-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
