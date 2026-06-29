import { LangCode } from "@/types/cv";

/**
 * CV elementini html2canvas ile piksel-mükemmel render eder,
 * jsPDF ile A4 PDF oluşturur, doğrudan indirir.
 *
 * ✅ Mobil Chrome / Safari
 * ✅ Masaüstü Chrome / Firefox / Edge
 * ✅ Samsung Internet
 * ✅ Print dialog YOK — direkt .pdf indirilir
 * ✅ Gradient, fotoğraf, renk koruması
 */
export async function printCV(
  cvElement: HTMLElement,
  docTitle: string,
  _lang: LangCode,
  onStart?: () => void,
  onDone?: () => void
): Promise<void> {
  onStart?.();

  try {
    // ── Dinamik import (bundle boyutunu küçük tutar) ──
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);

    // A4 boyutları (mm ve px @ 96dpi → 2x scale = yüksek çözünürlük)
    const A4_WIDTH_MM  = 210;
    const A4_HEIGHT_MM = 297;
    const SCALE        = 2; // retina kalitesi

    // ── Geçici klon: ekran dışına yerleştir, tam A4 genişliğinde ──
    const clone = cvElement.cloneNode(true) as HTMLElement;
    clone.style.cssText = `
      position: fixed !important;
      top: -9999px !important;
      left: -9999px !important;
      width: 794px !important;        /* 210mm @ 96dpi */
      min-height: 1123px !important;  /* 297mm @ 96dpi */
      height: auto !important;
      max-width: 794px !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      overflow: visible !important;
      aspect-ratio: unset !important;
      background: ${window.getComputedStyle(cvElement).background} !important;
    `;

    // İç div'lerin overflow'unu aç
    const allDivs = clone.querySelectorAll<HTMLElement>("*");
    allDivs.forEach(el => {
      el.style.overflow   = "visible";
      el.style.maxHeight  = "unset";
    });

    // cv-sidebar: tam uzasın
    const sidebars = clone.querySelectorAll<HTMLElement>(".cv-sidebar");
    sidebars.forEach(sb => {
      sb.style.minHeight = "1123px";
    });

    document.body.appendChild(clone);

    // Kısa bekleme: render tamamlansın
    await new Promise(r => setTimeout(r, 200));

    // ── html2canvas ile render ──
    const canvas = await html2canvas(clone, {
      scale:            SCALE,
      useCORS:          true,       // dış kaynaklı resimler (avatar vs)
      allowTaint:       true,
      logging:          false,
      backgroundColor:  null,       // şeffaf → kendi bg'si korunur
      imageTimeout:     15000,
      onclone: (doc) => {
        // Klonlanmış doc'ta da overflow'ları aç
        doc.querySelectorAll<HTMLElement>("*").forEach(el => {
          el.style.overflow  = "visible";
          el.style.maxHeight = "unset";
        });
      },
    });

    document.body.removeChild(clone);

    // ── Canvas boyutlarını al ──
    const canvasWidthPx  = canvas.width;
    const canvasHeightPx = canvas.height;

    // Piksel → mm dönüşümü
    const pxPerMm = canvasWidthPx / A4_WIDTH_MM;
    const contentHeightMm = canvasHeightPx / pxPerMm;

    // İçerik 1 sayfadan uzunsa çok sayfa; değilse tam A4
    const pdf = new jsPDF({
      orientation: "portrait",
      unit:        "mm",
      format:      "a4",
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    if (contentHeightMm <= A4_HEIGHT_MM) {
      // ── Tek sayfa: tam A4 dolacak şekilde yerleştir ──
      pdf.addImage(
        imgData,
        "JPEG",
        0, 0,           // x, y
        A4_WIDTH_MM,
        A4_HEIGHT_MM,   // tam A4 yüksekliği → beyaz kalmaz
        undefined,
        "FAST"
      );
    } else {
      // ── Çok sayfa: her A4 dilimini ayrı sayfaya ekle ──
      let yOffset = 0;

      while (yOffset < contentHeightMm) {
        if (yOffset > 0) pdf.addPage();

        // Bu sayfada gösterilecek slice yüksekliği
        const sliceHeightMm = Math.min(A4_HEIGHT_MM, contentHeightMm - yOffset);
        const sliceHeightPx = sliceHeightMm * pxPerMm;
        const yOffsetPx     = yOffset * pxPerMm;

        // Slice canvas oluştur
        const sliceCanvas  = document.createElement("canvas");
        sliceCanvas.width  = canvasWidthPx;
        sliceCanvas.height = Math.round(sliceHeightPx);

        const ctx = sliceCanvas.getContext("2d")!;
        ctx.drawImage(
          canvas,
          0, Math.round(yOffsetPx),
          canvasWidthPx, Math.round(sliceHeightPx),
          0, 0,
          canvasWidthPx, Math.round(sliceHeightPx)
        );

        const sliceData = sliceCanvas.toDataURL("image/jpeg", 0.95);
        pdf.addImage(
          sliceData,
          "JPEG",
          0, 0,
          A4_WIDTH_MM,
          sliceHeightMm,
          undefined,
          "FAST"
        );

        yOffset += A4_HEIGHT_MM;
      }
    }

    // ── PDF indir ──
    const fileName = docTitle.endsWith(".pdf") ? docTitle : `${docTitle}.pdf`;
    pdf.save(fileName);

  } catch (err) {
    console.error("[printCV] PDF oluşturma hatası:", err);
    alert("PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
  } finally {
    onDone?.();
  }
}
