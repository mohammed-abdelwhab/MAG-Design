import { create } from "zustand";
import type { BookingFormData } from "@/types";

interface BookingState {
  step: 1 | 2 | 3 | 4;
  formData: BookingFormData;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<BookingFormData>) => void;
  reset: () => void;
}

const initialFormData: BookingFormData = {
  date: null,
  timeSlot: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  projectType: "",
  location: "",
  area: "",
  budget: "",
  notes: "",
};

export const useBookingStore = create<BookingState>((set, get) => ({
  step: 1,
  formData: initialFormData,
  setStep: (step) => set({ step }),
  nextStep: () => {
    const s = get().step;
    if (s < 4) set({ step: (s + 1) as 1 | 2 | 3 | 4 });
  },
  prevStep: () => {
    const s = get().step;
    if (s > 1) set({ step: (s - 1) as 1 | 2 | 3 | 4 });
  },
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  reset: () => set({ step: 1, formData: initialFormData }),
}));
