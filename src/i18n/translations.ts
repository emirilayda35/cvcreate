import { LangCode } from "@/types/cv";

export interface Translations {
  downloadPdf: string;
  personalInfo: string;
  experience: string;
  education: string;
  skills: string;
  personalSubtitle: string;
  experienceSubtitle: string;
  educationSubtitle: string;
  skillsSubtitle: string;
  fullName: string;
  titleLabel: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  uploadPhoto: string;
  uploadPhotoHint: string;
  changePhoto: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  stillWorking: string;
  description: string;
  addExperience: string;
  noExperience: string;
  delete: string;
  school: string;
  degree: string;
  field: string;
  gpa: string;
  addEducation: string;
  noEducation: string;
  addSkill: string;
  noSkills: string;
  skillPlaceholder: string;
  levelBeginner: string;
  levelIntermediate: string;
  levelAdvanced: string;
  levelExpert: string;
  cvSummary: string;
  cvExperience: string;
  cvEducation: string;
  cvSkills: string;
  cvContact: string;
  cvPresent: string;
  // Şablon boş-durum fallback metinleri (dile göre değişmeli)
  cvFullNameFallback: string;
  cvTitleFallback: string;
  emptyPreview: string;
  emptyPreviewSub: string;
  back: string;
  next: string;
  downloadCta: string;
  downloadCtaHint: string;
  paywallTitle: string;
  paywallSub: string;
  paywallFeature1: string;
  paywallFeature2: string;
  paywallFeature3: string;
  templateClassic: string;
  templateModern: string;
  templateMinimal: string;
  templateExecutive: string;
  templateHarvard: string;
  months: string[];
  monthsFull: string[];
  // Kültürel placeholderlar
  ph: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
    position: string;
    company: string;
    jobDescription: string;
    school: string;
    degree: string;
    field: string;
  };
}

// ─── TÜRKÇE ───────────────────────────────────────────────────
const tr: Translations = {
  downloadPdf: "⬇ PDF İndir",
  personalInfo: "Kişisel Bilgiler",
  experience: "Deneyim",
  education: "Eğitim",
  skills: "Yetenekler",
  personalSubtitle: "İletişim bilgilerini ve kısa özetini ekle.",
  experienceSubtitle: "İş deneyimlerini ekle, en yeniden başla.",
  educationSubtitle: "Eğitim geçmişini ekle.",
  skillsSubtitle: "Güçlü yönlerini ve uzmanlık alanlarını listele.",
  fullName: "Ad Soyad",
  titleLabel: "Ünvan / Pozisyon",
  email: "E-posta",
  phone: "Telefon",
  location: "Konum",
  website: "Web / LinkedIn",
  summary: "Kısa Özet",
  uploadPhoto: "Profil Fotoğrafı Yükle",
  uploadPhotoHint: "JPG veya PNG, maks. 2MB",
  changePhoto: "Fotoğrafı Değiştir",
  position: "Pozisyon",
  company: "Şirket",
  startDate: "Başlangıç",
  endDate: "Bitiş",
  stillWorking: "Hâlâ burada çalışıyorum",
  description: "Açıklama",
  addExperience: "+ Deneyim Ekle",
  noExperience: "Henüz deneyim eklenmedi.",
  delete: "Sil",
  school: "Okul / Üniversite",
  degree: "Derece",
  field: "Bölüm",
  gpa: "Not Ort.",
  addEducation: "+ Eğitim Ekle",
  noEducation: "Henüz eğitim eklenmedi.",
  addSkill: "+ Yetenek Ekle",
  noSkills: "Henüz yetenek eklenmedi.",
  skillPlaceholder: "React, Figma, Proje Yönetimi...",
  levelBeginner: "Başlangıç",
  levelIntermediate: "Orta",
  levelAdvanced: "İleri",
  levelExpert: "Uzman",
  cvSummary: "Özet",
  cvExperience: "Deneyim",
  cvEducation: "Eğitim",
  cvSkills: "Yetenekler",
  cvContact: "İletişim",
  cvPresent: "Günümüz",
  cvFullNameFallback: "Ad Soyad",
  cvTitleFallback: "Ünvan / Pozisyon",
  emptyPreview: "CV'niz burada görünecek",
  emptyPreviewSub: "Soldan bilgilerinizi doldurmaya başlayın",
  back: "← Geri",
  next: "İleri →",
  downloadCta: "CV'mi İndir (.pdf)",
  downloadCtaHint: "İndirmek için önce bilgilerini gir",
  paywallTitle: "Premium CV'nizi İndirin",
  paywallSub: "CV'niz hazır! Yüksek kaliteli PDF'inizi indirmek için bir plan seçin.",
  paywallFeature1: "✓  Anında PDF indirme",
  paywallFeature2: "✓  ATS uyumlu çıktı",
  paywallFeature3: "✓  Tek seferlik ödeme",
  templateClassic: "Klasik",
  templateModern: "Modern",
  templateMinimal: "Minimal",
  templateExecutive: "Executive",
  templateHarvard: "Harvard",
  months: ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],
  monthsFull: ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],
  ph: {
    fullName: "Ahmet Yılmaz",
    title: "Kıdemli Yazılım Geliştirici",
    email: "ahmet@ornek.com",
    phone: "+90 532 000 00 00",
    location: "İstanbul, Türkiye",
    website: "linkedin.com/in/ahmetyilmaz",
    summary: "Yazılım geliştirme alanında 5+ yıl deneyime sahip, React ve Node.js uzmanı...",
    position: "Frontend Geliştirici",
    company: "Trendyol / Getir / Arçelik",
    jobDescription: "Mikroservis mimarisiyle ölçeklenebilir web uygulamaları geliştirdim...",
    school: "İstanbul Teknik Üniversitesi",
    degree: "Lisans",
    field: "Bilgisayar Mühendisliği",
  },
};

