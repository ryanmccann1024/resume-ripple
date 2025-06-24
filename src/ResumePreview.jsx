import html2pdf from "html2pdf.js";
import Button from "./components/Button";

export default function ResumePreview({ data, theme }) {
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

    return (
        <section className="max-w-2xl mx-auto px-4 py-12 border-t border-gray-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Live Resume Preview</h2>
                <Button onClick={exportPDF}>Export PDF</Button>
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

                {summary && (
                    <section>
                        <h3
                            className={`text-lg font-semibold mb-1 ${
                                theme === "modern" ? "uppercase tracking-wide text-blue-600" : ""
                            }`}
                        >
                            Summary
                        </h3>
                        <p className="text-gray-800 dark:text-gray-200">{summary}</p>
                    </section>
                )}

                {experience && (
                    <section>
                        <h3
                            className={`text-lg font-semibold mb-1 ${
                                theme === "modern" ? "uppercase tracking-wide text-blue-600" : ""
                            }`}
                        >
                            Experience
                        </h3>
                        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{experience}</p>
                    </section>
                )}

                {skills && (
                    <section>
                        <h3
                            className={`text-lg font-semibold mb-1 ${
                                theme === "modern" ? "uppercase tracking-wide text-blue-600" : ""
                            }`}
                        >
                            Skills
                        </h3>
                        <p className="text-gray-800 dark:text-gray-200">{skills}</p>
                    </section>
                )}

                {education && (
                    <section>
                        <h3
                            className={`text-lg font-semibold mb-1 ${
                                theme === "modern" ? "uppercase tracking-wide text-blue-600" : ""
                            }`}
                        >
                            Education
                        </h3>
                        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{education}</p>
                    </section>
                )}

                {links && (
                    <section>
                        <h3
                            className={`text-lg font-semibold mb-1 ${
                                theme === "modern" ? "uppercase tracking-wide text-blue-600" : ""
                            }`}
                        >
                            Links
                        </h3>
                        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1">
                            {links
                                .split(",")
                                .map((link, i) => (
                                    <li key={i}>
                                        <a
                                            href={link.trim()}
                                            className="text-blue-600 hover:underline break-words"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link.trim()}
                                        </a>
                                    </li>
                                ))}
                        </ul>
                    </section>
                )}

                {certifications && (
                    <section>
                        <h3
                            className={`text-lg font-semibold mb-1 ${
                                theme === "modern" ? "uppercase tracking-wide text-blue-600" : ""
                            }`}
                        >
                            Certifications & Awards
                        </h3>
                        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1">
                            {certifications
                                .split(",")
                                .map((item, i) => (
                                    <li key={i}>{item.trim()}</li>
                                ))}
                        </ul>
                    </section>
                )}

            </div>
        </section>
    );
}
