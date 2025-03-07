"use client";
import DynamicButton from "@/components/dynamic-button";
import useCountdown from "@/hooks/use-countdown";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Static date for the countdown (replace with desired date)
const TARGET_DATE = new Date("2025-04-31T23:59:59");

const StatBox = ({ label, value }: { label: string; value: number }) => {
  return (
    <motion.li
      className="flex flex-col items-center justify-center rounded-lg bg-white bg-opacity-20 p-4 shadow-md backdrop-blur-md transition-transform duration-300 hover:scale-105"
      whileHover={{ scale: 1.1 }}
    >
      <p className="text-4xl font-extrabold text-white">{value}</p>
      <p className="text-lg font-medium text-white">{label}</p>
    </motion.li>
  );
};

const DealCountdown = () => {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);

  if (days === null) {
    return (
      <section className="my-20 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-4 text-center md:text-left">
          <h3 className="text-4xl font-bold text-gray-900">
            ⏳ Loading Countdown...
          </h3>
        </div>
      </section>
    );
  }

  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return (
      <section className="my-20 grid grid-cols-1 gap-10 rounded-lg bg-gray-900 p-8 text-center text-white md:grid-cols-2 md:text-left">
        <div className="flex flex-col justify-center gap-4">
          <h3 className="text-4xl font-bold">🚨 Deal Has Ended</h3>
          <p className="text-lg text-gray-300">
            This deal is no longer available. Check out our latest promotions.
          </p>
          <div className="mt-4">
            <DynamicButton className="bg-white text-gray-900 hover:bg-gray-200">
              <Link href="/search">View Products</Link>
            </DynamicButton>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/royal-canin-4.jpg"
            alt="promotion"
            width={350}
            height={350}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="relative my-20 grid grid-cols-1 gap-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-500 p-10 text-white md:grid-cols-2">
      <div className="flex flex-col justify-center gap-4">
        <motion.h3
          className="text-4xl font-extrabold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🎉 Deal Of The Month
        </motion.h3>
        <p className="text-lg text-gray-200">
          Approfitta di questa offerta speciale prima che scada! Sconti
          incredibili su prodotti selezionati per il tuo animale.
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatBox label="Days" value={days} />
          <StatBox label="Hours" value={hours} />
          <StatBox label="Minutes" value={minutes} />
          <StatBox label="Seconds" value={seconds} />
        </ul>
        <div className="mt-6">
          <DynamicButton className="bg-white text-gray-900 hover:bg-gray-200">
            <Link href="/search">View Products</Link>
          </DynamicButton>
        </div>
      </div>
      <div className="flex justify-center">
        <motion.div
          className="relative overflow-hidden rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/royal-canin-4.jpg"
            className="object-cover"
            alt="promotion"
            width={400}
            height={400}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DealCountdown;
