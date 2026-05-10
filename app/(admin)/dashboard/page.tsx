"use client";

import { motion } from "framer-motion";
import { Users, FolderOpen, Calendar as CalendarIcon, TrendingUp } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";

export default function AdminDashboardPage() {
  const { clients, portfolioItems, bookingRequests } = useAdminStore();

  const stats = [
    { label: "Total Clients", value: clients.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Projects", value: clients.length, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Portfolio Items", value: portfolioItems.length, icon: FolderOpen, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Pending Bookings", value: bookingRequests.filter(b => b.status === "pending").length, icon: CalendarIcon, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-2">
            Dashboard Overview
          </h1>
          <p className="font-body text-[var(--text-muted)]">
            Welcome to the MAG Design Control Panel. Here is what is happening today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-light)] flex items-center gap-4"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <div className="text-3xl font-display font-semibold text-[var(--text-primary)]">
                  {stat.value}
                </div>
                <div className="font-body text-sm font-medium text-[var(--text-muted)]">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-light)]">
          <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-6">
            Recent Consultation Requests
          </h2>
          <div className="space-y-4">
            {bookingRequests.slice(0, 5).map((req) => (
              <div key={req.id} className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-primary)]">
                <div>
                  <div className="font-semibold text-[var(--text-primary)]">{req.clientName}</div>
                  <div className="text-sm text-[var(--text-muted)]">{req.projectType} • {req.preferredDate}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  req.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                  req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {req.status.toUpperCase()}
                </span>
              </div>
            ))}
            {bookingRequests.length === 0 && (
              <div className="text-center py-8 text-[var(--text-muted)]">
                No recent booking requests.
              </div>
            )}
          </div>
        </div>

        {/* Active Clients */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-light)]">
          <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-6">
            Active Client Portals
          </h2>
          <div className="space-y-4">
            {clients.slice(0, 5).map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-primary)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--gold-primary)] flex items-center justify-center text-white font-bold">
                    {client.name.en.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">{client.name.en}</div>
                    <div className="text-sm text-[var(--text-muted)]">{client.project.title.en}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[var(--gold-primary)]">{client.project.overallProgress}%</div>
                  <div className="text-xs text-[var(--text-muted)]">Progress</div>
                </div>
              </div>
            ))}
            {clients.length === 0 && (
              <div className="text-center py-8 text-[var(--text-muted)]">
                No active clients.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
