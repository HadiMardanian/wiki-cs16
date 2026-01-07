import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
}

export function PageTitle({ title, subtitle, icon: Icon }: PageTitleProps) {
  return (
    <motion.div
      className="mb-6 md:mb-8 pb-3 md:pb-4 border-b border-cs-green/20"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 md:gap-3">
        {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6 text-cs-green shrink-0" />}
        <h1 className="text-lg md:text-2xl font-bold text-cs-green uppercase tracking-wider">
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className="text-cs-yellow-dim text-xs md:text-sm mt-1.5 md:mt-2 ml-7 md:ml-9">
          {'// '}{subtitle}
        </p>
      )}
    </motion.div>
  );
}
