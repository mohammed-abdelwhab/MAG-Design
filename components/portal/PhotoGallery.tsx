"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import type { ClientPhoto } from "@/types";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

interface PhotoGalleryProps {
  photos: ClientPhoto[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const { locale } = useUIStore();
  const [selectedPhoto, setSelectedPhoto] = useState<ClientPhoto | null>(null);

  if (photos.length === 0) {
    return (
      <div className="text-center py-12 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)]">
        <p className="font-body text-[var(--text-muted)]">
          {locale === "en" ? "No photos available yet." : "لا توجد صور متاحة بعد."}
        </p>
      </div>
    );
  }

  return (
    <>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            variants={fadeUp}
            className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Maximize2 size={18} />
              </div>
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-white font-display font-semibold mb-1">{photo.alt}</h4>
                <div className="flex items-center gap-2 text-white/70 font-body text-xs uppercase tracking-wider">
                  <span className="bg-white/20 px-2 py-0.5 rounded">{photo.phase}</span>
                  <span>{new Date(photo.date).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
            >
              <X size={24} />
            </button>

            <div className="relative w-full h-full max-w-6xl mx-auto flex flex-col">
              <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-6 text-white max-w-3xl mx-auto w-full">
                <h3 className="font-display text-2xl font-semibold mb-2">{selectedPhoto.alt}</h3>
                <div className="flex items-center gap-4 text-white/70 font-body text-sm mb-4">
                  <span className="uppercase tracking-wider">{selectedPhoto.phase}</span>
                  <span>•</span>
                  <span>{new Date(selectedPhoto.date).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US")}</span>
                </div>
                {selectedPhoto.caption && (
                  <p className="font-body text-white/90 leading-relaxed">
                    {selectedPhoto.caption}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
