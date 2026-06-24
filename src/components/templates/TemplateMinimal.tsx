"use client";
import { forwardRef } from "react";
import { CVData, Skill } from "@/types/cv";
import { Translations } from "@/i18n/translations";

interface Props { data: CVData; t: Translations }

const levelLabels = (t: Translations): Record<Skill["level"], string> => ({
  Beginner: t.levelBeginner, Intermediate: t.levelIntermediate,
  Advanced: t.levelAdvanced, Expert: t.levelExpert,
});

const TemplateMinimal = forwardRef<HTMLDivElement, Props>(function TemplateMinimal({ data, t }, ref) {
  const { personal, experiences, education, skills } = data;
  const filledSkills = skills.filter(s => s.name.trim() !== "");
  const ll = levelLabels(t);

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
      overflow: "hidden", fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "#1A1A2E",
      display: "flex", flexDirection: "column", aspectRatio: "1 / 1.414",
    }}>
      {/* Accent bar */}
      <div style={{ height: "5px", background: "linear-gradient(90deg,#1A1A2E,#4A4E8A,#7B8EC8)", flexShrink: 0 }} />

      <div style={{ padding: "28px 40px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0" }}>
        {/* Header row: avatar + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px", paddingBottom: "18px", borderBottom: "1px solid #E8E8F0" }}>
          {/* Avatar */}
          <div style={{
            width: "68px", height: "68px", borderRadius: "50%", flexShrink: 0,
            background: personal.avatar ? "transparent" : "linear-gradient(135deg,#EBF0F8,#C8D4E8)",
            border: "2px solid #E8E8F0", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {personal.avatar
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={personal.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ fontSize: "20px", fontWeight: 700, color: "#4A4E8A", fontFamily: "'Playfair Display',serif" }}>{initials || "?"}</span>
            }
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: personal.fullName ? "28px" : "22px", fontWeight: 700, letterSpacing: "-0.02em", color: personal.fullName ? "#1A1A2E" : "#C0C0D0", marginBottom: "3px" }}>
              {personal.fullName || "Ad Soyad"}
            </h1>
            <p style={{ fontSize: "14px", color: "#4A4E8A", fontWeight: 400, letterSpacing: "0.02em" }}>
              {personal.title || <span style={{ color: "#C0C0D0" }}>{t.titleLabel}</span>}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px 18px", marginTop: "8px" }}>
              {[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).map((v, i) => (
                <span key={i} style={{ fontSize: "11px", color: "#6B7280" }}>{v}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {personal.summary && (
            <div className="cv-section">
              <MinLabel>{t.cvSummary}</MinLabel>
              <p style={{ lineHeight: 1.75, color: "#374151", marginTop: "8px", fontSize: "12px" }}>{personal.summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div className="cv-section">
              <MinLabel>{t.cvExperience}</MinLabel>
              <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {experiences.map(e => (
                  <div key={e.id} style={{ display: "grid", gridTemplateColumns: "1fr 130px", gap: "8px" }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "13px", color: "#1A1A2E" }}>{e.position}</p>
                      <p style={{ fontSize: "12px", color: "#4A4E8A", fontStyle: "italic", marginBottom: "3px" }}>{e.company}</p>
                      {e.description && <p style={{ fontSize: "11px", lineHeight: 1.6, color: "#4B5563" }}>{e.description}</p>}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: "10px", color: "#9CA3AF" }}>{fmt(e.startDate)}</p>
                      <p style={{ fontSize: "10px", color: "#9CA3AF" }}>{e.current ? t.cvPresent : fmt(e.endDate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="cv-section">
              <MinLabel>{t.cvEducation}</MinLabel>
              <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {education.map(e => (
                  <div key={e.id} style={{ display: "grid", gridTemplateColumns: "1fr 130px", gap: "8px" }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "13px", color: "#1A1A2E" }}>{e.school}</p>
                      <p style={{ fontSize: "12px", color: "#4A4E8A", fontStyle: "italic" }}>{[e.degree, e.field].filter(Boolean).join(" · ")}{e.gpa ? ` — GPA: ${e.gpa}` : ""}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: "10px", color: "#9CA3AF" }}>{fmt(e.startDate)}</p>
                      <p style={{ fontSize: "10px", color: "#9CA3AF" }}>{fmt(e.endDate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BUG FIX: only filled skills */}
          {filledSkills.length > 0 && (
            <div className="cv-section">
              <MinLabel>{t.cvSkills}</MinLabel>
              <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {filledSkills.map(s => (
                  <span key={s.id} style={{ padding: "4px 12px", borderRadius: "99px", border: "1px solid #E0E0F0", background: "#F7F7FC", fontSize: "11px", color: "#1A1A2E", fontWeight: 500 }}>
                    {s.name} <span style={{ color: "#9CA3AF", fontSize: "10px" }}>· {ll[s.level]}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {!personal.fullName && !experiences.length && !education.length && !filledSkills.length && (
            <div style={{ textAlign: "center", padding: "50px 20px", color: "#C0C0D0" }}>
              <div style={{ fontSize: "40px", marginBottom: "10px", opacity: .4 }}>📄</div>
              <p style={{ fontSize: "14px", fontWeight: 500 }}>{t.emptyPreview}</p>
              <p style={{ fontSize: "12px", marginTop: "5px" }}>{t.emptyPreviewSub}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
export default TemplateMinimal;

function MinLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9CA3AF", whiteSpace: "nowrap" }}>{children}</span>
      <div style={{ flex: 1, height: "1px", background: "#E8E8F0" }} />
    </div>
  );
}
