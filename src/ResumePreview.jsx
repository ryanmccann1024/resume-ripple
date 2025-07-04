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

    const handlePDF = () =>
        requestAnimationFrame(() =>
            exportResumePDF({ data, sectionOrder, visibleSections, theme })
        );

    const handleDOCX = () =>
        requestAnimationFrame(() =>
            exportResumeDOCX({ data, sectionOrder, visibleSections })
        );

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

    return (
        <section className="max-w-2xl mx-auto px-4 py-12">
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

                                if (!visibleSections[sectionKey]) {
                                    return (
                                        <motion.div
                                            key={sectionKey}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.5 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="screen-only italic text-gray-400 flex justify-between items-center border border-dashed border-gray-300 p-2 rounded"
                                        >
                                            <span>
                                                {titleMap[sectionKey]} (Hidden)
                                            </span>
                                            <div className="screen-only">
                                                <ToggleSwitch
                                                    checked={false}
                                                    onChange={() => toggleSectionVisibility(sectionKey)}
                                                />
                                            </div>
                                        </motion.div>
                                    );
                                }

                                return (
                                    <SortableItem
                                        key={sectionKey}
                                        id={sectionKey}
                                    >
                                        {(listeners) => (
                                            <motion.section
                                                data-section={sectionKey}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                style={{
                                                    breakInside: "avoid",
                                                    pageBreakInside: "avoid",
                                                }}
                                            >
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="flex items-center gap-1">
                                                        <span
                                                            className="text-gray-400 screen-only cursor-grab"
                                                            {...listeners}
                                                        >
                                                            ☰
                                                        </span>
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

                                                    <div className="screen-only">
                                                        <ToggleSwitch
                                                            checked={true}
                                                            onChange={() =>
                                                                toggleSectionVisibility(sectionKey)
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {renderContent(sectionKey)}
                                            </motion.section>
                                        )}
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
