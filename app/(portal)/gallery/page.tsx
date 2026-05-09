"use client";

import { usePortalStore } from "@/store/portalStore";
import { useUIStore } from "@/store/uiStore";
import { PhotoGallery } from "@/components/portal/PhotoGallery";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export default function GalleryPage() {
  const { user } = usePortalStore();
  const { locale } = useUIStore();

  if (!user) return null;

  return (
    <div className="space-y-8">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-2">
          {locale === "en" ? "Site Gallery" : "معرض الموقع"}
        </h1>
        <p className="font-body text-[var(--text-muted)]">
          {locale === "en" 
            ? "Track the visual progress of your space with real-time updates from the site." 
            : "تتبع التقدم المرئي لمساحتك مع تحديثات في الوقت الفعلي من الموقع."}
        </p>
      </motion.div>

      <PhotoGallery photos={user.project.photos} />
    </div>
  );
}
