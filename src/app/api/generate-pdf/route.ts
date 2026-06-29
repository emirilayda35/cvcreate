import { NextRequest, NextResponse } from "next/server";

// ── Tip tanımları ──────────────────────────────────────────────
interface PersonalInfo {
  fullName: string; title: string; email: string; phone: string;
  location: string; website: string; summary: string; avatar: string;
}
interface Experience {
  id: string; company: string; position: string;
  startDate: string; endDate: string; current: boolean; description: string;
}
interface Education {
  id: string; school: string; degree: string; field: string;
  startDate: string; endDate: string; gpa: string;
}
interface Skill { id: string; name: string; level: string; }
interface CVData {
  personal: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

// ── HTML oluşturucu ────────────────────────────────────────────
function buildHTML(cvData: CVData, template: string, lang: string): string {
  const { personal, experiences, education, skills } = cvData;
  const filledSkills = skills.filter(s => s.name.trim());
  const dir = lang === "ar" ? "rtl" : "ltr";

  // Ay isimleri (dile göre)
  const monthMap: Record<string, string[]> = {
    tr: ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],
    en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    de: ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],
    fr: ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],
    ar: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
  };
  const months = monthMap[lang] || monthMap["tr"];
  const presentMap: Record<string,string> = { tr:"Günümüz", en:"Present", de:"Heute", fr:"Aujourd'hui", ar:"الآن" };
  const present = presentMap[lang] || "Present";

  const fmt = (d: string) => {
    if (!d) return "";
    const [y, m] = d.split("-");
    return `${months[parseInt(m)-1]} ${y}`;
  };

  const initials = personal.fullName
    ? personal.fullName.split(" ").map((w:string) => w[0]).slice(0,2).join("").toUpperCase()
    : "CV";

  const levelWidths: Record<string,string> = {
    Beginner:"25%", Intermediate:"50%", Advanced:"75%", Expert:"100%",
    Başlangıç:"25%", Orta:"50%", İleri:"75%", Uzman:"100%",
  };

  // ── Avatar HTML ──
  const avatarCircle = (size: number, border: string, bg: string, textColor: string, fontSize: number) => `
    <div style="width:${size}px;height:${size}px;border-radius:50%;flex-shrink:0;
      background:${personal.avatar ? "transparent" : bg};
      border:${border};overflow:hidden;
      display:flex;align-items:center;justify-content:center;">
      ${personal.avatar
        ? `<img src="${personal.avatar}" style="width:100%;height:100%;object-fit:cover;" />`
        : `<span style="font-size:${fontSize}px;font-weight:700;color:${textColor};font-family:'Playfair Display',serif;">${initials}</span>`
      }
    </div>`;

  // ── CLASSIC TEMPLATE ──
  if (template === "classic") {
    return `
    <div style="background:linear-gradient(135deg,#1B2E52 0%,#1E5799 55%,#2E86C8 100%);padding:32px 40px 24px;">
      <div style="display:flex;align-items:center;gap:20px;margin-bottom:12px;">
        ${avatarCircle(72, "2.5px solid rgba(255,255,255,0.4)", "rgba(255,255,255,0.15)", "#fff", 22)}
        <div>
          <h1 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#fff;margin:0 0 4px;">${personal.fullName || ""}</h1>
          <p style="font-size:13px;color:rgba(255,255,255,0.85);margin:0;letter-spacing:0.03em;">${personal.title || ""}</p>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:10px 22px;">
        ${[{v:personal.email,i:"✉"},{v:personal.phone,i:"☏"},{v:personal.location,i:"⌖"},{v:personal.website,i:"⊕"}].filter(f=>f.v).map(f=>`<span style="font-size:11px;color:rgba(255,255,255,0.8);display:flex;align-items:center;gap:5px;"><span style="opacity:.6">${f.i}</span>${f.v}</span>`).join("")}
      </div>
    </div>
    <div style="padding:24px 40px;display:flex;flex-direction:column;gap:20px;">
      ${personal.summary ? `<div><div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;"><h2 style="font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7A8EA6;margin:0;white-space:nowrap;">ÖZET</h2><div style="flex:1;height:1px;background:linear-gradient(90deg,#DDE2EA,transparent);"></div></div><p style="line-height:1.7;color:#3D4E61;font-size:12px;margin:0;">${personal.summary}</p></div>` : ""}
      ${experiences.length ? `<div class="cv-section"><div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;"><h2 style="font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7A8EA6;margin:0;white-space:nowrap;">DENEYİM</h2><div style="flex:1;height:1px;background:linear-gradient(90deg,#DDE2EA,transparent);"></div></div>${experiences.map(e=>`<div style="margin-bottom:16px;"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;"><div><p style="font-weight:600;font-size:14px;color:#1A2535;margin:0;">${e.position}</p><p style="font-size:13px;color:#1E5799;font-weight:500;margin:2px 0 0;">${e.company}</p></div><span style="font-size:11px;color:#7A8EA6;white-space:nowrap;flex-shrink:0;">${fmt(e.startDate)}${e.startDate?" — ":""}${e.current?present:fmt(e.endDate)}</span></div>${e.description?`<p style="margin-top:5px;line-height:1.65;color:#3D4E61;font-size:12px;">${e.description}</p>`:""}</div>`).join("")}</div>` : ""}
      ${education.length ? `<div class="cv-section"><div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;"><h2 style="font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7A8EA6;margin:0;white-space:nowrap;">EĞİTİM</h2><div style="flex:1;height:1px;background:linear-gradient(90deg,#DDE2EA,transparent);"></div></div>${education.map(e=>`<div style="margin-bottom:12px;"><div style="display:flex;justify-content:space-between;align-items:flex-start;"><div><p style="font-weight:600;font-size:14px;color:#1A2535;margin:0;">${e.school}</p><p style="font-size:12px;color:#5B8A7A;font-weight:500;margin:2px 0 0;">${[e.degree,e.field].filter(Boolean).join(" · ")}${e.gpa?` — GPA: ${e.gpa}`:""}</p></div><span style="font-size:11px;color:#7A8EA6;white-space:nowrap;flex-shrink:0;">${fmt(e.startDate)}${e.startDate?" — ":""}${fmt(e.endDate)}</span></div></div>`).join("")}</div>` : ""}
      ${filledSkills.length ? `<div class="cv-section"><div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;"><h2 style="font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7A8EA6;margin:0;white-space:nowrap;">YETENEKLER</h2><div style="flex:1;height:1px;background:linear-gradient(90deg,#DDE2EA,transparent);"></div></div><div style="display:flex;flex-direction:column;gap:9px;">${filledSkills.map(s=>`<div style="display:flex;align-items:center;gap:12px;"><span style="font-size:12px;color:#1A2535;font-weight:500;min-width:130px;flex-shrink:0;">${s.name}</span><div style="flex:1;height:5px;background:#EEF1F5;border-radius:99px;overflow:hidden;"><div style="height:100%;width:${levelWidths[s.level]||"50%"};background:linear-gradient(90deg,#1E5799,#2E86C8);border-radius:99px;"></div></div></div>`).join("")}</div></div>` : ""}
    </div>`;
  }

  // ── HARVARD TEMPLATE ──
  if (template === "harvard") {
    const crimson = "#8B1A2B";
    return `
    <div style="padding:36px 48px 32px;display:flex;flex-direction:column;gap:16px;">
      <div style="text-align:center;padding-bottom:16px;border-bottom:2px solid ${crimson};display:flex;flex-direction:column;align-items:center;gap:10px;">
        ${personal.avatar ? `<div style="width:76px;height:76px;border-radius:50%;border:2.5px solid ${crimson};overflow:hidden;"><img src="${personal.avatar}" style="width:100%;height:100%;object-fit:cover;"/></div>` : ""}
        <h1 style="font-family:'Playfair Display',serif;font-size:30px;font-weight:700;color:#1A1A1A;letter-spacing:.04em;margin:0;">${personal.fullName || ""}</h1>
        <p style="font-size:13px;color:${crimson};font-style:italic;font-family:Inter,sans-serif;margin:0;">${personal.title || ""}</p>
        <div style="display:flex;justify-content:center;flex-wrap:wrap;gap:4px 0;">${[personal.email,personal.phone,personal.location,personal.website].filter(Boolean).map((v,i,arr)=>`<span style="font-size:11px;color:#444;font-family:Inter,sans-serif;">${v}${i<arr.length-1?'<span style="margin:0 8px;color:#CCC;">|</span>':""}</span>`).join("")}</div>
      </div>
      ${personal.summary ? `<div><h2 style="font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:${crimson};font-family:Inter,sans-serif;margin:0 0 5px;">ÖZET</h2><div style="height:1.5px;background:${crimson};margin-bottom:8px;"></div><p style="line-height:1.75;color:#222;font-size:12.5px;margin:0;">${personal.summary}</p></div>` : ""}
      ${experiences.length ? `<div class="cv-section"><h2 style="font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:${crimson};font-family:Inter,sans-serif;margin:0 0 5px;">DENEYİM</h2><div style="height:1.5px;background:${crimson};margin-bottom:10px;"></div>${experiences.map(e=>`<div style="margin-bottom:14px;"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;"><p style="font-weight:700;font-size:13px;color:#1A1A1A;margin:0;">${e.position}</p><span style="font-size:11px;color:#555;white-space:nowrap;font-style:italic;font-family:Inter,sans-serif;flex-shrink:0;">${fmt(e.startDate)}${e.startDate?" – ":""}${e.current?present:fmt(e.endDate)}</span></div><p style="font-size:12.5px;color:${crimson};font-style:italic;margin:2px 0 4px;">${e.company}</p>${e.description?`<p style="font-size:12px;line-height:1.65;color:#333;margin:0;">${e.description}</p>`:""}</div>`).join("")}</div>` : ""}
      ${education.length ? `<div class="cv-section"><h2 style="font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:${crimson};font-family:Inter,sans-serif;margin:0 0 5px;">EĞİTİM</h2><div style="height:1.5px;background:${crimson};margin-bottom:10px;"></div>${education.map(e=>`<div style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;"><p style="font-weight:700;font-size:13px;color:#1A1A1A;margin:0;">${e.school}</p><span style="font-size:11px;color:#555;white-space:nowrap;font-style:italic;font-family:Inter,sans-serif;flex-shrink:0;">${fmt(e.startDate)}${e.startDate?" – ":""}${fmt(e.endDate)}</span></div><p style="font-size:12.5px;color:${crimson};font-style:italic;margin:2px 0 0;">${[e.degree,e.field].filter(Boolean).join(", ")}${e.gpa?` — GPA: ${e.gpa}`:""}</p></div>`).join("")}</div>` : ""}
      ${filledSkills.length ? `<div class="cv-section"><h2 style="font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:${crimson};font-family:Inter,sans-serif;margin:0 0 5px;">YETENEKLER</h2><div style="height:1.5px;background:${crimson};margin-bottom:8px;"></div><p style="font-size:12.5px;line-height:1.8;color:#333;font-family:Inter,sans-serif;margin:0;">${filledSkills.map((s,i)=>`<strong style="color:#1A1A1A;">${s.name}</strong><span style="color:#777;font-size:11px;"> (${s.level})</span>${i<filledSkills.length-1?" · ":""}`).join("")}</p></div>` : ""}
    </div>`;
  }

  // ── DEFAULT: Classic fallback ──
  return `<div style="padding:40px;"><h1>${personal.fullName}</h1></div>`;
}

// ── API ROUTE ──────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cvData, template, lang, docTitle } = body as {
      cvData: CVData; template: string; lang: string; docTitle: string;
    };

    const cvBodyHTML = buildHTML(cvData, template, lang);
    const dir = lang === "ar" ? "rtl" : "ltr";

    const fullHTML = `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8"/>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 210mm;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      color: #2A3445;
    }
    .cv-section { page-break-inside: avoid; break-inside: avoid; }
    @page { size: A4 portrait; margin: 0mm; }
  </style>
</head>
<body>${cvBodyHTML}</body>
</html>`;

    // Puppeteer ile PDF üret
    let chromium: typeof import("@sparticuz/chromium-min") | null = null;
    let puppeteer: typeof import("puppeteer-core") | null = null;

    try {
      chromium = await import("@sparticuz/chromium-min");
      puppeteer = await import("puppeteer-core");
    } catch {
      return NextResponse.json(
        { error: "PDF engine yüklenemedi." },
        { status: 500 }
      );
    }

    const executablePath = await chromium!.default.executablePath(
      "https://github.com/Sparticuz/chromium/releases/download/v149.0.0/chromium-v149.0.0-pack.tar"
    );

    const browser = await puppeteer!.launch({
      args: [...chromium!.default.args, "--no-sandbox", "--disable-setuid-sandbox"],
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.setContent(fullHTML, { waitUntil: "load" });

    const pdfUint8 = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    await browser.close();

    const pdfBuffer = Buffer.from(pdfUint8);
    const fileName = `${docTitle || "cv"}.pdf`;

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(fileName)}"`,
      },
    });
  } catch (err) {
    console.error("[generate-pdf]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
