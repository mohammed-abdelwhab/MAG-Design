"use client";

import { useState } from "react";
import { Upload, FileText, Image as ImageIcon } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";

export default function AdminPortalContentPage() {
  const { clients } = useAdminStore();
  const [selectedClient, setSelectedClient] = useState(clients[0]?.id || "");

  const activeClient = clients.find(c => c.id === selectedClient);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-2">
          Portal Content Management
        </h1>
        <p className="font-body text-[var(--text-muted)]">
          Upload documents and site photos directly to a specific client's portal.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-light)] mb-8">
        <label className="block text-sm font-semibold mb-2">Select Target Client</label>
        <select 
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="w-full max-w-md p-3 rounded-lg border border-[var(--border-light)] outline-none focus:border-[var(--gold-primary)] font-body"
        >
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.name.en} - {c.project.title.en}</option>
          ))}
        </select>
      </div>

      {activeClient && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Document Upload */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-light)]">
            <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
              <FileText size={20} className="text-[var(--gold-primary)]" />
              Upload Document
            </h2>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[var(--gold-primary)] transition-colors mb-6 cursor-pointer">
              <Upload size={32} className="mx-auto text-gray-400 mb-3" />
              <div className="font-semibold text-gray-700">Click to upload or drag and drop</div>
              <div className="text-sm text-gray-500 mt-1">PDF, DOCX, or XLS (max. 10MB)</div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Document Type</label>
                <select className="w-full p-3 rounded-lg border border-[var(--border-light)] outline-none">
                  <option>Contract</option>
                  <option>Invoice</option>
                  <option>Layout Plan</option>
                  <option>Report</option>
                </select>
              </div>
              <button className="w-full btn-primary py-3">Upload to Portal</button>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-light)]">
            <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
              <ImageIcon size={20} className="text-[var(--gold-primary)]" />
              Upload Site Photo
            </h2>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[var(--gold-primary)] transition-colors mb-6 cursor-pointer">
              <Upload size={32} className="mx-auto text-gray-400 mb-3" />
              <div className="font-semibold text-gray-700">Click to upload image</div>
              <div className="text-sm text-gray-500 mt-1">JPG, PNG (max. 5MB)</div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Project Phase</label>
                <select className="w-full p-3 rounded-lg border border-[var(--border-light)] outline-none">
                  {activeClient.project.phases.map(p => (
                    <option key={p.id} value={p.phase}>{p.title.en}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Photo Caption</label>
                <input type="text" placeholder="e.g. Living room gypsum board installation" className="w-full p-3 rounded-lg border border-[var(--border-light)] outline-none" />
              </div>
              <button className="w-full btn-primary py-3">Add to Gallery</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
