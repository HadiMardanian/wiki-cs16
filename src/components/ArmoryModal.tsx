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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
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
            className="relative w-full max-w-md mx-4 bg-cs-black border-2 border-cs-green shadow-cs-glow-strong"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cs-green/50">
              <div>
                <h2 className="text-cs-green font-bold uppercase tracking-wider">
                  The Armory
                </h2>
                <p className="text-cs-yellow-dim text-xs mt-1">
                  // Select your cursor weapon
                </p>
              </div>
              <button
                className="text-cs-green hover:text-cs-red transition-colors"
                onClick={handleClose}
                onMouseEnter={playHover}
              >
                <X size={20} />
              </button>
            </div>

            {/* Buy Menu Style Content */}
            <div className="p-4">
              <div className="mb-4">
                <p className="text-cs-gray text-xs uppercase mb-2">
                  Equipment Selection
                </p>
                <div className="h-px bg-cs-green/30" />
              </div>

              {/* Cursor Options Grid */}
              <div className="grid grid-cols-2 gap-3">
                {cursorOptions.map((option, index) => {
                  const isActive = cursor === option.id;
                  return (
                    <motion.button
                      key={option.id}
                      className={`
                        relative p-4 border text-left transition-all
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
                      <span className="absolute top-2 left-2 text-cs-yellow text-xs font-bold">
                        {index + 1}.
                      </span>

                      {/* Icon/Emoji */}
                      <div className="text-3xl mb-2 mt-2">{option.emoji}</div>

                      {/* Name */}
                      <p className={`text-sm font-bold uppercase ${isActive ? 'text-cs-green' : 'text-cs-yellow'}`}>
                        {option.name}
                      </p>

                      {/* Description */}
                      <p className="text-cs-gray text-xs mt-1">
                        {option.description}
                      </p>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute top-2 right-2 text-cs-green"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check size={16} />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer Info */}
              <div className="mt-4 pt-4 border-t border-cs-green/30">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cs-gray">
                    Active: <span className="text-cs-green uppercase">{cursor}</span>
                  </span>
                  <span className="text-cs-yellow-dim">
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
