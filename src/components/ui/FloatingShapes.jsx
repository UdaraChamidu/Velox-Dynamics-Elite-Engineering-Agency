import React from 'react';
import { motion } from 'framer-motion';

const FloatingShapes = () => {
  const shapes = [
    { size: 120, x: '10%', y: '20%', duration: 20, delay: 0 },
    { size: 80, x: '80%', y: '10%', duration: 25, delay: 2 },
    { size: 100, x: '70%', y: '60%', duration: 22, delay: 4 },
    { size: 60, x: '20%', y: '70%', duration: 18, delay: 1 },
    { size: 90, x: '50%', y: '40%', duration: 24, delay: 3 },
    { size: 70, x: '90%', y: '80%', duration: 20, delay: 5 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        >
          <div
            className="w-full h-full border-2 border-primary/20 rounded-lg"
            style={{
              background: `linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)`,
              boxShadow: '0 0 40px rgba(168, 85, 247, 0.1)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingShapes;
