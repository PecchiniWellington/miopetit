"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CustomSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

const CustomSwitch = ({
  checked,
  onCheckedChange,
  disabled = false,
}: CustomSwitchProps) => {
  return (
    <button
      onClick={() => !disabled && onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition",
        checked
          ? "bg-indigo-600 dark:bg-indigo-500"
          : "bg-gray-300 dark:bg-gray-700",
        disabled && "cursor-not-allowed opacity-60"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "inline-block size-4 rounded-full bg-white shadow-md",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
};

export default CustomSwitch;
