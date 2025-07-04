import Button from "./components/Button";
import { motion, AnimatePresence } from "framer-motion";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./components/SortableItem";
import ToggleSwitch from "./components/ToggleSwitch";

/* centralised export helpers */
import {
    exportResumePDF,
    exportResumeDOCX,
} from "./utils/exportResume";

export default function ResumePreview({
                                          data,
                                          theme,
                                          sectionOrder,
                                          visibleSections,
                                          setSectionOrder,
                                          toggleSectionVisibility,
                                      }) {
    const { name } = data;

    /* --------------------  EXPORT HANDLERS  -------------------- */
    // Give React one paint to commit setState triggered by the last toggle.
    const handlePDF = () =>
        requestAnimationFrame(() =>
            exportResumePDF({ data, sectionOrder, visibleSections, theme })
        );

    const handleDOCX = () =>
        requestAnimationFrame(() =>
            exportResumeDOCX({ data, sectionOrder, visibleSections })
        );

    /* ----------------------  HELPERS  ---------------------- */
    const titleMap = {
        summary: "Summary",
        experience: "Experience",
        skills: "Skills",
        education: "Education",
        links: "Links",
        certifications: "Certifications & Awards",
    };

    const renderContent = (key) => {
        if (!data[key]) return null;

        // Skills remain a simple comma‑separated line; everything else may contain rich HTML.
        if (key === "skills") {
            return (
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                    {data.skills}
                </p>
            );
        }

        return (
            <div
                className="text-gray-800 dark:text-gray-200 prose prose-sm sm:prose-base max-w-none"
                dangerouslySetInnerHTML={{ __html: data[key] }}
            />
        );
    };

    /* ---------------------------  UI  --------------------------- */
    return (
        <section className="max-w-2xl mx-auto px-4 py-12">
            {/* Header & export buttons – screen-only so they never hit the PDF */}
            <div className="flex justify-between items-center mb-6 screen-only gap-2 flex-wrap">
                <h2 className="text-2xl font-bold">Live Resume Preview</h2>
                <div className="flex gap-2">
                    <Button onClick={handlePDF}>Export PDF</Button>
                    <Button onClick={handleDOCX}>Export DOCX</Button>
                </div>
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
                    <SortableContext
                        items={sectionOrder}
                        strategy={verticalListSortingStrategy}
                    >
                        <AnimatePresence mode="popLayout">
                            {sectionOrder.map((sectionKey) => {
                                if (!data[sectionKey]) return null;

                                return (
                                    <SortableItem
                                        key={
                                            sectionKey + (visibleSections[sectionKey] ? "-on" : "-off")
                                        }
                                        id={sectionKey}
                                    >
                                        <motion.section
                                            data-section={sectionKey}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className={
                                                !visibleSections[sectionKey]
                                                    ? "opacity-50 hidden-section"
                                                    : ""
                                            }
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-gray-400 screen-only">☰</span>
                                                    <h3
                                                        className={`text-lg font-semibold ${
                                                            theme === "modern"
                                                                ? "uppercase tracking-wide text-blue-600"
                                                                : ""
                                                        }`}
                                                    >
                                                        {titleMap[sectionKey]}
                                                    </h3>
                                                </div>

                                                {/* Toggle wrapped in screen-only so it never lands in the export */}
                                                <div className="screen-only">
                                                    <ToggleSwitch
                                                        checked={visibleSections[sectionKey]}
                                                        onChange={() => toggleSectionVisibility(sectionKey)}
                                                    />
                                                </div>
                                            </div>

                                            {visibleSections[sectionKey] ? (
                                                renderContent(sectionKey)
                                            ) : (
                                                <p className="italic text-gray-400">(Hidden)</p>
                                            )}
                                        </motion.section>
                                    </SortableItem>
                                );
                            })}
                        </AnimatePresence>
                    </SortableContext>
                </DndContext>
            </div>
        </section>
    );
}
