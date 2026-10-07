import React, { useMemo } from 'react';
import { WeatherSeasonState } from '../types';

interface FloatingParticlesProps {
  weather: WeatherSeasonState;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ weather }) => {
  if (!weather.activeAnimation) return null;

  const count = weather.particlesDensity === 'low' ? 12 : weather.particlesDensity === 'high' ? 28 : 18;

  const particles = useMemo(() => {
    const emojis = weather.emojis && weather.emojis.length > 0 ? weather.emojis : ['🌸', '✨', '🍃'];
    return Array.from({ length: count }, (_, i) => {
      const emoji = emojis[i % emojis.length];
      const left = Math.floor(Math.random() * 96) + 2; // 2% to 98%
      const duration = 10 + Math.random() * 14; // 10s to 24s
      const delay = Math.random() * 10; // 0s to 10s
      const size = 18 + Math.floor(Math.random() * 18); // 18px to 36px
      const opacity = 0.5 + Math.random() * 0.4;

      return {
        id: i,
        emoji,
        left: `${left}%`,
        duration: `${duration.toFixed(1)}s`,
        delay: `-${delay.toFixed(1)}s`,
        size: `${size}px`,
        opacity,
      };
    });
  }, [weather.emojis, weather.particlesDensity, count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute animate-floating-particle select-none"
          style={{
            left: p.left,
            fontSize: p.size,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))',
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};
