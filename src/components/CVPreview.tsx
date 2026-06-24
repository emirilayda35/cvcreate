"use client";
import { forwardRef } from "react";
import { CVData, Skill } from "@/types/cv";

interface Props {
  data: CVData;
}

const levelWidths: Record<Skill["level"], string> = {
  Beginner: "25%",
  Intermediate: "50%",
  Advanced: "75%",
  Expert: "100%",
};

const CVPreview = forwardRef<HTMLDivElement, Props>(function CVPreview({ data }, ref) {
  const { personal, experiences, education, skills } = data;

  const formatDate = (d: string) => {
    if (!d) return "";
    const [y, m] = d.split("-");
    const months = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
    return `${months[parseInt(m) - 1]} ${y}`;
  };

  return (
    <div
      ref={ref}
      className="cv-print-root"
      style={{
        width: "100%",
        maxWidth: "700px",
        minHeight: "990px",
        background: "#fff",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-preview)",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        color: "#2A3445",
      }}
    >
      {/* Header */}
      <div
        className="cv-header"
        style={{
          background: "linear-gradient(135deg, #2A3F5F 0%, #3A5A8C 60%, #4A7A6A 100%)",
          padding: "36px 40px 28px",
          color: "#fff",
        }}
      >
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: personal.fullName ? "28px" : "24px",
          fontWeight: 700,
          letterSpacing: "0.01em",
          marginBottom: "4px",
          color: personal.fullName ? "#fff" : "rgba(255,255,255,0.35)",
        }}>
          {personal.fullName || "Ad Soyad"}
        </h1>
        {(personal.title || !personal.fullName) && (
          <p style={{ fontSize: "14px", fontWeight: 400, color: personal.title ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)", marginBottom: "16px", letterSpacing: "0.03em" }}>
            {personal.title || "Ünvan / Pozisyon"}
          </p>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", marginTop: "12px" }}>
          {[
            { val: personal.email,    icon: "✉" },
            { val: personal.phone,    icon: "☏" },
            { val: personal.location, icon: "⌖" },
            { val: personal.website,  icon: "⊕" },
          ].filter(f => f.val).map((f, i) => (
            <span key={i} style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ opacity: 0.6 }}>{f.icon}</span>{f.val}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 40px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {personal.summary && (
          <div className="cv-section">
            <Section title="Özet">
              <p style={{ lineHeight: 1.7, color: "#3D4E61" }}>{personal.summary}</p>
            </Section>
          </div>
        )}

        {experiences.length > 0 && (
          <div className="cv-section">
            <Section title="Deneyim">
              {experiences.map((exp, i) => (
                <div key={exp.id} style={{ marginBottom: i < experiences.length - 1 ? "18px" : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "14px", color: "#1A2535" }}>{exp.position}</p>
                      <p style={{ fontSize: "13px", color: "#3A5A8C", fontWeight: 500 }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: "12px", color: "#7A8EA6", whiteSpace: "nowrap", flexShrink: 0, marginTop: "2px" }}>
                      {formatDate(exp.startDate)}{exp.startDate ? " — " : ""}{exp.current ? "Günümüz" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p style={{ marginTop: "6px", lineHeight: 1.65, color: "#3D4E61", fontSize: "13px" }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </Section>
          </div>
        )}

        {education.length > 0 && (
          <div className="cv-section">
            <Section title="Eğitim">
              {education.map((edu, i) => (
                <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? "14px" : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "14px", color: "#1A2535" }}>{edu.school}</p>
                      <p style={{ fontSize: "13px", color: "#5B8A7A", fontWeight: 500 }}>
                        {[edu.degree, edu.field].filter(Boolean).join(" · ")}
                        {edu.gpa ? ` — GPA: ${edu.gpa}` : ""}
                      </p>
                    </div>
                    <span style={{ fontSize: "12px", color: "#7A8EA6", whiteSpace: "nowrap", flexShrink: 0, marginTop: "2px" }}>
                      {formatDate(edu.startDate)}{edu.startDate ? " — " : ""}{formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </Section>
          </div>
        )}

        {skills.length > 0 && (
          <div className="cv-section">
            <Section title="Yetenekler">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {skills.map((s) => (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "13px", color: "#1A2535", fontWeight: 500, minWidth: "140px", flexShrink: 0 }}>{s.name}</span>
                    <div style={{ flex: 1, height: "5px", background: "#EEF1F5", borderRadius: "99px", overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        width: levelWidths[s.level],
                        background: "linear-gradient(90deg, #3A5A8C, #5B8A7A)",
                        borderRadius: "99px",
                        transition: "width 0.4s ease",
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {!personal.fullName && experiences.length === 0 && education.length === 0 && skills.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#A8B8CC" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px", opacity: 0.4 }}>📄</div>
            <p style={{ fontSize: "15px", fontWeight: 500 }}>CV&apos;niz burada görünecek</p>
            <p style={{ fontSize: "13px", marginTop: "6px" }}>Soldan bilgilerinizi doldurmaya başlayın</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default CVPreview;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
        <h2 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A8EA6" }}>{title}</h2>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #DDE2EA, transparent)" }} />
      </div>
      {children}
    </div>
  );
}
