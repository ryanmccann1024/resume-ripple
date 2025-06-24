import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ id }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded px-3 py-2 mb-2"
        >
            <span className="capitalize text-sm">{id.replace("_", " ")}</span>
            <button
                {...attributes}
                {...listeners}
                className="cursor-move text-gray-500 hover:text-blue-600 text-sm"
            >
                ☰
            </button>
        </div>
    );
}
