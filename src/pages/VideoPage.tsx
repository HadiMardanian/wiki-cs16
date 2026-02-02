import { Monitor, Gauge } from 'lucide-react';
import { PageTitle } from '../components/PageTitle';
import { ConsoleSection } from '../components/ConsoleSection';
import { CodeBlock } from '../components/CodeBlock';
import { motion } from 'framer-motion';
import { videoConfig, resolutionConfig } from '../data/configBlocks';

export function VideoPage() {
  return (
    <div>
      <PageTitle
        title="Video Settings"
        subtitle="Maximize visibility and performance"
        icon={Monitor}
      />

      {/* FPS Info */}
      <motion.div
        className="bg-cs-dark border border-cs-green/50 p-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-cs-green font-bold mb-4 flex items-center gap-2">
          <Gauge size={18} />
          FPS Guidelines
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
          <div className="bg-cs-black p-3 border border-cs-red/50">
            <p className="text-cs-red">Poor</p>
            <p className="text-cs-green text-lg font-bold">&lt;60</p>
          </div>
          <div className="bg-cs-black p-3 border border-cs-orange/50">
            <p className="text-cs-orange">Playable</p>
            <p className="text-cs-green text-lg font-bold">60-100</p>
          </div>
          <div className="bg-cs-black p-3 border border-cs-yellow/50">
            <p className="text-cs-yellow">Good</p>
            <p className="text-cs-green text-lg font-bold">100-200</p>
          </div>
          <div className="bg-cs-black p-3 border border-cs-green/50">
            <p className="text-cs-green">Optimal</p>
            <p className="text-cs-green text-lg font-bold">200+</p>
          </div>
        </div>
        <p className="text-cs-gray text-xs mt-4">
          * Match fps_max to your monitor refresh rate or higher for smoothest input
        </p>
      </motion.div>

      {/* Main Config */}
      <ConsoleSection title="The Config">
        <p className="mb-4 text-sm">
          These settings prioritize framerate and enemy visibility over graphical fidelity:
        </p>
        <CodeBlock code={videoConfig} title="Video Configuration" />
      </ConsoleSection>

      {/* Technical Analysis */}
      <ConsoleSection title="Technical Analysis" variant="technical">
        <div className="space-y-4 text-sm">
          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">fps_max "999"</h4>
            <p>
              Uncaps your framerate. Higher FPS = lower input latency, even on 60Hz monitors. 
              The engine processes input each frame, so more frames = more responsive controls.
              Some players use 101 or 128 to match server tickrate.
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">gl_picmip "2"</h4>
            <p>
              Reduces texture resolution (0-5). Higher values = lower quality but better 
              performance. Value of 2 provides good balance between visibility and aesthetics.
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">gamma & brightness "3"</h4>
            <p>
              Maximum brightness settings. Critical for seeing enemies in dark corners. 
              Combined with monitor calibration, this ensures no visual disadvantage.
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">cl_minmodels "1"</h4>
            <p>
              Forces all player models to use the same skin per team. Reduces visual 
              clutter and makes enemies easier to spot in chaotic situations.
            </p>
          </div>
        </div>
      </ConsoleSection>

      {/* Resolution */}
      <ConsoleSection title="Resolution & Launch Options">
        <p className="mb-4 text-sm">
          Set resolution via launch options for guaranteed settings:
        </p>
        <CodeBlock code={resolutionConfig} title="Resolution Settings" />
        
        <div className="mt-4 p-4 bg-cs-dark border border-cs-green/30">
          <h4 className="text-cs-green text-sm font-bold mb-2">Popular Resolutions:</h4>
          <ul className="text-xs text-cs-green/80 space-y-1">
            <li>• <span className="text-cs-yellow">640×480</span> - Classic 4:3 stretched</li>
            <li>• <span className="text-cs-yellow">800×600</span> - Balanced clarity</li>
            <li>• <span className="text-cs-yellow">1024×768</span> - Most popular competitive</li>
            <li>• <span className="text-cs-yellow">1280×960</span> - High-res 4:3</li>
          </ul>
        </div>
      </ConsoleSection>
    </div>
  );
}
