import { LangCode } from "@/types/cv";

/**
 * CV elementini alır, tamamen izole bir print window açar.
 * Sadece CV görünür — navbar, form paneli, hiçbir şey çıkmaz.
 * Mobil dahil tüm tarayıcılarda çalışır.
 */
export function printCV(
  cvElement: HTMLElement,
  docTitle: string,
  lang: LangCode
): void {
  // CV'nin mevcut HTML'ini al
  const cvHTML = cvElement.outerHTML;

  // Tüm inline font import'larını topla
  const googleFonts =
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap";

  // RTL desteği
  const dir = lang === "ar" ? "rtl" : "ltr";

  const printHTML = `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${docTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${googleFonts}" rel="stylesheet" />
  <style>
    /* ── RESET ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html, body {
      width: 210mm;
      background: #fff;
      font-family: 'Inter', -apple-system, sans-serif;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    /* ── CSS VARIABLES (şablonların kullandığı tokenlar) ── */
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
      --radius-lg: 16px;
      --shadow-card: none;
      --shadow-preview: none;
    }

    /* ── CV KAPSAYICI ── */
    .cv-print-root {
      width: 100% !important;
      max-width: 100% !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      aspect-ratio: unset !important;
      overflow: visible !important;
      page-break-inside: avoid;
    }

    /* İçerideki tüm overflow'ları aç */
    .cv-print-root * {
      overflow: visible !important;
      max-height: unset !important;
    }

    /* Gradient arka planlar print'te görünsün */
    .cv-header,
    [style*="linear-gradient"],
    [style*="background:"],
    [style*="background :"] {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Section sayfa kırılımında bölünmesin */
    .cv-section {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* ── PRINT SAYFA AYARI ── */
    @page {
      size: A4 portrait;
      margin: 0;
    }

    @media print {
      html, body {
        width: 210mm;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      /* Tarayıcı header/footer'ı gizle */
      @page { margin: 0; }
    }
  </style>
</head>
<body>
  ${cvHTML}
  <script>
    // Fontlar yüklenince print başlat
    document.fonts.ready.then(function() {
      setTimeout(function() {
        window.print();
        // Print dialog kapandıktan sonra pencereyi kapat
        window.addEventListener('afterprint', function() {
          window.close();
        });
      }, 400);
    });
  </script>
</body>
</html>`;

  // Yeni pencere aç
  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) {
    alert("Pop-up engellendi. Lütfen tarayıcı ayarlarından pop-up'lara izin verin.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(printHTML);
  printWindow.document.close();
}
