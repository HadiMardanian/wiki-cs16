import { useState } from 'react';
import { Settings, Terminal, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { ArmoryModal } from './ArmoryModal';
import { useMenuSound } from '../hooks/useMenuSound';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isArmoryOpen, setIsArmoryOpen] = useState(false);
  const { playHover, playSelect } = useMenuSound();

  return (
    <>
      <motion.header
        className="h-12 md:h-14 bg-cs-darker border-b border-cs-green/30 flex items-center justify-between px-3 md:px-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Left side - Menu button and Console indicator */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Hamburger menu - mobile only */}
          <button
            className="lg:hidden p-1.5 text-cs-green hover:text-cs-yellow transition-colors"
            onClick={() => {
              playSelect();
              onMenuClick();
            }}
          >
            <Menu size={20} />
          </button>

          <Terminal size={16} className="text-cs-green hidden sm:block md:w-[18px] md:h-[18px]" />
          <span className="text-cs-yellow-dim text-xs md:text-sm">
            <span className="text-cs-green">]</span> ready_
            <span className="animate-blink">|</span>
          </span>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Server info mock - hidden on small screens */}
          <div className="hidden md:flex items-center gap-2 text-xs text-cs-gray">
            <span className="text-cs-green">●</span>
            <span>64 tick</span>
            <span className="text-cs-green/50">|</span>
            <span>ping: 5ms</span>
          </div>

          {/* Armory Button */}
          <motion.button
            className="cs-button flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs py-1.5 px-2 md:py-2 md:px-3"
            onClick={() => {
              playSelect();
              setIsArmoryOpen(true);
            }}
            onMouseEnter={playHover}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Settings size={12} className="md:w-[14px] md:h-[14px]" />
            <span className="hidden sm:inline">The Armory</span>
            <span className="sm:hidden">Armory</span>
          </motion.button>
        </div>
      </motion.header>

      <ArmoryModal isOpen={isArmoryOpen} onClose={() => setIsArmoryOpen(false)} />
    </>
  );
}
