import React from 'react';
import { motion } from 'framer-motion';

// Hero text animation with staggered character reveal
export const HeroText = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating animation for elements
export const FloatingElement = ({ children, delay = 0, duration = 2 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        y: [0, -10, 0] // Floating effect
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Slide-in animation from different directions
export const SlideIn = ({ children, direction = 'up', delay = 0, distance = 50 }) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        scale: 0.95
      }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        scale: 1
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
};

// Fade-in with scale animation
export const FadeInScale = ({ children, delay = 0, scale = 0.9 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: scale }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.34, 1.56, 0.64, 1] // Bounce effect
      }}
    >
      {children}
    </motion.div>
  );
};

// Staggered container for multiple elements
export const StaggeredHero = ({ children, delay = 0, stagger = 0.2 }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delay: delay,
            staggerChildren: stagger,
            delayChildren: delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Individual staggered item
export const StaggeredHeroItem = ({ children }) => {
  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        visible: { 
          opacity: 1, 
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}; 