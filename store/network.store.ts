"use client";
import { create } from "zustand";
import type {
  Router,
  NetworkSession,
  NetworkAlert,
  BandwidthDataPoint,
} from "@/types";

interface NetworkState {
  routers: Router[];
  sessions: NetworkSession[];
  alerts: NetworkAlert[];
  bandwidthHistory: BandwidthDataPoint[];
  totalTxBps: number;
  totalRxBps: number;
  connected: boolean;

  setRouters: (routers: Router[]) => void;
  updateRouter: (router: Partial<Router> & { id: string }) => void;
  setSessions: (sessions: NetworkSession[]) => void;
  addSession: (session: NetworkSession) => void;
  removeSession: (id: string) => void;
  addAlert: (alert: NetworkAlert) => void;
  resolveAlert: (id: string) => void;
  pushBandwidth: (point: BandwidthDataPoint) => void;
  setConnected: (connected: boolean) => void;
}

const MAX_BANDWIDTH_POINTS = 60; // 1 minute of 1s samples

export const useNetworkStore = create<NetworkState>()((set) => ({
  routers: [],
  sessions: [],
  alerts: [],
  bandwidthHistory: [],
  totalTxBps: 0,
  totalRxBps: 0,
  connected: false,

  setRouters: (routers) => set({ routers }),

  updateRouter: (update) =>
    set((s) => ({
      routers: s.routers.map((r) =>
        r.id === update.id ? { ...r, ...update } : r
      ),
    })),

  setSessions: (sessions) => set({ sessions }),

  addSession: (session) =>
    set((s) => ({ sessions: [...s.sessions, session] })),

  removeSession: (id) =>
    set((s) => ({ sessions: s.sessions.filter((s2) => s2.id !== id) })),

  addAlert: (alert) =>
    set((s) => ({ alerts: [alert, ...s.alerts].slice(0, 100) })),

  resolveAlert: (id) =>
    set((s) => ({
      alerts: s.alerts.map((a) =>
        a.id === id ? { ...a, resolved: true } : a
      ),
    })),

  pushBandwidth: (point) =>
    set((s) => {
      const history = [...s.bandwidthHistory, point].slice(-MAX_BANDWIDTH_POINTS);
      return {
        bandwidthHistory: history,
        totalTxBps: point.txBps,
        totalRxBps: point.rxBps,
      };
    }),

  setConnected: (connected) => set({ connected }),
}));
