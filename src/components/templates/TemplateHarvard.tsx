"use client";
import { forwardRef } from "react";
import { CVData, Skill } from "@/types/cv";
import { Translations } from "@/i18n/translations";

interface Props { data: CVData; t: Translations }

const levelLabels = (t: Translations): Record<Skill["level"], string> => ({
  Beginner: t.levelBeginner, Intermediate: t.levelIntermediate,
  Advanced: t.levelAdvanced, Expert: t.levelExpert,
});

const TemplateHarvard = forwardRef<HTMLDivElement, Props>(function TemplateHarvard({ data, t }, ref) {
  const { personal, experiences, education, skills } = data;
  const filledSkills = skills.filter(s => s.name.trim() !== "");
  const ll = levelLabels(t);
  const crimson = "#8B1A2B";

  const fmt = (d: string) => {
    if (!d) return "";
    const [y, m] = d.split("-");
    return t.months[parseInt(m) - 1] + " " + y;
  };

  return (
    <div ref={ref} className="cv-print-root" style={{
      width: "100%", maxWidth: "700px", background: "#fff",
      borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-preview)",
      overflow: "hidden", fontFamily: "'Times New Roman',Georgia,serif",
      fontSize: "13px", color: "#1A1A1A",
      display: "flex", flexDirection: "column", minHeight: "297mm",
    }}>
      <div style={{ padding: "36px 48px 0", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* ══ HEADER ══ */}
        <div style={{
          textAlign: "center",
          paddingBottom: "16px",
          borderBottom: `2px solid ${crimson}`,
          marginBottom: "20px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
          flexShrink: 0,
        }}>

          {/* Fotoğraf — yüklendiğinde göster */}
          {personal.avatar && (
            <div style={{
              width: "76px", height: "76px", borderRadius: "50%",
              border: `2.5px solid ${crimson}`, overflow: "hidden", flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={personal.avatar} alt="avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}

          {/* İsim */}
          <h1 style={{
            fontFamily: "'Playfair Display',Georgia,'Times New Roman',serif",
            fontSize: personal.fullName ? "30px" : "24px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: personal.fullName ? "#1A1A1A" : "#BBBBBB",
            lineHeight: 1.15,
            margin: 0,
          }}>
            {personal.fullName || t.cvFullNameFallback}
          </h1>

          {/* Ünvan / Pozisyon — her zaman render et, boşsa fallback rengi */}
          <p style={{
            fontSize: "13px",
            color: personal.title ? crimson : "#CCCCCC",
            fontStyle: "italic",
            fontFamily: "'Inter',sans-serif",
            fontWeight: 500,
            letterSpacing: "0.02em",
            margin: 0,
          }}>
            {personal.title || t.cvTitleFallback}
          </p>

          {/* İletişim — pipe ayrımlı */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "4px 0" }}>
            {[personal.email, personal.phone, personal.location, personal.website]
              .filter(Boolean)
              .map((v, i, arr) => (
                <span key={i} style={{ fontSize: "11px", color: "#444", fontFamily: "'Inter',sans-serif" }}>
                  {v}
                  {i < arr.length - 1
                    ? <span style={{ margin: "0 8px", color: "#CCCCCC" }}>|</span>
                    : null}
                </span>
              ))}
          </div>
        </div>

        {/* ══ SECTIONS ══ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingBottom: "32px" }}>

          {personal.summary && (
            <div className="cv-section">
              <HarvardSection title={t.cvSummary} crimson={crimson} />
              <p style={{ lineHeight: 1.75, color: "#222", fontSize: "12.5px" }}>{personal.summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div className="cv-section">
              <HarvardSection title={t.cvExperience} crimson={crimson} />
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {experiences.map(e => (
                  <div key={e.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                      <p style={{ fontWeight: 700, fontSize: "13px", color: "#1A1A1A", margin: 0 }}>{e.position}</p>
                      <span style={{ fontSize: "11px", color: "#555", whiteSpace: "nowrap", fontStyle: "italic", fontFamily: "'Inter',sans-serif", flexShrink: 0 }}>
                        {fmt(e.startDate)}{e.startDate ? " – " : ""}{e.current ? t.cvPresent : fmt(e.endDate)}
                      </span>
                    </div>
                    <p style={{ fontSize: "12.5px", color: crimson, fontStyle: "italic", margin: "2px 0 4px" }}>{e.company}</p>
                    {e.description && (
                      <p style={{ fontSize: "12px", lineHeight: 1.65, color: "#333", margin: 0 }}>{e.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="cv-section">
              <HarvardSection title={t.cvEducation} crimson={crimson} />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {education.map(e => (
                  <div key={e.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                      <p style={{ fontWeight: 700, fontSize: "13px", color: "#1A1A1A", margin: 0 }}>{e.school}</p>
                      <span style={{ fontSize: "11px", color: "#555", whiteSpace: "nowrap", fontStyle: "italic", fontFamily: "'Inter',sans-serif", flexShrink: 0 }}>
                        {fmt(e.startDate)}{e.startDate ? " – " : ""}{fmt(e.endDate)}
                      </span>
                    </div>
                    <p style={{ fontSize: "12.5px", color: crimson, fontStyle: "italic", margin: "2px 0 0" }}>
                      {[e.degree, e.field].filter(Boolean).join(", ")}
                      {e.gpa ? ` — GPA: ${e.gpa}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filledSkills.length > 0 && (
            <div className="cv-section">
              <HarvardSection title={t.cvSkills} crimson={crimson} />
              <p style={{ fontSize: "12.5px", lineHeight: 1.8, color: "#333", fontFamily: "'Inter',sans-serif", margin: 0 }}>
                {filledSkills.map((s, i) => (
                  <span key={s.id}>
                    <strong style={{ color: "#1A1A1A" }}>{s.name}</strong>
                    <span style={{ color: "#777", fontSize: "11px" }}> ({ll[s.level]})</span>
                    {i < filledSkills.length - 1 ? " · " : ""}
                  </span>
                ))}
              </p>
            </div>
          )}

          {!personal.fullName && !experiences.length && !education.length && !filledSkills.length && (
            <div style={{ textAlign: "center", padding: "50px 20px", color: "#BBBBBB" }}>
              <div style={{ fontSize: "40px", marginBottom: "10px", opacity: .4 }}>📄</div>
              <p style={{ fontSize: "14px", fontFamily: "'Inter',sans-serif" }}>{t.emptyPreview}</p>
              <p style={{ fontSize: "12px", marginTop: "5px", fontFamily: "'Inter',sans-serif" }}>{t.emptyPreviewSub}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
export default TemplateHarvard;

function HarvardSection({ title, crimson }: { title: string; crimson: string }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <h2 style={{
        fontSize: "11px", fontWeight: 800, letterSpacing: "0.16em",
        textTransform: "uppercase", color: crimson,
        fontFamily: "'Inter',sans-serif", margin: "0 0 5px",
      }}>{title}</h2>
      <div style={{ height: "1.5px", background: crimson }} />
    </div>
  );
}
