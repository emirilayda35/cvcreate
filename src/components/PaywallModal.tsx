"use client";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  cvName: string;
}

// Lemon Squeezy checkout URL'leri — gerçek ürün ID'leri eklenince burası güncellenir
const LEMON_TRY_URL = "https://your-store.lemonsqueezy.com/checkout/buy/TR_PRODUCT_ID"; // 150 TL
const LEMON_USD_URL = "https://your-store.lemonsqueezy.com/checkout/buy/USD_PRODUCT_ID"; // $4.99

type Step = "select" | "processing" | "success";

export default function PaywallModal({ isOpen, onClose, onPaymentSuccess, cvName }: Props) {
  const [step, setStep] = useState<Step>("select");
  const [selectedPlan, setSelectedPlan] = useState<"try" | "usd" | null>(null);

  // Reset on open
  useEffect(() => {
    if (isOpen) { setStep("select"); setSelectedPlan(null); }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && step === "select") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, step]);

  if (!isOpen) return null;

  const handlePayment = (plan: "try" | "usd") => {
    setSelectedPlan(plan);
    setStep("processing");

    // TODO: Gerçek ödeme entegrasyonunda burada Lemon Squeezy checkout açılacak:
    // window.open(plan === "try" ? LEMON_TRY_URL : LEMON_USD_URL, "_blank");
    // Şu an: Mock ödeme simülasyonu (1.6 sn)
    console.log("[MOCK] Ödeme başlatıldı:", plan, "| LemonSqueezy URLs:", LEMON_TRY_URL, LEMON_USD_URL);

    setTimeout(() => {
      setStep("success");
      setTimeout(() => {
        onPaymentSuccess();
      }, 1200);
    }, 1600);
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget && step === "select") onClose(); }}
      style={{
        position:"fixed", inset:0, zIndex:1000,
        background:"rgba(15,25,45,0.55)",
        backdropFilter:"blur(6px)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:"20px",
        animation:"fadeIn 0.2s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes slideUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes checkPop { 0%{transform:scale(0)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }
      `}</style>

      <div style={{
        background:"#fff", borderRadius:"20px",
        width:"100%", maxWidth:"480px",
        boxShadow:"0 24px 80px rgba(10,20,50,0.22)",
        overflow:"hidden",
        animation:"slideUp 0.25s ease",
      }}>

        {/* ── SELECT PLAN ─────────────────────────────────────── */}
        {step === "select" && (
          <>
            {/* Top gradient banner */}
            <div style={{ background:"linear-gradient(135deg,#2A3F5F,#3A5A8C,#4A7A6A)", padding:"28px 32px 22px", position:"relative" }}>
              <button onClick={onClose} style={{ position:"absolute", top:"16px", right:"18px", background:"rgba(255,255,255,0.15)", border:"none", color:"#fff", width:"28px", height:"28px", borderRadius:"50%", cursor:"pointer", fontSize:"16px", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
              <div style={{ fontSize:"28px", marginBottom:"8px" }}>🔒</div>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"20px", fontWeight:700, color:"#fff", marginBottom:"6px", lineHeight:1.25 }}>
                Premium CV&apos;nizi İndirin
              </h2>
              <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.75)", lineHeight:1.5 }}>
                CV&apos;niz hazır! Yüksek kaliteli, ATS uyumlu PDF&apos;inizi indirmek için bir plan seçin.
              </p>
            </div>

            <div style={{ padding:"24px 28px 28px" }}>
              {/* Value props */}
              <div style={{ display:"flex", gap:"16px", marginBottom:"22px" }}>
                {["✓  Anında PDF indirme","✓  ATS uyumlu çıktı","✓  Tek seferlik ödeme"].map((t,i)=>(
                  <span key={i} style={{ fontSize:"11px", color:"#5B8A7A", fontWeight:600, background:"#EAF2EF", padding:"4px 10px", borderRadius:"99px", whiteSpace:"nowrap" }}>{t}</span>
                ))}
              </div>

              {/* Plan cards */}
              <div style={{ display:"flex", flexDirection:"column", gap:"12px", marginBottom:"20px" }}>
                {/* 150 TL */}
                <button
                  onClick={() => handlePayment("try")}
                  style={{
                    width:"100%", padding:"18px 20px", borderRadius:"14px",
                    border:"2px solid #3A5A8C",
                    background:"linear-gradient(135deg,#EBF0F8,#F4F7FB)",
                    cursor:"pointer", textAlign:"left", transition:"all 0.15s",
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                  }}
                  onMouseEnter={e=>(e.currentTarget.style.background="linear-gradient(135deg,#D8E4F5,#EBF0F8)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="linear-gradient(135deg,#EBF0F8,#F4F7FB)")}
                >
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px" }}>
                      <span style={{ fontSize:"11px", fontWeight:700, background:"#3A5A8C", color:"#fff", padding:"2px 8px", borderRadius:"99px" }}>🇹🇷 TÜRKİYE</span>
                    </div>
                    <p style={{ fontWeight:700, fontSize:"22px", color:"#1A2535", lineHeight:1 }}>₺150</p>
                    <p style={{ fontSize:"12px", color:"#7A8EA6", marginTop:"3px" }}>iyzico ile Güvenli Öde</p>
                  </div>
                  <div style={{ width:"42px", height:"42px", borderRadius:"50%", background:"#3A5A8C", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"18px", flexShrink:0 }}>→</div>
                </button>

                {/* $4.99 */}
                <button
                  onClick={() => handlePayment("usd")}
                  style={{
                    width:"100%", padding:"18px 20px", borderRadius:"14px",
                    border:"2px solid #5B8A7A",
                    background:"linear-gradient(135deg,#EAF2EF,#F4FAF7)",
                    cursor:"pointer", textAlign:"left", transition:"all 0.15s",
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                  }}
                  onMouseEnter={e=>(e.currentTarget.style.background="linear-gradient(135deg,#D4EDDE,#EAF2EF)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="linear-gradient(135deg,#EAF2EF,#F4FAF7)")}
                >
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px" }}>
                      <span style={{ fontSize:"11px", fontWeight:700, background:"#5B8A7A", color:"#fff", padding:"2px 8px", borderRadius:"99px" }}>🌍 GLOBAL</span>
                    </div>
                    <p style={{ fontWeight:700, fontSize:"22px", color:"#1A2535", lineHeight:1 }}>$4.99</p>
                    <p style={{ fontSize:"12px", color:"#7A8EA6", marginTop:"3px" }}>Lemon Squeezy ile Güvenli Öde</p>
                  </div>
                  <div style={{ width:"42px", height:"42px", borderRadius:"50%", background:"#5B8A7A", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"18px", flexShrink:0 }}>→</div>
                </button>
              </div>

              <p style={{ fontSize:"11px", color:"#A8B8CC", textAlign:"center" }}>
                🔒 256-bit SSL şifreli · Tek seferlik ödeme · İade garantili
              </p>
            </div>
          </>
        )}

        {/* ── PROCESSING ─────────────────────────────────────── */}
        {step === "processing" && (
          <div style={{ padding:"56px 32px", textAlign:"center" }}>
            <div style={{
              width:"56px", height:"56px", borderRadius:"50%",
              border:"4px solid #EEF1F5", borderTopColor:"#3A5A8C",
              margin:"0 auto 20px", animation:"spin 0.8s linear infinite",
            }}/>
            <p style={{ fontWeight:700, fontSize:"17px", color:"#1A2535", marginBottom:"8px" }}>Ödeme İşleniyor…</p>
            <p style={{ fontSize:"13px", color:"#7A8EA6" }}>
              {selectedPlan === "try" ? "₺150 · iyzico" : "$4.99 · Lemon Squeezy"}
            </p>
          </div>
        )}

        {/* ── SUCCESS ─────────────────────────────────────────── */}
        {step === "success" && (
          <div style={{ padding:"56px 32px", textAlign:"center" }}>
            <div style={{
              width:"64px", height:"64px", borderRadius:"50%",
              background:"linear-gradient(135deg,#3A5A8C,#5B8A7A)",
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 20px", fontSize:"28px",
              animation:"checkPop 0.4s cubic-bezier(.34,1.56,.64,1) both",
            }}>✓</div>
            <p style={{ fontWeight:700, fontSize:"18px", color:"#1A2535", marginBottom:"8px" }}>Ödeme Başarılı!</p>
            <p style={{ fontSize:"13px", color:"#7A8EA6" }}>{cvName} indiriliyor…</p>
          </div>
        )}
      </div>
    </div>
  );
}
