import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ClientUser, ClientProject, PortfolioItem, ClientMessage, ClientDocument, ClientPhoto } from "@/types";
import { mockClientProject, mockUser } from "./portalStore"; // We can reuse some types/mocks

// Types specific to Admin
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
}

export interface BookingRequest {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  projectType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface BlockedSlot {
  id: string;
  date: string;
  time: string;
  reason: string;
}

export interface BusinessHours {
  open: string;
  close: string;
  slotDurationMinutes: number;
}

interface AdminState {
  // Auth
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;

  // Data
  clients: ClientUser[];
  portfolioItems: PortfolioItem[];
  bookingRequests: BookingRequest[];
  blockedSlots: BlockedSlot[];
  businessHours: BusinessHours;

  // Actions
  addClient: (client: ClientUser) => void;
  deleteClient: (id: string) => void;
  
  addPortfolioItem: (item: PortfolioItem) => void;
  deletePortfolioItem: (id: string) => void;
  
  updateBookingStatus: (id: string, status: "pending" | "approved" | "rejected") => void;
  addBlockedSlot: (slot: BlockedSlot) => void;
  removeBlockedSlot: (id: string) => void;
  updateBusinessHours: (hours: BusinessHours) => void;
}

// Initial Mock Data
const initialAdmin: AdminUser = {
  id: "admin-1",
  name: "MAG Administrator",
  email: "admin@magdesign.com",
  role: "admin",
};

const initialBookings: BookingRequest[] = [
  {
    id: "book-1",
    clientName: "Sarah Ahmed",
    email: "sarah@example.com",
    phone: "+20 100 111 2222",
    projectType: "Villa Interior",
    preferredDate: "2026-10-15",
    preferredTime: "14:00",
    message: "I recently purchased a villa in New Cairo and would like to discuss full interior design.",
    status: "pending",
    createdAt: new Date().toISOString(),
  }
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      adminUser: null,
      isAuthenticated: false,
      clients: [mockUser], // Import from portal store to start
      portfolioItems: [], // Usually we'd load this from the existing data/portfolio.ts, but we'll mock it here
      bookingRequests: initialBookings,
      blockedSlots: [],
      businessHours: { open: "09:00", close: "17:00", slotDurationMinutes: 30 },

      login: async (email, pass) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Hardcoded admin for demo
        if (email === "admin@magdesign.com" && pass === "admin123") {
          set({ adminUser: initialAdmin, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ adminUser: null, isAuthenticated: false }),

      addClient: (client) => set((state) => ({ clients: [...state.clients, client] })),
      deleteClient: (id) => set((state) => ({ clients: state.clients.filter(c => c.id !== id) })),

      addPortfolioItem: (item) => set((state) => ({ portfolioItems: [item, ...state.portfolioItems] })),
      deletePortfolioItem: (id) => set((state) => ({ portfolioItems: state.portfolioItems.filter(p => p.id !== id) })),

      updateBookingStatus: (id, status) => set((state) => ({
        bookingRequests: state.bookingRequests.map(b => b.id === id ? { ...b, status } : b)
      })),
      addBlockedSlot: (slot) => set((state) => ({ blockedSlots: [...state.blockedSlots, slot] })),
      removeBlockedSlot: (id) => set((state) => ({ blockedSlots: state.blockedSlots.filter(s => s.id !== id) })),
      updateBusinessHours: (hours) => set({ businessHours: hours }),
    }),
    {
      name: "mag-admin-storage",
    }
  )
);