// ─── İNGİLİZCE ────────────────────────────────────────────────
const en: Translations = {
  downloadPdf: "⬇ Download PDF",
  personalInfo: "Personal Info",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  personalSubtitle: "Add your contact details and a short summary.",
  experienceSubtitle: "Add your work experience, starting with the most recent.",
  educationSubtitle: "Add your educational background.",
  skillsSubtitle: "List your strengths and areas of expertise.",
  fullName: "Full Name",
  titleLabel: "Job Title / Position",
  email: "Email",
  phone: "Phone",
  location: "Location",
  website: "Website / LinkedIn",
  summary: "Professional Summary",
  uploadPhoto: "Upload Profile Photo",
  uploadPhotoHint: "JPG or PNG, max 2MB",
  changePhoto: "Change Photo",
  position: "Position",
  company: "Company",
  startDate: "Start Date",
  endDate: "End Date",
  stillWorking: "I currently work here",
  description: "Description",
  addExperience: "+ Add Experience",
  noExperience: "No experience added yet.",
  delete: "Delete",
  school: "School / University",
  degree: "Degree",
  field: "Field of Study",
  gpa: "GPA",
  addEducation: "+ Add Education",
  noEducation: "No education added yet.",
  addSkill: "+ Add Skill",
  noSkills: "No skills added yet.",
  skillPlaceholder: "React, Figma, Project Management...",
  levelBeginner: "Beginner",
  levelIntermediate: "Intermediate",
  levelAdvanced: "Advanced",
  levelExpert: "Expert",
  cvSummary: "Summary",
  cvExperience: "Experience",
  cvEducation: "Education",
  cvSkills: "Skills",
  cvContact: "Contact",
  cvPresent: "Present",
  cvFullNameFallback: "Full Name",
  cvTitleFallback: "Job Title / Position",
  emptyPreview: "Your CV will appear here",
  emptyPreviewSub: "Start filling in your details on the left",
  back: "← Back",
  next: "Next →",
  downloadCta: "Download My CV (.pdf)",
  downloadCtaHint: "Fill in your details to enable download",
  paywallTitle: "Download Your Premium CV",
  paywallSub: "Your CV is ready! Choose a plan to download your high-quality PDF.",
  paywallFeature1: "✓  Instant PDF download",
  paywallFeature2: "✓  ATS-friendly output",
  paywallFeature3: "✓  One-time payment",
  templateClassic: "Classic",
  templateModern: "Modern",
  templateMinimal: "Minimal",
  templateExecutive: "Executive",
  templateHarvard: "Harvard",
  months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  monthsFull: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  ph: {
    fullName: "John Smith",
    title: "Senior Software Engineer",
    email: "john.smith@email.com",
    phone: "+44 7700 900000",
    location: "London, United Kingdom",
    website: "linkedin.com/in/johnsmith",
    summary: "Software engineer with 5+ years of experience specializing in React and Node.js...",
    position: "Frontend Engineer",
    company: "Google / Meta / Amazon",
    jobDescription: "Built scalable web applications using microservices architecture...",
    school: "University of Oxford",
    degree: "Bachelor of Science",
    field: "Computer Science",
  },
};

