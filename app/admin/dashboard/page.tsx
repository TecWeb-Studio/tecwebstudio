"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import {
  LogOut,
  RefreshCw,
  Mail,
  Clock,
  User,
  MessageSquare,
  Inbox,
  Bell,
  BellOff,
  Trash2,
  FlaskConical,
} from "lucide-react";

interface Ticket {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const statusConfig: Record<
  string,
  { label: string; variant: "default" | "success" | "warning" | "error" | "info" }
> = {
  open: { label: "Open", variant: "success" },
  "in-progress": { label: "In Progress", variant: "warning" },
  resolved: { label: "Resolved", variant: "info" },
  closed: { label: "Closed", variant: "error" },
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [expandedTicket, setExpandedTicket] = useState<number | null>(null);
  const [pushSupported, setPushSupported] = useState(false);
  const [pushSubscribed, setPushSubscribed] = useState(false);
  const [pushLoading, setPushLoading] = useState(false);
  const [pushTestLoading, setPushTestLoading] = useState(false);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tickets");
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch {
      console.error("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Register service worker and check push subscription status
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(async (reg) => {
        // Wait for the service worker to be ready
        await navigator.serviceWorker.ready;
        if ("PushManager" in window) {
          setPushSupported(true);
          const sub = await reg.pushManager.getSubscription();
          setPushSubscribed(!!sub);
        }
      }).catch((err) => {
        console.error("SW registration failed:", err);
      });
    }
  }, []);

