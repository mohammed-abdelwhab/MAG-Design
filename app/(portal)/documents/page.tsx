"use client";

import { usePortalStore } from "@/store/portalStore";
import { useUIStore } from "@/store/uiStore";
import { DocumentList } from "@/components/portal/DocumentList";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export default function DocumentsPage() {
  const { user } = usePortalStore();
  const { locale } = useUIStore();

  if (!user) return null;

  return (
    <div className="space-y-8">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-2">
          {locale === "en" ? "Project Documents" : "مستندات المشروع"}
        </h1>
        <p className="font-body text-[var(--text-muted)]">
          {locale === "en" 
            ? "Access all your important project files, contracts, and invoices in one place." 
            : "قم بالوصول إلى جميع ملفات وعقود وفواتير مشروعك المهمة في مكان واحد."}
        </p>
      </motion.div>

      <DocumentList documents={user.project.documents} />
    </div>
  );
}