// ─── ALMANCA ──────────────────────────────────────────────────
const de: Translations = {
  downloadPdf: "⬇ PDF Herunterladen",
  personalInfo: "Persönliche Daten",
  experience: "Erfahrung",
  education: "Ausbildung",
  skills: "Fähigkeiten",
  personalSubtitle: "Füge deine Kontaktdaten und eine kurze Zusammenfassung hinzu.",
  experienceSubtitle: "Füge deine Berufserfahrung hinzu, beginnend mit der neuesten.",
  educationSubtitle: "Füge deinen Bildungsweg hinzu.",
  skillsSubtitle: "Liste deine Stärken und Fachgebiete auf.",
  fullName: "Vor- und Nachname",
  titleLabel: "Berufsbezeichnung / Position",
  email: "E-Mail",
  phone: "Telefon",
  location: "Standort",
  website: "Webseite / LinkedIn",
  summary: "Kurzprofil",
  uploadPhoto: "Profilfoto hochladen",
  uploadPhotoHint: "JPG oder PNG, max. 2MB",
  changePhoto: "Foto ändern",
  position: "Position",
  company: "Unternehmen",
  startDate: "Startdatum",
  endDate: "Enddatum",
  stillWorking: "Ich arbeite hier noch",
  description: "Beschreibung",
  addExperience: "+ Erfahrung hinzufügen",
  noExperience: "Noch keine Erfahrung hinzugefügt.",
  delete: "Löschen",
  school: "Schule / Universität",
  degree: "Abschluss",
  field: "Studienrichtung",
  gpa: "Notenschnitt",
  addEducation: "+ Ausbildung hinzufügen",
  noEducation: "Noch keine Ausbildung hinzugefügt.",
  addSkill: "+ Fähigkeit hinzufügen",
  noSkills: "Noch keine Fähigkeiten hinzugefügt.",
  skillPlaceholder: "React, Figma, Projektmanagement...",
  levelBeginner: "Anfänger",
  levelIntermediate: "Mittelstufe",
  levelAdvanced: "Fortgeschritten",
  levelExpert: "Experte",
  cvSummary: "Profil",
  cvExperience: "Berufserfahrung",
  cvEducation: "Ausbildung",
  cvSkills: "Fähigkeiten",
  cvContact: "Kontakt",
  cvPresent: "Heute",
  cvFullNameFallback: "Vor- und Nachname",
  cvTitleFallback: "Berufsbezeichnung / Position",
  emptyPreview: "Ihr Lebenslauf erscheint hier",
  emptyPreviewSub: "Füllen Sie links Ihre Daten aus",
  back: "← Zurück",
  next: "Weiter →",
  downloadCta: "Lebenslauf herunterladen (.pdf)",
  downloadCtaHint: "Füllen Sie zuerst Ihre Daten aus",
  paywallTitle: "Premium-Lebenslauf herunterladen",
  paywallSub: "Ihr Lebenslauf ist fertig! Wählen Sie einen Plan.",
  paywallFeature1: "✓  Sofortiger PDF-Download",
  paywallFeature2: "✓  ATS-kompatible Ausgabe",
  paywallFeature3: "✓  Einmalige Zahlung",
  templateClassic: "Klassisch",
  templateModern: "Modern",
  templateMinimal: "Minimal",
  templateExecutive: "Executive",
  templateHarvard: "Harvard",
  months: ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],
  monthsFull: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
  ph: {
    fullName: "Max Mustermann",
    title: "Senior Software-Entwickler",
    email: "max.mustermann@email.de",
    phone: "+49 151 00000000",
    location: "München, Deutschland",
    website: "linkedin.com/in/maxmustermann",
    summary: "Software-Entwickler mit 5+ Jahren Erfahrung in React und Node.js...",
    position: "Frontend-Entwickler",
    company: "BMW / SAP / Siemens",
    jobDescription: "Entwicklung skalierbarer Webanwendungen mit Microservices-Architektur...",
    school: "Technische Universität München",
    degree: "Bachelor of Science",
    field: "Informatik",
  },
};

