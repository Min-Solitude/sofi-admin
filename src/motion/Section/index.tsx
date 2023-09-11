import { useInView } from "framer-motion";
import React, { useRef } from "react";
import { motion } from "framer-motion";



interface sectionProps {
  children: React.ReactNode;
}

const Section = ({ children }: sectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      className="w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {children}
    </motion.section>
  );
};

export default Section;
