import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ id, children }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // Pass listeners + attributes to specific parts (not whole wrapper)
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
            {children(listeners)}
        </div>
    );
}
