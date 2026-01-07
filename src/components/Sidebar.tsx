import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Wifi, Mouse, Monitor, Volume2, Keyboard, X } from 'lucide-react';
import { useMenuSound } from '../hooks/useMenuSound';

const menuItems = [
  { path: '/', label: 'New Config', icon: Home },
  { path: '/netcode', label: 'Netcode', icon: Wifi },
  { path: '/mouse', label: 'Mouse', icon: Mouse },
  { path: '/video', label: 'Video', icon: Monitor },
  { path: '/audio', label: 'Audio', icon: Volume2 },
  { path: '/binds', label: 'Binds', icon: Keyboard },
];

const sidebarVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { playHover, playSelect } = useMenuSound();

  return (
    <motion.aside
      className={`
        fixed lg:relative inset-y-0 left-0 z-50
        w-64 min-h-screen bg-cs-darker border-r border-cs-green/30 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      {/* Logo/Title */}
      <div className="p-4 md:p-6 border-b border-cs-green/20 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-cs-green text-base md:text-lg font-bold tracking-wider">
            CS 1.6
          </h1>
          <p className="text-cs-yellow-dim text-[10px] md:text-xs mt-1 tracking-widest uppercase">
            Config Wiki
          </p>
        </motion.div>

        {/* Close button - mobile only */}
        <button
          className="lg:hidden p-2 text-cs-green hover:text-cs-yellow transition-colors"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-4 mb-4">
          <span className="text-cs-gray text-[10px] md:text-xs uppercase tracking-widest">
            {'// Main Menu'}
          </span>
        </div>
        
        {menuItems.map((item) => (
          <motion.div key={item.path} variants={itemVariants}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `menu-item flex items-center gap-3 ${isActive ? 'active' : ''}`
              }
              onMouseEnter={playHover}
              onClick={() => {
                playSelect();
                onClose();
              }}
            >
              <item.icon size={16} />
              <span className="text-xs md:text-sm">{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-cs-green/20">
        <div className="text-cs-gray text-[10px] md:text-xs">
          <p>Version 1.6.0</p>
          <p className="text-cs-green/50 mt-1">Build 4554</p>
        </div>
      </div>
    </motion.aside>
  );
}
