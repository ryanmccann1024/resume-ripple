import { useEditor, EditorContent } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { Bold, Italic, List } from "lucide-react";

const TailwindBulletList = BulletList.extend({
    renderHTML({ HTMLAttributes }) {
        return ["ul", { ...HTMLAttributes, class: "list-disc ml-5" }, 0];
    },
});

const TailwindOrderedList = OrderedList.extend({
    renderHTML({ HTMLAttributes }) {
        return ["ol", { ...HTMLAttributes, class: "list-decimal ml-5" }, 0];
    },
});

const FixListBackspace = Extension.create({
    addKeyboardShortcuts() {
        return {
            Backspace: ({ editor }) => {
                const { $from } = editor.state.selection;
                const parent = $from.node(-1);
                const isListItem = parent.type.name === "listItem";

                if (isListItem && $from.parentOffset === 0) {
                    // We're at the start of a list item
                    return editor
                        .chain()
                        .liftListItem("listItem")
                        .run();
                }

                return false; // fallback to default
            },
        };
    },
});

export default function RichTextEditor({ value, onChange, placeholder = "" }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ bulletList: false, orderedList: false }),
            TailwindBulletList,
            TailwindOrderedList,
            Placeholder.configure({ placeholder }),
            FixListBackspace,
        ],
        content: value || "",
        editorProps: {
            attributes: {
                class:
                    "ProseMirror text-gray-800 dark:text-gray-200 focus:outline-none min-h-[120px] px-3 py-2",
            },
        },
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    if (!editor) {
        return <div className="border rounded-lg min-h-[120px] bg-white dark:bg-slate-800 animate-pulse" />;
    }

    const Btn = ({ isActive, label, onExec, children }) => (
        <button
            type="button"
            aria-label={label}
            onMouseDown={(e) => {
                e.preventDefault();
                onExec();
            }}
            className={`p-1 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors ${
                isActive ? "bg-gray-200 dark:bg-slate-700" : ""
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 transition-all duration-150 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
            <div className="flex gap-1 p-2 border-b border-gray-200 dark:border-slate-700 text-gray-900 dark:text-gray-100">
                <Btn
                    isActive={editor.isActive("bold")}
                    label="Bold"
                    onExec={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold size={16} strokeWidth={2.5} />
                </Btn>
                <Btn
                    isActive={editor.isActive("italic")}
                    label="Italic"
                    onExec={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic size={16} strokeWidth={2.5} />
                </Btn>
                <Btn
                    isActive={editor.isActive("bulletList")}
                    label="Bullet list"
                    onExec={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <List size={16} strokeWidth={2.5} />
                </Btn>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
