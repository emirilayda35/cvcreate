"use client";
import { Experience } from "@/types/cv";
import { Translations } from "@/i18n/translations";
import { useState } from "react";
import MonthPicker from "@/components/MonthPicker";

interface Props {
  data: Experience[];
  onChange: (data: Experience[]) => void;
  t: Translations;
}

const empty = (): Experience => ({
  id: crypto.randomUUID(), company: "", position: "",
  startDate: "", endDate: "", current: false, description: "",
});

export default function StepExperience({ data, onChange, t }: Props) {
  const [open, setOpen] = useState<string | null>(data[0]?.id || null);

  const add = () => { const e = empty(); onChange([...data, e]); setOpen(e.id); };
  const remove = (id: string) => { onChange(data.filter(e => e.id !== id)); if (open === id) setOpen(null); };
  const update = (id: string, field: keyof Experience, value: string | boolean) =>
    onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {data.length === 0 && (
        <p style={{ color: "var(--color-text-muted)", fontSize: "14px", textAlign: "center", padding: "20px 0" }}>
          {t.noExperience}
        </p>
      )}
      {data.map((exp, idx) => (
        <div key={exp.id} style={{ border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <button onClick={() => setOpen(open === exp.id ? null : exp.id)}
            style={{ width: "100%", padding: "12px 16px", background: open === exp.id ? "var(--color-primary-light)" : "var(--color-surface-2)", display: "flex", justifyContent: "space-between", alignItems: "center", border: "none", cursor: "pointer", fontWeight: 500, color: "var(--color-text-heading)", fontSize: "14px" }}>
            <span>{exp.position || exp.company || `${t.experience} ${idx + 1}`}</span>
            <span style={{ fontSize: "18px", color: "var(--color-text-muted)", lineHeight: 1 }}>{open === exp.id ? "−" : "+"}</span>
          </button>

          {open === exp.id && (
            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "14px", background: "var(--color-surface)" }}>
              <IR label={t.position} placeholder={t.ph.position} value={exp.position} onChange={v => update(exp.id, "position", v)} />
              <IR label={t.company}  placeholder={t.ph.company}  value={exp.company}  onChange={v => update(exp.id, "company", v)} />

              {/* Tarihler — MonthPicker ile dil-aware */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <div style={{ flex: "1 1 140px", minWidth: "130px" }}>
                  <MonthPicker
                    label={t.startDate}
                    value={exp.startDate}
                    onChange={v => update(exp.id, "startDate", v)}
                    monthsFull={t.monthsFull}
                  />
                </div>
                {!exp.current && (
                  <div style={{ flex: "1 1 140px", minWidth: "130px" }}>
                    <MonthPicker
                      label={t.endDate}
                      value={exp.endDate}
                      onChange={v => update(exp.id, "endDate", v)}
                      monthsFull={t.monthsFull}
                    />
                  </div>
                )}
              </div>

              <label style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", color: "var(--color-text-body)", cursor: "pointer" }}>
                <input type="checkbox" checked={exp.current} onChange={e => update(exp.id, "current", e.target.checked)} />
                {t.stillWorking}
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={LS}>{t.description}</label>
                <textarea rows={3} placeholder={t.ph.jobDescription} value={exp.description}
                  onChange={e => update(exp.id, "description", e.target.value)} style={TA} />
              </div>

              <button onClick={() => remove(exp.id)} style={DelBtn}>{t.delete}</button>
            </div>
          )}
        </div>
      ))}
      <button onClick={add} style={AddBtn}>{t.addExperience}</button>
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

const LS: React.CSSProperties  = { fontSize: "13px", fontWeight: 500, color: "var(--color-text-body)" };
const IS: React.CSSProperties  = { padding: "9px 13px", borderRadius: "var(--radius-sm)", border: "1.5px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-heading)", fontSize: "14px", outline: "none", width: "100%", boxSizing: "border-box" };
const TA: React.CSSProperties  = { ...IS, resize: "vertical", minHeight: "80px", lineHeight: 1.6 };
const AddBtn: React.CSSProperties = { padding: "10px", borderRadius: "var(--radius-md)", border: "1.5px dashed var(--color-border-focus)", background: "var(--color-primary-light)", color: "var(--color-primary)", fontSize: "14px", fontWeight: 600, cursor: "pointer" };
const DelBtn: React.CSSProperties = { alignSelf: "flex-end", padding: "6px 14px", borderRadius: "var(--radius-sm)", border: "1.5px solid #FFCDD2", background: "#FFF5F5", color: "#C62828", fontSize: "13px", cursor: "pointer", fontWeight: 500 };
