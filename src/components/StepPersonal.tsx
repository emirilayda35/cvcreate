"use client";
import { useRef } from "react";
import { PersonalInfo } from "@/types/cv";
import { Translations } from "@/i18n/translations";

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  t: Translations;
}

export default function StepPersonal({ data, onChange, t }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handle = (key: keyof PersonalInfo, value: string) =>
    onChange({ ...data, [key]: value });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Dosya boyutu 2MB'dan küçük olmalıdır.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      onChange({ ...data, avatar: base64 });
    };
    reader.readAsDataURL(file);
  };

  const fields: { key: keyof PersonalInfo; label: string; placeholder: string; type?: string; rows?: number }[] = [
    { key: "fullName", label: t.fullName,   placeholder: t.ph.fullName },
    { key: "title",    label: t.titleLabel, placeholder: t.ph.title },
    { key: "email",    label: t.email,      placeholder: t.ph.email, type: "email" },
    { key: "phone",    label: t.phone,      placeholder: t.ph.phone, type: "tel" },
    { key: "location", label: t.location,   placeholder: t.ph.location },
    { key: "website",  label: t.website,    placeholder: t.ph.website },
    { key: "summary",  label: t.summary,    placeholder: t.ph.summary, rows: 4 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

      {/* ── Avatar upload ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label style={labelStyle}>{t.uploadPhoto}</label>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Preview circle */}
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: "72px", height: "72px", borderRadius: "50%", flexShrink: 0,
              background: data.avatar
                ? "transparent"
                : "linear-gradient(135deg,#EBF0F8,#D4DEF0)",
              border: "2px solid var(--color-border)",
              overflow: "hidden", cursor: "pointer", position: "relative",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-primary)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--color-border)")}
          >
            {data.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.avatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-primary)", fontFamily: "'Playfair Display',serif", lineHeight: 1 }}>
                {data.fullName
                  ? data.fullName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
                  : "?"}
              </span>
            )}
            {/* Hover overlay */}
            <div style={{
              position: "absolute", inset: 0, background: "rgba(58,90,140,0.55)",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: 0, transition: "opacity 0.15s", borderRadius: "50%",
              fontSize: "20px",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
            >📷</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: "7px 16px", borderRadius: "var(--radius-sm)",
                border: "1.5px solid var(--color-border-focus)",
                background: "var(--color-primary-light)", color: "var(--color-primary)",
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
              }}
            >
              {data.avatar ? t.changePhoto : t.uploadPhoto}
            </button>
            <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{t.uploadPhotoHint}</span>
            {data.avatar && (
              <button
                type="button"
                onClick={() => onChange({ ...data, avatar: "" })}
                style={{ fontSize: "11px", color: "#C62828", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}
              >× Kaldır</button>
            )}
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={handleAvatarUpload}
        />
      </div>

      {/* ── Text fields ── */}
      {fields.map(f => (
        <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={labelStyle}>{f.label}</label>
          {f.rows ? (
            <textarea
              rows={f.rows}
              placeholder={f.placeholder}
              value={(data[f.key] as string) || ""}
              onChange={e => handle(f.key, e.target.value)}
              style={{ ...inputStyle, resize: "vertical", minHeight: "90px", lineHeight: 1.6 }}
            />
          ) : (
            <input
              type={f.type || "text"}
              placeholder={f.placeholder}
              value={(data[f.key] as string) || ""}
              onChange={e => handle(f.key, e.target.value)}
              style={inputStyle}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: "13px", fontWeight: 500, color: "var(--color-text-body)", letterSpacing: "0.01em",
};
const inputStyle: React.CSSProperties = {
  padding: "10px 14px", borderRadius: "var(--radius-sm)",
  border: "1.5px solid var(--color-border)",
  background: "var(--color-surface)", color: "var(--color-text-heading)",
  fontSize: "14px", outline: "none", transition: "border-color 0.15s", width: "100%",
};
