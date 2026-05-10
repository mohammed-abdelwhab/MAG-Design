"use client";

import { useState } from "react";
import { Plus, Image as ImageIcon, Trash2, Edit2, X, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useAdminStore } from "@/store/adminStore";
import type { Project } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPortfolioPage() {
  const { portfolioItems, addProject, deleteProject } = useAdminStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form State
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descAr, setDescAr] = useState("");
  const [category, setCategory] = useState("Residential");
  const [mainImage, setMainImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, image upload would happen here, and we'd get a URL back.
    // For this mock, we use a random unsplash image if none provided.
    const newProject: Project = {
      id: `port-${Date.now()}`,
      slug: `project-${Date.now()}`,
      title: { en: titleEn, ar: titleAr },
      description: { en: descEn, ar: descAr },
      category: category.toLowerCase() as any,
      heroImage: mainImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      location: { en: "Cairo", ar: "القاهرة" },
      area: "350",
      style: "modern",
      gallery: [],
      year: new Date().getFullYear(),
      duration: "6 months",
      challenge: { en: "", ar: "" },
      solution: { en: "", ar: "" },
      materials: [],
      featured: false,
      tags: [],
    };

    addProject(newProject);
    setIsFormOpen(false);
    
    // Reset
    setTitleEn(""); setTitleAr(""); setDescEn(""); setDescAr(""); setMainImage("");
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteProject(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-2">
            Public Portfolio CMS
          </h1>
          <p className="font-body text-[var(--text-muted)]">
            Manage projects displayed on the public portfolio page. No coding required.
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-primary flex items-center justify-center gap-2 px-6"
        >
          <Plus size={18} />
          Add New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {portfolioItems.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-[var(--border-light)] text-[var(--text-muted)]">
            No portfolio projects added yet. Click "Add New Project" to start.
          </div>
        ) : (
          portfolioItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-[var(--border-light)] shadow-sm group">
              <div className="relative h-48 bg-[var(--bg-primary)]">
                <Image src={item.heroImage} alt={item.title.en} fill className="object-cover" />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 rounded-full bg-white text-[var(--text-primary)] flex items-center justify-center shadow-md hover:bg-gray-50">
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => setDeleteId(item.id)}
                    className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs font-bold text-[var(--gold-primary)] uppercase tracking-wider mb-2">
                  {item.category}
                </div>
                <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] line-clamp-1 mb-1">
                  {item.title.en}
                </h3>
                <h3 className="font-display text-sm text-[var(--text-muted)] line-clamp-1 mb-3" dir="rtl">
                  {item.title.ar}
                </h3>
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                  <span>{item.area} m²</span>
                  <span>{item.style}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add New Project Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-[var(--border-light)] p-6 flex items-center justify-between z-10">
                <h2 className="font-display text-xl font-semibold">Add Portfolio Project</h2>
                <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* English Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-[var(--gold-primary)] uppercase tracking-wider">English Details</h3>
                    <div>
                      <label className="block text-sm font-medium mb-1">Project Title</label>
                      <input type="text" required value={titleEn} onChange={e => setTitleEn(e.target.value)} className="w-full p-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea required value={descEn} onChange={e => setDescEn(e.target.value)} rows={3} className="w-full p-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] outline-none" />
                    </div>
                  </div>

                  {/* Arabic Details */}
                  <div className="space-y-4" dir="rtl">
                    <h3 className="font-semibold text-sm text-[var(--gold-primary)] uppercase tracking-wider" dir="ltr">Arabic Details</h3>
                    <div>
                      <label className="block text-sm font-medium mb-1">عنوان المشروع</label>
                      <input type="text" required value={titleAr} onChange={e => setTitleAr(e.target.value)} className="w-full p-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">الوصف</label>
                      <textarea required value={descAr} onChange={e => setDescAr(e.target.value)} rows={3} className="w-full p-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] outline-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border-light)]">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] outline-none">
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Hospitality">Hospitality</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Main Image (URL for now or PC Upload)</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <ImageIcon size={18} className="absolute left-3 top-3.5 text-gray-400" />
                        <input type="text" placeholder="https://..." value={mainImage} onChange={e => setMainImage(e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] outline-none" />
                      </div>
                      <button type="button" className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-colors">
                        Browse PC
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--border-light)] flex justify-end gap-3">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2.5 rounded-lg border border-[var(--border-light)] font-semibold hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary px-8">
                    Save & Publish
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Verification Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 text-center"
            >
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <h2 className="font-display text-2xl font-semibold mb-2">Delete Project?</h2>
              <p className="text-gray-500 mb-8">
                Are you sure you want to permanently delete this project from the public portfolio? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-3 rounded-xl bg-gray-100 font-semibold hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors">
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
