export default function Button({ children, variant = "primary", className = "border border-gray-300 dark:border-slate-600 text-white bg-blue-600 dark:bg-blue-500 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition", ...props }) {
    const base = "font-semibold rounded-md px-4 py-2 transition disabled:opacity-50";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        link: "text-blue-600 text-sm bg-transparent p-0 hover:underline font-normal",
    };

    return (
        <button
            {...props}
            className={`${base} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}
