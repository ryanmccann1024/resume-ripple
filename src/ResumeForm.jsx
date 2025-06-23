export default function ResumeForm({ onUpdate, initialData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onUpdate({ ...initialData, [name]: value });
    };

    return (
        <section className="max-w-2xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-6">Fill Out Your Resume</h2>

            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        name="name"
                        value={initialData.name}
                        onChange={handleChange}
                        className="w-full rounded-md border px-4 py-2 dark:bg-slate-800 dark:border-slate-600"
                        placeholder="Jane Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Professional Summary</label>
                    <textarea
                        name="summary"
                        value={initialData.summary}
                        onChange={handleChange}
                        rows="3"
                        className="w-full rounded-md border px-4 py-2 dark:bg-slate-800 dark:border-slate-600"
                        placeholder="A results-driven software engineer with experience in..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Work Experience</label>
                    <textarea
                        name="experience"
                        value={initialData.experience}
                        onChange={handleChange}
                        rows="4"
                        className="w-full rounded-md border px-4 py-2 dark:bg-slate-800 dark:border-slate-600"
                        placeholder="Software Engineer at XYZ Corp..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Skills</label>
                    <input
                        name="skills"
                        value={initialData.skills}
                        onChange={handleChange}
                        className="w-full rounded-md border px-4 py-2 dark:bg-slate-800 dark:border-slate-600"
                        placeholder="JavaScript, Python, React"
                    />
                </div>
            </form>
        </section>
    );
}
