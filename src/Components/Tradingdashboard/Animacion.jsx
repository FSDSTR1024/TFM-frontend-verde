import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ParticleAnimation = () => {
  const [particles, setParticles] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const animationRef = useRef(null);
  const particleCount = 15;

  // Función para actualizar dimensiones y partículas
  const updateDimensions = () => {
    if (!containerRef.current || !svgRef.current) return;
    
    // Obtener dimensiones reales del contenedor
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Actualizar el tamaño del SVG explícitamente
    svgRef.current.setAttribute('width', width);
    svgRef.current.setAttribute('height', height);
    
    setDimensions({ width, height });
    
    // Reposicionar partículas dentro de las nuevas dimensiones
    setParticles(prev => {
      if (prev.length === 0) {
        // Crear partículas iniciales
        return Array.from({ length: particleCount }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 2 + 2
        }));
      } else {
        // Ajustar partículas existentes a las nuevas dimensiones
        return prev.map(p => ({
          ...p,
          x: Math.min(p.x, width),
          y: Math.min(p.y, height)
        }));
      }
    });
  };

  // Inicializar y manejar cambios de tamaño
  useEffect(() => {
    // Ejecutar después del renderizado inicial
    setTimeout(updateDimensions, 0);
    
    // Configurar observer para detectar cambios de tamaño
    const observer = new ResizeObserver(() => {
      updateDimensions();
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    // Agregar listener para cambios de ventana también
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Animar partículas
  useEffect(() => {
    if (!dimensions.width || !dimensions.height || particles.length === 0) return;
    
    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Actualizar posición
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;
          
          // Rebotar en los bordes
          if (newX <= 0 || newX >= dimensions.width) {
            particle.vx *= -1;
            newX = Math.max(0, Math.min(newX, dimensions.width));
          }
          
          if (newY <= 0 || newY >= dimensions.height) {
            particle.vy *= -1;
            newY = Math.max(0, Math.min(newY, dimensions.height));
          }
          
          return {
            ...particle,
            x: newX,
            y: newY
          };
        })
      );
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, particles.length]);

  // Calcular distancia entre partículas
  const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  // Determinar si dibujar línea entre partículas
  const shouldDrawLine = (p1, p2) => {
    const maxDistance = Math.min(dimensions.width, dimensions.height) / 4;
    return getDistance(p1, p2) < maxDistance;
  };

  const handleButtonClick = () => {
    // Añadir efecto al hacer clic en el botón
    setParticles(prevParticles => 
      prevParticles.map(particle => ({
        ...particle,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4
      }))
    );
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#213435' }}
    >
      <svg 
        ref={svgRef} 
        className="absolute top-0 left-0" 
        width="100%" 
        height="100%"
        preserveAspectRatio="none"
      >
        {/* Líneas entre partículas */}
        {particles.map((p1, i) => 
          particles.slice(i + 1).map((p2, j) => 
            shouldDrawLine(p1, p2) && (
              <line 
                key={`line-${i}-${j}`}
                x1={p1.x} 
                y1={p1.y} 
                x2={p2.x} 
                y2={p2.y} 
                stroke="white" 
                strokeOpacity="0.2"
                strokeWidth="0.5"
              />
            )
          )
        )}
        
        {/* Partículas */}
        {particles.map((particle, index) => (
          <circle 
            key={`particle-${index}`}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill="white"
          />
        ))}
      </svg>
      
      {/* Botón central */}


      <Link to="/portfolios/:userId">
             <button className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  px-6 py-3 bg-transparent border-2 border-white text-white 
                  hover:bg-white hover:text-black transition-colors duration-300
                  rounded-lg font-medium z-10">Portfolios
             </button>
      </Link> 

    </div>
  );
};

export default ParticleAnimation;