"use client";

import { useState } from "react";
import { Send, Search, Check } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import Image from "next/image";

export default function AdminMessagesPage() {
  const { clients } = useAdminStore();
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || "");
  const [replyText, setReplyText] = useState("");

  const activeClient = clients.find(c => c.id === selectedClientId);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div>
        <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-2">
          Centralized Inbox
        </h1>
        <p className="font-body text-[var(--text-muted)]">
          View and reply to messages from all your active client portals.
        </p>
      </div>

      <div className="flex-1 flex bg-white rounded-2xl shadow-sm border border-[var(--border-light)] overflow-hidden min-h-0">
        
        {/* Left Sidebar - Client List */}
        <div className="w-80 border-r border-[var(--border-light)] flex flex-col">
          <div className="p-4 border-b border-[var(--border-light)]">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input type="text" placeholder="Search clients..." className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 border border-gray-200 outline-none text-sm" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {clients.map(client => {
              const unreadCount = client.project.messages.filter(m => !m.read && m.sender === 'client').length;
              return (
                <button
                  key={client.id}
                  onClick={() => setSelectedClientId(client.id)}
                  className={`w-full text-left p-4 border-b border-gray-100 transition-colors ${selectedClientId === client.id ? 'bg-[var(--gold-primary)]/5 border-l-4 border-l-[var(--gold-primary)]' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Image src={client.avatar} alt={client.name.en} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-semibold text-sm truncate">{client.name.en}</div>
                        {unreadCount > 0 && (
                          <span className="bg-[var(--gold-primary)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 truncate">{client.project.title.en}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Area - Chat */}
        {activeClient ? (
          <div className="flex-1 flex flex-col min-w-0">
            {/* Chat Header */}
            <div className="p-4 border-b border-[var(--border-light)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="font-semibold">{activeClient.name.en}</div>
                <div className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-md font-mono">{activeClient.clientCode}</div>
              </div>
              <button className="text-xs text-[var(--gold-primary)] font-semibold hover:underline">
                Mark all as read
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
              {activeClient.project.messages.map((msg) => {
                const isAdmin = msg.sender === "team";
                return (
                  <div key={msg.id} className={`flex flex-col max-w-[70%] ${isAdmin ? "self-end items-end ml-auto" : "self-start items-start mr-auto"}`}>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 mx-2">
                      {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${isAdmin ? "bg-[var(--dark-deep)] text-white rounded-tr-none" : "bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm"}`}>
                      {msg.message}
                    </div>
                    {isAdmin && msg.read && (
                      <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                        <Check size={12} /> Read
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-[var(--border-light)]">
              <div className="flex items-end gap-3">
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder={`Reply to ${activeClient.name.en}...`}
                  className="flex-1 max-h-32 min-h-[48px] py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-[var(--gold-primary)] outline-none resize-none text-sm"
                  rows={1}
                />
                <button 
                  disabled={!replyText.trim()}
                  className="w-12 h-12 rounded-xl bg-[var(--gold-primary)] text-white flex items-center justify-center disabled:opacity-50 hover:bg-yellow-600 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a client to view messages.
          </div>
        )}
      </div>
    </div>
  );
}
