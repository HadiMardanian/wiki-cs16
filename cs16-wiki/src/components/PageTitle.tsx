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
      className="mb-8 pb-4 border-b border-cs-green/20"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon size={24} className="text-cs-green" />}
        <h1 className="text-2xl font-bold text-cs-green uppercase tracking-wider">
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className="text-cs-yellow-dim text-sm mt-2 ml-9">
          // {subtitle}
        </p>
      )}
    </motion.div>
  );
}
