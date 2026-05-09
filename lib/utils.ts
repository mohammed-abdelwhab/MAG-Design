import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes safely (handles conflicts)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a human-readable string
 */
export function formatDate(date: Date | string, locale: 'en' | 'ar' = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date to a short string
 */
export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Truncate text to a given length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

/**
 * Slugify a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Generate an array of calendar days for a given month
 */
export function getCalendarDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay(); // 0 = Sunday

  const days: (Date | null)[] = [];

  // Pad start
  for (let i = 0; i < startDow; i++) {
    days.push(null);
  }

  // Fill days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  return days;
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Simulate an API delay for mock async calls
 */
export function sleep(ms: number = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Format a phone number for WhatsApp link
 */
export function whatsappLink(phone: string, message?: string): string {
  const clean = phone.replace(/[^0-9]/g, '');
  const msg = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${clean}${msg}`;
}

/**
 * Get a localized string value
 */
export function t(obj: { en: string; ar: string }, locale: 'en' | 'ar'): string {
  return obj[locale];
}

/**
 * Format currency (EGP)
 */
export function formatCurrency(amount: number, locale: 'en' | 'ar' = 'en'): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(amount);
}
