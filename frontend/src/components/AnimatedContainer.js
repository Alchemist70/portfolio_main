import React from 'react';
import { motion } from 'framer-motion';

const AnimatedContainer = ({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  y = 60,
  className,
  stagger = 0.1,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: y,
        scale: 0.95
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: 1
      }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Smooth cubic-bezier
        scale: {
          duration: duration * 0.8,
          ease: [0.34, 1.56, 0.64, 1] // Bounce effect for scale
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Enhanced container for staggered children animations
export const StaggeredContainer = ({ 
  children, 
  delay = 0, 
  stagger = 0.15,
  className,
  ...props 
}) => {
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
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Individual item for staggered animations
export const StaggeredItem = ({ children, className, ...props }) => {
  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0, 
          y: 50,
          scale: 0.9
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
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer; 