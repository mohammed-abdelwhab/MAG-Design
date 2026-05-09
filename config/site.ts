import type { NavItem } from "@/types";

export const navigation: NavItem[] = [
  { label: { en: "Home", ar: "الرئيسية" }, href: "/" },
  { label: { en: "Portfolio", ar: "المعرض" }, href: "/#portfolio" },
  { label: { en: "Services", ar: "خدماتنا" }, href: "/#services" },
  { label: { en: "About", ar: "عن الشركة" }, href: "/#about" },
  { label: { en: "Contact", ar: "تواصل معنا" }, href: "/#contact" },
];

export const siteConfig = {
  name: "MAG Design",
  nameAr: "ماغ ديزاين",
  tagline: { en: "Luxury Interior Design", ar: "التصميم الداخلي الفاخر" },
  group: { en: "Under Al Khaleeg Group", ar: "تحت مظلة مجموعة الخليج" },
  phone: "+20 100 000 0000",
  whatsapp: "+201000000000",
  email: "hello@magdesign.com",
  instagram: "https://instagram.com/magdesign",
  facebook: "https://facebook.com/magdesign",
  linkedin: "https://linkedin.com/company/magdesign",
};
