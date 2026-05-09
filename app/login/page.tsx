"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { usePortalStore } from "@/store/portalStore";
import { fadeUp } from "@/lib/animations";

export default function LoginPage() {
  const { locale, dir } = useUIStore();
  const { login } = usePortalStore();
  const router = useRouter();

  const [clientCode, setClientCode] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    const success = await login(clientCode, password);
    
    setIsLoading(false);
    
    if (success) {
      router.push("/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)]">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[var(--dark-deep)]">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
          alt="MAG Design Luxury Interior"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-deep)] to-transparent" />
        <div className="absolute bottom-16 left-16 right-16">
          <div className="font-body text-xs text-[var(--gold-primary)] tracking-[0.2em] uppercase mb-4">
            {locale === "en" ? "Client Portal" : "بوابة العملاء"}
          </div>
          <h2 className="font-display text-4xl text-white font-semibold leading-tight max-w-lg">
            {locale === "en" 
              ? "Your space, your vision, securely accessible." 
              : "مساحتك، رؤيتك، يمكن الوصول إليها بأمان."}
          </h2>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <div className="mb-12">
              <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-3">
                {locale === "en" ? "Welcome Back" : "مرحباً بك مجدداً"}
              </h1>
              <p className="font-body text-[var(--text-muted)]">
                {locale === "en" 
                  ? "Enter your client credentials to access your project dashboard." 
                  : "أدخل بيانات اعتماد العميل للوصول إلى لوحة معلومات مشروعك."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block font-body text-sm font-medium text-[var(--text-primary)]">
                  {locale === "en" ? "Client Code" : "كود العميل"}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 ${dir === "rtl" ? "right-0 pr-4" : "left-0 pl-4"} flex items-center pointer-events-none text-[var(--text-muted)]`}>
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={clientCode}
                    onChange={(e) => setClientCode(e.target.value)}
                    required
                    className={`w-full ${dir === "rtl" ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 rounded-lg border ${error ? 'border-red-500' : 'border-[var(--border-light)]'} focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors font-body bg-[var(--bg-primary)]`}
                    placeholder="MAG2024"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-body text-sm font-medium text-[var(--text-primary)]">
                  {locale === "en" ? "Password" : "كلمة المرور"}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 ${dir === "rtl" ? "right-0 pr-4" : "left-0 pl-4"} flex items-center pointer-events-none text-[var(--text-muted)]`}>
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full ${dir === "rtl" ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 rounded-lg border ${error ? 'border-red-500' : 'border-[var(--border-light)]'} focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors font-body bg-[var(--bg-primary)]`}
                    placeholder="••••••••"
                    dir="ltr"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm font-body">
                  {locale === "en" ? "Invalid client code or password." : "كود العميل أو كلمة المرور غير صالحة."}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !clientCode || !password}
                className="w-full btn-primary mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading 
                  ? (locale === "en" ? "Authenticating..." : "جاري التحقق...") 
                  : (locale === "en" ? "Sign In" : "تسجيل الدخول")}
              </button>
            </form>

            {/* Helper text for demo */}
            <div className="mt-12 p-4 bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-lg text-sm font-body text-[var(--text-muted)]">
              <p className="font-semibold mb-2">{locale === "en" ? "Demo Credentials:" : "بيانات الاعتماد التجريبية:"}</p>
              <p>Code: <strong>MAG2024</strong></p>
              <p>Password: <strong>password123</strong></p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
