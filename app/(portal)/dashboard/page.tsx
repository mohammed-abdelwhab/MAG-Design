"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Image as ImageIcon } from "lucide-react";
import { usePortalStore } from "@/store/portalStore";
import { useUIStore } from "@/store/uiStore";
import { PhaseTracker } from "@/components/portal/PhaseTracker";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function DashboardPage() {
  const { user } = usePortalStore();
  const { locale, dir } = useUIStore();

  if (!user) return null;

  const project = user.project;
  const activePhase = project.phases.find(p => p.status === 'active') || project.phases[0];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[var(--border-light)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-body text-xs text-[var(--gold-primary)] tracking-[0.2em] uppercase mb-2">
              {project.projectType} // {project.style}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-2">
              {project.title[locale]}
            </h1>
            <p className="font-body text-[var(--text-muted)] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--gold-primary)]" />
              {project.location[locale]}
            </p>
          </div>
          
          <div className="bg-[var(--bg-primary)] rounded-xl p-4 min-w-[200px]">
            <div className="font-body text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
              {locale === "en" ? "Overall Progress" : "التقدم العام"}
            </div>
            <div className="flex items-end gap-2">
              <span className="font-display text-4xl font-semibold text-[var(--gold-primary)] leading-none">
                {project.overallProgress}%
              </span>
            </div>
            <div className="w-full bg-white rounded-full h-1 mt-3">
              <div className="bg-[var(--gold-primary)] h-1 rounded-full transition-all duration-1000" style={{ width: `${project.overallProgress}%` }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Phases */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[var(--border-light)]">
            <motion.h2 variants={staggerItem} className="font-display text-2xl font-semibold text-[var(--text-primary)] mb-8">
              {locale === "en" ? "Project Timeline" : "الجدول الزمني للمشروع"}
            </motion.h2>
            <motion.div variants={staggerItem}>
              <PhaseTracker phases={project.phases} />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column - Quick Access & Team */}
        <div className="space-y-8">
          {/* Team Members */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
            <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-4">
              {locale === "en" ? "Your Project Team" : "فريق مشروعك"}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src={project.designerAvatar} alt={project.designerName} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-body font-semibold text-[var(--text-primary)] text-sm">{project.designerName}</div>
                  <div className="font-body text-xs text-[var(--text-muted)]">{locale === "en" ? "Lead Designer" : "المصمم الرئيسي"}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[var(--bg-primary)] flex items-center justify-center">
                  <span className="font-display text-[var(--gold-primary)]">KN</span>
                </div>
                <div>
                  <div className="font-body font-semibold text-[var(--text-primary)] text-sm">{project.supervisorName}</div>
                  <div className="font-body text-xs text-[var(--text-muted)]">{locale === "en" ? "Project Supervisor" : "مشرف المشروع"}</div>
                </div>
              </div>
            </div>
            <Link href="/messages" className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-[var(--gold-primary)] text-[var(--gold-primary)] font-body text-sm font-semibold hover:bg-[var(--gold-primary)] hover:text-white transition-colors">
              {locale === "en" ? "Message Team" : "مراسلة الفريق"}
            </Link>
          </motion.div>

          {/* Recent Photos */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <ImageIcon size={18} className="text-[var(--gold-primary)]" />
                {locale === "en" ? "Recent Photos" : "أحدث الصور"}
              </h3>
              <Link href="/gallery" className="text-xs font-semibold text-[var(--gold-primary)] hover:underline">
                {locale === "en" ? "View All" : "عرض الكل"}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {project.photos.slice(0, 4).map((photo) => (
                <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Documents */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-light)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <FileText size={18} className="text-[var(--gold-primary)]" />
                {locale === "en" ? "Documents" : "المستندات"}
              </h3>
              <Link href="/documents" className="text-xs font-semibold text-[var(--gold-primary)] hover:underline">
                {locale === "en" ? "View All" : "عرض الكل"}
              </Link>
            </div>
            <div className="space-y-3">
              {project.documents.slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-primary)] group cursor-pointer hover:bg-[var(--gold-primary)]/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-[var(--text-muted)] group-hover:text-[var(--gold-primary)] transition-colors" />
                    <div>
                      <div className="font-body text-sm font-medium text-[var(--text-primary)] line-clamp-1">{doc.name[locale]}</div>
                      <div className="font-body text-xs text-[var(--text-muted)]">{doc.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
