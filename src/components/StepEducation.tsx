"use client";
import { Education } from "@/types/cv";
import { Translations } from "@/i18n/translations";
import { useState } from "react";

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
  t: Translations;
}

const empty = (): Education => ({
  id: crypto.randomUUID(), school: "", degree: "", field: "", startDate: "", endDate: "", gpa: "",
});

/** "YYYY-MM" → "February 2024" — monthsFull dizisini kullanır */
function fmtMonth(val: string, monthsFull: string[]): string {
  if (!val) return "";
  const [y, m] = val.split("-");
  return `${monthsFull[parseInt(m) - 1] ?? ""} ${y}`;
}

export default function StepEducation({ data, onChange, t }: Props) {
  const [open, setOpen] = useState<string | null>(data[0]?.id || null);

  const add = () => { const e = empty(); onChange([...data, e]); setOpen(e.id); };
  const remove = (id: string) => {
    onChange(data.filter(e => e.id !== id));
    if (open === id) setOpen(null);
  };
  const update = (id: string, field: keyof Education, value: string) =>
    onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {data.length === 0 && (
        <p style={{ color: "var(--color-text-muted)", fontSize: "14px", textAlign: "center", padding: "20px 0" }}>
          {t.noEducation}
        </p>
      )}

      {data.map((edu, idx) => (
        <div key={edu.id} style={{ border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <button
            onClick={() => setOpen(open === edu.id ? null : edu.id)}
            style={{ width: "100%", padding: "12px 16px", background: open === edu.id ? "var(--color-primary-light)" : "var(--color-surface-2)", display: "flex", justifyContent: "space-between", alignItems: "center", border: "none", cursor: "pointer", fontWeight: 500, color: "var(--color-text-heading)", fontSize: "14px" }}
          >
            <span>{edu.school || `${t.education} ${idx + 1}`}</span>
            <span style={{ fontSize: "18px", color: "var(--color-text-muted)", lineHeight: 1 }}>
              {open === edu.id ? "−" : "+"}
            </span>
          </button>

          {open === edu.id && (
            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "14px", background: "var(--color-surface)" }}>

              {/* Okul — kültürel placeholder */}
              <IR
                label={t.school}
                placeholder={t.ph.school}
                value={edu.school}
                onChange={v => update(edu.id, "school", v)}
              />

              {/* Derece + Bölüm — 2 kolon, güvenli */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <IR
                  label={t.degree}
                  placeholder={t.ph.degree}
                  value={edu.degree}
                  onChange={v => update(edu.id, "degree", v)}
                />
                <IR
                  label={t.field}
                  placeholder={t.ph.field}
                  value={edu.field}
                  onChange={v => update(edu.id, "field", v)}
                />
              </div>

              {/* ── TARİH + GPA — RESPONSIVE FIX ──────────────────────────
                  Eski sorun: 3-kolonlu sabit grid → 420px panelde GPA sağa taşıyordu.
                  Yeni çözüm: Her alan flex item, min-width var, wrap edince
                  GPA yeni satıra iner ve hiçbir alan kesilmez.
              ────────────────────────────────────────────────────────── */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>

                {/* Başlangıç tarihi */}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1 1 130px", minWidth: "120px" }}>
                  <label style={LS}>{t.startDate}</label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={e => update(edu.id, "startDate", e.target.value)}
                    style={IS}
                  />
                  {/* Dil-aware tarih önizlemesi */}
                  {edu.startDate && (
                    <span style={{ fontSize: "11px", color: "var(--color-accent)", marginTop: "1px", fontWeight: 500 }}>
                      {fmtMonth(edu.startDate, t.monthsFull)}
                    </span>
                  )}
                </div>

                {/* Bitiş tarihi */}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1 1 130px", minWidth: "120px" }}>
                  <label style={LS}>{t.endDate}</label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={e => update(edu.id, "endDate", e.target.value)}
                    style={IS}
                  />
                  {edu.endDate && (
                    <span style={{ fontSize: "11px", color: "var(--color-accent)", marginTop: "1px", fontWeight: 500 }}>
                      {fmtMonth(edu.endDate, t.monthsFull)}
                    </span>
                  )}
                </div>

                {/* GPA — wrap edebilir, tam genişlik alır, asla clip olmaz */}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "0 0 100%", maxWidth: "100%" }}>
                  <label style={LS}>{t.gpa}</label>
                  <input
                    type="text"
                    placeholder="3.75 / 4.00"
                    value={edu.gpa}
                    onChange={e => update(edu.id, "gpa", e.target.value)}
                    style={{ ...IS, maxWidth: "160px" }}
                  />
                </div>

              </div>

              <button onClick={() => remove(edu.id)} style={DelBtn}>{t.delete}</button>
            </div>
          )}
        </div>
      ))}

      <button onClick={add} style={AddBtn}>{t.addEducation}</button>
    </div>
  );
}

function IR({ label, placeholder, value, onChange, type }: {
  label: string; placeholder?: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label style={LS}>{label}</label>
      <input
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={IS}
      />
    </div>
  );
}

const LS: React.CSSProperties = { fontSize: "13px", fontWeight: 500, color: "var(--color-text-body)" };
const IS: React.CSSProperties = {
  padding: "9px 13px", borderRadius: "var(--radius-sm)",
  border: "1.5px solid var(--color-border)", background: "var(--color-surface)",
  color: "var(--color-text-heading)", fontSize: "14px", outline: "none",
  width: "100%", boxSizing: "border-box",
};
const AddBtn: React.CSSProperties = {
  padding: "10px", borderRadius: "var(--radius-md)",
  border: "1.5px dashed var(--color-border-focus)",
  background: "var(--color-primary-light)", color: "var(--color-primary)",
  fontSize: "14px", fontWeight: 600, cursor: "pointer",
};
const DelBtn: React.CSSProperties = {
  alignSelf: "flex-end", padding: "6px 14px", borderRadius: "var(--radius-sm)",
  border: "1.5px solid #FFCDD2", background: "#FFF5F5", color: "#C62828",
  fontSize: "13px", cursor: "pointer", fontWeight: 500,
};
