import { LangCode } from "@/types/cv";

export interface Translations {
  // Nav
  downloadPdf: string;
  // Stepper tabs
  personalInfo: string;
  experience: string;
  education: string;
  skills: string;
  // Form step subtitles
  personalSubtitle: string;
  experienceSubtitle: string;
  educationSubtitle: string;
  skillsSubtitle: string;
  // Personal form labels
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
  // Experience form
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  stillWorking: string;
  description: string;
  addExperience: string;
  noExperience: string;
  delete: string;
  // Education form
  school: string;
  degree: string;
  field: string;
  gpa: string;
  addEducation: string;
  noEducation: string;
  // Skills form
  addSkill: string;
  noSkills: string;
  skillPlaceholder: string;
  levelBeginner: string;
  levelIntermediate: string;
  levelAdvanced: string;
  levelExpert: string;
  // CV preview section titles
  cvSummary: string;
  cvExperience: string;
  cvEducation: string;
  cvSkills: string;
  cvContact: string;
  cvPresent: string;
  // Empty state
  emptyPreview: string;
  emptyPreviewSub: string;
  // Steps nav
  back: string;
  next: string;
  downloadCta: string;
  downloadCtaHint: string;
  // Paywall
  paywallTitle: string;
  paywallSub: string;
  paywallFeature1: string;
  paywallFeature2: string;
  paywallFeature3: string;
  // Template labels
  templateClassic: string;
  templateModern: string;
  templateMinimal: string;
  // Month names (short)
  months: string[];
}

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
  gpa: "GPA / Not",
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
  emptyPreview: "CV'niz burada görünecek",
  emptyPreviewSub: "Soldan bilgilerinizi doldurmaya başlayın",
  back: "← Geri",
  next: "İleri →",
  downloadCta: "CV'mi İndir (.pdf)",
  downloadCtaHint: "İndirmek için önce bilgilerini gir",
  paywallTitle: "Premium CV'nizi İndirin",
  paywallSub: "CV'niz hazır! Yüksek kaliteli, ATS uyumlu PDF'inizi indirmek için bir plan seçin.",
  paywallFeature1: "✓  Anında PDF indirme",
  paywallFeature2: "✓  ATS uyumlu çıktı",
  paywallFeature3: "✓  Tek seferlik ödeme",
  templateClassic: "Klasik",
  templateModern: "Modern",
  templateMinimal: "Minimal",
  months: ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],
};

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
  gpa: "GPA / Grade",
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
  emptyPreview: "Your CV will appear here",
  emptyPreviewSub: "Start filling in your details on the left",
  back: "← Back",
  next: "Next →",
  downloadCta: "Download My CV (.pdf)",
  downloadCtaHint: "Fill in your details to enable download",
  paywallTitle: "Download Your Premium CV",
  paywallSub: "Your CV is ready! Choose a plan to download your high-quality, ATS-friendly PDF.",
  paywallFeature1: "✓  Instant PDF download",
  paywallFeature2: "✓  ATS-friendly output",
  paywallFeature3: "✓  One-time payment",
  templateClassic: "Classic",
  templateModern: "Modern",
  templateMinimal: "Minimal",
  months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
};

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
  gpa: "Notendurchschnitt",
  addEducation: "+ Ausbildung hinzufügen",
  noEducation: "Noch keine Ausbildung hinzugefügt.",
  addSkill: "+ Fähigkeit hinzufügen",
  noSkills: "Noch keine Fähigkeiten hinzugefügt.",
  skillPlaceholder: "React, Figma, Projektmanagement...",
  levelBeginner: "Anfänger",
  levelIntermediate: "Mittel",
  levelAdvanced: "Fortgeschritten",
  levelExpert: "Experte",
  cvSummary: "Profil",
  cvExperience: "Berufserfahrung",
  cvEducation: "Ausbildung",
  cvSkills: "Fähigkeiten",
  cvContact: "Kontakt",
  cvPresent: "Heute",
  emptyPreview: "Ihr Lebenslauf erscheint hier",
  emptyPreviewSub: "Füllen Sie links Ihre Daten aus",
  back: "← Zurück",
  next: "Weiter →",
  downloadCta: "Lebenslauf herunterladen (.pdf)",
  downloadCtaHint: "Füllen Sie zuerst Ihre Daten aus",
  paywallTitle: "Premium-Lebenslauf herunterladen",
  paywallSub: "Ihr Lebenslauf ist fertig! Wählen Sie einen Plan, um Ihren hochwertigen PDF herunterzuladen.",
  paywallFeature1: "✓  Sofortiger PDF-Download",
  paywallFeature2: "✓  ATS-kompatible Ausgabe",
  paywallFeature3: "✓  Einmalige Zahlung",
  templateClassic: "Klassisch",
  templateModern: "Modern",
  templateMinimal: "Minimal",
  months: ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],
};

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
  gpa: "Mention / Note",
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
  emptyPreview: "Votre CV apparaîtra ici",
  emptyPreviewSub: "Commencez à remplir vos informations à gauche",
  back: "← Retour",
  next: "Suivant →",
  downloadCta: "Télécharger mon CV (.pdf)",
  downloadCtaHint: "Remplissez vos informations pour activer le téléchargement",
  paywallTitle: "Téléchargez votre CV Premium",
  paywallSub: "Votre CV est prêt ! Choisissez un plan pour télécharger votre PDF haute qualité.",
  paywallFeature1: "✓  Téléchargement PDF instantané",
  paywallFeature2: "✓  Sortie compatible ATS",
  paywallFeature3: "✓  Paiement unique",
  templateClassic: "Classique",
  templateModern: "Moderne",
  templateMinimal: "Minimaliste",
  months: ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],
};

export const translations: Record<LangCode, Translations> = { tr, en, de, fr };
export const t = (lang: LangCode): Translations => translations[lang];