// ─── FRANSIZCA ────────────────────────────────────────────────
const fr: Translations = {
  downloadPdf: "⬇ Télécharger PDF",
  personalInfo: "Informations",
  experience: "Expérience",
  education: "Formation",
  skills: "Compétences",
  personalSubtitle: "Ajoutez vos coordonnées et un court résumé.",
  experienceSubtitle: "Ajoutez vos expériences, en commençant par la plus récente.",
  educationSubtitle: "Ajoutez votre parcours académique.",
  skillsSubtitle: "Listez vos points forts et domaines d'expertise.",
  fullName: "Nom et Prénom",
  titleLabel: "Titre / Poste",
  email: "E-mail",
  phone: "Téléphone",
  location: "Lieu",
  website: "Site Web / LinkedIn",
  summary: "Résumé Professionnel",
  uploadPhoto: "Télécharger une photo",
  uploadPhotoHint: "JPG ou PNG, max 2Mo",
  changePhoto: "Changer la photo",
  position: "Poste",
  company: "Entreprise",
  startDate: "Date de début",
  endDate: "Date de fin",
  stillWorking: "Je travaille encore ici",
  description: "Description",
  addExperience: "+ Ajouter une expérience",
  noExperience: "Aucune expérience ajoutée.",
  delete: "Supprimer",
  school: "École / Université",
  degree: "Diplôme",
  field: "Domaine d'études",
  gpa: "Mention",
  addEducation: "+ Ajouter une formation",
  noEducation: "Aucune formation ajoutée.",
  addSkill: "+ Ajouter une compétence",
  noSkills: "Aucune compétence ajoutée.",
  skillPlaceholder: "React, Figma, Gestion de projet...",
  levelBeginner: "Débutant",
  levelIntermediate: "Intermédiaire",
  levelAdvanced: "Avancé",
  levelExpert: "Expert",
  cvSummary: "Résumé",
  cvExperience: "Expérience",
  cvEducation: "Formation",
  cvSkills: "Compétences",
  cvContact: "Contact",
  cvPresent: "Aujourd'hui",
  cvFullNameFallback: "Nom et Prénom",
  cvTitleFallback: "Titre / Poste",
  emptyPreview: "Votre CV apparaîtra ici",
  emptyPreviewSub: "Commencez à remplir vos informations à gauche",
  back: "← Retour",
  next: "Suivant →",
  downloadCta: "Télécharger mon CV (.pdf)",
  downloadCtaHint: "Remplissez vos informations pour activer le téléchargement",
  paywallTitle: "Téléchargez votre CV Premium",
  paywallSub: "Votre CV est prêt ! Choisissez un plan pour télécharger votre PDF.",
  paywallFeature1: "✓  Téléchargement PDF instantané",
  paywallFeature2: "✓  Sortie compatible ATS",
  paywallFeature3: "✓  Paiement unique",
  templateClassic: "Classique",
  templateModern: "Moderne",
  templateMinimal: "Minimaliste",
  templateExecutive: "Executive",
  templateHarvard: "Harvard",
  months: ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],
  monthsFull: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
  ph: {
    fullName: "Jean Dupont",
    title: "Ingénieur Logiciel Senior",
    email: "jean.dupont@email.fr",
    phone: "+33 6 00 00 00 00",
    location: "Paris, France",
    website: "linkedin.com/in/jeandupont",
    summary: "Ingénieur logiciel avec 5+ ans d'expérience en React et Node.js...",
    position: "Développeur Frontend",
    company: "LVMH / BNP Paribas / Airbus",
    jobDescription: "Développement d'applications web évolutives avec une architecture microservices...",
    school: "Université Paris-Sorbonne",
    degree: "Licence",
    field: "Informatique",
  },
};

