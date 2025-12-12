import React, { useState, useRef } from 'react';

const TiltCard = ({ children, className = '' }) => {
  const [tiltTransform, setTiltTransform] = useState('');
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTiltTransform(`perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
  };

  const handleMouseLeave = () => {
    setTiltTransform('perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div style={{ perspective: '1500px' }} className="w-full h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl overflow-visible ${className}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: tiltTransform || 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: 'transform 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
