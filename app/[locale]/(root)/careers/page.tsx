"use client";

import Hero from "@/components/shared/hero";
import BrandNotFound from "@/components/shared/not-found";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";
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
    <div className="mx-auto flex  w-full flex-col gap-12 px-6 ">
      {/* 📌 Hero Section */}

      <Hero
        title="Lavora con Noi 🚀"
        description="Entra a far parte del team di MioPetit! Siamo sempre alla ricerca di
          talenti appassionati."
      />

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
              <div className="mt-6 flex w-full items-center justify-end  text-right">
                <Link
                  href={`/careers/apply?id=${job.id}`} // Puoi creare una pagina di candidatura
                  className="btn-base btn-primary btn-medium w-fit"
                >
                  Candidati Ora <ArrowRight className="ml-2 size-5" />
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <BrandNotFound
            title="  Careers"
            description=" Currently, there are no open positions. Please check back later."
          />
        )}
      </div>
    </div>
  );
}
