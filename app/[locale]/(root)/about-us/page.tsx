"use client";

import AboutUsCallToAction from "@/components/components_page/about_us_page/call_to_action_about_us";
import AboutUsFaq from "@/components/components_page/about_us_page/faq_about_us";
import AboutUsHowWeWork from "@/components/components_page/about_us_page/how_we_works";
import AboutUsReview from "@/components/components_page/about_us_page/review_about_us";
import AboutUsWhatWeDo from "@/components/components_page/about_us_page/what_we_do";
import AboutUsWhyUs from "@/components/components_page/about_us_page/why_us";
import Hero from "@/components/shared/hero";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AboutUs = () => {
  return (
    <div>
      {/* Hero Section */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <Hero
          title={
            <span className="flex items-center gap-2">
              <span>Benvenuto in MioPetit</span>
              <span className="size-10 rounded-full bg-white p-2 text-xl">
                🐾
              </span>
            </span>
          }
          description={
            "L&apos;e-commerce dedicato a chi ama gli animali! Scopri prodotti selezionati con cura per il benessere del tuo amico a quattro zampe."
          }
        />
      </motion.section>

      {/* Come Funzioniamo */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <AboutUsHowWeWork />
      </motion.section>

      {/* Cosa Facciamo */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <AboutUsWhatWeDo />
      </motion.section>

      {/* Perché Sceglierci */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <AboutUsWhyUs />
      </motion.section>

      {/* FAQ */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <AboutUsFaq />
      </motion.section>

      {/* Recensioni */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <AboutUsReview />
      </motion.section>

      {/* Call To Action */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <AboutUsCallToAction />
      </motion.section>
    </div>
  );
};

export default AboutUs;
