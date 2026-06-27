"use client";
import { forwardRef } from "react";
import { CVData, Skill } from "@/types/cv";
import { Translations } from "@/i18n/translations";

interface Props { data: CVData; t: Translations }

const levelWidths: Record<Skill["level"], string> = {
  Beginner: "25%", Intermediate: "50%", Advanced: "75%", Expert: "100%",
};

const TemplateClassic = forwardRef<HTMLDivElement, Props>(function TemplateClassic({ data, t }, ref) {
  const { personal, experiences, education, skills } = data;
  const filledSkills = skills.filter(s => s.name.trim() !== "");

  const fmt = (d: string) => {
    if (!d) return "";
    const [y, m] = d.split("-");
    return t.months[parseInt(m) - 1] + " " + y;
  };

  const initials = personal.fullName
    ? personal.fullName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "";

  return (
    <div ref={ref} className="cv-print-root" style={{
      width: "100%", maxWidth: "700px",
      background: "#fff", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-preview)",
      overflow: "hidden", fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "#2A3445",
      /* A4 aspect ratio lock for screen */
      aspectRatio: "1 / 1.414", display: "flex", flexDirection: "column",
    }}>

      {/* Header */}
      <div className="cv-header" style={{ background: "linear-gradient(135deg,#1B2E52 0%,#1E5799 55%,#2E86C8 100%)", padding: "32px 40px 24px", color: "#fff", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "12px" }}>
          {/* Avatar */}
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%", flexShrink: 0,
            background: personal.avatar ? "transparent" : "rgba(255,255,255,0.15)",
            border: "2.5px solid rgba(255,255,255,0.4)", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {personal.avatar
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={personal.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ fontSize: "22px", fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display',serif" }}>{initials || "CV"}</span>
            }
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: personal.fullName ? "26px" : "22px", fontWeight: 700, marginBottom: "3px", color: personal.fullName ? "#fff" : "rgba(255,255,255,0.35)" }}>
              {personal.fullName || t.cvFullNameFallback}
            </h1>
            <p style={{ fontSize: "13px", color: personal.title ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)", letterSpacing: "0.03em" }}>
              {personal.title || t.titleLabel}
            </p>
          </div>
        </div>
        {/* Contact */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px" }}>
          {[{ val: personal.email, icon: "✉" }, { val: personal.phone, icon: "☏" }, { val: personal.location, icon: "⌖" }, { val: personal.website, icon: "⊕" }].filter(f => f.val).map((f, i) => (
            <span key={i} style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ opacity: .6 }}>{f.icon}</span>{f.val}
            </span>
          ))}
        </div>
      </div>

      {/* Body — scrollable on screen, auto on print */}
      <div style={{ flex: 1, padding: "24px 40px", display: "flex", flexDirection: "column", gap: "20px", overflowY: "auto" }}>
        {personal.summary && (
          <div className="cv-section">
            <Section title={t.cvSummary}><p style={{ lineHeight: 1.7, color: "#3D4E61" }}>{personal.summary}</p></Section>
          </div>
        )}
        {experiences.length > 0 && (
          <div className="cv-section">
            <Section title={t.cvExperience}>
              {experiences.map((e, i) => (
                <div key={e.id} style={{ marginBottom: i < experiences.length - 1 ? "16px" : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "14px", color: "#1A2535" }}>{e.position}</p>
                      <p style={{ fontSize: "13px", color: "#3A5A8C", fontWeight: 500 }}>{e.company}</p>
                    </div>
                    <span style={{ fontSize: "11px", color: "#7A8EA6", whiteSpace: "nowrap", flexShrink: 0, marginTop: "2px" }}>
                      {fmt(e.startDate)}{e.startDate ? " — " : ""}{e.current ? t.cvPresent : fmt(e.endDate)}
                    </span>
                  </div>
                  {e.description && <p style={{ marginTop: "5px", lineHeight: 1.65, color: "#3D4E61", fontSize: "12px" }}>{e.description}</p>}
                </div>
              ))}
            </Section>
          </div>
        )}
        {education.length > 0 && (
          <div className="cv-section">
            <Section title={t.cvEducation}>
              {education.map((e, i) => (
                <div key={e.id} style={{ marginBottom: i < education.length - 1 ? "12px" : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "14px", color: "#1A2535" }}>{e.school}</p>
                      <p style={{ fontSize: "12px", color: "#5B8A7A", fontWeight: 500 }}>{[e.degree, e.field].filter(Boolean).join(" · ")}{e.gpa ? ` — GPA: ${e.gpa}` : ""}</p>
                    </div>
                    <span style={{ fontSize: "11px", color: "#7A8EA6", whiteSpace: "nowrap", flexShrink: 0, marginTop: "2px" }}>
                      {fmt(e.startDate)}{e.startDate ? " — " : ""}{fmt(e.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </Section>
          </div>
        )}
        {/* BUG FIX: only render skills section if there are filled skills */}
        {filledSkills.length > 0 && (
          <div className="cv-section">
            <Section title={t.cvSkills}>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {filledSkills.map(s => (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "12px", color: "#1A2535", fontWeight: 500, minWidth: "130px", flexShrink: 0 }}>{s.name}</span>
                    <div style={{ flex: 1, height: "5px", background: "#EEF1F5", borderRadius: "99px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: levelWidths[s.level], background: "linear-gradient(90deg,#3A5A8C,#5B8A7A)", borderRadius: "99px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}
        {!personal.fullName && !experiences.length && !education.length && !filledSkills.length && (
          <div style={{ textAlign: "center", padding: "50px 20px", color: "#A8B8CC" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px", opacity: .4 }}>📄</div>
            <p style={{ fontSize: "14px", fontWeight: 500 }}>{t.emptyPreview}</p>
            <p style={{ fontSize: "12px", marginTop: "5px" }}>{t.emptyPreviewSub}</p>
          </div>
        )}
      </div>
    </div>
  );
});
export default TemplateClassic;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <h2 style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7A8EA6", whiteSpace: "nowrap" }}>{title}</h2>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg,#DDE2EA,transparent)" }} />
      </div>
      {children}
    </div>
  );
}
