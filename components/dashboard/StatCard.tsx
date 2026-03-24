import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: number; // percent, positive = up
  changeLabel?: string;
  icon: React.ReactNode;
  iconBg?: string;
  accent?: string;
}

export function StatCard({ title, value, change, changeLabel, icon, iconBg = "bg-primary/10", accent = "text-primary" }: StatCardProps) {
  const isUp = change !== undefined && change > 0;
  const isDown = change !== undefined && change < 0;

  return (
    <div className="bg-surface-800 border border-surface-700 rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <p className="text-surface-400 text-sm font-medium">{title}</p>
        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", iconBg)}>
          <span className={accent}>{icon}</span>
        </div>
      </div>
      <p className="text-white text-2xl font-bold mb-1.5">{value}</p>
      {change !== undefined && (
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
              isUp ? "text-success" : isDown ? "text-danger" : "text-surface-400"
            )}
          >
            {isUp ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : isDown ? (
              <TrendingDown className="w-3.5 h-3.5" />
            ) : (
              <Minus className="w-3.5 h-3.5" />
            )}
            {Math.abs(change).toFixed(1)}%
          </span>
          {changeLabel && (
            <span className="text-surface-500 text-xs">{changeLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
