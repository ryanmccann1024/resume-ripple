// -----------------------------------------------------------------------------
// Export the *exact DOM you preview* (`#resume-content`) so every <strong>, <em>,
// bullet-list & Tailwind class is preserved visually in PDF, cleanly in DOCX.
//
// 1. PDF  → html2pdf.js (pixel-perfect snapshot with inline bullet fix)
// 2. DOCX → docx (structured output built from DOM — no raw HTML leaks)
//
// Install:
//   npm i html2pdf.js docx file-saver
// -----------------------------------------------------------------------------

import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

/* ----------  Clone and style for PDF  ---------- */
function cloneResume() {
    const original = document.getElementById("resume-content");
    if (!original) throw new Error("#resume-content not found – ensure the preview is mounted.");

    const clone = original.cloneNode(true);

    // Remove UI controls
    clone.querySelectorAll(".screen-only").forEach((el) => el.remove());

    // Inline bullet style for PDF
    clone.querySelectorAll("ul").forEach((ul) => {
        ul.style.listStyleType = "disc";
        ul.style.listStylePosition = "inside";
        ul.style.marginLeft = "0";
        ul.style.paddingLeft = "1em";
    });

    clone.querySelectorAll(".hidden-section").forEach((el) => el.remove());

    clone.querySelectorAll("li").forEach((li) => {
        li.style.marginBottom = "0.4em";
        li.style.display = "list-item";
        li.style.lineHeight = "1.4";
    });

    // Inject page-break style to children
    clone.querySelectorAll(":scope > *").forEach((el) => {
        el.style.breakInside = "avoid";
        el.style.pageBreakInside = "avoid";
    });

    return clone;
}

/* ----------  Export PDF  ---------- */
export function exportResumePDF({ data, sectionOrder, visibleSections, theme }) {
    const node = cloneResume();

    html2pdf()
        .set({
            margin: 0.5,
            filename: `${data.name || "resume"}.pdf`,
            image: { type: "jpeg", quality: 1.0 }, // Max image quality
            html2canvas: { scale: 3, useCORS: true }, // Higher DPI
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
            pagebreak: { mode: ["avoid-all", "css", "legacy"] }, // Smart page breaks
        })
        .from(node)
        .save();
}

/* ----------  Export DOCX  ---------- */
export function exportResumeDOCX({ data, sectionOrder, visibleSections }) {
    const resumeNode = document.getElementById("resume-content");
    if (!resumeNode) throw new Error("#resume-content not found – ensure the preview is mounted.");

    const clone = resumeNode.cloneNode(true);
    clone.querySelectorAll(".screen-only").forEach((el) => el.remove());

    const children = [];

    // Name
    const nameNode = clone.querySelector("h1");
    const nameText = nameNode ? nameNode.textContent.trim() : "Resume";

    children.push(
        new Paragraph({
            children: [
                new TextRun({
                    text: nameText,
                    bold: true,
                    size: 32,
                }),
            ],
            spacing: { after: 300 },
        })
    );

    // Sections
    clone.querySelectorAll("section").forEach((sec) => {
        const title = sec.querySelector("h3");
        if (title) {
            children.push(
                new Paragraph({
                    text: title.textContent.trim(),
                    heading: "Heading2",
                    spacing: { after: 100 },
                })
            );
        }

        // Normal paragraphs
        sec.querySelectorAll("p").forEach((p) => {
            const text = p.textContent.trim();
            if (text) {
                children.push(
                    new Paragraph({
                        text,
                        spacing: { after: 100 },
                    })
                );
            }
        });

        // Bullet lists
        sec.querySelectorAll("ul").forEach((ul) => {
            ul.querySelectorAll("li").forEach((li) => {
                const text = li.textContent.trim();
                if (text) {
                    children.push(
                        new Paragraph({
                            text,
                            bullet: { level: 0 },
                            spacing: { after: 100 },
                        })
                    );
                }
            });
        });
    });

    const doc = new Document({
        sections: [
            {
                children,
            },
        ],
    });

    Packer.toBlob(doc).then((b) => saveAs(b, `${nameText}.docx`));
}
