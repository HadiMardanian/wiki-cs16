import { Wifi, AlertTriangle, Info } from 'lucide-react';
import { PageTitle } from '../components/PageTitle';
import { ConsoleSection } from '../components/ConsoleSection';
import { CodeBlock } from '../components/CodeBlock';
import { motion } from 'framer-motion';

const netcodeConfig = `// Network Settings - Optimized for LAN/High-Speed
rate "128000"
cl_cmdrate "128"
cl_updaterate "128"
cl_interp "0"
cl_interp_ratio "1"

// Packet Settings
cl_lagcompensation "1"
cl_predict "1"
cl_predictweapons "1"
cl_smooth "0"

// Download Settings
cl_allowdownload "1"
cl_allowupload "1"`;

const lowLatencyConfig = `// Low Latency Optimizations
cl_showfps "1"
net_graph "3"
net_graphpos "2"
developer "0"`;

export function NetcodePage() {
  return (
    <div>
      <PageTitle
        title="Network Settings"
        subtitle="Optimize your connection for competitive play"
        icon={Wifi}
      />

      {/* Warning Banner */}
      <motion.div
        className="bg-cs-orange/10 border border-cs-orange/50 p-4 mb-6 flex items-start gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AlertTriangle className="text-cs-orange shrink-0 mt-0.5" size={18} />
        <p className="text-cs-orange text-sm">
          These settings are optimized for high-speed connections (50+ Mbps). 
          Adjust <span className="text-cs-yellow">rate</span> values based on your actual bandwidth.
        </p>
      </motion.div>

      {/* Main Config */}
      <ConsoleSection title="The Config">
        <p className="mb-4 text-sm">
          Copy these commands to your <span className="text-cs-yellow">userconfig.cfg</span> or 
          paste directly into console.
        </p>
        <CodeBlock code={netcodeConfig} title="Network Configuration" />
      </ConsoleSection>

      {/* Technical Analysis */}
      <ConsoleSection title="Technical Analysis" variant="technical">
        <div className="space-y-4 text-sm">
          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2 flex items-center gap-2">
              <Info size={14} />
              rate "128000"
            </h4>
            <p>
              Defines the maximum bytes per second your client can receive from the server. 
              128000 bytes = 128 KB/s, suitable for most modern connections. The server may 
              cap this lower (common: 25000 for older servers).
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2 flex items-center gap-2">
              <Info size={14} />
              cl_cmdrate & cl_updaterate "128"
            </h4>
            <p>
              <span className="text-cs-green">cl_cmdrate</span>: Commands sent to server per second.<br/>
              <span className="text-cs-green">cl_updaterate</span>: Updates received from server per second.<br/>
              Match these to server tickrate. 128 tick servers = 128. Most public servers run 64 or 100 tick.
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2 flex items-center gap-2">
              <Info size={14} />
              cl_interp "0" & cl_interp_ratio "1"
            </h4>
            <p>
              Interpolation delay in seconds. Setting to 0 lets the engine calculate optimal 
              value based on updaterate. <span className="text-cs-green">cl_interp_ratio "1"</span> minimizes 
              interpolation for faster hit registration at the cost of slightly more 
              jittery player movement on unstable connections.
            </p>
          </div>
        </div>
      </ConsoleSection>

      {/* Debug Tools */}
      <ConsoleSection title="Debug & Monitoring">
        <p className="mb-4 text-sm">
          Use these commands to monitor your network performance in real-time:
        </p>
        <CodeBlock code={lowLatencyConfig} title="Debug Commands" />
        
        <div className="mt-4 p-4 bg-cs-dark border border-cs-green/30">
          <h4 className="text-cs-green text-sm font-bold mb-2">Reading net_graph:</h4>
          <ul className="text-xs text-cs-green/80 space-y-1">
            <li>• <span className="text-cs-yellow">fps:</span> Your current framerate</li>
            <li>• <span className="text-cs-yellow">ping:</span> Round-trip latency to server</li>
            <li>• <span className="text-cs-yellow">loss:</span> Packet loss % (should be 0)</li>
            <li>• <span className="text-cs-yellow">choke:</span> Server throttling % (should be 0)</li>
          </ul>
        </div>
      </ConsoleSection>
    </div>
  );
}
