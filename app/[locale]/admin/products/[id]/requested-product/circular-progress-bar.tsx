"use client";

import { motion } from "framer-motion";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircularProgress({ value }: { value: number }) {
  const gradientId = "progress-gradient";

  return (
    <motion.div
      className="relative size-40 drop-shadow-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>

      <CircularProgressbarWithChildren
        value={70}
        styles={buildStyles({
          pathColor: `url(#${gradientId})`,
          trailColor: "#1f2937",
          strokeLinecap: "round",
        })}
      >
        <div className="text-xl font-bold text-white">{Math.floor(70)}%</div>
        <p className="mt-1 text-xs text-gray-300">Completato</p>
      </CircularProgressbarWithChildren>
    </motion.div>
  );
}
