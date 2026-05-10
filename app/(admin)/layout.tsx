"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  MessageSquare, 
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Image as ImageIcon
} from "lucide-react";
import { useAdminStore } from "@/store/adminStore";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, adminUser, logout } = useAdminStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, router]);

  if (!mounted || !isAuthenticated || !adminUser) {
    return null; // or loading
  }

  const navItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/admin/clients", icon: Users, label: "Clients & Projects" },
    { href: "/admin/portal-content", icon: FolderOpen, label: "Portal Content" },
    { href: "/admin/portfolio", icon: ImageIcon, label: "Public Portfolio" },
    { href: "/admin/bookings", icon: Calendar, label: "Bookings & Calendar" },
    { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col md:flex-row font-body" dir="ltr">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[var(--dark-deep)] text-white sticky top-0 z-50">
        <div className="font-display font-semibold text-lg flex items-center gap-2">
          <span className="text-[var(--gold-primary)]">MAG</span> Admin
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[var(--dark-deep)] text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 hidden md:block border-b border-white/10">
            <div className="font-display font-semibold text-2xl flex items-center gap-2">
              <span className="text-[var(--gold-primary)]">MAG</span> Admin
            </div>
            <div className="text-xs text-white/50 tracking-widest uppercase mt-1">Control Panel</div>
          </div>

          {/* User */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--gold-primary)] flex items-center justify-center font-bold">
                {adminUser.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold">{adminUser.name}</div>
                <div className="text-xs text-white/50">{adminUser.role}</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <div className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-4 px-4 pt-2">
              Management
            </div>
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    isActive 
                      ? "bg-[var(--gold-primary)] text-white font-semibold" 
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-white" : "text-white/50"} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm text-white/70 hover:bg-white/10 transition-colors"
            >
              <Settings size={18} />
              View Live Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden min-h-screen relative">
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
