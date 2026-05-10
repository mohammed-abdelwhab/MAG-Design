"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, MoreVertical } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import Image from "next/image";

export default function AdminClientsPage() {
  const { clients, deleteClient } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(c => 
    c.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.clientCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <button className="btn-primary flex items-center justify-center gap-2 px-6">
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
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[var(--border-light)] focus:border-[var(--gold-primary)] outline-none bg-[var(--bg-primary)]"
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
                        <div className="bg-[var(--gold-primary)] h-2 rounded-full" style={{ width: `${client.project.overallProgress}%` }} />
                      </div>
                      <span className="text-sm font-bold text-[var(--gold-primary)]">{client.project.overallProgress}%</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => deleteClient(client.id)} className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors">
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
    </div>
  );
}
