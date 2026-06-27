"use client";
import { forwardRef } from "react";
import { CVData, Skill } from "@/types/cv";
import { Translations } from "@/i18n/translations";

interface Props { data: CVData; t: Translations }

const levelDots: Record<Skill["level"], number> = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };

const TemplateModern = forwardRef<HTMLDivElement, Props>(function TemplateModern({ data, t }, ref) {
  const { personal, experiences, education, skills } = data;
  const filledSkills = skills.filter(s => s.name.trim() !== "");
  const accent = "#1E5799";
  const accentLight = "#D6E8F8";

  const fmt = (d: string) => {
    if (!d) return "";
    const [y, m] = d.split("-");
    return t.months[parseInt(m) - 1] + " " + y;
  };

  const initials = personal.fullName
    ? personal.fullName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "CV";

  return (
    <div ref={ref} className="cv-print-root" style={{
      width: "100%", maxWidth: "700px",
      background: "#FAFBF9", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-preview)",
      overflow: "hidden", fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "#1A2535",
      display: "flex", aspectRatio: "1 / 1.414",
    }}>

      {/* Sidebar */}
      <div style={{ width: "210px", flexShrink: 0, background: "#132044", padding: "28px 20px", display: "flex", flexDirection: "column", gap: "24px", overflowY: "auto" }}>
        {/* Avatar */}
        <div style={{
          width: "80px", height: "80px", borderRadius: "50%", margin: "0 auto", flexShrink: 0,
          background: personal.avatar ? "transparent" : "linear-gradient(135deg,#2D6A4F,#4DA3D4)",
          border: "2.5px solid rgba(255,255,255,0.2)", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {personal.avatar
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={personal.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span style={{ fontSize: "26px", fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display',serif" }}>{initials}</span>
          }
        </div>

        {/* Contact */}
        <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#4DA3D4", marginBottom: "2px" }}>{t.cvContact}</p>
          {[{ val: personal.email, label: t.email }, { val: personal.phone, label: t.phone }, { val: personal.location, label: t.location }, { val: personal.website, label: t.website }].filter(f => f.val).map((f, i) => (
            <div key={i}>
              <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", marginBottom: "1px" }}>{f.label}</p>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.85)", wordBreak: "break-all" }}>{f.val}</p>
            </div>
          ))}
        </div>

        {/* Skills in sidebar — BUG FIX: only filled */}
        {filledSkills.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#4DA3D4", marginBottom: "2px" }}>{t.cvSkills}</p>
            {filledSkills.map(s => (
              <div key={s.id}>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.85)", marginBottom: "4px" }}>{s.name}</p>
                <div style={{ display: "flex", gap: "3px" }}>
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} style={{ flex: 1, height: "4px", borderRadius: "99px", background: n <= levelDots[s.level] ? "#4DA3D4" : "rgba(255,255,255,0.15)" }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "28px 24px", display: "flex", flexDirection: "column", gap: "20px", overflowY: "auto" }}>
        <div style={{ borderBottom: `3px solid ${accentLight}`, paddingBottom: "16px", flexShrink: 0 }}>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: personal.fullName ? "26px" : "22px", fontWeight: 700, color: personal.fullName ? "#1A2535" : "#A8B8CC", lineHeight: 1.15, marginBottom: "3px" }}>
            {personal.fullName || t.cvFullNameFallback}
          </h1>
          <p style={{ fontSize: "13px", fontWeight: 500, color: accent, letterSpacing: "0.03em" }}>
            {personal.title || <span style={{ color: "#A8B8CC" }}>{t.titleLabel}</span>}
          </p>
        </div>

        {personal.summary && (
          <div className="cv-section">
            <SideLabel label={t.cvSummary} color={accent} bg={accentLight} />
            <p style={{ lineHeight: 1.7, color: "#3D4E61", marginTop: "8px", fontSize: "12px" }}>{personal.summary}</p>
          </div>
        )}

        {experiences.length > 0 && (
          <div className="cv-section">
            <SideLabel label={t.cvExperience} color={accent} bg={accentLight} />
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {experiences.map(e => (
                <div key={e.id} style={{ paddingLeft: "12px", borderLeft: `2px solid ${accentLight}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "3px" }}>
                    <p style={{ fontWeight: 600, fontSize: "13px", color: "#1A2535" }}>{e.position}</p>
                    <span style={{ fontSize: "10px", color: "#6AADD4", background: accentLight, padding: "2px 7px", borderRadius: "99px", whiteSpace: "nowrap" }}>
                      {fmt(e.startDate)}{e.startDate ? " — " : ""}{e.current ? t.cvPresent : fmt(e.endDate)}
                    </span>
                  </div>
                  <p style={{ fontSize: "11px", color: accent, fontWeight: 600, marginBottom: "3px" }}>{e.company}</p>
                  {e.description && <p style={{ lineHeight: 1.6, color: "#3D4E61", fontSize: "11px" }}>{e.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="cv-section">
            <SideLabel label={t.cvEducation} color={accent} bg={accentLight} />
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {education.map(e => (
                <div key={e.id} style={{ paddingLeft: "12px", borderLeft: `2px solid ${accentLight}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "3px" }}>
                    <p style={{ fontWeight: 600, fontSize: "13px", color: "#1A2535" }}>{e.school}</p>
                    <span style={{ fontSize: "10px", color: "#6AADD4", background: accentLight, padding: "2px 7px", borderRadius: "99px", whiteSpace: "nowrap" }}>
                      {fmt(e.startDate)}{e.startDate ? " — " : ""}{fmt(e.endDate)}
                    </span>
                  </div>
                  <p style={{ fontSize: "11px", color: accent, fontWeight: 500 }}>{[e.degree, e.field].filter(Boolean).join(" · ")}{e.gpa ? ` — GPA: ${e.gpa}` : ""}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!personal.fullName && !experiences.length && !education.length && !filledSkills.length && (
          <div style={{ textAlign: "center", padding: "50px 10px", color: "#A8B8CC" }}>
            <div style={{ fontSize: "36px", marginBottom: "8px", opacity: .4 }}>📄</div>
            <p style={{ fontSize: "13px", fontWeight: 500 }}>{t.emptyPreview}</p>
          </div>
        )}
      </div>
    </div>
  );
});
export default TemplateModern;

function SideLabel({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color, background: bg, padding: "3px 9px", borderRadius: "99px", whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg,${bg},transparent)` }} />
    </div>
  );
}
