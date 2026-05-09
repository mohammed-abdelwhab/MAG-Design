"use client";

import { usePortalStore } from "@/store/portalStore";
import { useUIStore } from "@/store/uiStore";
import { MessageThread } from "@/components/portal/MessageThread";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export default function MessagesPage() {
  const { user } = usePortalStore();
  const { locale } = useUIStore();

  if (!user) return null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-2">
          {locale === "en" ? "Messages" : "الرسائل"}
        </h1>
        <p className="font-body text-[var(--text-muted)]">
          {locale === "en" 
            ? "Direct communication channel with your project team." 
            : "قناة اتصال مباشرة مع فريق مشروعك."}
        </p>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
        <MessageThread messages={user.project.messages} />
      </motion.div>
    </div>
  );
}
