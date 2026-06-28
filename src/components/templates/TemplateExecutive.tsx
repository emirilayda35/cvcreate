"use client";
import { forwardRef } from "react";
import { CVData, Skill } from "@/types/cv";
import { Translations } from "@/i18n/translations";

interface Props { data: CVData; t: Translations }

const levelWidths: Record<Skill["level"], string> = {
  Beginner: "25%", Intermediate: "50%", Advanced: "75%", Expert: "100%",
};

const TemplateExecutive = forwardRef<HTMLDivElement, Props>(function TemplateExecutive({ data, t }, ref) {
  const { personal, experiences, education, skills } = data;
  const filledSkills = skills.filter(s => s.name.trim() !== "");
  const navy = "#0D1F3C";
  const gold = "#B8965A";
  const lightGold = "#F5EFE4";

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
      width: "100%", maxWidth: "700px", background: "#FAFAFA",
      borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-preview)",
      overflow: "hidden", fontFamily: "'Inter',sans-serif", fontSize: "13px",
      color: navy, display: "flex", flexDirection: "column", minHeight: "297mm",
    }}>
      {/* ── TOP HEADER — koyu lacivert ── */}
      <div className="cv-header" style={{
        background: navy, padding: "32px 40px 28px", flexShrink: 0,
        display: "flex", alignItems: "center", gap: "24px",
      }}>
        {/* Avatar */}
        <div style={{
          width: "80px", height: "80px", borderRadius: "50%", flexShrink: 0,
          background: personal.avatar ? "transparent" : `linear-gradient(135deg,${gold},#D4A96A)`,
          border: `3px solid ${gold}`, overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {personal.avatar
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={personal.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span style={{ fontSize: "26px", fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display',serif" }}>{initials}</span>
          }
        </div>

        {/* Name block */}
        <div style={{ flex: 1, borderLeft: `3px solid ${gold}`, paddingLeft: "24px" }}>
          <h1 style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: personal.fullName ? "28px" : "22px", fontWeight: 700,
            color: personal.fullName ? "#fff" : "rgba(255,255,255,0.3)",
            marginBottom: "4px", letterSpacing: "0.01em",
          }}>
            {personal.fullName || t.cvFullNameFallback}
          </h1>
          <p style={{ fontSize: "13px", color: gold, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {personal.title || t.cvTitleFallback}
          </p>
        </div>
      </div>

      {/* ── CONTACT BAR ── */}
      <div style={{
        background: lightGold, padding: "10px 40px",
        display: "flex", flexWrap: "wrap", gap: "6px 28px", flexShrink: 0,
        borderBottom: `2px solid ${gold}`,
      }}>
        {[
          { val: personal.email,    icon: "✉" },
          { val: personal.phone,    icon: "☏" },
          { val: personal.location, icon: "⌖" },
          { val: personal.website,  icon: "⊕" },
        ].filter(f => f.val).map((f, i) => (
          <span key={i} style={{ fontSize: "11px", color: "#5A4A35", display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: gold }}>{f.icon}</span>{f.val}
          </span>
        ))}
      </div>

      {/* ── BODY — 2 sütun ── */}
      <div style={{ flex: 1, display: "flex", overflow: "visible" }}>

        {/* LEFT — dar sütun */}
        <div style={{ width: "190px", flexShrink: 0, background: "#F0F2F5", padding: "24px 18px", display: "flex", flexDirection: "column", gap: "20px", minHeight: "100%" }}>
          {/* Skills */}
          {filledSkills.length > 0 && (
            <div className="cv-section">
              <ExecSectionTitle title={t.cvSkills} navy={navy} gold={gold} />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                {filledSkills.map(s => (
                  <div key={s.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: navy }}>{s.name}</span>
                    </div>
                    <div style={{ height: "4px", background: "#D8DDE5", borderRadius: "99px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: levelWidths[s.level], background: `linear-gradient(90deg,${navy},#2E5BA8)`, borderRadius: "99px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="cv-section">
              <ExecSectionTitle title={t.cvEducation} navy={navy} gold={gold} />
              <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {education.map(e => (
                  <div key={e.id}>
                    <p style={{ fontWeight: 700, fontSize: "11px", color: navy, lineHeight: 1.3 }}>{e.school}</p>
                    <p style={{ fontSize: "11px", color: "#5A6A7A", marginTop: "2px" }}>{[e.degree, e.field].filter(Boolean).join(", ")}</p>
                    {(e.startDate || e.endDate) && (
                      <p style={{ fontSize: "10px", color: gold, marginTop: "2px", fontWeight: 600 }}>
                        {fmt(e.startDate)}{e.startDate && e.endDate ? " – " : ""}{fmt(e.endDate)}
                      </p>
                    )}
                    {e.gpa && <p style={{ fontSize: "10px", color: "#5A6A7A" }}>GPA: {e.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — ana içerik */}
        <div style={{ flex: 1, padding: "24px 28px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {personal.summary && (
            <div className="cv-section">
              <ExecSectionTitle title={t.cvSummary} navy={navy} gold={gold} />
              <p style={{ lineHeight: 1.75, color: "#2A3A4A", marginTop: "8px", fontSize: "12px" }}>{personal.summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div className="cv-section">
              <ExecSectionTitle title={t.cvExperience} navy={navy} gold={gold} />
              <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {experiences.map(e => (
                  <div key={e.id} style={{ paddingLeft: "14px", borderLeft: `3px solid ${lightGold}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "4px", alignItems: "flex-start" }}>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: "13px", color: navy }}>{e.position}</p>
                        <p style={{ fontSize: "12px", color: gold, fontWeight: 600 }}>{e.company}</p>
                      </div>
                      <span style={{ fontSize: "10px", color: "#fff", background: navy, padding: "2px 8px", borderRadius: "3px", whiteSpace: "nowrap", fontWeight: 600 }}>
                        {fmt(e.startDate)}{e.startDate ? " – " : ""}{e.current ? t.cvPresent : fmt(e.endDate)}
                      </span>
                    </div>
                    {e.description && <p style={{ fontSize: "11px", lineHeight: 1.65, color: "#3D4E61", marginTop: "6px" }}>{e.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!personal.fullName && !experiences.length && !education.length && !filledSkills.length && (
            <div style={{ textAlign: "center", padding: "50px 10px", color: "#A8B8CC" }}>
              <div style={{ fontSize: "36px", marginBottom: "8px", opacity: .4 }}>📄</div>
              <p style={{ fontSize: "13px", fontWeight: 500 }}>{t.emptyPreview}</p>
              <p style={{ fontSize: "11px", marginTop: "5px" }}>{t.emptyPreviewSub}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
export default TemplateExecutive;

function ExecSectionTitle({ title, navy, gold }: { title: string; navy: string; gold: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ width: "4px", height: "14px", background: gold, borderRadius: "2px", flexShrink: 0 }} />
      <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: navy }}>{title}</span>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg,${gold}40,transparent)` }} />
    </div>
  );
}
