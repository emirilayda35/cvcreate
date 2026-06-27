"use client";
import { Education } from "@/types/cv";
import { Translations } from "@/i18n/translations";
import { useState } from "react";
import MonthPicker from "@/components/MonthPicker";

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
  t: Translations;
}

const empty = (): Education => ({
  id: crypto.randomUUID(), school: "", degree: "", field: "", startDate: "", endDate: "", gpa: "",
});

export default function StepEducation({ data, onChange, t }: Props) {
  const [open, setOpen] = useState<string | null>(data[0]?.id || null);

  const add = () => { const e = empty(); onChange([...data, e]); setOpen(e.id); };
  const remove = (id: string) => { onChange(data.filter(e => e.id !== id)); if (open === id) setOpen(null); };
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
          <button onClick={() => setOpen(open === edu.id ? null : edu.id)}
            style={{ width: "100%", padding: "12px 16px", background: open === edu.id ? "var(--color-primary-light)" : "var(--color-surface-2)", display: "flex", justifyContent: "space-between", alignItems: "center", border: "none", cursor: "pointer", fontWeight: 500, color: "var(--color-text-heading)", fontSize: "14px" }}>
            <span>{edu.school || `${t.education} ${idx + 1}`}</span>
            <span style={{ fontSize: "18px", color: "var(--color-text-muted)", lineHeight: 1 }}>{open === edu.id ? "−" : "+"}</span>
          </button>

          {open === edu.id && (
            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "14px", background: "var(--color-surface)" }}>
              <IR label={t.school} placeholder={t.ph.school} value={edu.school} onChange={v => update(edu.id, "school", v)} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <IR label={t.degree} placeholder={t.ph.degree} value={edu.degree} onChange={v => update(edu.id, "degree", v)} />
                <IR label={t.field}  placeholder={t.ph.field}  value={edu.field}  onChange={v => update(edu.id, "field", v)} />
              </div>

              {/* Tarihler — MonthPicker ile dil-aware, GPA alt satırda (taşma yok) */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <div style={{ flex: "1 1 140px", minWidth: "130px" }}>
                  <MonthPicker
                    label={t.startDate}
                    value={edu.startDate}
                    onChange={v => update(edu.id, "startDate", v)}
                    monthsFull={t.monthsFull}
                  />
                </div>
                <div style={{ flex: "1 1 140px", minWidth: "130px" }}>
                  <MonthPicker
                    label={t.endDate}
                    value={edu.endDate}
                    onChange={v => update(edu.id, "endDate", v)}
                    monthsFull={t.monthsFull}
                  />
                </div>
                {/* GPA — tam genişlik, asla clip olmaz */}
                <div style={{ flex: "0 0 100%", display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={LS}>{t.gpa}</label>
                  <input type="text" placeholder="3.75 / 4.00" value={edu.gpa}
                    onChange={e => update(edu.id, "gpa", e.target.value)}
                    style={{ ...IS, maxWidth: "160px" }} />
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

function IR({ label, placeholder, value, onChange }: { label: string; placeholder?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label style={LS}>{label}</label>
      <input type="text" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} style={IS} />
    </div>
  );
}

const LS: React.CSSProperties     = { fontSize: "13px", fontWeight: 500, color: "var(--color-text-body)" };
const IS: React.CSSProperties     = { padding: "9px 13px", borderRadius: "var(--radius-sm)", border: "1.5px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-heading)", fontSize: "14px", outline: "none", width: "100%", boxSizing: "border-box" };
const AddBtn: React.CSSProperties = { padding: "10px", borderRadius: "var(--radius-md)", border: "1.5px dashed var(--color-border-focus)", background: "var(--color-primary-light)", color: "var(--color-primary)", fontSize: "14px", fontWeight: 600, cursor: "pointer" };
const DelBtn: React.CSSProperties = { alignSelf: "flex-end", padding: "6px 14px", borderRadius: "var(--radius-sm)", border: "1.5px solid #FFCDD2", background: "#FFF5F5", color: "#C62828", fontSize: "13px", cursor: "pointer", fontWeight: 500 };
