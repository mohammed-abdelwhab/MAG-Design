"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import type { ClientDocument } from "@/types";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

interface DocumentListProps {
  documents: ClientDocument[];
}

export function DocumentList({ documents }: DocumentListProps) {
  const { locale } = useUIStore();

  if (documents.length === 0) {
    return (
      <div className="text-center py-12 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)]">
        <FileText size={48} className="mx-auto text-[var(--text-muted)] opacity-50 mb-4" />
        <p className="font-body text-[var(--text-muted)]">
          {locale === "en" ? "No documents available yet." : "لا توجد مستندات متاحة بعد."}
        </p>
      </div>
    );
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <motion.div
          key={doc.id}
          variants={fadeUp}
          className="bg-white p-6 rounded-2xl border border-[var(--border-light)] shadow-sm hover:shadow-md hover:border-[var(--gold-primary)] transition-all group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--gold-primary)]/10 flex items-center justify-center text-[var(--gold-primary)] group-hover:scale-110 transition-transform">
              <FileText size={24} />
            </div>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--gold-primary)] hover:bg-[var(--gold-primary)]/10 transition-colors"
            >
              <Download size={16} />
            </a>
          </div>
          
          <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-1 line-clamp-1">
            {doc.name[locale]}
          </h3>
          
          <div className="flex items-center gap-3 font-body text-xs text-[var(--text-muted)] uppercase tracking-wider">
            <span>{doc.type}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--border-light)]" />
            <span>{doc.size}</span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[var(--border-light)] font-body text-xs text-[var(--text-muted)]">
            {locale === "en" ? "Added on" : "تمت الإضافة في"} {new Date(doc.date).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US")}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
