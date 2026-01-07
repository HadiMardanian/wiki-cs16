import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CRTOverlay } from './CRTOverlay';

export function Layout() {
  return (
    <div className="flex min-h-screen bg-cs-black">
      {/* CRT Scanlines Overlay */}
      <CRTOverlay />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Console Content Area */}
        <motion.main
          className="flex-1 p-8 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Console Window Frame */}
          <div className="max-w-4xl mx-auto">
            {/* Console Header Bar */}
            <div className="bg-cs-darker border border-cs-green/30 border-b-0 px-4 py-2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cs-red/80" />
              <div className="w-3 h-3 rounded-full bg-cs-yellow/80" />
              <div className="w-3 h-3 rounded-full bg-cs-green/80" />
              <span className="text-cs-gray text-xs ml-2 font-mono">
                ~ console
              </span>
            </div>

            {/* Console Content */}
            <div className="bg-cs-dark/90 border border-cs-green/30 p-6 min-h-[calc(100vh-200px)]">
              <Outlet />
            </div>
          </div>
        </motion.main>

        {/* Footer */}
        <footer className="bg-cs-darker border-t border-cs-green/20 px-6 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-cs-gray">
            <span>CS 1.6 Config Wiki © 2024</span>
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
