"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, MoreVertical, AlertTriangle } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminClientsPage() {
  const { clients, deleteClient } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredClients = clients.filter(c => 
    c.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.clientCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDelete = () => {
    if (deleteId) {
      deleteClient(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-2">
            Client & Project Management
          </h1>
          <p className="font-body text-[var(--text-muted)]">
            Manage active client portals, update project progress, and manage phase timelines.
          </p>
        </div>
        <button className="btn-primary flex items-center justify-center gap-2 px-6 hover:scale-105 transition-transform">
          <Plus size={18} />
          Add New Client
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-light)]">
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-3.5 text-[var(--text-muted)]" />
          <input 
            type="text" 
            placeholder="Search clients by name or code..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[var(--border-light)] focus:border-[var(--gold-primary)] outline-none bg-[var(--bg-primary)] transition-colors"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body">
            <thead>
              <tr className="border-b border-[var(--border-light)] text-[var(--text-muted)] text-sm">
                <th className="pb-4 font-semibold">Client</th>
                <th className="pb-4 font-semibold">Code</th>
                <th className="pb-4 font-semibold">Project</th>
                <th className="pb-4 font-semibold">Progress</th>
                <th className="pb-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-light)]">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image src={client.avatar} alt={client.name.en} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--text-primary)]">{client.name.en}</div>
                        <div className="text-xs text-[var(--text-muted)]">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-mono text-sm">{client.clientCode}</td>
                  <td className="py-4">
                    <div className="text-sm font-medium">{client.project.title.en}</div>
                    <div className="text-xs text-[var(--text-muted)]">{client.project.projectType} • {client.project.style}</div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-[var(--gold-primary)] h-2 rounded-full transition-all duration-1000" style={{ width: `${client.project.overallProgress}%` }} />
                      </div>
                      <span className="text-sm font-bold text-[var(--gold-primary)]">{client.project.overallProgress}%</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-[var(--gold-primary)] hover:scale-110 transition-all duration-200"
                        title="Edit Client"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => setDeleteId(client.id)} 
                        className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-200"
                        title="Delete Client"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[var(--text-muted)]">
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Verification Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 text-center shadow-xl"
            >
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <h2 className="font-display text-2xl font-semibold mb-2">Delete Client Portal?</h2>
              <p className="text-gray-500 mb-8">
                Are you sure you want to completely delete this client and all their portal data (messages, documents, photos)? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-3 rounded-xl bg-gray-100 font-semibold hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors">
                  Yes, Delete Client
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
