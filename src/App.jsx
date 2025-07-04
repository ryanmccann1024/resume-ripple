import { useState, useEffect } from "react";
import Hero from "./Hero.jsx";
import ResumeForm from "./ResumeForm.jsx";
import ResumePreview from "./ResumePreview.jsx";

function App() {
    const [resumeData, setResumeData] = useState({
        name: "",
        summary: "",
        experience: "",
        skills: "",
        education: "",
        links: "",
        certifications: "",
    });

    const [visibleSections, setVisibleSections] = useState({
        summary: true,
        experience: true,
        skills: true,
        education: true,
        links: true,
        certifications: true,
    });

    const [theme, setTheme] = useState("default");

    const [sectionOrder, setSectionOrder] = useState([
        "summary",
        "experience",
        "skills",
        "education",
        "links",
        "certifications",
    ]);

    useEffect(() => {
        document.title = "Resume Ripple";
    }, []);

    useEffect(() => {
        const savedData = localStorage.getItem("resumeData");
        if (savedData) {
            setResumeData(JSON.parse(savedData));
        }

        const savedVisible = localStorage.getItem("visibleSections");
        if (savedVisible) {
            setVisibleSections(JSON.parse(savedVisible));
        }

        const savedOrder = localStorage.getItem("sectionOrder");
        if (savedOrder) {
            setSectionOrder(JSON.parse(savedOrder));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("resumeData", JSON.stringify(resumeData));
    }, [resumeData]);

    useEffect(() => {
        localStorage.setItem("visibleSections", JSON.stringify(visibleSections));
    }, [visibleSections]);

    useEffect(() => {
        localStorage.setItem("sectionOrder", JSON.stringify(sectionOrder));
    }, [sectionOrder]);


    const toggleSectionVisibility = (key) => {
        setVisibleSections((prevVisible) => ({
            ...prevVisible,
            [key]: !prevVisible[key],
        }));
    };

    console.log("🚀 Render: sectionOrder", sectionOrder);
    console.log("🚀 Render: visibleSections", visibleSections);

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-500 animate-fadeIn">
            <Hero />

            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 max-w-7xl mx-auto px-4 py-8">
                <div className="lg:w-1/2">
                    <ResumeForm data={resumeData} onUpdate={setResumeData} />
                </div>
                <div className="lg:w-1/2 min-w-0">
                    <div className="mb-2 text-center text-xs text-gray-500 dark:text-gray-400">
                        Tip: Drag and drop sections to reorder them!
                    </div>
                    <ResumePreview
                        data={resumeData}
                        theme={theme}
                        sectionOrder={sectionOrder}
                        visibleSections={visibleSections}
                        setSectionOrder={setSectionOrder}
                        toggleSectionVisibility={toggleSectionVisibility}
                    />
                </div>
            </div>
        </main>
    );
}

export default App;
