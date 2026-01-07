import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { playHover, playSelect } = useMenuSound();

  // Desktop sidebar (always visible)
  const DesktopSidebar = (
    <aside className="hidden lg:flex w-64 min-h-screen bg-cs-darker border-r border-cs-green/30 flex-col">
      {/* Logo/Title */}
      <div className="p-6 border-b border-cs-green/20">
        <h1 className="text-cs-green text-lg font-bold tracking-wider">
          CS 1.6
        </h1>
        <p className="text-cs-yellow-dim text-xs mt-1 tracking-widest uppercase">
          Config Wiki
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-4 mb-4">
          <span className="text-cs-gray text-xs uppercase tracking-widest">
            {'// Main Menu'}
          </span>
        </div>
        
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
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
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-cs-green/20">
        <div className="text-cs-gray text-xs">
          <p>Version 1.6.0</p>
          <p className="text-cs-green/50 mt-1">Build 4554</p>
        </div>
      </div>
    </aside>
  );

  // Mobile sidebar (drawer)
  const MobileSidebar = (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-cs-darker border-r border-cs-green/30 flex flex-col"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          {/* Logo/Title */}
          <div className="p-4 border-b border-cs-green/20 flex items-center justify-between">
            <div>
              <h1 className="text-cs-green text-base font-bold tracking-wider">
                CS 1.6
              </h1>
              <p className="text-cs-yellow-dim text-[10px] mt-1 tracking-widest uppercase">
                Config Wiki
              </p>
            </div>

            {/* Close button */}
            <button
              type="button"
              className="p-2 text-cs-green hover:text-cs-yellow transition-colors active:scale-95"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <div className="px-4 mb-4">
              <span className="text-cs-gray text-[10px] uppercase tracking-widest">
                {'// Main Menu'}
              </span>
            </div>
            
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `menu-item flex items-center gap-3 ${isActive ? 'active' : ''}`
                  }
                  onClick={() => {
                    playSelect();
                    onClose();
                  }}
                >
                  <item.icon size={16} />
                  <span className="text-xs">{item.label}</span>
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-cs-green/20">
            <div className="text-cs-gray text-[10px]">
              <p>Version 1.6.0</p>
              <p className="text-cs-green/50 mt-1">Build 4554</p>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {DesktopSidebar}
      {MobileSidebar}
    </>
  );
}
