"use client";
import { Skill } from "@/types/cv";
import { Translations } from "@/i18n/translations";

interface Props {
  data: Skill[];
  onChange: (data: Skill[]) => void;
  t: Translations;
}

const levels: Skill["level"][] = ["Beginner", "Intermediate", "Advanced", "Expert"];
const levelColors: Record<Skill["level"], string> = { Beginner: "#94A3B8", Intermediate: "#5B8A7A", Advanced: "#3A5A8C", Expert: "#1A2535" };
const empty = (): Skill => ({ id: crypto.randomUUID(), name: "", level: "Intermediate" });

export default function StepSkills({ data, onChange, t }: Props) {
  const add = () => onChange([...data, empty()]);
  const remove = (id: string) => onChange(data.filter(s => s.id !== id));
  const update = (id: string, field: keyof Skill, value: string) =>
    onChange(data.map(s => s.id === id ? { ...s, [field]: value } : s));

  const levelLabel = (l: Skill["level"]) => ({
    Beginner: t.levelBeginner, Intermediate: t.levelIntermediate,
    Advanced: t.levelAdvanced, Expert: t.levelExpert,
  }[l]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {data.length === 0 && <p style={{ color: "var(--color-text-muted)", fontSize: "14px", textAlign: "center", padding: "20px 0" }}>{t.noSkills}</p>}
      {data.map(skill => (
        <div key={skill.id} style={{ display: "grid", gridTemplateColumns: "1fr 160px 36px", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            placeholder={t.skillPlaceholder}
            value={skill.name}
            onChange={e => update(skill.id, "name", e.target.value)}
            style={IS}
          />
          <select
            value={skill.level}
            onChange={e => update(skill.id, "level", e.target.value)}
            style={{ padding: "9px 10px", borderRadius: "var(--radius-sm)", border: "1.5px solid var(--color-border)", background: "var(--color-surface)", color: levelColors[skill.level], fontSize: "13px", fontWeight: 600, outline: "none", cursor: "pointer" }}
          >
            {levels.map(l => <option key={l} value={l}>{levelLabel(l)}</option>)}
          </select>
          <button onClick={() => remove(skill.id)} style={{ width: "36px", height: "36px", borderRadius: "var(--radius-sm)", border: "1.5px solid #FFCDD2", background: "#FFF5F5", color: "#C62828", fontSize: "18px", lineHeight: 1, cursor: "pointer" }}>×</button>
        </div>
      ))}
      <button onClick={add} style={AddBtn}>{t.addSkill}</button>
    </div>
  );
}

const IS: React.CSSProperties = { padding: "9px 13px", borderRadius: "var(--radius-sm)", border: "1.5px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-heading)", fontSize: "14px", outline: "none" };
const AddBtn: React.CSSProperties = { padding: "10px", borderRadius: "var(--radius-md)", border: "1.5px dashed var(--color-border-focus)", background: "var(--color-primary-light)", color: "var(--color-primary)", fontSize: "14px", fontWeight: 600, cursor: "pointer" };
