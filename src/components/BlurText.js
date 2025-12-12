import React from 'react';
import { motion } from 'motion/react';

const BlurText = ({
  text,
  delay = 0,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = '',
  ...props
}) => {
  const words = text.split(' ');
  const characters = text.split('');

  const getDirectionOffset = () => {
    switch (direction) {
      case 'top':
        return { y: -20 };
      case 'bottom':
        return { y: 20 };
      case 'left':
        return { x: -20 };
      case 'right':
        return { x: 20 };
      default:
        return { y: -20 };
    }
  };

  const directionOffset = getDirectionOffset();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: animateBy === 'words' ? 0.1 : 0.03,
        delayChildren: delay / 1000,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
      ...directionOffset,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  if (animateBy === 'words') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={onAnimationComplete}
        className={className}
        {...props}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            style={{ display: 'inline-block', marginRight: '0.3em' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onAnimationComplete}
      className={className}
      {...props}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default BlurText;
