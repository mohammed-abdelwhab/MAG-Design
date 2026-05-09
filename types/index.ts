// ============================================
// SHARED TYPESCRIPT TYPES — MAG Design
// ============================================

// ---- Common ----
export interface LocalizedString {
  en: string;
  ar: string;
}

export interface Stat {
  label: LocalizedString;
  value: string;
  suffix?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// ---- Portfolio ----
export type ProjectCategory = 'villa' | 'apartment' | 'penthouse' | 'chalet' | 'commercial';
export type ProjectStyle = 'modern' | 'neoclassical' | 'contemporary' | 'minimalist' | 'eclectic';

export interface ProjectImage {
  id: string;
  src: string;
  alt: LocalizedString;
  caption?: LocalizedString;
}

export interface Project {
  id: string;
  slug: string;
  title: LocalizedString;
  location: LocalizedString;
  category: ProjectCategory;
  style: ProjectStyle;
  area: string; // sqm
  year: number;
  duration: string;
  heroImage: string;
  gallery: ProjectImage[];
  description: LocalizedString;
  challenge: LocalizedString;
  solution: LocalizedString;
  materials: LocalizedString[];
  featured: boolean;
  tags: string[];
}

// ---- Services ----
export type ServiceId = 'interior-design' | 'full-finishing' | 'technical-installation' | 'facade-design';

export interface ServiceFeature {
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface Service {
  id: ServiceId;
  slug: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  heroImage: string;
  features: ServiceFeature[];
  process: LocalizedString[];
  ctaText: LocalizedString;
}

// ---- Testimonials ----
export interface Testimonial {
  id: string;
  name: LocalizedString;
  location: LocalizedString;
  projectType: LocalizedString;
  rating: number;
  quote: LocalizedString;
  avatar: string;
  date: string;
}

// ---- Team ----
export interface TeamMember {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  bio: LocalizedString;
  avatar: string;
  specialties: LocalizedString[];
  social?: SocialLink[];
}

// ---- Booking ----
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type ProjectTypeOption = 'villa' | 'apartment' | 'penthouse' | 'office' | 'other';

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface BookingFormData {
  date: Date | null;
  timeSlot: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: ProjectTypeOption | '';
  location: string;
  area: string;
  budget: string;
  notes: string;
}

export interface Booking {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  projectType: string;
  location: string;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
}

// ---- Client Portal ----
export type ProjectPhase = 'design' | 'approval' | 'execution' | 'finishing' | 'handover';
export type PhaseStatus = 'completed' | 'active' | 'pending';

export interface ProjectPhaseItem {
  id: string;
  phase: ProjectPhase;
  title: LocalizedString;
  description: LocalizedString;
  progress: number;
  status: PhaseStatus;
  startDate: string;
  endDate: string;
}

export interface ClientMessage {
  id: string;
  sender: 'client' | 'team';
  senderName: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ClientDocument {
  id: string;
  name: LocalizedString;
  type: 'contract' | 'invoice' | 'plan' | 'report';
  size: string;
  date: string;
  url: string;
}

export interface ClientPhoto {
  id: string;
  src: string;
  alt: string;
  phase: string;
  date: string;
  caption?: string;
}

export interface ClientProject {
  id: string;
  clientId: string;
  title: LocalizedString;
  location: LocalizedString;
  projectType: string;
  style: string;
  area: string;
  overallProgress: number;
  phases: ProjectPhaseItem[];
  messages: ClientMessage[];
  documents: ClientDocument[];
  photos: ClientPhoto[];
  startDate: string;
  expectedCompletion: string;
  designerName: string;
  designerAvatar: string;
  supervisorName: string;
}

export interface ClientUser {
  id: string;
  clientCode: string;
  password: string;
  name: LocalizedString;
  email: string;
  phone: string;
  avatar: string;
  project: ClientProject;
}

// ---- Admin ----
export interface AdminInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  source: string;
  createdAt: string;
}

export interface AdminStats {
  totalProjects: number;
  activeProjects: number;
  totalBookings: number;
  pendingBookings: number;
  totalInquiries: number;
  newInquiries: number;
  monthlyRevenue: string;
  satisfactionRate: number;
}

// ---- Location ----
export interface OfficeLocation {
  id: string;
  name: LocalizedString;
  address: LocalizedString;
  phone: string;
  email: string;
  hours: LocalizedString;
  mapEmbedUrl?: string;
  primary: boolean;
}

// ---- Navigation ----
export interface NavItem {
  label: LocalizedString;
  href: string;
  children?: NavItem[];
}

// ---- Language ----
export type Locale = 'en' | 'ar';
