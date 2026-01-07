import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useMenuSound } from '../hooks/useMenuSound';

interface CodeBlockProps {
  code: string;
  title?: string;
}

export function CodeBlock({ code, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { playSelect } = useMenuSound();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      playSelect();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <motion.div
      className="relative bg-black/80 border border-cs-green/50 rounded-none overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-cs-dark border-b border-cs-green/30">
          <span className="text-cs-yellow-dim text-[10px] md:text-xs uppercase tracking-wider truncate mr-2">
            {title}
          </span>
          <motion.button
            className="cs-button text-[10px] md:text-xs py-1 px-2 flex items-center gap-1 shrink-0"
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <>
                <Check size={10} className="md:w-3 md:h-3" />
                <span className="hidden sm:inline">Copied!</span>
                <span className="sm:hidden">✓</span>
              </>
            ) : (
              <>
                <Copy size={10} className="md:w-3 md:h-3" />
                <span>Copy</span>
              </>
            )}
          </motion.button>
        </div>
      )}

      {/* Code Content */}
      <div className="p-3 md:p-4 font-mono text-xs md:text-sm overflow-x-auto">
        {lines.map((line, index) => (
          <div key={index} className="flex">
            <span className="text-cs-yellow select-none mr-2 w-3 md:w-4 shrink-0">{']'}</span>
            <span className="text-cs-green whitespace-pre break-all sm:break-normal">{line}</span>
          </div>
        ))}
      </div>

      {/* Copy button (no title variant) */}
      {!title && (
        <motion.button
          className="absolute top-2 right-2 cs-button text-[10px] md:text-xs py-1 px-2 flex items-center gap-1"
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? (
            <>
              <Check size={10} className="md:w-3 md:h-3" />
              <span className="hidden sm:inline">Copied!</span>
              <span className="sm:hidden">✓</span>
            </>
          ) : (
            <>
              <Copy size={10} className="md:w-3 md:h-3" />
              <span>Copy</span>
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  );
}
