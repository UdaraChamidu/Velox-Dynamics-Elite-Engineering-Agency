import React from 'react';
import { motion } from 'framer-motion';

const FloatingShapes = () => {
  const [shapes, setShapes] = React.useState([]);

  React.useEffect(() => {
    const generateShapes = () => {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 5 : 10;
      const newShapes = [];

      // Define grid sectors to ensure distribution
      // 2 columns for mobile (2x3 grid = 6 slots for 5 items)
      // 3 columns for desktop (3x4 grid = 12 slots for 10 items)
      const cols = isMobile ? 2 : 3;
      const rows = isMobile ? 3 : 4;
      const sectorWidth = 100 / cols;
      const sectorHeight = 100 / rows;
      
      const sectors = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          sectors.push({ r, c });
        }
      }

      // Shuffle sectors to randomize which slots get filled
      for (let i = sectors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sectors[i], sectors[j]] = [sectors[j], sectors[i]];
      }

      for (let i = 0; i < count; i++) {
        // Use a unique sector for each shape if possible
        const sector = sectors[i] || sectors[0]; // Fallback if count > sectors (unlikely with this math)
        
        // Randomize position WITHIN the sector
        // Add 5% padding to avoid edges
        const minX = (sector.c * sectorWidth) + 5;
        const maxX = ((sector.c + 1) * sectorWidth) - 15; // -15 for shape size approx
        const minY = (sector.r * sectorHeight) + 5;
        const maxY = ((sector.r + 1) * sectorHeight) - 15;

        const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

        // Randomize rotation
        const rotationDuration = Math.floor(Math.random() * 30) + 30;
        const rotationDirection = Math.random() > 0.5 ? 1 : -1;
        const rotateValue = 360 * rotationDirection;

        newShapes.push({
          size: Math.floor(Math.random() * 50) + 60, // 60-110px
          x: `${x}%`,
          y: `${y}%`,
          duration: Math.floor(Math.random() * 20) + 20,
          delay: Math.random() * 5,
          rotateValue: rotateValue,
          rotationDuration: rotationDuration
        });
      }
      setShapes(newShapes);
    };

    generateShapes();

    // Add resize listener to regenerate on screen size change
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(generateShapes, 200); // Debounce
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

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
            y: [0, -50, 0], // Increased movement range
            x: [0, 30, 0],
            rotate: [0, shape.rotateValue],
          }}
          transition={{
            y: {
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay
            },
            x: {
              duration: shape.duration * 1.2, // Different duration for x to create organic path
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay
            },
            rotate: {
              duration: shape.rotationDuration,
              repeat: Infinity,
              ease: "linear", 
              delay: shape.delay
            }
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
