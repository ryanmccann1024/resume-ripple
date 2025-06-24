import html2pdf from "html2pdf.js";
import Button from "./components/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default function ResumePreview({ data, theme, sectionOrder, visibleSections }) {
    const { name, summary, experience, skills, education, links, certifications } = data;

    const exportPDF = () => {
        const element = document.getElementById("resume-content");
        const options = {
            margin: 0.5,
            filename: `${name || "resume"}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().set(options).from(element).save();
    };

    const exportDOCX = () => {
        const sections = sectionOrder.filter((key) => data[key] && visibleSections[key]);

        const titleMap = {
            summary: "Summary",
            experience: "Experience",
            skills: "Skills",
            education: "Education",
            links: "Links",
            certifications: "Certifications & Awards",
        };

        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: name || "Resume",
                                    bold: true,
                                    size: 32,
                                }),
                            ],
                            spacing: { after: 300 },
                        }),
                        ...sections.flatMap((key) => {
                            const title = new Paragraph({
                                text: titleMap[key],
                                heading: "Heading2",
                                spacing: { after: 100 },
                            });

                            const content =
                                key === "links"
                                    ? data.links.split(",").map((link) =>
                                        new Paragraph({
                                            text: link.trim(),
                                            style: "Normal",
                                            spacing: { after: 100 },
                                        })
                                    )
                                    : key === "certifications"
                                        ? data.certifications.split(",").map((item) =>
                                            new Paragraph({
                                                text: item.trim(),
                                                bullet: { level: 0 },
                                            })
                                        )
                                        : [
                                            new Paragraph({
                                                text: data[key],
                                                style: "Normal",
                                                spacing: { after: 200 },
                                            }),
                                        ];

                            return [title, ...content];
                        }),
                    ],
                },
            ],
        });

        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, `${name || "resume"}.docx`);
        });
    };

    return (
        <section className="max-w-2xl mx-auto px-4 py-12 border-t border-gray-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Live Resume Preview</h2>
                <Button onClick={exportPDF}>Export PDF</Button>
                <Button onClick={exportDOCX}>Export DOCX</Button>
            </div>

            <div
                id="resume-content"
                className={`bg-white dark:bg-slate-800 shadow rounded-lg p-6 space-y-6 print:bg-white print:text-black print:shadow-none ${
                    theme === "minimal"
                        ? "text-sm leading-snug"
                        : theme === "modern"
                            ? "font-sans text-base leading-relaxed"
                            : ""
                }`}
            >
                {name && <h1 className="text-3xl font-bold">{name}</h1>}

                <AnimatePresence mode="popLayout">
                    {sectionOrder.map((sectionKey) => {
                        if (!data[sectionKey] || !visibleSections[sectionKey]) return null;

                        const titleMap = {
                            summary: "Summary",
                            experience: "Experience",
                            skills: "Skills",
                            education: "Education",
                            links: "Links",
                            certifications: "Certifications & Awards",
                        };

                        const content = sectionKey === "links"
                            ? (
                                <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1">
                                    {data.links.split(",").map((link, i) => (
                                        <li key={i}>
                                            <a href={link.trim()} className="text-blue-600 hover:underline break-words" target="_blank" rel="noopener noreferrer">
                                                {link.trim()}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )
                            : sectionKey === "certifications"
                                ? (
                                    <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1">
                                        {data.certifications.split(",").map((item, i) => (
                                            <li key={i}>{item.trim()}</li>
                                        ))}
                                    </ul>
                                )
                                : (
                                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                                        {data[sectionKey]}
                                    </p>
                                );

                        return (
                            <motion.section
                                key={sectionKey}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h3 className={`text-lg font-semibold mb-1 ${theme === "modern" ? "uppercase tracking-wide text-blue-600" : ""}`}>
                                    {titleMap[sectionKey]}
                                </h3>
                                {content}
                            </motion.section>
                        );
                    })}
                </AnimatePresence>

            </div>
        </section>
    );
}
