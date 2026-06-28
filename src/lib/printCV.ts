import { LangCode } from "@/types/cv";

/**
 * CV'yi izole bir HTML olarak Blob URL'e yazar,
 * yeni sekmede açar → fontlar yüklenince print dialog başlar.
 * Mobil dahil tüm tarayıcılarda çalışır.
 */
export function printCV(
  cvElement: HTMLElement,
  docTitle: string,
  lang: LangCode
): void {
  const cvHTML = cvElement.outerHTML;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const computedBg =
    window.getComputedStyle(cvElement).backgroundColor || "#ffffff";

  // Google Fonts'u base64 değil — <link> ile embed et
  // (Blob URL same-origin değil, external fetch kısıtlaması yok)
  const googleFonts =
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap";

  const html = `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${docTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${googleFonts}" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --color-bg: #F4F6F8;
      --color-surface: #FFFFFF;
      --color-surface-2: #EEF1F5;
      --color-border: #DDE2EA;
      --color-border-focus: #7A92B0;
      --color-primary: #1E5799;
      --color-primary-light: #EBF0F8;
      --color-primary-hover: #2E4A73;
      --color-text-heading: #1A2535;
      --color-text-body: #3D4E61;
      --color-text-muted: #7A8EA6;
      --color-text-placeholder: #A8B8CC;
      --color-accent: #2E86C8;
      --color-accent-light: #D6E8F8;
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 0px;
      --shadow-card: none;
      --shadow-preview: none;
    }

    html {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    body {
      margin: 0;
      padding: 0;
      background: ${computedBg};
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .cv-print-root {
      width: 210mm !important;
      max-width: 210mm !important;
      min-height: 297mm !important;
      height: auto !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      aspect-ratio: unset !important;
      overflow: visible !important;
      display: flex !important;
      flex-direction: column !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .cv-print-root * {
      overflow: visible !important;
      max-height: unset !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .cv-sidebar {
      min-height: 297mm !important;
    }

    .cv-section {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    @page {
      size: A4 portrait;
      margin: 0mm;
    }

    /* Ekran görünümü — kullanıcı URL'de CV'yi görsün */
    @media screen {
      body {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
        background: #E8ECF0;
        padding: 20px;
      }
      .cv-print-root {
        box-shadow: 0 8px 40px rgba(0,0,0,0.18) !important;
        border-radius: 4px !important;
      }
    }
  </style>
</head>
<body>
  ${cvHTML}
  <script>
    // Mobil uyumlu: fontlar hazır olunca print aç
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function() {
        setTimeout(function() { window.print(); }, 800);
      });
    } else {
      // Fallback: fonts API yoksa 1.5sn bekle
      setTimeout(function() { window.print(); }, 1500);
    }

    window.addEventListener('afterprint', function() {
      // Mobilde sekme kapanmayabilir, sorun değil
      try { window.close(); } catch(e) {}
    });
  </script>
</body>
</html>`;

  // ── Blob URL yöntemi (mobil uyumlu) ──────────────────────────
  // window.open() yerine Blob + <a> → mobil Chrome/Safari'de çalışır
  try {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url  = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href   = url;
    a.target = "_blank";
    a.rel    = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Blob URL'i 60 saniye sonra temizle
    setTimeout(() => URL.revokeObjectURL(url), 60_000);

  } catch {
    // Blob başarısız olursa window.open fallback
    const w = window.open("", "_blank");
    if (w) {
      w.document.open();
      w.document.write(html);
      w.document.close();
    } else {
      alert("PDF açılamadı. Lütfen tarayıcınızda pop-up ve yeni sekme iznini açın.");
    }
  }
}
