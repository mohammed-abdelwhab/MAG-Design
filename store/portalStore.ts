import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ClientUser, ClientProject } from "@/types";

// ==========================================
// MOCK DATA
// ==========================================
export const mockClientProject: ClientProject = {
  id: "proj-1",
  clientId: "client-1",
  title: { en: "Palm Hills Katameya Villa", ar: "فيلا بالم هيلز القطامية" },
  location: { en: "Palm Hills, New Cairo", ar: "بالم هيلز، القاهرة الجديدة" },
  projectType: "villa",
  style: "Neoclassical",
  area: "450",
  overallProgress: 45,
  startDate: "2023-11-01",
  expectedCompletion: "2024-08-30",
  designerName: "Sara Mahmoud Rashid",
  designerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  supervisorName: "Karim Nabil Hassan",
  phases: [
    {
      id: "ph-1",
      phase: "design",
      title: { en: "Design & Concept", ar: "التصميم والمفهوم" },
      description: { en: "Initial mood boards, layouts, and 3D visualizations.", ar: "لوحات المزاج الأولية والتخطيطات والتصورات ثلاثية الأبعاد." },
      progress: 100,
      status: "completed",
      startDate: "2023-11-01",
      endDate: "2023-12-15",
    },
    {
      id: "ph-2",
      phase: "approval",
      title: { en: "Client Approval", ar: "موافقة العميل" },
      description: { en: "Finalizing materials and signing off on the design.", ar: "الانتهاء من المواد والموافقة النهائية على التصميم." },
      progress: 100,
      status: "completed",
      startDate: "2023-12-16",
      endDate: "2024-01-05",
    },
    {
      id: "ph-3",
      phase: "execution",
      title: { en: "Site Execution", ar: "التنفيذ في الموقع" },
      description: { en: "Civil works, MEP, and structural modifications.", ar: "الأعمال المدنية والميكانيكا والكهرباء والتعديلات الإنشائية." },
      progress: 65,
      status: "active",
      startDate: "2024-01-10",
      endDate: "2024-05-30",
    },
    {
      id: "ph-4",
      phase: "finishing",
      title: { en: "Finishing & Furniture", ar: "التشطيب والأثاث" },
      description: { en: "Painting, flooring, and custom furniture installation.", ar: "الدهانات والأرضيات وتركيب الأثاث المخصص." },
      progress: 0,
      status: "pending",
      startDate: "2024-06-01",
      endDate: "2024-08-15",
    },
    {
      id: "ph-5",
      phase: "handover",
      title: { en: "Final Handover", ar: "التسليم النهائي" },
      description: { en: "Final inspection, snagging, and key handover.", ar: "الفحص النهائي والملاحظات وتسليم المفاتيح." },
      progress: 0,
      status: "pending",
      startDate: "2024-08-15",
      endDate: "2024-08-30",
    },
  ],
  messages: [
    {
      id: "msg-1",
      sender: "team",
      senderName: "Karim Nabil",
      message: "The HVAC installation for the ground floor is complete. We will begin the gypsum board work tomorrow.",
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      read: true,
    },
    {
      id: "msg-2",
      sender: "client",
      senderName: "Ahmed Hassan",
      message: "Excellent progress. Can we review the marble samples for the master bathroom next week?",
      timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
      read: true,
    },
    {
      id: "msg-3",
      sender: "team",
      senderName: "Sara Mahmoud",
      message: "Absolutely! I have prepared 3 options from Antolini. Let me know what time works best for you to visit the studio.",
      timestamp: new Date().toISOString(),
      read: false,
    },
  ],
  documents: [
    {
      id: "doc-1",
      name: { en: "Final Design Contract", ar: "عقد التصميم النهائي" },
      type: "contract",
      size: "2.4 MB",
      date: "2023-11-10",
      url: "#",
    },
    {
      id: "doc-2",
      name: { en: "HVAC Layout Plan", ar: "مخطط التكييف" },
      type: "plan",
      size: "5.1 MB",
      date: "2024-01-15",
      url: "#",
    },
    {
      id: "doc-3",
      name: { en: "Payment Invoice #3", ar: "فاتورة الدفعة رقم 3" },
      type: "invoice",
      size: "1.1 MB",
      date: "2024-03-01",
      url: "#",
    },
  ],
  photos: [
    {
      id: "photo-1",
      src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
      alt: "Living Room Framing",
      phase: "execution",
      date: "2024-02-15",
      caption: "Living room wall framing and electrical conduits.",
    },
    {
      id: "photo-2",
      src: "https://images.unsplash.com/photo-1541123437800-1413135c3613?w=800&q=80",
      alt: "HVAC Installation",
      phase: "execution",
      date: "2024-03-10",
      caption: "Concealed AC units installed in the master bedroom.",
    },
    {
      id: "photo-3",
      src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80",
      alt: "Site Preparation",
      phase: "execution",
      date: "2024-01-20",
      caption: "Clearing site and marking boundaries.",
    },
  ],
};

export const mockUser: ClientUser = {
  id: "client-1",
  clientCode: "MAG2024",
  password: "password123",
  name: { en: "Ahmed Hassan", ar: "أحمد حسن" },
  email: "ahmed@example.com",
  phone: "+20 100 123 4567",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  project: mockClientProject,
};

// ==========================================
// STORE
// ==========================================
interface PortalState {
  user: ClientUser | null;
  isAuthenticated: boolean;
  login: (code: string, pass: string) => Promise<boolean>;
  logout: () => void;
  markMessageRead: (messageId: string) => void;
}

export const usePortalStore = create<PortalState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (code, pass) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        if (code === mockUser.clientCode && pass === mockUser.password) {
          set({ user: mockUser, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      markMessageRead: (messageId) => {
        const { user } = get();
        if (!user) return;
        
        const updatedMessages = user.project.messages.map(msg => 
          msg.id === messageId ? { ...msg, read: true } : msg
        );
        
        set({
          user: {
            ...user,
            project: {
              ...user.project,
              messages: updatedMessages
            }
          }
        });
      }
    }),
    {
      name: "mag-portal-storage",
    }
  )
);
