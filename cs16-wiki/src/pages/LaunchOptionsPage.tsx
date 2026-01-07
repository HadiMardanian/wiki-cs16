import { Rocket, Info, AlertTriangle, Check, X } from 'lucide-react';
import { PageTitle } from '../components/PageTitle';
import { ConsoleSection } from '../components/ConsoleSection';
import { CodeBlock } from '../components/CodeBlock';
import { motion } from 'framer-motion';

interface LaunchOption {
  option: string;
  description: string;
  recommended: boolean;
  category: string;
}

const launchOptions: LaunchOption[] = [
  // Video Options
  { option: '-w 1024', description: 'Set screen width to 1024 pixels', recommended: true, category: 'video' },
  { option: '-h 768', description: 'Set screen height to 768 pixels', recommended: true, category: 'video' },
  { option: '-freq 144', description: 'Set refresh rate (match your monitor)', recommended: true, category: 'video' },
  { option: '-full', description: 'Start game in fullscreen mode', recommended: true, category: 'video' },
  { option: '-window', description: 'Start game in windowed mode', recommended: false, category: 'video' },
  { option: '-noborder', description: 'Borderless window mode', recommended: false, category: 'video' },
  { option: '-nofbo', description: 'Disable frame buffer objects', recommended: false, category: 'video' },
  { option: '-stretchaspect', description: 'Stretch 4:3 to fill widescreen', recommended: false, category: 'video' },

  // Performance Options
  { option: '-nojoy', description: 'Disable joystick support (saves memory)', recommended: true, category: 'performance' },
  { option: '-noipx', description: 'Disable IPX networking', recommended: true, category: 'performance' },
  { option: '-heapsize 512000', description: 'Allocate 512MB memory to game', recommended: true, category: 'performance' },
  { option: '-zone 8192', description: 'Increase memory for scripts/aliases', recommended: true, category: 'performance' },
  { option: '-noaafonts', description: 'Disable anti-aliased fonts', recommended: false, category: 'performance' },
  { option: '-soft', description: 'Software rendering (very slow)', recommended: false, category: 'performance' },

  // Audio Options
  { option: '-snd_headphone_pan_exponent 2', description: 'Better headphone audio positioning', recommended: true, category: 'audio' },
  { option: '-nosound', description: 'Disable all sound', recommended: false, category: 'audio' },

  // Network Options
  { option: '-nomaster', description: 'Disable master server connection', recommended: false, category: 'network' },
  { option: '-nolan', description: 'Disable LAN game search', recommended: false, category: 'network' },

  // Developer Options
  { option: '-console', description: 'Enable developer console on start', recommended: true, category: 'developer' },
  { option: '-dev', description: 'Developer mode (verbose logging)', recommended: false, category: 'developer' },
  { option: '-toconsole', description: 'Start directly to console', recommended: false, category: 'developer' },
];

const recommendedConfig = `-w 1024 -h 768 -freq 144 -full -nojoy -noipx -console`;

const performanceConfig = `-w 800 -h 600 -freq 60 -full -nojoy -noipx -heapsize 256000 -console`;

const competitiveConfig = `-w 1024 -h 768 -freq 144 -full -nojoy -noipx -heapsize 512000 -zone 8192 -console`;

