"use client";

import { APP_NAME } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch("/api/careers") // 🔄 Ottieni i dati dall'API Next.js
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) =>
        console.error("Errore nel caricamento delle offerte di lavoro:", error)
      );
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      {/* 📌 Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Lavora con Noi 🚀
        </h2>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          Entra a far parte del team di MioPetit! Siamo sempre alla ricerca di
          talenti appassionati.
        </p>
      </motion.section>

      {/* 📌 Lista delle Posizioni */}
      <div className="space-y-8">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border border-gray-300 bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {job.title}
                </h3>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-800 dark:text-white">
                  {job.type}
                </span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {job.description}
              </p>

              {/* 📌 Dettagli */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="size-5" /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="size-5" /> {job.salary}
                </span>
              </div>

              {/* 📌 Requisiti */}
              <ul className="mt-4 list-disc space-y-1 pl-5 text-gray-600 dark:text-gray-300">
                {job?.requirements?.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>

              {/* 📌 Pulsante per candidarsi */}
              <div className="mt-6 text-right">
                <a
                  href={`/careers/apply?id=${job.id}`} // Puoi creare una pagina di candidatura
                  className="inline-flex items-center rounded-full bg-indigo-600 px-5 py-2 text-white shadow-md transition hover:bg-indigo-700"
                >
                  Candidati Ora <ArrowRight className="ml-2 size-5" />
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            key={0}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex h-fit flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-700 p-6 text-white"
          >
            {/* Icona */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              className="mb-6"
            >
              <Image
                src="/images/petitLogo.png"
                alt={`${APP_NAME} logo`}
                priority={true}
                width={100}
                height={100}
              />
            </motion.div>

            {/* Testo principale */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              className="text-5xl font-extrabold text-white drop-shadow-lg"
            >
              Careers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-3 max-w-lg text-center text-lg text-gray-200"
            >
              Currently, there are no open positions. Please check back later.
            </motion.p>

            {/* Pulsante di ritorno alla home */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            >
              <Link href="/" className="btn-base btn-tertiary mt-4">
                🔙 Go Back Home
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
