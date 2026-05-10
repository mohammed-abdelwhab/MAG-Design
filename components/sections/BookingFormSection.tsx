"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { useUIStore } from "@/store/uiStore";
import { useBookingStore } from "@/store/bookingStore";
import { useAdminStore } from "@/store/adminStore";
import { fadeUp } from "@/lib/animations";
import type { ProjectTypeOption } from "@/types";

export function BookingFormSection() {
  const { locale, dir } = useUIStore();
  const { step, formData, setStep, nextStep, prevStep, updateFormData, reset } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when component unmounts
  useEffect(() => {
    return () => reset();
  }, [reset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
    } else {
      // Final submission
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(4);
      }, 1500);
    }
  };

  const projectTypes = [
    { id: "villa", label: { en: "Villa", ar: "فيلا" } },
    { id: "apartment", label: { en: "Apartment", ar: "شقة" } },
    { id: "commercial", label: { en: "Commercial", ar: "تجاري" } },
    { id: "other", label: { en: "Other", ar: "أخرى" } },
  ];

  const { bookingRequests, blockedSlots } = useAdminStore();

  const timeSlots = [
    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
  ];

  const formattedDate = formData.date ? formData.date.toISOString().split("T")[0] : null;

  const getAvailableTimeSlots = () => {
    if (!formattedDate) return timeSlots;
    return timeSlots.filter(time => {
      const isBlocked = blockedSlots.some(slot => slot.date === formattedDate && slot.time === time);
      const isBooked = bookingRequests.some(req => req.status === "approved" && req.preferredDate === formattedDate && req.preferredTime === time);
      return !isBlocked && !isBooked;
    });
  };

  const availableTimeSlots = getAvailableTimeSlots();

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-sm transition-colors duration-300 ${
              step >= i
                ? "bg-[var(--gold-primary)] text-white"
                : "bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border-light)]"
            }`}
          >
            {i}
          </div>
          {i < 3 && (
            <div
              className={`h-px w-12 sm:w-24 mx-2 transition-colors duration-300 ${
                step > i ? "bg-[var(--gold-primary)]" : "bg-[var(--border-light)]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section className="pt-32 pb-24 min-h-screen bg-white">
      <Container className="max-w-3xl">
        {step < 4 && renderStepIndicator()}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={fadeUp} initial="hidden" animate="visible" exit="hidden">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-3">
                  {locale === "en" ? "Project Details" : "تفاصيل المشروع"}
                </h2>
                <p className="font-body text-[var(--text-muted)]">
                  {locale === "en"
                    ? "Tell us a bit about what you're looking to achieve."
                    : "أخبرنا قليلاً عما تتطلع إلى تحقيقه."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="block font-body text-sm font-medium text-[var(--text-primary)]">
                    {locale === "en" ? "Project Type" : "نوع المشروع"}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => updateFormData({ projectType: type.id as ProjectTypeOption })}
                        className={`py-3 px-4 rounded-lg font-body text-sm text-center border transition-all ${
                          formData.projectType === type.id
                            ? "border-[var(--gold-primary)] bg-[var(--gold-primary)]/10 text-[var(--gold-primary)]"
                            : "border-[var(--border-light)] hover:border-[var(--gold-primary)] text-[var(--text-muted)]"
                        }`}
                      >
                        {type.label[locale]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block font-body text-sm font-medium text-[var(--text-primary)]">
                      {locale === "en" ? "Location" : "الموقع"}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.location}
                      onChange={(e) => updateFormData({ location: e.target.value })}
                      placeholder={locale === "en" ? "e.g. New Cairo" : "مثال: القاهرة الجديدة"}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors font-body bg-[var(--bg-primary)]"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block font-body text-sm font-medium text-[var(--text-primary)]">
                      {locale === "en" ? "Approximate Area (sqm)" : "المساحة التقريبية (متر مربع)"}
                    </label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => updateFormData({ area: e.target.value })}
                      placeholder="250"
                      className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors font-body bg-[var(--bg-primary)]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block font-body text-sm font-medium text-[var(--text-primary)]">
                    {locale === "en" ? "Project Details & Notes" : "تفاصيل المشروع وملاحظات"}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => updateFormData({ notes: e.target.value })}
                    placeholder={locale === "en" ? "Briefly describe your vision..." : "صف رؤيتك باختصار..."}
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors font-body bg-[var(--bg-primary)] resize-none"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={!formData.projectType || !formData.location}
                    className="btn-primary group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {locale === "en" ? "Next Step" : "الخطوة التالية"}
                    {dir === "rtl" ? (
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={fadeUp} initial="hidden" animate="visible" exit="hidden">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-3">
                  {locale === "en" ? "Select Date & Time" : "اختر التاريخ والوقت"}
                </h2>
                <p className="font-body text-[var(--text-muted)]">
                  {locale === "en"
                    ? "When would you like to schedule your complimentary consultation?"
                    : "متى تود تحديد موعد استشارتك المجانية؟"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 font-body text-sm font-medium text-[var(--text-primary)]">
                    <CalendarIcon size={18} className="text-[var(--gold-primary)]" />
                    {locale === "en" ? "Preferred Date" : "التاريخ المفضل"}
                  </label>
                  <input
                    required
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => updateFormData({ date: new Date(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors font-body bg-[var(--bg-primary)]"
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 font-body text-sm font-medium text-[var(--text-primary)]">
                    <Clock size={18} className="text-[var(--gold-primary)]" />
                    {locale === "en" ? "Preferred Time Slot" : "فترة الوقت المفضلة"}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availableTimeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => updateFormData({ timeSlot: time })}
                        className={`py-3 px-4 rounded-lg font-body text-sm text-center border transition-all ${
                          formData.timeSlot === time
                            ? "border-[var(--gold-primary)] bg-[var(--gold-primary)]/10 text-[var(--gold-primary)]"
                            : "border-[var(--border-light)] hover:border-[var(--gold-primary)] text-[var(--text-muted)]"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                    {availableTimeSlots.length === 0 && (
                      <div className="col-span-full py-4 text-center text-sm text-red-500 bg-red-50 rounded-lg">
                        {locale === "en" ? "No available slots on this date." : "لا توجد مواعيد متاحة في هذا اليوم."}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-outline-gold group"
                  >
                    {locale === "en" ? "Back" : "السابق"}
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.date || !formData.timeSlot}
                    className="btn-primary group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {locale === "en" ? "Next Step" : "الخطوة التالية"}
                    {dir === "rtl" ? (
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={fadeUp} initial="hidden" animate="visible" exit="hidden">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-3">
                  {locale === "en" ? "Personal Information" : "المعلومات الشخصية"}
                </h2>
                <p className="font-body text-[var(--text-muted)]">
                  {locale === "en"
                    ? "How can we reach you to confirm your appointment?"
                    : "كيف يمكننا الوصول إليك لتأكيد موعدك؟"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block font-body text-sm font-medium text-[var(--text-primary)]">
                      {locale === "en" ? "First Name" : "الاسم الأول"}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData({ firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors font-body bg-[var(--bg-primary)]"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block font-body text-sm font-medium text-[var(--text-primary)]">
                      {locale === "en" ? "Last Name" : "اسم العائلة"}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormData({ lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors font-body bg-[var(--bg-primary)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block font-body text-sm font-medium text-[var(--text-primary)]">
                      {locale === "en" ? "Email Address" : "البريد الإلكتروني"}
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData({ email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors font-body bg-[var(--bg-primary)]"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block font-body text-sm font-medium text-[var(--text-primary)]">
                      {locale === "en" ? "Phone Number" : "رقم الهاتف"}
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData({ phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors font-body bg-[var(--bg-primary)]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-outline-gold group"
                  >
                    {locale === "en" ? "Back" : "السابق"}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.firstName || !formData.email || !formData.phone}
                    className="btn-primary"
                  >
                    {isSubmitting 
                      ? (locale === "en" ? "Processing..." : "جاري المعالجة...")
                      : (locale === "en" ? "Confirm Booking" : "تأكيد الحجز")}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" variants={fadeUp} initial="hidden" animate="visible" className="text-center py-10">
              <div className="w-24 h-24 rounded-full bg-[var(--gold-primary)]/10 flex items-center justify-center mx-auto mb-8 text-[var(--gold-primary)]">
                <CheckCircle2 size={48} strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-4xl font-semibold text-[var(--text-primary)] mb-4">
                {locale === "en" ? "Booking Confirmed" : "تم تأكيد الحجز"}
              </h2>
              <p className="font-body text-lg text-[var(--text-muted)] mb-8 max-w-md mx-auto">
                {locale === "en"
                  ? `Thank you, ${formData.firstName}. We have received your consultation request for ${formData.date?.toLocaleDateString()} at ${formData.timeSlot}. Our team will contact you shortly to confirm the details.`
                  : `شكراً لك، ${formData.firstName}. لقد تلقينا طلب الاستشارة الخاص بك ليوم ${formData.date?.toLocaleDateString()} في ${formData.timeSlot}. سيتواصل فريقنا معك قريباً لتأكيد التفاصيل.`}
              </p>
              <button onClick={reset} className="btn-outline-gold">
                {locale === "en" ? "Book Another" : "احجز موعداً آخر"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
