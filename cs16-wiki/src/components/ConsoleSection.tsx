import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ConsoleSectionProps {
  title: string;
  children: ReactNode;
  variant?: 'default' | 'technical';
}

export function ConsoleSection({ title, children, variant = 'default' }: ConsoleSectionProps) {
  const isTechnical = variant === 'technical';

  return (
    <motion.section
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Section Header */}
      <div className={`
        flex items-center gap-2 mb-4 pb-2 border-b
        ${isTechnical ? 'border-cs-yellow/30' : 'border-cs-green/30'}
      `}>
        <span className={`text-xs ${isTechnical ? 'text-cs-yellow' : 'text-cs-green'}`}>
          //
        </span>
        <h2 className={`
          text-lg font-bold uppercase tracking-wider
          ${isTechnical ? 'text-cs-yellow' : 'text-cs-green'}
        `}>
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className={`
        ${isTechnical ? 'text-cs-yellow-dim' : 'text-cs-green/90'}
        leading-relaxed
      `}>
        {children}
      </div>
    </motion.section>
  );
}
