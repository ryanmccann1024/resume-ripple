import Button from "./components/Button";
import RichTextEditor from "./components/RichTextEditor";

export default function ResumeForm({ data, onUpdate }) {
    const handleFieldUpdate = (field) => (value) =>
        onUpdate({ ...data, [field]: value });

    const handleRewriteSummary = () => {
        const improved =
            "Results-driven software engineer with a strong background in building scalable web apps and optimizing user experiences through clean code and thoughtful UX.";
        onUpdate({ ...data, summary: improved });
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
                        onChange={(e) => handleFieldUpdate("name")(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Jane Doe"
                    />
                </div>

                {/* Summary */}
                <div>
                    <label className="block text-sm font-medium mb-1 flex justify-between items-center">
            <span className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 tracking-tight">
              Professional Summary
            </span>
                        <Button
                            type="button"
                            onClick={handleRewriteSummary}
                            variant="link"
                            className="text-blue-500 hover:text-blue-600"
                        >
                            Rewrite with AI
                        </Button>
                    </label>
                    <RichTextEditor
                        value={data.summary}
                        onChange={handleFieldUpdate("summary")}
                        placeholder="A results-driven software engineer with experience in..."
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 tracking-tight">
                        Work Experience
                    </label>
                    <RichTextEditor
                        value={data.experience}
                        onChange={handleFieldUpdate("experience")}
                        placeholder="List your work experience..."
                    />
                </div>

                {/* Skills */}
                <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 tracking-tight">
                        Skills
                    </label>
                    <input
                        name="skills"
                        value={data.skills}
                        onChange={(e) => handleFieldUpdate("skills")(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="JavaScript, Python, React"
                    />
                </div>

                {/* Education */}
                <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 tracking-tight">
                        Education
                    </label>
                    <RichTextEditor
                        value={data.education}
                        onChange={handleFieldUpdate("education")}
                        placeholder="B.S. in Computer Science, University XYZ, 2020"
                    />
                </div>

                {/* Links */}
                <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 tracking-tight">
                        Links
                    </label>
                    <RichTextEditor
                        value={data.links}
                        onChange={handleFieldUpdate("links")}
                        placeholder="https://github.com/yourname, https://yourportfolio.com"
                    />
                </div>

                {/* Certifications & Awards */}
                <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 tracking-tight">
                        Certifications & Awards
                    </label>
                    <RichTextEditor
                        value={data.certifications}
                        onChange={handleFieldUpdate("certifications")}
                        placeholder="AWS Certified Developer, Best Intern Award at Company X..."
                    />
                </div>
            </form>
        </section>
    );
}
