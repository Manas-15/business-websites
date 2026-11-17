"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Fades content in once it scrolls into view. Honours the visitor's reduced-motion
 * setting. Motion is only loaded on pages that use this component.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
