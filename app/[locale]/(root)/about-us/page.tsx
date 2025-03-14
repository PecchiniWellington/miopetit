"use client";

import AboutUsCallToAction from "@/components/components_page/about_us_page/call_to_action_about_us";
import AboutUsFaq from "@/components/components_page/about_us_page/faq_about_us";
import AboutUsHero from "@/components/components_page/about_us_page/hero";
import AboutUsHowWeWork from "@/components/components_page/about_us_page/how_we_works";
import AboutUsReview from "@/components/components_page/about_us_page/review_about_us";
import AboutUsWhatWeDo from "@/components/components_page/about_us_page/what_we_do";
import AboutUsWhyUs from "@/components/components_page/about_us_page/why_us";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AboutUs = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <AboutUsHero />
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