// ─── ARAPÇA ───────────────────────────────────────────────────
const ar: Translations = {
  downloadPdf: "⬇ تحميل PDF",
  personalInfo: "المعلومات الشخصية",
  experience: "الخبرة",
  education: "التعليم",
  skills: "المهارات",
  personalSubtitle: "أضف بيانات التواصل وملخصاً مختصراً.",
  experienceSubtitle: "أضف خبراتك المهنية، ابدأ بالأحدث.",
  educationSubtitle: "أضف مسيرتك التعليمية.",
  skillsSubtitle: "أدرج نقاط قوتك ومجالات خبرتك.",
  fullName: "الاسم الكامل",
  titleLabel: "المسمى الوظيفي",
  email: "البريد الإلكتروني",
  phone: "رقم الهاتف",
  location: "الموقع",
  website: "الموقع الإلكتروني / LinkedIn",
  summary: "الملخص المهني",
  uploadPhoto: "رفع صورة شخصية",
  uploadPhotoHint: "JPG أو PNG، الحجم الأقصى 2MB",
  changePhoto: "تغيير الصورة",
  position: "المنصب",
  company: "الشركة",
  startDate: "تاريخ البداية",
  endDate: "تاريخ النهاية",
  stillWorking: "لا أزال أعمل هنا",
  description: "الوصف",
  addExperience: "+ إضافة خبرة",
  noExperience: "لم تتم إضافة أي خبرة بعد.",
  delete: "حذف",
  school: "المدرسة / الجامعة",
  degree: "الدرجة العلمية",
  field: "التخصص",
  gpa: "المعدل التراكمي",
  addEducation: "+ إضافة مؤهل",
  noEducation: "لم تتم إضافة أي مؤهل بعد.",
  addSkill: "+ إضافة مهارة",
  noSkills: "لم تتم إضافة أي مهارات بعد.",
  skillPlaceholder: "React, Figma, إدارة المشاريع...",
  levelBeginner: "مبتدئ",
  levelIntermediate: "متوسط",
  levelAdvanced: "متقدم",
  levelExpert: "خبير",
  cvSummary: "الملخص",
  cvExperience: "الخبرة المهنية",
  cvEducation: "التعليم",
  cvSkills: "المهارات",
  cvContact: "التواصل",
  cvPresent: "حتى الآن",
  cvFullNameFallback: "الاسم الكامل",
  cvTitleFallback: "المسمى الوظيفي",
  emptyPreview: "ستظهر سيرتك الذاتية هنا",
  emptyPreviewSub: "ابدأ بملء بياناتك من اليسار",
  back: "→ رجوع",
  next: "التالي ←",
  downloadCta: "تحميل سيرتي الذاتية (.pdf)",
  downloadCtaHint: "أدخل بياناتك أولاً لتفعيل التحميل",
  paywallTitle: "تحميل سيرتك الذاتية المميزة",
  paywallSub: "سيرتك جاهزة! اختر خطة لتحميل ملف PDF عالي الجودة.",
  paywallFeature1: "✓  تحميل PDF فوري",
  paywallFeature2: "✓  متوافق مع أنظمة ATS",
  paywallFeature3: "✓  دفع لمرة واحدة",
  templateClassic: "كلاسيكي",
  templateModern: "عصري",
  templateMinimal: "بسيط",
  templateExecutive: "إكزيكيوتيف",
  templateHarvard: "هارفارد",
  months: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
  monthsFull: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
  ph: {
    fullName: "محمد العمري",
    title: "مهندس برمجيات أول",
    email: "mohammed@example.com",
    phone: "+966 50 000 0000",
    location: "الرياض، المملكة العربية السعودية",
    website: "linkedin.com/in/mohammedالعمري",
    summary: "مهندس برمجيات بخبرة أكثر من 5 سنوات في تطوير تطبيقات الويب باستخدام React...",
    position: "مطور واجهات أمامية",
    company: "أرامكو / STC / مدى",
    jobDescription: "طوّرت تطبيقات ويب قابلة للتوسع باستخدام بنية الخدمات المصغّرة...",
    school: "جامعة الملك عبدالله للعلوم والتقنية",
    degree: "بكالوريوس",
    field: "علوم الحاسب",
  },
};

export const translations: Record<LangCode, Translations> = { tr, en, de, fr, ar };
export const t = (lang: LangCode): Translations => translations[lang];
