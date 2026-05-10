"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Check, X, Plus, Trash2 } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";

export default function AdminBookingsPage() {
  const { bookingRequests, updateBookingStatus, businessHours, updateBusinessHours, blockedSlots, addBlockedSlot, removeBlockedSlot } = useAdminStore();

  const [activeTab, setActiveTab] = useState<"requests" | "calendar">("requests");

  // New Blocked Slot State
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [slotDate, setSlotDate] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [slotReason, setSlotReason] = useState("");

  const handleBlockSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (slotDate && slotTime) {
      addBlockedSlot({
        id: `block-${Date.now()}`,
        date: slotDate,
        time: slotTime,
        reason: slotReason || "Busy",
      });
      setIsSlotModalOpen(false);
      setSlotDate(""); setSlotTime(""); setSlotReason("");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-2">
          Bookings & Calendar
        </h1>
        <p className="font-body text-[var(--text-muted)]">
          Manage consultation requests and your public calendar availability.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--border-light)] gap-8">
        <button 
          onClick={() => setActiveTab("requests")}
          className={`pb-4 font-semibold text-sm transition-colors relative ${activeTab === "requests" ? "text-[var(--gold-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`}
        >
          Consultation Requests
          {activeTab === "requests" && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--gold-primary)]" />}
        </button>
        <button 
          onClick={() => setActiveTab("calendar")}
          className={`pb-4 font-semibold text-sm transition-colors relative ${activeTab === "calendar" ? "text-[var(--gold-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`}
        >
          Calendar & Availability
          {activeTab === "calendar" && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--gold-primary)]" />}
        </button>
      </div>

      {/* Requests Tab */}
      {activeTab === "requests" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {bookingRequests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-2xl border border-[var(--border-light)] shadow-sm flex flex-col md:flex-row gap-6 justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-display font-semibold text-xl">{req.clientName}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    req.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                    req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {req.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm text-[var(--text-muted)] flex items-center gap-4">
                  <span>{req.email}</span>
                  <span>{req.phone}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-primary)] rounded-lg text-sm font-semibold text-[var(--gold-primary)] mt-2">
                  <CalendarIcon size={16} />
                  {req.preferredDate} at {req.preferredTime}
                </div>
                <p className="text-sm text-[var(--text-primary)] mt-3 p-4 bg-gray-50 rounded-xl italic">
                  "{req.message}"
                </p>
              </div>

              {req.status === "pending" && (
                <div className="flex flex-col gap-3 justify-center min-w-[140px]">
                  <button 
                    onClick={() => updateBookingStatus(req.id, "approved")}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    <Check size={18} /> Approve
                  </button>
                  <button 
                    onClick={() => updateBookingStatus(req.id, "rejected")}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-200 text-red-500 font-semibold hover:bg-red-50 transition-colors"
                  >
                    <X size={18} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
          {bookingRequests.length === 0 && (
            <div className="text-center py-12 text-[var(--text-muted)]">No booking requests.</div>
          )}
        </motion.div>
      )}

      {/* Calendar Tab */}
      {activeTab === "calendar" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* General Settings */}
          <div className="bg-white p-6 rounded-2xl border border-[var(--border-light)] shadow-sm">
            <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
              <Clock size={20} className="text-[var(--gold-primary)]" />
              General Availability
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Opening Time</label>
                  <input 
                    type="time" 
                    value={businessHours.open} 
                    onChange={e => updateBusinessHours({ ...businessHours, open: e.target.value })}
                    className="w-full p-3 rounded-lg border border-[var(--border-light)] outline-none focus:border-[var(--gold-primary)]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Closing Time</label>
                  <input 
                    type="time" 
                    value={businessHours.close} 
                    onChange={e => updateBusinessHours({ ...businessHours, close: e.target.value })}
                    className="w-full p-3 rounded-lg border border-[var(--border-light)] outline-none focus:border-[var(--gold-primary)]" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Meeting Duration (Minutes)</label>
                <select 
                  value={businessHours.slotDurationMinutes}
                  onChange={e => updateBusinessHours({ ...businessHours, slotDurationMinutes: Number(e.target.value) })}
                  className="w-full p-3 rounded-lg border border-[var(--border-light)] outline-none focus:border-[var(--gold-primary)]"
                >
                  <option value={30}>30 Minutes</option>
                  <option value={45}>45 Minutes</option>
                  <option value={60}>60 Minutes</option>
                  <option value={90}>90 Minutes</option>
                </select>
              </div>
              <button className="w-full btn-primary py-3">Save Settings</button>
            </div>
          </div>

          {/* Blocked Slots */}
          <div className="bg-white p-6 rounded-2xl border border-[var(--border-light)] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2">
                <CalendarIcon size={20} className="text-[var(--gold-primary)]" />
                Blocked Slots
              </h2>
              <button 
                onClick={() => setIsSlotModalOpen(true)}
                className="w-8 h-8 rounded-full bg-[var(--gold-primary)]/10 text-[var(--gold-primary)] flex items-center justify-center hover:bg-[var(--gold-primary)] hover:text-white transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
            
            <div className="space-y-3">
              {blockedSlots.map((slot) => (
                <div key={slot.id} className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-100 text-red-800">
                  <div>
                    <div className="font-semibold">{slot.date} at {slot.time}</div>
                    <div className="text-xs opacity-70">{slot.reason}</div>
                  </div>
                  <button onClick={() => removeBlockedSlot(slot.id)} className="w-8 h-8 rounded-full hover:bg-red-200 flex items-center justify-center transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {blockedSlots.length === 0 && (
                <div className="text-sm text-[var(--text-muted)] text-center py-4">
                  No slots currently blocked.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Block Slot Modal */}
      <AnimatePresence>
        {isSlotModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md p-6"
            >
              <h2 className="font-display text-xl font-semibold mb-6">Block Calendar Slot</h2>
              <form onSubmit={handleBlockSlot} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input type="date" required value={slotDate} onChange={e => setSlotDate(e.target.value)} className="w-full p-3 rounded-lg border border-[var(--border-light)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input type="time" required value={slotTime} onChange={e => setSlotTime(e.target.value)} className="w-full p-3 rounded-lg border border-[var(--border-light)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Reason (Optional)</label>
                  <input type="text" value={slotReason} onChange={e => setSlotReason(e.target.value)} placeholder="e.g. Internal Meeting" className="w-full p-3 rounded-lg border border-[var(--border-light)] outline-none" />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsSlotModalOpen(false)} className="flex-1 py-2.5 rounded-lg bg-gray-100 font-semibold">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 rounded-lg bg-[var(--gold-primary)] text-white font-semibold">Block Slot</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
