import { LangCode } from "@/types/cv";

/**
 * CV elementini alır, tamamen izole bir print window açar.
 * İçerik az olsa bile A4 boyutu tam dolar — arka plan rengi sayfayı kaplar.
 */
export function printCV(
  cvElement: HTMLElement,
  docTitle: string,
  lang: LangCode
): void {
  const cvHTML = cvElement.outerHTML;
  const googleFonts =
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap";
  const dir = lang === "ar" ? "rtl" : "ltr";

  // Şablonun arka plan rengini al (sidebar için de)
  // Her şablon kendi bg'sini inline style'da taşıyor, body için de aynısını kullanacağız
  const computedBg = window.getComputedStyle(cvElement).backgroundColor;

  const printHTML = `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <title>${docTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${googleFonts}" rel="stylesheet" />
  <style>
    /* ── RESET ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* ── CSS VARIABLES ── */
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

    /* Body arka planı = CV'nin kendi arka planı → sayfa boşlukları da renkli olur */
    body {
      margin: 0;
      padding: 0;
      width: 210mm;
      min-height: 297mm;
      background: ${computedBg || "#ffffff"};
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* ── CV KAPSAYICI: tam A4 doldur ── */
    .cv-print-root {
      width: 210mm !important;
      max-width: 210mm !important;
      min-height: 297mm !important;   /* ← İçerik az olsa da A4 yüksekliğini doldur */
      height: auto !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      aspect-ratio: unset !important;
      overflow: visible !important;
      display: flex !important;
      flex-direction: column !important;
    }

    /* Sidebar'lar min-height alsın (Modern, Executive) */
    .cv-print-root > div {
      overflow: visible !important;
      max-height: unset !important;
      height: auto !important;
    }

    /* Sidebar div'leri kendi arkaplanlarını tam uzatabilsin */
    .cv-print-root > div[style*="flex"] > div {
      min-height: 297mm !important;
    }

    /* Gradient ve solid renkler print'te çıksın */
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

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
    alert("Pop-up engellendi. Lütfen tarayıcı ayarlarından pop-up'lara izin verin ve tekrar deneyin.");
    return;
  }
  printWindow.document.open();
  printWindow.document.write(printHTML);
  printWindow.document.close();
}
