import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const titleMap = {
    summary: "Summary",
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    links: "Links",
    certifications: "Certifications & Awards",
};

function stripHtmlTags(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
}

export function exportResumePDF({ data, sectionOrder, visibleSections, theme }) {
    const wrap = document.createElement("div");
    wrap.className = `bg-white p-6 space-y-6 ${
        theme === "minimal"
            ? "text-sm leading-snug"
            : theme === "modern"
                ? "font-sans text-base leading-relaxed"
                : ""
    }`;

    if (data.name) {
        const h1 = document.createElement("h1");
        h1.textContent = data.name;
        h1.className = "text-3xl font-bold";
        wrap.appendChild(h1);
    }

    sectionOrder.forEach((key) => {
        if (!visibleSections[key] || !data[key]) return;
        const section = document.createElement("section");
        section.className = "space-y-1";

        const h3 = document.createElement("h3");
        h3.textContent = titleMap[key];
        h3.className = "text-lg font-semibold";
        section.appendChild(h3);

        if (key === "links" || key === "certifications") {
            const ul = document.createElement("ul");
            ul.className = "list-disc list-inside";
            data[key].split(",").forEach((item) => {
                const li = document.createElement("li");
                li.textContent = item.trim();
                ul.appendChild(li);
            });
            section.appendChild(ul);
        } else {
            const p = document.createElement("p");
            p.textContent = stripHtmlTags(data[key]);
            section.appendChild(p);
        }

        wrap.appendChild(section);
    });

    html2pdf()
        .set({
            margin: 0.5,
            filename: `${data.name || "resume"}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .from(wrap)
        .save();
}

export function exportResumeDOCX({ data, sectionOrder, visibleSections }) {
    const included = sectionOrder.filter((k) => data[k] && visibleSections[k]);

    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({ text: data.name || "Resume", bold: true, size: 32 }),
                        ],
                        spacing: { after: 300 },
                    }),
                    ...included.flatMap((key) => {
                        const title = new Paragraph({
                            text: titleMap[key],
                            heading: "Heading2",
                            spacing: { after: 100 },
                        });

                        const cleanText = stripHtmlTags(data[key]);

                        const content =
                            key === "links"
                                ? data.links.split(",").map((link) =>
                                    new Paragraph({ text: link.trim(), spacing: { after: 100 } })
                                )
                                : key === "certifications"
                                    ? data.certifications.split(",").map((c) =>
                                        new Paragraph({ text: c.trim(), bullet: { level: 0 } })
                                    )
                                    : [
                                        new Paragraph({
                                            text: cleanText,
                                            spacing: { after: 200 },
                                        }),
                                    ];

                        return [title, ...content];
                    }),
                ],
            },
        ],
    });

    Packer.toBlob(doc).then((blob) => saveAs(blob, `${data.name || "resume"}.docx`));
}
