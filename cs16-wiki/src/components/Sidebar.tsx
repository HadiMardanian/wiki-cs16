import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Wifi, Mouse, Monitor, Volume2, Keyboard, Terminal, Code2, Trophy, Rocket, Wrench } from 'lucide-react';
import { useMenuSound } from '../hooks/useMenuSound';

const menuItems = [
  { path: '/', label: 'New Config', icon: Home },
  { path: '/netcode', label: 'Netcode', icon: Wifi },
  { path: '/mouse', label: 'Mouse', icon: Mouse },
  { path: '/video', label: 'Video', icon: Monitor },
  { path: '/audio', label: 'Audio', icon: Volume2 },
  { path: '/binds', label: 'Binds', icon: Keyboard },
  { path: '/commands', label: 'Commands', icon: Terminal },
  { path: '/scripts', label: 'Scripts', icon: Code2 },
  { path: '/pro-configs', label: 'Pro Configs', icon: Trophy },
  { path: '/launch-options', label: 'Launch Options', icon: Rocket },
  { path: '/troubleshooting', label: 'Troubleshooting', icon: Wrench },
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

export function Sidebar() {
  const { playHover, playSelect } = useMenuSound();

  return (
    <motion.aside
      className="w-64 min-h-screen bg-cs-darker border-r border-cs-green/30 flex flex-col"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      {/* Logo/Title */}
      <div className="p-6 border-b border-cs-green/20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-cs-green text-lg font-bold tracking-wider">
            CS 1.6
          </h1>
          <p className="text-cs-yellow-dim text-xs mt-1 tracking-widest uppercase">
            Config Wiki
          </p>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <div className="px-4 mb-4">
          <span className="text-cs-gray text-xs uppercase tracking-widest">
            // Main Menu
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
              onClick={playSelect}
            >
              <item.icon size={16} />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-cs-green/20">
        <div className="text-cs-gray text-xs">
          <p>Version 1.6.0</p>
          <p className="text-cs-green/50 mt-1">Build 4554</p>
        </div>
      </div>
    </motion.aside>
  );
}
