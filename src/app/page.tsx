import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-between p-8 sm:p-20">
      {/* Main Section */}
      <main className="flex flex-col gap-10 items-center text-center">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-lg tracking-wide">
          🎓 School Portal
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/addSchool"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium text-lg shadow-md hover:shadow-xl transition-all text-center"
          >
            ➕ Add School
          </Link>
          <Link
            href="/showSchools"
            className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 font-medium text-lg hover:bg-gray-700 transition-all text-center"
          >
            📖 View Schools
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} School Portal. All rights reserved.
      </footer>
    </div>
  );
}
