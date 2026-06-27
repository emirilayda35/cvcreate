"use client";
import { useState, useRef, useCallback } from "react";
import { useReactToPrint } from "react-to-print";
import { CVData, defaultCVData, LangCode } from "@/types/cv";
import { t as getT } from "@/i18n/translations";
import StepPersonal from "@/components/StepPersonal";
import StepExperience from "@/components/StepExperience";
import StepEducation from "@/components/StepEducation";
import StepSkills from "@/components/StepSkills";
import TemplateClassic  from "@/components/templates/TemplateClassic";
import TemplateModern   from "@/components/templates/TemplateModern";
import TemplateMinimal  from "@/components/templates/TemplateMinimal";
import TemplateExecutive from "@/components/templates/TemplateExecutive";
import TemplateHarvard  from "@/components/templates/TemplateHarvard";
import PaywallModal from "@/components/PaywallModal";

type TemplateId = "classic" | "modern" | "minimal" | "executive" | "harvard";

// ── Page style injected into print iframe ──────────────────────
const PAGE_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');

  @page {
    size: A4 portrait;
    margin: 10mm 12mm;
    /* Suppress browser header/footer (URL, date, time) */
    margin-top: 0mm;
    margin-bottom: 0mm;
  }

  /* Remove any running headers/footers the browser might add */
  @page { orphans: 2; widows: 2; }

  html {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: transparent;
  }

  .cv-print-root {
    box-shadow: none !important;
    border-radius: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    aspect-ratio: unset !important;
    overflow: visible !important;
  }

  .cv-print-root > div,
  .cv-print-root > div > div {
    overflow: visible !important;
    max-height: unset !important;
    height: auto !important;
  }

  .cv-header {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .cv-section {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Absolutely remove any browser-injected title/URL/date text */
  title { display: none; }
`;

const LANGUAGES: { code: LangCode; flag: string; label: string; rtl?: boolean }[] = [
  { code: "tr", flag: "🇹🇷", label: "TR" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "de", flag: "🇩🇪", label: "DE" },
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "ar", flag: "🇸🇦", label: "AR", rtl: true },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>("classic");
  const [lang, setLang] = useState<LangCode>("tr");
  const [langOpen, setLangOpen] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const cvRef = useRef<HTMLDivElement>(null);
  const tr = getT(lang);
  const isRtl = lang === "ar";

  const STEPS = [
    { id: 0, label: tr.personalInfo, icon: "👤" },
    { id: 1, label: tr.experience,   icon: "💼" },
    { id: 2, label: tr.education,    icon: "🎓" },
    { id: 3, label: tr.skills,       icon: "⚡" },
  ];

  const TEMPLATES = [
    { id: "classic"   as TemplateId, label: tr.templateClassic,   preview: "🔵" },
    { id: "modern"    as TemplateId, label: tr.templateModern,    preview: "🟣" },
    { id: "minimal"   as TemplateId, label: tr.templateMinimal,   preview: "⚪" },
    { id: "executive" as TemplateId, label: tr.templateExecutive, preview: "🟡" },
    { id: "harvard"   as TemplateId, label: tr.templateHarvard,   preview: "🔴" },
  ];

  const getDocTitle = useCallback(() => {
    const name = cvData.personal.fullName.trim();
    return name ? name.toLowerCase().replace(/\s+/g, "_") + "_cv" : "cv";
  }, [cvData.personal.fullName]);

  const triggerPrint = useReactToPrint({
    contentRef: cvRef,
    documentTitle: getDocTitle(),
    pageStyle: PAGE_STYLE,
    onBeforePrint: async () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
    onPrintError: (_l, e) => { console.error(e); setIsPrinting(false); },
  });

  const handlePaymentSuccess = () => {
    setPaywallOpen(false);
    setTimeout(() => triggerPrint(), 200);
  };

  const hasContent = !!(cvData.personal.fullName || cvData.experiences.length || cvData.education.length || cvData.skills.length);
  const currentLang = LANGUAGES.find(l => l.code === lang)!;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>

      {/* ── Navbar ─────────────────────────────────────────── */}
      <header className="no-print" style={{
        height: "58px", background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", position: "sticky", top: 0, zIndex: 200,
        boxShadow: "0 1px 6px rgba(30,50,80,0.06)",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg,#1E5799,#2E86C8)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>📄</div>
          <span style={{ fontWeight: 700, fontSize: "16px", color: "var(--color-text-heading)", letterSpacing: "-0.01em" }}>CVCreate</span>
        </div>

        {/* Template switcher */}
        <div style={{ display: "flex", gap: "5px", background: "var(--color-surface-2)", padding: "4px", borderRadius: "10px", border: "1px solid var(--color-border)" }}>
          {TEMPLATES.map(tmpl => (
            <button key={tmpl.id} onClick={() => setActiveTemplate(tmpl.id)} style={{
              padding: "5px 12px", borderRadius: "7px", border: "none", fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
              background: activeTemplate === tmpl.id ? "#fff" : "transparent",
              color: activeTemplate === tmpl.id ? "var(--color-primary)" : "var(--color-text-muted)",
              boxShadow: activeTemplate === tmpl.id ? "0 1px 4px rgba(30,50,80,0.1)" : "none",
            }}>
              {tmpl.preview} {tmpl.label}
            </button>
          ))}
        </div>

        {/* Right: lang + download */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {/* Language dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setLangOpen(o => !o)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "7px 12px", borderRadius: "var(--radius-sm)",
                border: "1.5px solid var(--color-border)",
                background: langOpen ? "var(--color-primary-light)" : "var(--color-surface)",
                color: "var(--color-text-body)", fontSize: "13px", fontWeight: 600,
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              <span>{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <span style={{ fontSize: "10px", opacity: .6 }}>{langOpen ? "▲" : "▼"}</span>
            </button>
            {langOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 6px)", right: 0,
                background: "var(--color-surface)", border: "1.5px solid var(--color-border)",
                borderRadius: "var(--radius-md)", overflow: "hidden",
                boxShadow: "0 8px 24px rgba(30,50,80,0.12)", zIndex: 300, minWidth: "120px",
              }}>
                {LANGUAGES.map(l => (
                  <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                    style={{
                      width: "100%", padding: "9px 14px", border: "none", background: l.code === lang ? "var(--color-primary-light)" : "transparent",
                      display: "flex", alignItems: "center", gap: "8px",
                      fontSize: "13px", fontWeight: l.code === lang ? 700 : 400,
                      color: l.code === lang ? "var(--color-primary)" : "var(--color-text-body)",
                      cursor: "pointer", textAlign: "left",
                    }}>
                    <span>{l.flag}</span><span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Download btn */}
          <button
            onClick={() => setPaywallOpen(true)}
            disabled={isPrinting}
            style={{
              padding: "8px 18px", borderRadius: "var(--radius-sm)", border: "none",
              background: "linear-gradient(135deg,#1E5799,#2E86C8)",
              color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer",
              opacity: isPrinting ? .6 : 1,
              boxShadow: "0 2px 10px rgba(58,90,140,0.28)",
            }}
          >{tr.downloadPdf}</button>
        </div>
      </header>

      {/* ── Main split ──────────────────────────────────────── */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "420px 1fr", height: "calc(100vh - 58px)" }}>

        {/* LEFT — Form */}
        <div className="no-print" dir={isRtl ? "rtl" : "ltr"} style={{ background: "var(--color-surface)", borderRight: "1px solid var(--color-border)", display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Stepper */}
          <div style={{ padding: "14px 18px 0", borderBottom: "1px solid var(--color-border)" }}>
            <div style={{ display: "flex", gap: "3px" }}>
              {STEPS.map(s => (
                <button key={s.id} onClick={() => setStep(s.id)} style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
                  padding: "7px 3px 11px", border: "none", background: "transparent", cursor: "pointer",
                  borderBottom: `2.5px solid ${step === s.id ? "var(--color-primary)" : "transparent"}`,
                  transition: "all 0.15s",
                }}>
                  <span style={{ fontSize: "15px" }}>{s.icon}</span>
                  <span style={{ fontSize: "10px", fontWeight: step === s.id ? 700 : 400, color: step === s.id ? "var(--color-primary)" : "var(--color-text-muted)", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form body */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
            <div style={{ marginBottom: "16px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-heading)", marginBottom: "3px" }}>{STEPS[step].label}</h2>
              <p style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                {[tr.personalSubtitle, tr.experienceSubtitle, tr.educationSubtitle, tr.skillsSubtitle][step]}
              </p>
            </div>
            {step === 0 && <StepPersonal    data={cvData.personal}    onChange={p  => setCVData(d => ({ ...d, personal: p }))}    t={tr} />}
            {step === 1 && <StepExperience  data={cvData.experiences} onChange={ex => setCVData(d => ({ ...d, experiences: ex }))} t={tr} />}
            {step === 2 && <StepEducation   data={cvData.education}   onChange={ed => setCVData(d => ({ ...d, education: ed }))}   t={tr} />}
            {step === 3 && <StepSkills      data={cvData.skills}      onChange={sk => setCVData(d => ({ ...d, skills: sk }))}      t={tr} />}
          </div>

          {/* Bottom nav */}
          <div style={{ padding: "12px 18px", borderTop: "1px solid var(--color-border)", display: "flex", flexDirection: "column", gap: "9px" }}>
            <div style={{ display: "flex", gap: "9px" }}>
              <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
                style={{ flex: 1, padding: "10px", borderRadius: "var(--radius-md)", border: "1.5px solid var(--color-border)", background: "transparent", color: step === 0 ? "var(--color-text-placeholder)" : "var(--color-text-body)", fontSize: "13px", fontWeight: 500, cursor: step === 0 ? "default" : "pointer" }}>
                {tr.back}
              </button>
              <button onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))} disabled={step === STEPS.length - 1}
                style={{ flex: 1, padding: "10px", borderRadius: "var(--radius-md)", border: "none", background: step === STEPS.length - 1 ? "var(--color-surface-2)" : "var(--color-primary)", color: step === STEPS.length - 1 ? "var(--color-text-placeholder)" : "#fff", fontSize: "13px", fontWeight: 600, cursor: step === STEPS.length - 1 ? "default" : "pointer" }}>
                {tr.next}
              </button>
            </div>
            <button
              onClick={() => setPaywallOpen(true)}
              style={{
                width: "100%", padding: "13px", borderRadius: "var(--radius-md)", border: "none",
                background: hasContent ? "linear-gradient(135deg,#1B2E52 0%,#1E5799 55%,#2E86C8 100%)" : "var(--color-surface-2)",
                color: hasContent ? "#fff" : "var(--color-text-placeholder)",
                fontSize: "14px", fontWeight: 700, cursor: hasContent ? "pointer" : "default",
                boxShadow: hasContent ? "0 4px 18px rgba(58,90,140,0.30)" : "none",
                transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              <span style={{ fontSize: "15px" }}>⬇</span>
              {tr.downloadCta}
            </button>
            {!hasContent && <p style={{ fontSize: "11px", color: "var(--color-text-placeholder)", textAlign: "center", marginTop: "-2px" }}>{tr.downloadCtaHint}</p>}
          </div>
        </div>

        {/* RIGHT — Preview */}
        <div
          style={{ overflowY: "auto", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "32px 24px", background: "var(--color-bg)" }}
          onClick={() => langOpen && setLangOpen(false)}
        >
          {activeTemplate === "classic"   && <TemplateClassic   ref={cvRef} data={cvData} t={tr} />}
          {activeTemplate === "modern"    && <TemplateModern    ref={cvRef} data={cvData} t={tr} />}
          {activeTemplate === "minimal"   && <TemplateMinimal   ref={cvRef} data={cvData} t={tr} />}
          {activeTemplate === "executive" && <TemplateExecutive ref={cvRef} data={cvData} t={tr} />}
          {activeTemplate === "harvard"   && <TemplateHarvard   ref={cvRef} data={cvData} t={tr} />}
        </div>
      </div>

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        cvName={getDocTitle()}
      />
    </div>
  );
}
