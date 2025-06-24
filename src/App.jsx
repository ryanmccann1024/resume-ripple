import { useState, useEffect } from "react";
import Hero from "./Hero.jsx";
import ResumeForm from "./ResumeForm.jsx";
import ResumePreview from "./ResumePreview.jsx";
import CoverLetterForm from "./CoverLetterForm.jsx";
import SortableItem from "./components/SortableItem.jsx"

import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


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

    const [theme, setTheme] = useState("default");

    const [sectionOrder, setSectionOrder] = useState([
        "summary",
        "experience",
        "skills",
        "education",
        "links",
        "certifications",
    ]);

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
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-500 animate-fadeIn">
            <Hero />
            <ResumeForm data={resumeData} onUpdate={setResumeData} />

            <div className="max-w-2xl mx-auto px-4 py-4">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Resume Theme
                </label>
                <div className="relative">
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-full appearance-none rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm text-gray-700 dark:text-white"
                    >
                        <option value="default">Default</option>
                        <option value="minimal">Minimal</option>
                        <option value="modern">Modern</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                        ▼
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-6">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Reorder Resume Sections
                </h3>

                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={({ active, over }) => {
                        if (active.id !== over?.id) {
                            const oldIndex = sectionOrder.indexOf(active.id);
                            const newIndex = sectionOrder.indexOf(over.id);
                            setSectionOrder(arrayMove(sectionOrder, oldIndex, newIndex));
                        }
                    }}
                >
                    <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
                        {sectionOrder.map((section) => (
                            <SortableItem key={section} id={section} />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>

            <ResumePreview data={resumeData} theme={theme} sectionOrder={sectionOrder} />
            <CoverLetterForm />
        </main>
    );
}

export default App;
