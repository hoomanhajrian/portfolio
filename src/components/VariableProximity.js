import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const VariableProximity = ({
  label,
  className = '',
  fromFontVariationSettings = "'wght' 400, 'opsz' 9",
  toFontVariationSettings = "'wght' 1000, 'opsz' 40",
  containerRef,
  radius = 100,
  falloff = 'linear',
  ...props
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const textRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animation for smooth movement
  const springConfig = { stiffness: 200, damping: 20 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
  }, [label]);

  useEffect(() => {
    const container = containerRef?.current || document.body;

    const handleMouseMove = (e) => {
      if (!textRef.current) return;
      
      const rect = textRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef, mouseX, mouseY]);

  // Parse font variation settings
  const parseFontSettings = (settings) => {
    const matches = settings.match(/'(\w+)'\s+(\d+)/g) || [];
    return matches.reduce((acc, match) => {
      const [, key, value] = match.match(/'(\w+)'\s+(\d+)/) || [];
      if (key && value) acc[key] = parseInt(value);
      return acc;
    }, {});
  };

  const fromSettings = parseFontSettings(fromFontVariationSettings);
  const toSettings = parseFontSettings(toFontVariationSettings);

  // Calculate distance-based font variation
  const fontVariationSettings = useTransform(
    [mouseXSpring, mouseYSpring],
    ([x, y]) => {
      const distance = Math.sqrt(x * x + y * y);
      
      let progress = 0;
      if (distance < radius) {
        if (falloff === 'linear') {
          progress = 1 - distance / radius;
        } else if (falloff === 'exponential') {
          progress = Math.pow(1 - distance / radius, 2);
        } else {
          progress = 1 - distance / radius;
        }
      }

      const settings = Object.keys(fromSettings).map((key) => {
        const from = fromSettings[key];
        const to = toSettings[key] || from;
        const value = from + (to - from) * progress;
        return `'${key}' ${Math.round(value)}`;
      });

      return settings.join(', ');
    }
  );

  return (
    <motion.span
      ref={textRef}
      className={className}
      style={{
        fontVariationSettings,
        display: 'inline-block',
        cursor: 'default',
      }}
      {...props}
    >
      {label}
    </motion.span>
  );
};

export default VariableProximity;
