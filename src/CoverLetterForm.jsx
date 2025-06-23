import { useState } from "react";

export default function CoverLetterForm() {
    const [form, setForm] = useState({ jobTitle: "", pitch: "" });
    const [coverLetter, setCoverLetter] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const generateLetter = () => {
        const { jobTitle, pitch } = form;

        // For now, a basic static template (can be replaced with GPT later)
        const letter = `Dear Hiring Manager,

I am writing to express my interest in the ${jobTitle} position. ${pitch}

Thank you for considering my application. I look forward to the opportunity to contribute to your team.

Sincerely,
[Your Name]`;

        setCoverLetter(letter);
    };

    return (
        <section className="max-w-2xl mx-auto px-4 py-12 border-t border-gray-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-6">Cover Letter Generator</h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Job Title</label>
                    <input
                        name="jobTitle"
                        value={form.jobTitle}
                        onChange={handleChange}
                        className="w-full rounded-md border px-4 py-2 dark:bg-slate-800 dark:border-slate-600"
                        placeholder="Frontend Developer"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Why are you a good fit?</label>
                    <textarea
                        name="pitch"
                        value={form.pitch}
                        onChange={handleChange}
                        rows="3"
                        className="w-full rounded-md border px-4 py-2 dark:bg-slate-800 dark:border-slate-600"
                        placeholder="I have 3 years of experience building React apps..."
                    />
                </div>

                <button
                    onClick={generateLetter}
                    className="rounded bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
                >
                    Generate Letter
                </button>

                {coverLetter && (
                    <div className="mt-8 p-6 rounded-md bg-white dark:bg-slate-800 shadow space-y-4 whitespace-pre-line">
                        <h3 className="text-lg font-bold">Generated Cover Letter</h3>
                        <p>{coverLetter}</p>
                    </div>
                )}
            </div>
        </section>
    );
}
