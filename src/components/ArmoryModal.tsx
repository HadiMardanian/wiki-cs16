import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useCursor } from '../hooks/useCursor';
import { cursorOptions } from '../data/cursorOptions';
import { useMenuSound } from '../hooks/useMenuSound';

interface ArmoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 20 },
  visible: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.9, opacity: 0, y: 20 },
};

export function ArmoryModal({ isOpen, onClose }: ArmoryModalProps) {
  const { cursor, setCursor } = useCursor();
  const { playHover, playSelect, playBack } = useMenuSound();

  const handleSelect = (cursorId: typeof cursor) => {
    playSelect();
    setCursor(cursorId);
  };

  const handleClose = () => {
    playBack();
    onClose();
  };

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-cs-black border-2 border-cs-green shadow-cs-glow-strong max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 md:p-4 border-b border-cs-green/50 sticky top-0 bg-cs-black z-10">
              <div>
                <h2 className="text-cs-green font-bold uppercase tracking-wider text-sm md:text-base">
                  The Armory
                </h2>
                <p className="text-cs-yellow-dim text-[10px] md:text-xs mt-1">
                  {'// Select your cursor weapon'}
                </p>
              </div>
              <button
                className="text-cs-green hover:text-cs-red transition-colors p-1"
                onClick={handleClose}
                onMouseEnter={playHover}
              >
                <X size={20} />
              </button>
            </div>

            {/* Buy Menu Style Content */}
            <div className="p-3 md:p-4">
              <div className="mb-3 md:mb-4">
                <p className="text-cs-gray text-[10px] md:text-xs uppercase mb-2">
                  Equipment Selection
                </p>
                <div className="h-px bg-cs-green/30" />
              </div>

              {/* Cursor Options Grid */}
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {cursorOptions.map((option, index) => {
                  const isActive = cursor === option.id;
                  return (
                    <motion.button
                      key={option.id}
                      className={`
                        relative p-3 md:p-4 border text-left transition-all
                        ${isActive 
                          ? 'border-cs-green bg-cs-green/10 shadow-cs-glow' 
                          : 'border-cs-green/30 bg-cs-dark hover:border-cs-green/60'
                        }
                      `}
                      onClick={() => handleSelect(option.id)}
                      onMouseEnter={playHover}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Index Number */}
                      <span className="absolute top-1.5 md:top-2 left-1.5 md:left-2 text-cs-yellow text-[10px] md:text-xs font-bold">
                        {index + 1}.
                      </span>

                      {/* Icon/Emoji */}
                      <div className="text-2xl md:text-3xl mb-1.5 md:mb-2 mt-1.5 md:mt-2">{option.emoji}</div>

                      {/* Name */}
                      <p className={`text-xs md:text-sm font-bold uppercase ${isActive ? 'text-cs-green' : 'text-cs-yellow'}`}>
                        {option.name}
                      </p>

                      {/* Description */}
                      <p className="text-cs-gray text-[10px] md:text-xs mt-0.5 md:mt-1 line-clamp-2">
                        {option.description}
                      </p>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute top-1.5 md:top-2 right-1.5 md:right-2 text-cs-green"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check size={14} className="md:w-4 md:h-4" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer Info */}
              <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-cs-green/30">
                <div className="flex items-center justify-between text-[10px] md:text-xs">
                  <span className="text-cs-gray">
                    Active: <span className="text-cs-green uppercase">{cursor}</span>
                  </span>
                  <span className="text-cs-yellow-dim hidden sm:block">
                    Press [ESC] to close
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