export function LaunchOptionsPage() {
  const videoOptions = launchOptions.filter(o => o.category === 'video');
  const performanceOptions = launchOptions.filter(o => o.category === 'performance');
  const audioOptions = launchOptions.filter(o => o.category === 'audio');
  const otherOptions = launchOptions.filter(o => o.category === 'network' || o.category === 'developer');

  return (
    <div>
      <PageTitle
        title="Launch Options"
        subtitle="Steam launch parameters for optimal performance"
        icon={Rocket}
      />

      {/* How to Set */}
      <motion.div
        className="bg-cs-dark border border-cs-green/50 p-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-cs-green font-bold mb-4 flex items-center gap-2">
          <Info size={18} />
          How to Set Launch Options
        </h3>
        <ol className="text-cs-green/80 text-sm space-y-2 list-decimal list-inside">
          <li>Open Steam and go to your <span className="text-cs-yellow">Library</span></li>
          <li>Right-click on <span className="text-cs-yellow">Counter-Strike</span></li>
          <li>Select <span className="text-cs-yellow">Properties</span></li>
          <li>In the <span className="text-cs-yellow">General</span> tab, find "Launch Options"</li>
          <li>Enter your desired options (separated by spaces)</li>
          <li>Close the window - options save automatically</li>
        </ol>
      </motion.div>

      {/* Quick Presets */}
      <ConsoleSection title="Recommended Presets">
        <div className="space-y-6">
          <div>
            <h4 className="text-cs-yellow text-sm mb-2">Standard Setup</h4>
            <CodeBlock code={recommendedConfig} title="Balanced Options" />
          </div>
          
          <div>
            <h4 className="text-cs-yellow text-sm mb-2">Low-End PC</h4>
            <CodeBlock code={performanceConfig} title="Performance Options" />
          </div>
          
          <div>
            <h4 className="text-cs-yellow text-sm mb-2">Competitive Play</h4>
            <CodeBlock code={competitiveConfig} title="Full Competitive Setup" />
          </div>
        </div>
      </ConsoleSection>

      {/* Video Options */}
      <ConsoleSection title="Video Options">
        <div className="space-y-3">
          {videoOptions.map((opt) => (
            <div
              key={opt.option}
              className="bg-cs-dark/50 border border-cs-green/20 p-4 flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <code className="text-cs-yellow font-bold">{opt.option}</code>
                  {opt.recommended ? (
                    <span className="text-xs bg-cs-green/20 text-cs-green px-2 py-0.5 rounded flex items-center gap-1">
                      <Check size={10} /> Recommended
                    </span>
                  ) : (
                    <span className="text-xs bg-cs-gray/20 text-cs-gray px-2 py-0.5 rounded flex items-center gap-1">
                      <X size={10} /> Optional
                    </span>
                  )}
                </div>
                <p className="text-cs-green/70 text-sm mt-1">{opt.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ConsoleSection>

      {/* Performance Options */}
      <ConsoleSection title="Performance Options">
        <div className="space-y-3">
          {performanceOptions.map((opt) => (
            <div
              key={opt.option}
              className="bg-cs-dark/50 border border-cs-green/20 p-4 flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <code className="text-cs-yellow font-bold">{opt.option}</code>
                  {opt.recommended ? (
                    <span className="text-xs bg-cs-green/20 text-cs-green px-2 py-0.5 rounded flex items-center gap-1">
                      <Check size={10} /> Recommended
                    </span>
                  ) : (
                    <span className="text-xs bg-cs-gray/20 text-cs-gray px-2 py-0.5 rounded flex items-center gap-1">
                      <X size={10} /> Optional
                    </span>
                  )}
                </div>
                <p className="text-cs-green/70 text-sm mt-1">{opt.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ConsoleSection>

      {/* Audio Options */}
      <ConsoleSection title="Audio Options">
        <div className="space-y-3">
          {audioOptions.map((opt) => (
            <div
              key={opt.option}
              className="bg-cs-dark/50 border border-cs-green/20 p-4"
            >
              <div className="flex items-center gap-2">
                <code className="text-cs-yellow font-bold">{opt.option}</code>
                {opt.recommended ? (
                  <span className="text-xs bg-cs-green/20 text-cs-green px-2 py-0.5 rounded flex items-center gap-1">
                    <Check size={10} /> Recommended
                  </span>
                ) : (
                  <span className="text-xs bg-cs-gray/20 text-cs-gray px-2 py-0.5 rounded flex items-center gap-1">
                    <X size={10} /> Optional
                  </span>
                )}
              </div>
              <p className="text-cs-green/70 text-sm mt-1">{opt.description}</p>
            </div>
          ))}
        </div>
      </ConsoleSection>

      {/* Other Options */}
      <ConsoleSection title="Network & Developer">
        <div className="space-y-3">
          {otherOptions.map((opt) => (
            <div
              key={opt.option}
              className="bg-cs-dark/50 border border-cs-green/20 p-4"
            >
              <div className="flex items-center gap-2">
                <code className="text-cs-yellow font-bold">{opt.option}</code>
                <span className="text-xs text-cs-gray uppercase">{opt.category}</span>
              </div>
              <p className="text-cs-green/70 text-sm mt-1">{opt.description}</p>
            </div>
          ))}
        </div>
      </ConsoleSection>

      {/* Technical Analysis */}
      <ConsoleSection title="Technical Details" variant="technical">
        <div className="space-y-4 text-sm">
          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2 flex items-center gap-2">
              <Info size={14} />
              Resolution (-w -h)
            </h4>
            <p>
              Forces a specific resolution regardless of in-game settings. Use with 
              <span className="text-cs-green"> -freq</span> to ensure your refresh rate 
              is also locked. Common competitive resolutions:
              <br/>
              <span className="text-cs-green">640×480, 800×600, 1024×768, 1280×960</span>
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2 flex items-center gap-2">
              <Info size={14} />
              Heapsize
            </h4>
            <p>
              Allocates memory in kilobytes. The GoldSrc engine was designed for older 
              systems. Values:
              <br/>
              • <span className="text-cs-green">256000</span> = 256MB (low-end)
              <br/>
              • <span className="text-cs-green">512000</span> = 512MB (recommended)
              <br/>
              • <span className="text-cs-green">1048576</span> = 1GB (overkill, may cause issues)
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2 flex items-center gap-2">
              <Info size={14} />
              Zone
            </h4>
            <p>
              Memory allocated for console commands and aliases. Increase if you get 
              "Zone allocation failed" errors with complex scripts. Default is around 256, 
              <span className="text-cs-green"> 8192</span> is plenty for even heavy configs.
            </p>
          </div>
        </div>
      </ConsoleSection>

      {/* Warning */}
      <motion.div
        className="bg-cs-orange/10 border border-cs-orange/50 p-4 mt-6 flex items-start gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AlertTriangle className="text-cs-orange shrink-0 mt-0.5" size={18} />
        <div>
          <p className="text-cs-orange text-sm font-bold mb-1">Important Notes</p>
          <ul className="text-cs-orange/80 text-xs space-y-1">
            <li>• Invalid options are silently ignored - double-check your syntax</li>
            <li>• Some options may conflict with each other</li>
            <li>• -freq only works in fullscreen mode</li>
            <li>• Test new options in offline mode first</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
