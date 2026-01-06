import { useState } from 'react';
import { Settings, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { ArmoryModal } from './ArmoryModal';
import { useMenuSound } from '../hooks/useMenuSound';

export function Header() {
  const [isArmoryOpen, setIsArmoryOpen] = useState(false);
  const { playHover, playSelect } = useMenuSound();

  return (
    <>
      <motion.header
        className="h-14 bg-cs-darker border-b border-cs-green/30 flex items-center justify-between px-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Console indicator */}
        <div className="flex items-center gap-3">
          <Terminal size={18} className="text-cs-green" />
          <span className="text-cs-yellow-dim text-sm">
            <span className="text-cs-green">]</span> ready_
            <span className="animate-blink">|</span>
          </span>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Server info mock */}
          <div className="hidden md:flex items-center gap-2 text-xs text-cs-gray">
            <span className="text-cs-green">●</span>
            <span>64 tick</span>
            <span className="text-cs-green/50">|</span>
            <span>ping: 5ms</span>
          </div>

          {/* Armory Button */}
          <motion.button
            className="cs-button flex items-center gap-2 text-xs"
            onClick={() => {
              playSelect();
              setIsArmoryOpen(true);
            }}
            onMouseEnter={playHover}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Settings size={14} />
            <span>The Armory</span>
          </motion.button>
        </div>
      </motion.header>

      <ArmoryModal isOpen={isArmoryOpen} onClose={() => setIsArmoryOpen(false)} />
    </>
  );
}
