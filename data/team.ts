import type { TeamMember, OfficeLocation, Stat } from "@/types";

export const teamMembers: TeamMember[] = [
  {
    id: "tm-1",
    name: { en: "Mohamed Aly Gamal", ar: "محمد علي جمال" },
    role: { en: "Founder & Creative Director", ar: "المؤسس والمدير الإبداعي" },
    bio: { en: "With 15 years shaping luxury interiors across Egypt and the Gulf, Mohamed founded MAG Design with a singular belief: every space should feel like it was designed for the person living in it.", ar: "بخبرة 15 عاماً في تشكيل المساحات الداخلية الفاخرة عبر مصر والخليج، أسس محمد MAG Design بإيمان راسخ: كل مساحة يجب أن تشعر أنها صُممت للشخص الذي يعيش فيها." },
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    specialties: [{ en: "Luxury Residential", ar: "السكني الفاخر" }, { en: "Brand Identity", ar: "هوية العلامة التجارية" }],
  },
  {
    id: "tm-2",
    name: { en: "Sara Mahmoud Rashid", ar: "سارة محمود راشد" },
    role: { en: "Senior Interior Designer", ar: "مصممة داخلية أولى" },
    bio: { en: "Sara studied at the American University in Cairo before completing a master's at the Politecnico di Milano. Her work bridges Egyptian material culture and Italian spatial rigour.", ar: "درست سارة في الجامعة الأمريكية بالقاهرة قبل إكمال الماجستير في بوليتكنيكو دي ميلانو." },
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    specialties: [{ en: "Neoclassical", ar: "نيوكلاسيكي" }, { en: "Contemporary", ar: "معاصر" }],
  },
  {
    id: "tm-3",
    name: { en: "Karim Nabil Hassan", ar: "كريم نبيل حسن" },
    role: { en: "Technical Director", ar: "المدير التقني" },
    bio: { en: "Karim oversees all technical execution — MEP coordination, smart home integration, and quality control — ensuring that every design is realised exactly as conceived.", ar: "يشرف كريم على جميع التنفيذ التقني — تنسيق الميكانيكا والكهرباء والسباكة وتكامل المنزل الذكي ومراقبة الجودة." },
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    specialties: [{ en: "Smart Homes", ar: "المنازل الذكية" }, { en: "Project Management", ar: "إدارة المشاريع" }],
  },
  {
    id: "tm-4",
    name: { en: "Dina Farouk El-Masri", ar: "دينا فاروق المصري" },
    role: { en: "Client Relations Manager", ar: "مدير علاقات العملاء" },
    bio: { en: "Dina is the bridge between our clients and our creative team — ensuring every client feels heard, informed, and confident throughout their project journey.", ar: "دينا هي الجسر بين عملائنا وفريقنا الإبداعي — تضمن أن يشعر كل عميل بأنه مسموع ومطلع وواثق طوال رحلة مشروعه." },
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    specialties: [{ en: "Client Experience", ar: "تجربة العميل" }, { en: "Process Design", ar: "تصميم العمليات" }],
  },
];

export const officeLocations: OfficeLocation[] = [
  {
    id: "loc-1",
    name: { en: "New Cairo — Head Office", ar: "القاهرة الجديدة — المقر الرئيسي" },
    address: { en: "90 South, 5th Settlement, New Cairo, Egypt", ar: "90 الجنوبي، التجمع الخامس، القاهرة الجديدة، مصر" },
    phone: "+20 2 2758 0000",
    email: "newcairo@magdesign.com",
    hours: { en: "Sun – Thu: 9:00 AM – 6:00 PM", ar: "الأحد – الخميس: 9:00 ص – 6:00 م" },
    primary: true,
  },
  {
    id: "loc-2",
    name: { en: "Sheikh Zayed — West Cairo Studio", ar: "الشيخ زايد — استوديو غرب القاهرة" },
    address: { en: "Beverly Hills, Sheikh Zayed, Giza, Egypt", ar: "بيفرلي هيلز، الشيخ زايد، الجيزة، مصر" },
    phone: "+20 2 3810 0000",
    email: "zayed@magdesign.com",
    hours: { en: "Sun – Thu: 10:00 AM – 5:00 PM", ar: "الأحد – الخميس: 10:00 ص – 5:00 م" },
    primary: false,
  },
];

export const companyStats: Stat[] = [
  { label: { en: "Projects Completed", ar: "مشاريع مكتملة" }, value: "180", suffix: "+" },
  { label: { en: "Years of Excellence", ar: "سنوات من التميز" }, value: "12" },
  { label: { en: "sqm Designed", ar: "متر مربع مُصمَّم" }, value: "95K", suffix: "+" },
  { label: { en: "Client Satisfaction", ar: "رضا العملاء" }, value: "98", suffix: "%" },
];
