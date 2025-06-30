import { useRef } from "react";
import Button from "./components/Button";

export default function ResumeForm({ data, onUpdate }) {
    const experienceRef = useRef(null);
    const educationRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onUpdate({ ...data, [name]: value });
    };

    const handleRewriteSummary = () => {
        const improved = "Results-driven software engineer with a strong background in building scalable web apps and optimizing user experiences through clean code and thoughtful UX.";
        onUpdate({ ...data, summary: improved });
    };

    const autoGrow = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleExperienceChange = (e) => {
        // No auto bullets — total freedom
        onUpdate({ ...data, experience: e.target.value });
    };

    const insertBullet = () => {
        const textarea = experienceRef.current;
        if (!textarea) return;

        const { selectionStart, selectionEnd, value } = textarea;
        const before = value.substring(0, selectionStart);
        const after = value.substring(selectionEnd);

        const newValue = before + '• ' + after;
        onUpdate({ ...data, experience: newValue });

        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = before.length + 2;
        }, 0);
    };

    const insertEducationBullet = () => {
        const textarea = educationRef.current;
        if (!textarea) return;

        const { selectionStart, selectionEnd, value } = textarea;
        const before = value.substring(0, selectionStart);
        const after = value.substring(selectionEnd);

        const newValue = before + '• ' + after;
        onUpdate({ ...data, education: newValue });

        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = before.length + 2;
        }, 0);
    };

    return (
        <section className="max-w-2xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-6">Fill Out Your Resume</h2>

            <form className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 tracking-tight">
                        Full Name
                    </label>
                    <input
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Jane Doe"
                    />
                </div>

                {/* Summary */}
                <div>
                    <label className="block text-sm font-medium mb-1 flex justify-between items-center">
                        <span className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 tracking-tight">Professional Summary</span>
                        <Button
                            type="button"
                            onClick={handleRewriteSummary}
                            variant="link"
                            className="text-blue-500 hover:text-blue-600"
                        >
                            Rewrite with AI
                        </Button>
                    </label>
                    <textarea
                        name="summary"
                        value={data.summary}
                        onChange={handleChange}
                        onInput={autoGrow}
                        rows="3"
                        className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition max-h-64 overflow-auto"
                        placeholder="A results-driven software engineer with experience in..."
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 tracking-tight">
                        Work Experience
                    </label>
                    <textarea
                        ref={experienceRef}
                        name="experience"
                        value={data.experience}
                        onChange={handleExperienceChange}
                        onInput={autoGrow}
                        rows="4"
                        className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition max-h-64 overflow-auto"
                        placeholder="List your work experience..."
                    />
                    <div className="mt-2">
                        <Button
                            type="button"
                            onClick={insertBullet}
                        >
                            Insert Bullet
                        </Button>
                    </div>
                </div>

                {/* Skills */}
                <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 tracking-tight">
                        Skills
                    </label>
                    <input
                        name="skills"
                        value={data.skills}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="JavaScript, Python, React"
                    />
                </div>

                {/* Education */}
                <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 tracking-tight">
                        Education
                    </label>
                    <textarea
                        ref={educationRef}
                        name="education"
                        value={data.education}
                        onChange={handleChange}
                        onInput={autoGrow}
                        rows="3"
                        className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition max-h-64 overflow-auto"
                        placeholder="B.S. in Computer Science, University XYZ, 2020"
                    />
                </div>
                <div className="mt-2">
                    <Button
                        type="button"
                        onClick={insertEducationBullet}
                    >
                        Insert Bullet
                    </Button>
                </div>

                {/* Links */}
                <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 tracking-tight">
                        Links
                    </label>
                    <textarea
                        name="links"
                        value={data.links}
                        onChange={handleChange}
                        onInput={autoGrow}
                        rows="2"
                        className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition max-h-64 overflow-auto"
                        placeholder="https://github.com/yourname, https://yourportfolio.com"
                    />
                </div>

                {/* Certifications & Awards */}
                <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 tracking-tight">
                        Certifications & Awards
                    </label>
                    <textarea
                        name="certifications"
                        value={data.certifications}
                        onChange={handleChange}
                        onInput={autoGrow}
                        rows="3"
                        className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition max-h-64 overflow-auto"
                        placeholder="AWS Certified Developer, Best Intern Award at Company X..."
                    />
                </div>
            </form>
        </section>
    );
}
