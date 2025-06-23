export default function ResumeForm({ data, onUpdate }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onUpdate({ ...data, [name]: value });
    };

    const handleRewriteSummary = () => {
        const improved = "Results-driven software engineer with a strong background in building scalable web apps and optimizing user experiences through clean code and thoughtful UX.";
        onUpdate({ ...data, summary: improved });
    };

    return (
        <section className="max-w-2xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-6">Fill Out Your Resume</h2>

            <form className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className="w-full rounded-md border px-4 py-2 dark:bg-slate-800 dark:border-slate-600"
                        placeholder="Jane Doe"
                    />
                </div>

                {/* Summary */}
                <div>
                    <label className="block text-sm font-medium mb-1 flex justify-between items-center">
                        <span>Professional Summary</span>
                        <button
                            type="button"
                            onClick={handleRewriteSummary}
                            className="text-blue-600 text-sm hover:underline"
                        >
                            Rewrite with AI
                        </button>
                    </label>
                    <textarea
                        name="summary"
                        value={data.summary}
                        onChange={handleChange}
                        rows="3"
                        className="w-full rounded-md border px-4 py-2 dark:bg-slate-800 dark:border-slate-600"
                        placeholder="A results-driven software engineer with experience in..."
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="block text-sm font-medium mb-1">Work Experience</label>
                    <textarea
                        name="experience"
                        value={data.experience}
                        onChange={handleChange}
                        rows="4"
                        className="w-full rounded-md border px-4 py-2 dark:bg-slate-800 dark:border-slate-600"
                        placeholder="Software Engineer at XYZ Corp..."
                    />
                </div>

                {/* Skills */}
                <div>
                    <label className="block text-sm font-medium mb-1">Skills</label>
                    <input
                        name="skills"
                        value={data.skills}
                        onChange={handleChange}
                        className="w-full rounded-md border px-4 py-2 dark:bg-slate-800 dark:border-slate-600"
                        placeholder="JavaScript, Python, React"
                    />
                </div>
            </form>
        </section>
    );
}

