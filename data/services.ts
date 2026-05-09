import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "interior-design",
    slug: "interior-design",
    title: { en: "Interior Design", ar: "التصميم الداخلي" },
    subtitle: { en: "From concept to complete visual identity", ar: "من المفهوم إلى الهوية البصرية الكاملة" },
    description: {
      en: "We craft interior environments that are deeply personal and architecturally resolved. Our design process begins with listening — understanding how you live, what moves you, and what you need from your space. The result is always a singular vision, never a template.",
      ar: "نصمم بيئات داخلية عميقة الشخصية ومحكمة معمارياً. تبدأ عملية تصميمنا بالاستماع — فهم كيفية معيشتك وما يحركك وما تحتاجه من مساحتك."
    },
    heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80",
    features: [
      { icon: "Palette", title: { en: "Concept Development", ar: "تطوير المفهوم" }, description: { en: "Mood boards, material palettes, and spatial narratives tailored to you.", ar: "لوحات مزاجية وتشكيلات مواد وروايات مكانية مصممة خصيصاً لك." } },
      { icon: "Ruler", title: { en: "Space Planning", ar: "تخطيط المساحة" }, description: { en: "Intelligent layouts that optimise flow, function, and experience.", ar: "تخطيطات ذكية تُحسّن التدفق والوظيفة والتجربة." } },
      { icon: "Layers", title: { en: "Material Curation", ar: "اختيار المواد" }, description: { en: "Sourcing exceptional materials from global and regional suppliers.", ar: "تأمين مواد استثنائية من موردين عالميين وإقليميين." } },
      { icon: "Monitor", title: { en: "3D Visualisation", ar: "التصور ثلاثي الأبعاد" }, description: { en: "Photorealistic renders so you see your space before a single tile is laid.", ar: "تقديم واقعي للصور حتى ترى مساحتك قبل وضع بلاطة واحدة." } },
    ],
    process: [
      { en: "Discovery consultation & brief", ar: "استشارة الاكتشاف والموجز" },
      { en: "Concept presentation", ar: "عرض المفهوم" },
      { en: "Design development & 3D renders", ar: "تطوير التصميم والتصورات ثلاثية الأبعاد" },
      { en: "Material & furniture specification", ar: "مواصفات المواد والأثاث" },
      { en: "Contractor coordination", ar: "تنسيق المقاولين" },
      { en: "Site supervision & quality control", ar: "الإشراف الميداني ومراقبة الجودة" },
    ],
    ctaText: { en: "Start Your Design Journey", ar: "ابدأ رحلة تصميمك" },
  },
  {
    id: "full-finishing",
    slug: "full-finishing",
    title: { en: "Full Finishing", ar: "التشطيب الكامل" },
    subtitle: { en: "End-to-end execution with uncompromising quality", ar: "تنفيذ شامل بجودة لا تهاون فيها" },
    description: {
      en: "We manage the complete finishing process — from raw concrete to move-in ready. Our trusted network of specialist craftsmen, sourced and vetted over years of luxury projects, ensures every element is executed with the precision the design demands.",
      ar: "ندير عملية التشطيب الكاملة — من الخرسانة الخام إلى الجاهز للسكن. شبكتنا الموثوقة من الحرفيين المتخصصين تضمن تنفيذ كل عنصر بالدقة التي يتطلبها التصميم."
    },
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80",
    features: [
      { icon: "HardHat", title: { en: "Project Management", ar: "إدارة المشروع" }, description: { en: "A dedicated project manager on every site, every day.", ar: "مدير مشروع مخصص في كل موقع، كل يوم." } },
      { icon: "Hammer", title: { en: "Civil & Gypsum Works", ar: "الأعمال المدنية والجبس" }, description: { en: "Partitions, ceilings, and architectural details executed to specification.", ar: "أقسام وأسقف وتفاصيل معمارية منفذة وفق المواصفات." } },
      { icon: "Droplets", title: { en: "Paint & Finishes", ar: "الدهانات والتشطيبات" }, description: { en: "Premium paint systems, decorative plasters, and specialty coatings.", ar: "أنظمة طلاء فاخرة وجصص زخرفية وطلاءات متخصصة." } },
      { icon: "Sofa", title: { en: "Furniture Installation", ar: "تركيب الأثاث" }, description: { en: "White-glove furniture delivery, placement, and styling.", ar: "توصيل وتركيب وتنسيق الأثاث بعناية فائقة." } },
    ],
    process: [
      { en: "Site assessment & handover from developer", ar: "تقييم الموقع والاستلام من المطور" },
      { en: "Detailed execution drawings", ar: "رسومات تنفيذية تفصيلية" },
      { en: "Materials procurement & logistics", ar: "شراء المواد والخدمات اللوجستية" },
      { en: "Phased construction supervision", ar: "الإشراف على البناء المرحلي" },
      { en: "Quality inspection at each milestone", ar: "فحص الجودة في كل مرحلة" },
      { en: "Snagging & client handover", ar: "معالجة العيوب وتسليم العميل" },
    ],
    ctaText: { en: "Get a Finishing Quote", ar: "احصل على عرض سعر للتشطيب" },
  },
  {
    id: "technical-installation",
    slug: "technical-installation",
    title: { en: "Technical Installation", ar: "التركيبات التقنية" },
    subtitle: { en: "Smart, invisible, perfectly integrated systems", ar: "أنظمة ذكية وخفية ومتكاملة تماماً" },
    description: {
      en: "Luxury today means technology that is felt, not seen. We design and install fully integrated smart home systems — lighting, climate, audio-visual, security — that disappear into your architecture and respond intuitively to how you live.",
      ar: "الرفاهية اليوم تعني تكنولوجيا تُشعر بها لا تراها. نصمم وننفذ أنظمة منزل ذكي متكاملة بالكامل تختفي في معمارك وتستجيب بشكل بديهي لطريقة حياتك."
    },
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
    features: [
      { icon: "Lightbulb", title: { en: "Smart Lighting", ar: "الإضاءة الذكية" }, description: { en: "Architectural lighting design with automated scenes and colour tuning.", ar: "تصميم إضاءة معمارية مع مشاهد آلية وضبط الألوان." } },
      { icon: "Thermometer", title: { en: "HVAC & Climate", ar: "التكييف والمناخ" }, description: { en: "Silent, efficient climate systems concealed within the architecture.", ar: "أنظمة تكييف صامتة وفعالة مخفية داخل المعمار." } },
      { icon: "Wifi", title: { en: "Smart Home Integration", ar: "تكامل المنزل الذكي" }, description: { en: "Control everything from one elegant interface or voice command.", ar: "التحكم في كل شيء من واجهة أنيقة واحدة أو أمر صوتي." } },
      { icon: "Shield", title: { en: "Security Systems", ar: "أنظمة الأمان" }, description: { en: "Discreet CCTV, access control, and alarm systems.", ar: "كاميرات مراقبة وأنظمة تحكم في الوصول وإنذار غير مرئية." } },
    ],
    process: [
      { en: "Technical requirements assessment", ar: "تقييم المتطلبات التقنية" },
      { en: "System design & specification", ar: "تصميم النظام والمواصفات" },
      { en: "Conduit & infrastructure installation", ar: "تركيب البنية التحتية والأقنية" },
      { en: "Device installation & configuration", ar: "تركيب الأجهزة وتكوينها" },
      { en: "Integration & programming", ar: "التكامل والبرمجة" },
      { en: "Client training & handover manual", ar: "تدريب العميل ودليل التسليم" },
    ],
    ctaText: { en: "Explore Smart Solutions", ar: "استكشف الحلول الذكية" },
  },
  {
    id: "facade-design",
    slug: "facade-design",
    title: { en: "Facade Design", ar: "تصميم الواجهات" },
    subtitle: { en: "Architecture that makes a statement from the street", ar: "معمار يصنع انطباعاً من الشارع" },
    description: {
      en: "The facade is your home's first conversation with the world. We design facade treatments that are architecturally rigorous, climatically responsive, and unmistakably considered — whether classical stone, contemporary cladding, or a bespoke material system.",
      ar: "الواجهة هي المحادثة الأولى لمنزلك مع العالم. نصمم معالجات واجهات صارمة معمارياً واستجابة للمناخ."
    },
    heroImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80",
    features: [
      { icon: "Building2", title: { en: "Architectural Cladding", ar: "الكسوة المعمارية" }, description: { en: "Stone, aluminium composite, glass, and specialty facade systems.", ar: "أنظمة واجهات من الحجر والألومنيوم المركب والزجاج." } },
      { icon: "Sun", title: { en: "Solar Shading", ar: "الحماية الشمسية" }, description: { en: "Brise-soleil, louvres, and screens that are beautiful and functional.", ar: "وحدات حماية شمسية ومعترضات وشاشات جميلة وعملية." } },
      { icon: "Leaf", title: { en: "Landscaping Integration", ar: "تكامل تنسيق الحدائق" }, description: { en: "Green walls, water features, and landscape that frames the architecture.", ar: "جدران خضراء ومنصات مائية وتنسيق يؤطر المعمار." } },
      { icon: "Lamp", title: { en: "Facade Lighting", ar: "إضاءة الواجهات" }, description: { en: "Architectural uplighting and accent lighting that transforms the facade at night.", ar: "إضاءة معمارية تحويلية تضخ حياة في الواجهة ليلاً." } },
    ],
    process: [
      { en: "Site & orientation analysis", ar: "تحليل الموقع والاتجاه" },
      { en: "Concept & material selection", ar: "اختيار المفهوم والمواد" },
      { en: "Technical detailing & engineering", ar: "التفصيل التقني والهندسة" },
      { en: "Sample approval", ar: "اعتماد العينات" },
      { en: "Installation supervision", ar: "الإشراف على التركيب" },
      { en: "Facade lighting commissioning", ar: "تشغيل إضاءة الواجهة" },
    ],
    ctaText: { en: "Design Your Facade", ar: "صمّم واجهتك" },
  },
];
