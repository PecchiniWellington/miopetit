"use client";
import SustainabilityFaq from "@/components/components_page/sustainability_page.tsx/sustainability_faq";
import SustainabilityHowWeWork from "@/components/components_page/sustainability_page.tsx/sustainability_how_we_work";
import SustainabilityWhatWeDo from "@/components/components_page/sustainability_page.tsx/sustainability_what_we_do";
import SustainabilityWhyUs from "@/components/components_page/sustainability_page.tsx/sustainability_why_us";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const Sustainability = () => {
  return (
    <div className="space-y-16">
      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <SustainabilityHowWeWork />
      </motion.section>
      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <SustainabilityWhatWeDo />
      </motion.section>
      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <SustainabilityWhyUs />
      </motion.section>
      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <SustainabilityFaq />
      </motion.section>
    </div>
  );
};

export default Sustainability;
