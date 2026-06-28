import { LangCode } from "@/types/cv";

export function printCV(
  cvElement: HTMLElement,
  docTitle: string,
  lang: LangCode
): void {
  const cvHTML = cvElement.outerHTML;
  const googleFonts =
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap";
  const dir = lang === "ar" ? "rtl" : "ltr";

  // CV'nin arka plan rengini body'e de ver (sayfanın boş kısmı renksiz kalmasın)
  const computedBg = window.getComputedStyle(cvElement).backgroundColor || "#ffffff";

  const printHTML = `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
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

    html, body {
      width: 210mm;
      /* body yüksekliği içeriğe göre otomatik — min-height YOK */
      background: ${computedBg};
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    /* ── CV KAPSAYICI ──────────────────────────────────────────
       min-height: 297mm → içerik boş/az olsa tam A4 dolar.
       Ama içerik fazla olunca height: auto ile büyür,
       2. sayfaya taşabilir (bu doğaldur — tek sayfa zorlama yok).
       ────────────────────────────────────────────────────────── */
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
      /* Kendi içindeki overflow'ları aç */
      position: relative;
    }

    /* Tüm alt elemanlar — sadece overflow ve max-height sıfırla,
       min-height VERME (çarpan etkisi yapar) */
    .cv-print-root * {
      overflow: visible !important;
      max-height: unset !important;
    }

    /* Sidebar'lar (Modern, Executive) tam yüksekliğe uzasın */
    .cv-sidebar {
      min-height: 297mm !important;
    }

    /* Renk ve gradient print'te çıksın */
    .cv-print-root,
    .cv-print-root * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    /* Section kırılımını engelle */
    .cv-section {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    @page {
      size: A4 portrait;
      margin: 0mm;
    }
  </style>
</head>
<body>
  ${cvHTML}
  <script>
    document.fonts.ready.then(function() {
      setTimeout(function() {
        window.print();
        window.addEventListener('afterprint', function() {
          window.close();
        });
      }, 600);
    });
  </script>
</body>
</html>`;

  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) {
    alert("Pop-up engellendi. Lütfen tarayıcı ayarlarından pop-up'lara izin verin.");
    return;
  }
  printWindow.document.open();
  printWindow.document.write(printHTML);
  printWindow.document.close();
}
