"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, FileText, Image as ImageIcon, MessageSquare, LogOut, Menu, X } from "lucide-react";
import { usePortalStore } from "@/store/portalStore";
import { useUIStore } from "@/store/uiStore";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, logout } = usePortalStore();
  const { locale, dir } = useUIStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  // Handle language toggle for portal
  const toggleLanguage = () => {
    useUIStore.getState().setLocale(locale === "en" ? "ar" : "en");
  };

  if (!mounted || !isAuthenticated || !user) {
    return null; // or a loading spinner
  }

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: { en: "Dashboard", ar: "لوحة التحكم" } },
    { href: "/documents", icon: FileText, label: { en: "Documents", ar: "المستندات" } },
    { href: "/gallery", icon: ImageIcon, label: { en: "Gallery", ar: "المعرض" } },
    { 
      href: "/messages", 
      icon: MessageSquare, 
      label: { en: "Messages", ar: "الرسائل" },
      badge: user.project.messages.filter(m => !m.read && m.sender === 'team').length
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[var(--border-light)] sticky top-0 z-50">
        <Link href="/" className="relative w-24 h-8">
          <Image src="/images/logo/logo.png" alt="MAG Design" fill className="object-contain" />
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[var(--text-primary)]">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 ${dir === "rtl" ? "right-0" : "left-0"} z-40 w-64 bg-white border-${dir === "rtl" ? "l" : "r"} border-[var(--border-light)] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isMobileMenuOpen 
          ? "translate-x-0" 
          : (dir === "rtl" ? "translate-x-full" : "-translate-x-full")}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 hidden md:block border-b border-[var(--border-light)]">
            <Link href="/" className="relative block w-32 h-10">
              <Image src="/images/logo/logo.png" alt="MAG Design" fill className="object-contain" />
            </Link>
          </div>

          {/* User Profile Summary */}
          <div className="p-6 border-b border-[var(--border-light)]">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image src={user.avatar} alt={user.name[locale]} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-[var(--text-primary)] text-sm">{user.name[locale]}</h3>
                <p className="font-body text-xs text-[var(--text-muted)]">{user.project.title[locale]}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="font-body text-xs font-semibold text-[var(--text-muted)] tracking-widest uppercase mb-4 px-4 pt-4">
              {locale === "en" ? "Menu" : "القائمة"}
            </div>
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg font-body text-sm transition-colors ${
                    isActive 
                      ? "bg-[var(--gold-primary)]/10 text-[var(--gold-primary)] font-semibold" 
                      : "text-[var(--text-primary)] hover:bg-[var(--bg-primary)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? "text-[var(--gold-primary)]" : "text-[var(--text-muted)]"} />
                    {item.label[locale]}
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-[var(--gold-primary)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-[var(--border-light)] space-y-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-body text-sm text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-colors"
            >
              <div className="w-5 font-bold text-center text-[var(--gold-primary)]">
                {locale === "en" ? "ع" : "EN"}
              </div>
              {locale === "en" ? "العربية" : "English"}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-body text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              {locale === "en" ? "Sign Out" : "تسجيل الخروج"}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden min-h-screen relative">
        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
