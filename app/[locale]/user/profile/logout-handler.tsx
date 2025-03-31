"use client";

import { motion } from "framer-motion";
import { Loader2, XCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutHandler = () => {
  const router = useRouter();

  useEffect(() => {
    // ⏳ Dopo 5 secondi esegue il logout e reindirizza
    const logoutTimer = setTimeout(() => {
      signOut().then(() => {
        router.push("/sign-in");
      });
    }, 5000);

    return () => clearTimeout(logoutTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* 🔲 Overlay sfocato */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      {/* 🏆 Card animata */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-50 flex flex-col items-center gap-5 rounded-lg bg-white px-10 py-12 shadow-2xl"
      >
        {/* ❌ Icona di errore animata */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <XCircle className="size-16 animate-pulse text-red-600" />
        </motion.div>

        <h2 className="text-2xl font-bold text-gray-900">
          Account Eliminato! 😢
        </h2>
        <p className="text-center text-gray-700">
          Ci dispiace che tu sia andato via. Se hai bisogno, <br />
          puoi sempre tornare a trovarci! ❤️
        </p>
        <p className="mt-2 text-sm text-gray-500">
          ⏳ Verrai reindirizzato alla pagina di login a breve...
        </p>

        {/* ⏳ Loader animato */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        >
          <Loader2 className="mt-4 size-12 text-red-500" />
        </motion.div>

        {/* 🔙 Pulsante per tornare alla home */}
        <motion.button
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 rounded-full bg-gradient-to-r from-red-600 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition"
        >
          🏠 Torna alla Homepage
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LogoutHandler;
