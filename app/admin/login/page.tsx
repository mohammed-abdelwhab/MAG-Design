"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { fadeUp } from "@/lib/animations";

export default function AdminLoginPage() {
  const { login } = useAdminStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    const success = await login(email, password);
    
    setIsLoading(false);
    
    if (success) {
      router.push("/admin/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)]">
      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-[var(--gold-primary)] rounded-lg flex items-center justify-center">
                  <Lock className="text-white" size={20} />
                </div>
                <h1 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                  Admin Control Panel
                </h1>
              </div>
              <p className="font-body text-[var(--text-muted)]">
                Secure access for MAG Design administrators. Please enter your credentials to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block font-body text-sm font-medium text-[var(--text-primary)]">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-[var(--border-light)]'} focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors font-body bg-[var(--bg-primary)]`}
                    placeholder="admin@magdesign.com"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-body text-sm font-medium text-[var(--text-primary)]">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-[var(--border-light)]'} focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] outline-none transition-colors font-body bg-[var(--bg-primary)]`}
                    placeholder="••••••••"
                    dir="ltr"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm font-body">
                  Invalid admin credentials. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full btn-primary mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Authenticating..." : "Login to Dashboard"}
              </button>
            </form>

            <div className="mt-12 p-4 bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-lg text-sm font-body text-[var(--text-muted)]">
              <p className="font-semibold mb-2">Admin Demo Credentials:</p>
              <p>Email: <strong>admin@magdesign.com</strong></p>
              <p>Password: <strong>admin123</strong></p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Side */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[var(--dark-deep)]">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80"
          alt="Admin Dashboard"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--dark-deep)] via-transparent to-transparent" />
      </div>
    </div>
  );
}
