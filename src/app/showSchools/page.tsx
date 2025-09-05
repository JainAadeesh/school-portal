"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type School = {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string;
};

export default function Page() {
  const [schools, setSchools] = useState<School[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/schools`
        );
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data: School[] = await res.json();
        setSchools(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchSchools();
  }, []);

  return (
    <div className="min-h-screen p-15 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-lg tracking-wide">
        🌟 Schools Directory 🌟
      </h1>

      {loading && (
        <p className="text-center text-gray-400 text-lg animate-pulse">
          ⏳ Loading schools...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 text-lg font-medium">
          ❌ {error}
        </p>
      )}

      {!loading && !error && schools.length === 0 && (
        <p className="text-center text-gray-400 text-lg">
          ❌ No schools found. Please add some!
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {schools.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-xl shadow-md overflow-hidden border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-2xl transition-all duration-300"
          >
            {/* Image Section */}
            <div className="relative h-40 overflow-hidden">
              <Image
                src={s.image}
                alt={s.name}
                fill
                className="object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
              />
            </div>

            {/* Content Section */}
            <div className="p-4 text-center">
              <h2 className="font-bold text-lg text-purple-400 mb-1 hover:text-pink-400 transition-colors duration-300">
                {s.name}
              </h2>
              <p className="text-xs text-gray-300">{s.address}</p>
              <p className="text-xs text-gray-400">{s.city}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
