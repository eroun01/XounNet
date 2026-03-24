"use client";
import { io, Socket } from "socket.io-client";
import { WS_URL } from "@/config/constants";
import { useNetworkStore } from "@/store/network.store";
import type { Router, NetworkSession, NetworkAlert, BandwidthDataPoint } from "@/types";

let socket: Socket | null = null;

export function connectWebSocket(token: string): Socket {
  if (socket?.connected) return socket;

  socket = io(WS_URL, {
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 10000,
  });

  const store = useNetworkStore.getState;

  socket.on("connect", () => {
    store().setConnected(true);
    console.info("[WS] Connected");
  });

  socket.on("disconnect", () => {
    store().setConnected(false);
    console.warn("[WS] Disconnected");
  });

  // ── Network events ──────────────────────────────────────────────────────────
  socket.on("routers:snapshot", (routers: Router[]) => {
    store().setRouters(routers);
  });

  socket.on("router:update", (router: Partial<Router> & { id: string }) => {
    store().updateRouter(router);
  });

  socket.on("sessions:snapshot", (sessions: NetworkSession[]) => {
    store().setSessions(sessions);
  });

  socket.on("session:new", (session: NetworkSession) => {
    store().addSession(session);
  });

  socket.on("session:closed", ({ id }: { id: string }) => {
    store().removeSession(id);
  });

  socket.on("bandwidth:tick", (point: BandwidthDataPoint) => {
    store().pushBandwidth(point);
  });

  socket.on("alert:new", (alert: NetworkAlert) => {
    store().addAlert(alert);
  });

  socket.on("alert:resolved", ({ id }: { id: string }) => {
    store().resolveAlert(id);
  });

  return socket;
}

export function disconnectWebSocket() {
  socket?.disconnect();
  socket = null;
}

export function getSocket(): Socket | null {
  return socket;
}
