"use client";

export type ParsedFile = {
  text: string;
  pageCount: number;
  fileType: string;
};

export async function parseFile(file: File): Promise<ParsedFile> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf" || file.type === "application/pdf") {
    return parsePdf(file);
  }
  if (ext === "txt" || file.type.startsWith("text/")) {
    const text = await file.text();
    return { text, pageCount: 1, fileType: "TXT" };
  }
  throw new Error(
    `Unsupported file type: .${ext || "unknown"}. Please upload a PDF or TXT file.`,
  );
}

async function parsePdf(file: File): Promise<ParsedFile> {
  const pdfjs: any = await import("pdfjs-dist/legacy/build/pdf.js");
  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
  }
  const buf = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: buf }).promise;
  let text = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((it: any) => ("str" in it ? it.str : ""))
      .join(" ");
    text += pageText + "\n\n";
  }
  return { text, pageCount: doc.numPages, fileType: "PDF" };
}
