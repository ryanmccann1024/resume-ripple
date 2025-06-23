import { useState, useEffect } from "react";
import Hero from "./Hero.jsx";
import ResumeForm from "./ResumeForm.jsx";
import ResumePreview from "./ResumePreview.jsx";
import CoverLetterForm from "./CoverLetterForm.jsx";

function App() {
    const [resumeData, setResumeData] = useState({
        name: "",
        summary: "",
        experience: "",
        skills: "",
    });

    // Load resume data from localStorage on first render
    useEffect(() => {
        const saved = localStorage.getItem("resumeData");
        if (saved) {
            setResumeData(JSON.parse(saved));
        }
    }, []);

    // Save resume data to localStorage on every update
    useEffect(() => {
        localStorage.setItem("resumeData", JSON.stringify(resumeData));
    }, [resumeData]);

    return (
        <main className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
            <Hero />
            <ResumeForm onUpdate={setResumeData} initialData={resumeData} />
            <ResumePreview data={resumeData} />
            <CoverLetterForm />
        </main>
    );
}

export default App;
