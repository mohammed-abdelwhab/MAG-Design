"use client";

import { useState } from "react";
import { Plus, Image as ImageIcon, Trash2, Edit2, X, AlertTriangle, Star } from "lucide-react";
import Image from "next/image";
import { useAdminStore } from "@/store/adminStore";
import { portfolioProjects } from "@/data/portfolio";
import type { Project } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPortfolioPage() {
  const { portfolioItems, deletedStaticProjects, staticProjectOverrides, addProject, updateProject, deleteProject, toggleProjectFeatured } = useAdminStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<{id: string, isStatic: boolean} | null>(null);
  const [editData, setEditData] = useState<{id: string, isStatic: boolean} | null>(null);

  // Form State
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descAr, setDescAr] = useState("");
  const [categorySelection, setCategorySelection] = useState("villa");
  const [customCategory, setCustomCategory] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // New Fields
  const [area, setArea] = useState("");
  const [duration, setDuration] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [challengeEn, setChallengeEn] = useState("");
  const [challengeAr, setChallengeAr] = useState("");
  const [solutionEn, setSolutionEn] = useState("");
  const [solutionAr, setSolutionAr] = useState("");
  const [materialsEn, setMaterialsEn] = useState("");
  const [materialsAr, setMaterialsAr] = useState("");

  const allProjects = [
    ...portfolioItems.map(p => ({ ...p, isStatic: false, originalFeatured: false })),
    ...portfolioProjects
      .filter(p => !deletedStaticProjects.includes(p.id))
      .map(p => ({
        ...p,
        ...staticProjectOverrides[p.id],
        isStatic: true,
        originalFeatured: p.featured
      }))
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGalleryImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (project: any) => {
    setEditData({ id: project.id, isStatic: project.isStatic });
    setTitleEn(project.title.en);
    setTitleAr(project.title.ar);
    setDescEn(project.description.en);
    setDescAr(project.description.ar);
    
    // Category check
    const predefinedCategories = ["villa", "apartment", "penthouse", "chalet", "commercial"];
    if (predefinedCategories.includes(project.category)) {
      setCategorySelection(project.category);
      setCustomCategory("");
    } else {
      setCategorySelection("other");
      setCustomCategory(project.category);
    }
    
    setMainImage(project.heroImage);
    setGalleryImages(project.gallery?.map((g: any) => g.src) || []);
    setArea(project.area);
    setDuration(project.duration);
    setYear(project.year);
    setChallengeEn(project.challenge?.en || "");
    setChallengeAr(project.challenge?.ar || "");
    setSolutionEn(project.solution?.en || "");
    setSolutionAr(project.solution?.ar || "");
    setMaterialsEn(project.materials?.map((m: any) => m.en).join(", ") || "");
    setMaterialsAr(project.materials?.map((m: any) => m.ar).join(", ") || "");
    
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalCategory = categorySelection === "other" ? customCategory.toLowerCase() : categorySelection;

    const materialsEnArray = materialsEn.split(",").map(m => m.trim()).filter(Boolean);
    const materialsArArray = materialsAr.split(",").map(m => m.trim()).filter(Boolean);
    const materialsCount = Math.max(materialsEnArray.length, materialsArArray.length);
    const formattedMaterials = [];
    for(let i=0; i < materialsCount; i++) {
      formattedMaterials.push({
        en: materialsEnArray[i] || "",
        ar: materialsArArray[i] || ""
      });
    }

    if (editData) {
      updateProject(editData.id, editData.isStatic, {
        title: { en: titleEn, ar: titleAr },
        description: { en: descEn, ar: descAr },
        category: finalCategory as any,
        heroImage: mainImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        area: area || "350",
        year: year,
        duration: duration || "6 months",
        challenge: { en: challengeEn, ar: challengeAr },
        solution: { en: solutionEn, ar: solutionAr },
        materials: formattedMaterials,
        gallery: galleryImages.map((src, i) => ({
          id: `gal-${Date.now()}-${i}`,
          src,
          alt: { en: `${titleEn} Gallery ${i+1}`, ar: `${titleAr} Gallery ${i+1}` }
        }))
      });
    } else {
      const newProject: Project = {
        id: `port-${Date.now()}`,
        slug: `project-${Date.now()}`,
        title: { en: titleEn, ar: titleAr },
        description: { en: descEn, ar: descAr },
        category: finalCategory as any,
        heroImage: mainImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        location: { en: "Cairo", ar: "القاهرة" },
        area: area || "350",
        style: "modern",
        year: year,
        duration: duration || "6 months",
        challenge: { en: challengeEn, ar: challengeAr },
        solution: { en: solutionEn, ar: solutionAr },
        materials: formattedMaterials,
        featured: false,
        tags: [],
        gallery: galleryImages.map((src, i) => ({
          id: `gal-${Date.now()}-${i}`,
          src,
          alt: { en: `${titleEn} Gallery ${i+1}`, ar: `${titleAr} Gallery ${i+1}` }
        }))
      };
      addProject(newProject);
    }

    setIsFormOpen(false);
    
    // Reset Form
    setTitleEn(""); setTitleAr(""); setDescEn(""); setDescAr(""); setMainImage(""); setGalleryImages([]);
    setArea(""); setDuration(""); setYear(new Date().getFullYear());
    setChallengeEn(""); setChallengeAr(""); setSolutionEn(""); setSolutionAr("");
    setMaterialsEn(""); setMaterialsAr(""); setCategorySelection("villa"); setCustomCategory("");
    setEditData(null);
  };

  const confirmDelete = () => {
    if (deleteData) {
      deleteProject(deleteData.id, deleteData.isStatic);
      setDeleteData(null);
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
            Manage all projects displayed on the public portfolio page. Choose which projects feature on the Home Page.
          </p>
        </div>
        <button
          onClick={() => {
            setEditData(null);
            setTitleEn(""); setTitleAr(""); setDescEn(""); setDescAr(""); setMainImage(""); setGalleryImages([]);
            setArea(""); setDuration(""); setYear(new Date().getFullYear());
            setChallengeEn(""); setChallengeAr(""); setSolutionEn(""); setSolutionAr("");
            setMaterialsEn(""); setMaterialsAr(""); setCategorySelection("villa"); setCustomCategory("");
            setIsFormOpen(true);
          }}
          className="btn-primary flex items-center justify-center gap-2 px-6 hover:scale-105 transition-transform"
        >
          <Plus size={18} />
          Add New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {allProjects.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-[var(--border-light)] text-[var(--text-muted)]">
            No portfolio projects added yet. Click "Add New Project" to start.
          </div>
        ) : (
          allProjects.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-[var(--border-light)] shadow-sm group">
              <div className="relative h-48 bg-[var(--bg-primary)]">
                <Image src={item.heroImage} alt={item.title.en} fill className="object-cover" />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => toggleProjectFeatured(item.id, item.isStatic, item.originalFeatured)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform ${
                      item.featured ? 'bg-[var(--gold-primary)] text-white' : 'bg-white text-[var(--text-primary)] hover:bg-gray-50'
                    }`}
                    title={item.featured ? "Remove from Home Page" : "Feature on Home Page"}
                  >
                    <Star size={14} fill={item.featured ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={() => handleEdit(item)}
                    className="w-8 h-8 rounded-full bg-white text-[var(--text-primary)] flex items-center justify-center shadow-md hover:bg-gray-50 hover:scale-110 transition-transform">
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => setDeleteData({ id: item.id, isStatic: item.isStatic })}
                    className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 hover:scale-110 transition-transform"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                {item.featured && (
                  <div className="absolute top-2 left-2 bg-[var(--gold-primary)] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                    Featured
                  </div>
                )}
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
                  <span>{item.year}</span>
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
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-[var(--border-light)] p-6 flex items-center justify-between z-10">
                <h2 className="font-display text-xl font-semibold">{editData ? "Edit Portfolio Project" : "Add Portfolio Project"}</h2>
                <button onClick={() => { setIsFormOpen(false); setEditData(null); }} className="text-gray-400 hover:text-gray-600 hover:scale-110 transition-transform">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-8">
                {/* 1. Basic Info */}
                <div>
                  <h3 className="font-semibold text-sm text-[var(--gold-primary)] uppercase tracking-wider mb-4 border-b pb-2">Basic Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Project Title (EN)</label>
                        <input type="text" required value={titleEn} onChange={e => setTitleEn(e.target.value)} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description (EN)</label>
                        <textarea required value={descEn} onChange={e => setDescEn(e.target.value)} rows={3} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none" />
                      </div>
                    </div>
                    <div className="space-y-4" dir="rtl">
                      <div>
                        <label className="block text-sm font-medium mb-1">عنوان المشروع</label>
                        <input type="text" required value={titleAr} onChange={e => setTitleAr(e.target.value)} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">الوصف</label>
                        <textarea required value={descAr} onChange={e => setDescAr(e.target.value)} rows={3} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Details */}
                <div>
                  <h3 className="font-semibold text-sm text-[var(--gold-primary)] uppercase tracking-wider mb-4 border-b pb-2">Project Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select value={categorySelection} onChange={e => setCategorySelection(e.target.value)} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none">
                        <option value="villa">Villa</option>
                        <option value="apartment">Apartment</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="chalet">Chalet</option>
                        <option value="commercial">Commercial</option>
                        <option value="other">Other (Custom)</option>
                      </select>
                    </div>
                    {categorySelection === "other" && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Custom Category</label>
                        <input type="text" required value={customCategory} onChange={e => setCustomCategory(e.target.value)} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none" />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium mb-1">Area (sqm)</label>
                      <input type="number" required value={area} onChange={e => setArea(e.target.value)} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Duration</label>
                      <input type="text" placeholder="e.g. 6 months" required value={duration} onChange={e => setDuration(e.target.value)} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Year</label>
                      <input type="number" required value={year} onChange={e => setYear(Number(e.target.value))} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none" />
                    </div>
                  </div>
                </div>

                {/* 3. Challenge & Solution */}
                <div>
                  <h3 className="font-semibold text-sm text-[var(--gold-primary)] uppercase tracking-wider mb-4 border-b pb-2">Challenges & Solutions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">The Challenge (EN)</label>
                        <textarea value={challengeEn} onChange={e => setChallengeEn(e.target.value)} rows={2} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">The Solution (EN)</label>
                        <textarea value={solutionEn} onChange={e => setSolutionEn(e.target.value)} rows={2} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none" />
                      </div>
                    </div>
                    <div className="space-y-4" dir="rtl">
                      <div>
                        <label className="block text-sm font-medium mb-1">التحدي</label>
                        <textarea value={challengeAr} onChange={e => setChallengeAr(e.target.value)} rows={2} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">الحل</label>
                        <textarea value={solutionAr} onChange={e => setSolutionAr(e.target.value)} rows={2} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Materials */}
                <div>
                  <h3 className="font-semibold text-sm text-[var(--gold-primary)] uppercase tracking-wider mb-4 border-b pb-2">Key Materials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Materials (EN - Comma separated)</label>
                      <input type="text" placeholder="Marble, Wood, Glass..." value={materialsEn} onChange={e => setMaterialsEn(e.target.value)} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none" />
                    </div>
                    <div dir="rtl">
                      <label className="block text-sm font-medium mb-1">المواد (AR - مفصولة بفاصلة)</label>
                      <input type="text" placeholder="رخام, خشب, زجاج..." value={materialsAr} onChange={e => setMaterialsAr(e.target.value)} className="w-full p-3 rounded-lg border focus:border-[var(--gold-primary)] outline-none" />
                    </div>
                  </div>
                </div>

                {/* 5. Media Uploads */}
                <div>
                  <h3 className="font-semibold text-sm text-[var(--gold-primary)] uppercase tracking-wider mb-4 border-b pb-2">Media Uploads</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Main Hero Image */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Main Image (URL or PC Upload)</label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 relative">
                          <ImageIcon size={18} className="absolute left-3 top-3.5 text-gray-400" />
                          <input type="text" placeholder="https://..." value={mainImage} onChange={e => setMainImage(e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-lg border border-[var(--border-light)] focus:border-[var(--gold-primary)] outline-none" />
                        </div>
                        <label className="cursor-pointer px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-colors hover:scale-105">
                          Browse
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      </div>
                      {mainImage && (
                        <div className="mt-3 relative h-32 w-full rounded-lg overflow-hidden border border-[var(--border-light)]">
                          <Image src={mainImage} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>

                    {/* Gallery Images */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Gallery Images (Multiple)</label>
                      <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-[var(--border-light)] rounded-lg hover:border-[var(--gold-primary)] hover:bg-gray-50 transition-colors cursor-pointer mb-3">
                        <div className="flex items-center gap-2 text-[var(--text-muted)]">
                          <Plus size={18} />
                          <span>Select Images</span>
                        </div>
                        <input type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleGalleryUpload} />
                      </label>
                      {galleryImages.length > 0 && (
                        <div className="flex gap-2 flex-wrap max-h-32 overflow-y-auto">
                          {galleryImages.map((src, idx) => (
                            <div key={idx} className="relative w-16 h-16 rounded-md overflow-hidden border">
                              <Image src={src} alt="Gallery item" fill className="object-cover" />
                              <button type="button" onClick={() => removeGalleryImage(idx)} className="absolute top-0.5 right-0.5 w-5 h-5 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--border-light)] flex justify-end gap-3">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2.5 rounded-lg border border-[var(--border-light)] font-semibold hover:bg-gray-50 hover:scale-105 transition-transform">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary px-8 hover:scale-105 transition-transform">
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
        {deleteData && (
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
                <button onClick={() => setDeleteData(null)} className="flex-1 py-3 rounded-xl bg-gray-100 font-semibold hover:bg-gray-200 hover:scale-105 transition-all">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 hover:scale-105 transition-all">
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
