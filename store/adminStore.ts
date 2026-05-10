import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ClientUser, ClientProject, Project, ClientMessage, ClientDocument, ClientPhoto } from "@/types";
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
  portfolioItems: Project[];
  deletedStaticProjects: string[];
  staticProjectOverrides: Record<string, Partial<Project>>;
  bookingRequests: BookingRequest[];
  blockedSlots: BlockedSlot[];
  businessHours: BusinessHours;

  // Actions
  addClient: (client: ClientUser) => void;
  deleteClient: (id: string) => void;
  
  addProject: (item: Project) => void;
  updateProject: (id: string, isStatic: boolean, data: Partial<Project>) => void;
  deleteProject: (id: string, isStatic?: boolean) => void;
  toggleProjectFeatured: (id: string, isStatic?: boolean, initialFeatured?: boolean) => void;
  
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
      clients: [
        mockUser,
        {
          id: "client-2",
          clientCode: "LUX2026",
          password: "password123",
          name: { en: "Omar Farooq", ar: "عمر فاروق" },
          email: "omar@example.com",
          phone: "+20 100 999 8888",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
          project: {
            ...mockClientProject,
            id: "proj-2",
            title: { en: "Seaside Chalet", ar: "شاليه الساحل" },
            projectType: "Chalet",
            style: "Minimalist",
            overallProgress: 20,
          }
        },
        {
          id: "client-3",
          clientCode: "NCA405",
          password: "password123",
          name: { en: "Laila Youssef", ar: "ليلى يوسف" },
          email: "laila@example.com",
          phone: "+20 100 777 6666",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
          project: {
            ...mockClientProject,
            id: "proj-3",
            title: { en: "Downtown Office", ar: "مكتب وسط البلد" },
            projectType: "Commercial",
            style: "Industrial",
            overallProgress: 85,
          }
        }
      ],
      portfolioItems: [], // Usually we'd load this from the existing data/portfolio.ts, but we'll mock it here
      deletedStaticProjects: [],
      staticProjectOverrides: {},
      bookingRequests: initialBookings,
      blockedSlots: [],
      businessHours: { open: "09:00", close: "17:00", slotDurationMinutes: 30 },

      login: async (email, pass) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (email === "admin@magdesign.com" && pass === "admin123") {
          set({ adminUser: initialAdmin, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ adminUser: null, isAuthenticated: false }),

      addClient: (client) => set((state) => ({ clients: [...state.clients, client] })),
      deleteClient: (id) => set((state) => ({ clients: state.clients.filter(c => c.id !== id) })),

      addProject: (item) => set((state) => ({ portfolioItems: [item, ...state.portfolioItems] })),
      updateProject: (id, isStatic, data) => set((state) => {
        if (isStatic) {
          return {
            staticProjectOverrides: {
              ...state.staticProjectOverrides,
              [id]: { ...(state.staticProjectOverrides[id] || {}), ...data }
            }
          };
        }
        return {
          portfolioItems: state.portfolioItems.map(p => p.id === id ? { ...p, ...data } : p)
        };
      }),
      deleteProject: (id, isStatic) => set((state) => {
        if (isStatic) {
          return { deletedStaticProjects: [...state.deletedStaticProjects, id] };
        }
        return { portfolioItems: state.portfolioItems.filter(p => p.id !== id) };
      }),
      toggleProjectFeatured: (id, isStatic, initialFeatured = false) => set((state) => {
        if (isStatic) {
          const overrides = state.staticProjectOverrides[id] || {};
          const isFeatured = overrides.featured !== undefined ? overrides.featured : initialFeatured;
          return {
            staticProjectOverrides: {
              ...state.staticProjectOverrides,
              [id]: { ...overrides, featured: !isFeatured }
            }
          };
        } else {
          return {
            portfolioItems: state.portfolioItems.map(p => p.id === id ? { ...p, featured: !p.featured } : p)
          };
        }
      }),

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

