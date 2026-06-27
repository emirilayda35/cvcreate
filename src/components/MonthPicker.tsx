"use client";
import { useRef } from "react";

interface Props {
  label: string;
  value: string;       // "YYYY-MM" formatı
  onChange: (v: string) => void;
  monthsFull: string[]; // aktif dil ay isimleri
  placeholder?: string;
}

/** "YYYY-MM" → "January 2025" (seçili dile göre) */
function formatMonth(val: string, months: string[]): string {
  if (!val) return "";
  const [y, m] = val.split("-");
  return `${months[parseInt(m) - 1] ?? ""} ${y}`;
}

export default function MonthPicker({ label, value, onChange, monthsFull, placeholder }: Props) {
  const hiddenRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label style={LS}>{label}</label>

      {/* Görünür alan — tıklanınca gizli input'u açar */}
      <div
        onClick={() => hiddenRef.current?.showPicker?.() ?? hiddenRef.current?.click()}
        style={{
          ...IS,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", userSelect: "none",
          color: value ? "var(--color-text-heading)" : "var(--color-text-placeholder)",
        }}
      >
        <span style={{ fontSize: "14px" }}>
          {value ? formatMonth(value, monthsFull) : (placeholder || "—")}
        </span>
        {/* Takvim ikonu */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ opacity: .5, flexShrink: 0 }}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>

      {/* Gerçek input — tamamen gizli, sadece picker açmak için */}
      <input
        ref={hiddenRef}
        type="month"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          width: 0,
          height: 0,
          border: "none",
          padding: 0,
        }}
        tabIndex={-1}
      />
    </div>
  );
}

const LS: React.CSSProperties = {
  fontSize: "13px", fontWeight: 500, color: "var(--color-text-body)",
};
const IS: React.CSSProperties = {
  padding: "9px 13px",
  borderRadius: "var(--radius-sm)",
  border: "1.5px solid var(--color-border)",
  background: "var(--color-surface)",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  minHeight: "40px",
};
