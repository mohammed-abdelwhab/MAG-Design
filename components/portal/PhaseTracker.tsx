"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import type { ProjectPhaseItem } from "@/types";

interface PhaseTrackerProps {
  phases: ProjectPhaseItem[];
}

export function PhaseTracker({ phases }: PhaseTrackerProps) {
  const { locale, dir } = useUIStore();

  return (
    <div className="relative">
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[var(--gold-primary)] before:via-[var(--border-light)] before:to-[var(--border-light)]">
        {phases.map((phase, index) => {
          const isCompleted = phase.status === "completed";
          const isActive = phase.status === "active";
          const isPending = phase.status === "pending";

          return (
            <div key={phase.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Icon / Node */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 md:-ml-5 ${
                  isCompleted ? "bg-[var(--gold-primary)] text-white" : isActive ? "bg-white text-[var(--gold-primary)] border-[var(--gold-primary)]" : "bg-[var(--bg-primary)] text-[var(--border-light)]"
                } transition-colors duration-300 z-10`}
              >
                {isCompleted ? <CheckCircle2 size={20} /> : isActive ? <Clock size={20} className="animate-pulse" /> : <Circle size={20} />}
              </div>

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] ml-12 md:ml-0 p-5 rounded-xl bg-white border ${
                  isActive ? "border-[var(--gold-primary)] shadow-md" : "border-[var(--border-light)] shadow-sm"
                } transition-all duration-300`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className={`font-display text-lg font-semibold ${isActive ? "text-[var(--gold-primary)]" : "text-[var(--text-primary)]"}`}>
                    {phase.title[locale]}
                  </h4>
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {new Date(phase.startDate).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", { month: 'short', day: 'numeric' })} 
                    {' - '} 
                    {new Date(phase.endDate).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                
                <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                  {phase.description[locale]}
                </p>
                
                {/* Progress bar */}
                <div className="w-full bg-[var(--bg-primary)] rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-[var(--gold-primary)] h-1.5 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
                <div className="mt-2 text-right">
                  <span className="font-body text-xs font-semibold text-[var(--gold-primary)]">{phase.progress}%</span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