  const handlePushToggle = async () => {
    if (!pushSupported) return;
    setPushLoading(true);

    try {
      const reg = await navigator.serviceWorker.ready;

      if (pushSubscribed) {
        // Unsubscribe
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
          await fetch("/api/push/subscribe", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ endpoint: sub.endpoint }),
          });
          await sub.unsubscribe();
        }
        setPushSubscribed(false);
      } else {
        // Request notification permission first (required on iOS)
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("Notification permission denied");
          setPushLoading(false);
          return;
        }

        // Subscribe
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        if (!vapidKey) {
          console.error("VAPID public key not configured");
          return;
        }

        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidKey),
        });

        await fetch("/api/push/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sub.toJSON()),
        });
        setPushSubscribed(true);
      }
    } catch (err) {
      console.error("Push toggle error:", err);
    } finally {
      setPushLoading(false);
    }
  };

  const handlePushTest = async () => {
    setPushTestLoading(true);
    try {
      const res = await fetch("/api/admin/push/test", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Errore durante il test push");
        return;
      }
      alert(data.message || "Notifica di test inviata");
    } catch {
      alert("Errore di rete durante il test push");
    } finally {
      setPushTestLoading(false);
    }
  };

  function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length) as Uint8Array<ArrayBuffer>;
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  useEffect(() => {
    // Check auth first
    fetch("/api/auth/check").then((res) => {
      if (!res.ok) {
        router.push("/admin");
      } else {
        fetchTickets();
      }
    });
  }, [router, fetchTickets]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/tickets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setTickets((prev) =>
          prev.map((t) =>
            t.id === id
              ? { ...t, status: newStatus, updated_at: new Date().toISOString() }
              : t
          )
        );
      }
    } catch {
      console.error("Failed to update ticket status");
    }
  };

  const handleDeleteTicket = async (id: number) => {
    if (!confirm("Sei sicuro di voler eliminare questo ticket?")) return;
    try {
      const res = await fetch("/api/admin/tickets", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setTickets((prev) => prev.filter((t) => t.id !== id));
        setExpandedTicket(null);
      }
    } catch {
      console.error("Failed to delete ticket");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  };

  const filteredTickets =
    filter === "all" ? tickets : tickets.filter((t) => t.status === filter);

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in-progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 dot-grid opacity-10"></div>

      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <Inbox className="w-4 h-4 text-emerald-400" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white truncate">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {pushSupported && (
              <Button
                variant={pushSubscribed ? "default" : "outline"}
                size="sm"
                onClick={handlePushToggle}
                className="gap-1 sm:gap-2 px-2 sm:px-3"
                disabled={pushLoading}
              >
                {pushSubscribed ? (
                  <Bell className="w-4 h-4" />
                ) : (
                  <BellOff className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {pushLoading
                    ? "..."
                    : pushSubscribed
                    ? "Notifiche ON"
                    : "Notifiche OFF"}
                </span>
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handlePushTest}
              className="gap-1 sm:gap-2 px-2 sm:px-3"
              disabled={pushTestLoading}
            >
              {pushTestLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <FlaskConical className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Test Push</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchTickets}
              className="gap-1 sm:gap-2 px-2 sm:px-3"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-1 sm:gap-2 px-2 sm:px-3"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: "Total", value: stats.total, color: "text-white" },
            { label: "Open", value: stats.open, color: "text-green-400" },
            { label: "In Progress", value: stats.inProgress, color: "text-yellow-400" },
            { label: "Resolved", value: stats.resolved, color: "text-blue-400" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card variant="default" className="p-2 sm:p-4 text-center">
                <div className={`text-xl sm:text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-slate-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "open", "in-progress", "resolved", "closed"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="text-xs capitalize cursor-pointer"
            >
              {f === "all" ? "All" : statusConfig[f]?.label || f}
            </Button>
          ))}
        </div>

        {/* Tickets */}
        {loading ? (
          <div className="text-center py-20">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Loading tickets...</p>
          </div>
        ) : filteredTickets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Inbox className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No tickets found</p>
            <p className="text-slate-500 text-sm mt-1">
              {filter !== "all"
                ? "Try changing the filter"
                : "Contact form submissions will appear here"}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card
                  variant="default"
                  className={`p-0 overflow-hidden cursor-pointer transition-all duration-200 ${
                    expandedTicket === ticket.id
                      ? "border-emerald-400/50"
                      : ""
                  }`}
                  onClick={() =>
                    setExpandedTicket(
                      expandedTicket === ticket.id ? null : ticket.id
                    )
                  }
                >
                  {/* Header row */}
                  <div className="flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                      <span className="text-slate-500 text-xs font-mono w-6 sm:w-8 flex-shrink-0">
                        #{ticket.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <User className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="text-white font-semibold text-xs sm:text-sm truncate">
                            {ticket.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-500 flex-shrink-0" />
                          <span className="text-slate-400 text-[11px] sm:text-xs truncate">
                            {ticket.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      <div className="hidden sm:flex items-center gap-1 text-slate-500 text-xs">
                        <Clock className="w-3 h-3" />
                        {formatDate(ticket.created_at)}
                      </div>
                      <Badge
                        variant={
                          statusConfig[ticket.status]?.variant || "default"
                        }
                        className="text-[10px] sm:text-xs"
                      >
                        {statusConfig[ticket.status]?.label || ticket.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {expandedTicket === ticket.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-emerald-500/10"
                    >
                      <div className="px-5 py-4 space-y-4">
                        <div>
                          <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                            <MessageSquare className="w-3.5 h-3.5" />
                            Message
                          </div>
                          <p className="text-slate-200 text-sm leading-relaxed bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                            {ticket.message}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-slate-500 text-xs sm:hidden">
                          <Clock className="w-3 h-3" />
                          {formatDate(ticket.created_at)}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-2">
                          <span className="text-slate-400 text-xs">
                            Cambia stato:
                          </span>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {["open", "in-progress", "resolved", "closed"].map(
                              (s) => (
                                <button
                                  key={s}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(ticket.id, s);
                                  }}
                                  className={`px-2 sm:px-2.5 py-1.5 sm:py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                                    ticket.status === s
                                      ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/50"
                                      : "bg-slate-800/50 text-slate-400 border border-slate-700/30 hover:border-emerald-500/30 hover:text-white"
                                  }`}
                                >
                                  {statusConfig[s]?.label || s}
                                </button>
                              )
                            )}
                          </div>
                        </div>

                        {/* Delete ticket */}
                        <div className="flex justify-end pt-2 border-t border-slate-700/30">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTicket(ticket.id);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Elimina ticket
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
