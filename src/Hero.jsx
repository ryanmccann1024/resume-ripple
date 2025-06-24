export default function Hero() {
    return (
        <section className="flex flex-col items-center justify-center text-center px-4 py-12 bg-gradient-to-b from-blue-100 to-gray-50 dark:from-slate-800 dark:to-slate-900 transition-colors duration-500">
            <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-4">
                Resume Ripple
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 max-w-2xl mb-2 leading-relaxed">
                Build a clean, ATS‑friendly resume and cover letter in minutes.
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300 font-medium mt-2">
                ⚡️ Runs 100% in your browser — no signups, no servers, no data stored.
            </p>
        </section>
    );
}
