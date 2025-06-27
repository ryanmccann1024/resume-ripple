export default function Hero() {
    return (
        <section className="flex flex-col items-center justify-center text-center px-4 py-12 bg-gradient-to-b from-blue-100 to-gray-50 dark:from-slate-800 dark:to-slate-900 transition-colors duration-500">
            <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-4">
                Resume Ripple
            </h1>

            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 max-w-3xl mb-2 leading-relaxed">
                Build ATS‑friendly resumes and cover letters — fast, easy, free.
            </p>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium">
                ⚡ 100% browser-based — no signups, no servers, no data stored. Your privacy, guaranteed.
            </p>
        </section>
    );
}
