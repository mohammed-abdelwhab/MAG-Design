"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { usePortalStore } from "@/store/portalStore";
import type { ClientMessage } from "@/types";

interface MessageThreadProps {
  messages: ClientMessage[];
}

export function MessageThread({ messages }: MessageThreadProps) {
  const { locale, dir } = useUIStore();
  const { markMessageRead } = usePortalStore();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mark unread messages from team as read when viewed
  useEffect(() => {
    messages.forEach((msg) => {
      if (msg.sender === "team" && !msg.read) {
        markMessageRead(msg.id);
      }
    });
  }, [messages, markMessageRead]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // In a real app, this would dispatch an action or make an API call
    console.log("Sending message:", newMessage);
    
    // Reset input
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[70vh] bg-white rounded-2xl border border-[var(--border-light)] shadow-sm overflow-hidden relative">
      
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-light)] bg-white z-10">
        <h3 className="font-display font-semibold text-[var(--text-primary)]">
          {locale === "en" ? "Project Chat" : "محادثة المشروع"}
        </h3>
        <p className="font-body text-xs text-[var(--text-muted)]">
          {locale === "en" ? "Communicate directly with your design and supervision team." : "تواصل مباشرة مع فريق التصميم والإشراف الخاص بك."}
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[var(--bg-primary)]/30">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-[var(--text-muted)]">
            <p className="font-body text-sm">
              {locale === "en" ? "No messages yet. Start the conversation!" : "لا توجد رسائل بعد. ابدأ المحادثة!"}
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isClient = msg.sender === "client";
            return (
              <div 
                key={msg.id} 
                className={`flex flex-col max-w-[85%] md:max-w-[70%] ${
                  isClient 
                    ? `self-end ${dir === "rtl" ? "items-start ml-auto" : "items-end ml-auto"}` 
                    : `self-start ${dir === "rtl" ? "items-end mr-auto" : "items-start mr-auto"}`
                }`}
              >
                <div className={`font-body text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1 mx-2`}>
                  {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US", { hour: '2-digit', minute: '2-digit' })}
                </div>
                
                <div 
                  className={`p-4 rounded-2xl font-body text-sm leading-relaxed ${
                    isClient 
                      ? "bg-[var(--gold-primary)] text-white rounded-tr-none" 
                      : "bg-white border border-[var(--border-light)] text-[var(--text-primary)] rounded-tl-none shadow-sm"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-[var(--border-light)] z-10">
        <form onSubmit={handleSend} className="flex items-end gap-3 relative">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={locale === "en" ? "Type your message..." : "اكتب رسالتك..."}
            className={`flex-1 max-h-32 min-h-[48px] py-3 px-4 bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-xl focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none resize-none font-body text-sm transition-colors`}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--gold-primary)] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--gold-accent)] transition-colors"
          >
            <Send size={18} className={dir === "rtl" ? "rotate-180" : ""} />
          </button>
        </form>
        <div className="mt-2 text-center">
          <span className="font-body text-[10px] text-[var(--text-muted)]">
            {locale === "en" ? "Press Enter to send, Shift + Enter for new line" : "اضغط Enter للإرسال، Shift + Enter لسطر جديد"}
          </span>
        </div>
      </div>
    </div>
  );
}
