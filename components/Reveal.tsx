'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  },
  down: {
    hidden: { opacity: 0, y: -24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  },
  left: {
    hidden: { opacity: 0, x: -32 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  },
  right: {
    hidden: { opacity: 0, x: 32 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
  },
  blur: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
  },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: keyof typeof variants;
  once?: boolean;
  amount?: number;
  as?: 'div' | 'section' | 'li' | 'span';
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
  amount = 0.25,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants[direction]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggered container — pair with <RevealItem/> */
export function RevealGroup({
  children,
  className = '',
  stagger = 0.08,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = '',
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  direction?: keyof typeof variants;
}) {
  return (
    <motion.div className={className} variants={variants[direction]}>
      {children}
    </motion.div>
  );
}

export default Reveal;
