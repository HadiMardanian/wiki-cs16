import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CRTOverlay } from './CRTOverlay';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-cs-black">
      {/* CRT Scanlines Overlay */}
      <CRTOverlay />

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Console Content Area */}
        <motion.main
          className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Console Window Frame */}
          <div className="max-w-4xl mx-auto">
            {/* Console Header Bar */}
            <div className="bg-cs-darker border border-cs-green/30 border-b-0 px-3 md:px-4 py-2 flex items-center gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-cs-red/80" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-cs-yellow/80" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-cs-green/80" />
              <span className="text-cs-gray text-[10px] md:text-xs ml-2 font-mono">
                ~ console
              </span>
            </div>

            {/* Console Content */}
            <div className="bg-cs-dark/90 border border-cs-green/30 p-4 md:p-6 min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-200px)]">
              <Outlet />
            </div>
          </div>
        </motion.main>

        {/* Footer */}
        <footer className="bg-cs-darker border-t border-cs-green/20 px-4 md:px-6 py-3">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-[10px] md:text-xs text-cs-gray gap-1 md:gap-0">
            <span>CS 1.6 Config Wiki © 2026</span>
            <span className="text-cs-green/50">
              Made with{' '}
              <span className="text-cs-red">♥</span>
              {' '}for the community
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
