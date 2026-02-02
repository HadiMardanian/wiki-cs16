import { Mouse, Crosshair } from 'lucide-react';
import { PageTitle } from '../components/PageTitle';
import { ConsoleSection } from '../components/ConsoleSection';
import { CodeBlock } from '../components/CodeBlock';
import { motion } from 'framer-motion';
import { mouseConfig, crosshairConfig } from '../data/configBlocks';

export function MousePage() {
  return (
    <div>
      <PageTitle
        title="Mouse Settings"
        subtitle="Achieve pixel-perfect aim with raw input"
        icon={Mouse}
      />

      {/* DPI Calculator */}
      <motion.div
        className="bg-cs-dark border border-cs-green/50 p-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-cs-green font-bold mb-4 flex items-center gap-2">
          <Crosshair size={18} />
          eDPI Reference
        </h3>
        <p className="text-cs-green/80 text-sm mb-4">
          eDPI = DPI × In-Game Sensitivity
        </p>
        <div className="grid grid-cols-3 gap-4 text-center text-xs">
          <div className="bg-cs-black p-3 border border-cs-green/30">
            <p className="text-cs-yellow">Low eDPI</p>
            <p className="text-cs-green text-lg font-bold">400-800</p>
            <p className="text-cs-gray">AWPer style</p>
          </div>
          <div className="bg-cs-black p-3 border border-cs-green/30">
            <p className="text-cs-yellow">Medium eDPI</p>
            <p className="text-cs-green text-lg font-bold">800-1200</p>
            <p className="text-cs-gray">All-around</p>
          </div>
          <div className="bg-cs-black p-3 border border-cs-green/30">
            <p className="text-cs-yellow">High eDPI</p>
            <p className="text-cs-green text-lg font-bold">1200+</p>
            <p className="text-cs-gray">Entry fragger</p>
          </div>
        </div>
      </motion.div>

      {/* Main Config */}
      <ConsoleSection title="The Config">
        <p className="mb-4 text-sm">
          Raw input bypasses Windows mouse acceleration for consistent aim:
        </p>
        <CodeBlock code={mouseConfig} title="Mouse Configuration" />
      </ConsoleSection>

      {/* Technical Analysis */}
      <ConsoleSection title="Technical Analysis" variant="technical">
        <div className="space-y-4 text-sm">
          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">m_rawinput "1"</h4>
            <p>
              Reads mouse input directly from the hardware driver, bypassing the Windows 
              pointer system. This eliminates OS-level acceleration and provides 1:1 mouse 
              movement. <span className="text-cs-green">Essential for competitive play.</span>
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">m_filter "0"</h4>
            <p>
              Disables mouse filtering/smoothing. When enabled (1), the game averages your 
              current and previous mouse positions, adding latency. Keep this at 0 for 
              immediate response.
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">zoom_sensitivity_ratio "1.0"</h4>
            <p>
              Multiplier for sensitivity when scoped. 1.0 means your scoped sensitivity 
              matches your hip-fire feel. AWPers often use 0.8-1.0 for consistency.
            </p>
          </div>
        </div>
      </ConsoleSection>

      {/* Crosshair */}
      <ConsoleSection title="Crosshair Settings">
        <p className="mb-4 text-sm">
          Static crosshair for consistent visual reference:
        </p>
        <CodeBlock code={crosshairConfig} title="Crosshair Configuration" />
      </ConsoleSection>
    </div>
  );
}
