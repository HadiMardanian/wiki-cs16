import { Wrench, AlertTriangle, CheckCircle, XCircle, Info, Bug } from 'lucide-react';
import { useState } from 'react';
import { PageTitle } from '../components/PageTitle';
import { ConsoleSection } from '../components/ConsoleSection';
import { CodeBlock } from '../components/CodeBlock';
import { motion, AnimatePresence } from 'framer-motion';

interface Issue {
  id: string;
  title: string;
  symptoms: string[];
  causes: string[];
  solutions: string[];
  commands?: string;
  category: 'performance' | 'graphics' | 'network' | 'audio' | 'controls';
}

const issues: Issue[] = [
  {
    id: 'low-fps',
    title: 'Low FPS / Stuttering',
    symptoms: ['Game feels sluggish', 'FPS drops below 60', 'Random stutters'],
    causes: ['V-Sync enabled', 'FPS cap too low', 'Background programs', 'High graphics settings'],
    solutions: [
      'Disable V-Sync with gl_vsync "0"',
      'Uncap FPS with fps_max "999"',
      'Close background applications',
      'Lower resolution or texture quality',
      'Add -nojoy -noipx to launch options',
    ],
    commands: `// FPS Fix Commands
fps_max "999"
fps_override "1"
gl_vsync "0"
r_detailtextures "0"
cl_himodels "0"
gl_picmip "2"`,
    category: 'performance',
  },
  {
    id: 'mouse-accel',
    title: 'Mouse Feels Inconsistent',
    symptoms: ['Aim feels off', 'Mouse acceleration', 'Inconsistent sensitivity'],
    causes: ['Mouse acceleration enabled', 'Raw input disabled', 'Mouse filtering on', 'Windows settings'],
    solutions: [
      'Enable raw input with m_rawinput "1"',
      'Disable mouse filtering with m_filter "0"',
      'Disable all acceleration commands',
      'Disable "Enhance pointer precision" in Windows',
      'Use your mouse\'s native DPI',
    ],
    commands: `// Mouse Fix Commands
m_rawinput "1"
m_filter "0"
m_customaccel "0"
m_mouseaccel1 "0"
m_mouseaccel2 "0"`,
    category: 'controls',
  },
  {
    id: 'high-ping',
    title: 'High Ping / Lag',
    symptoms: ['Delayed actions', 'Rubberbanding', 'High ping in net_graph'],
    causes: ['Wrong rate settings', 'Server distance', 'Network issues', 'Background downloads'],
    solutions: [
      'Match rate to your connection speed',
      'Match cmdrate/updaterate to server tickrate',
      'Use wired connection instead of WiFi',
      'Close bandwidth-heavy applications',
      'Try servers closer to your location',
    ],
    commands: `// Network Fix Commands
rate "128000"
cl_cmdrate "101"
cl_updaterate "101"
cl_interp "0"
cl_interp_ratio "1"`,
    category: 'network',
  },
  {
    id: 'choke-loss',
    title: 'Packet Loss / Choke',
    symptoms: ['Choke showing in net_graph', 'Hit registration issues', 'Warping players'],
    causes: ['Rate too high for connection', 'Server issues', 'Network congestion'],
    solutions: [
      'Lower your rate value',
      'Reduce cmdrate/updaterate',
      'Check for network problems',
      'Try a different server',
    ],
    commands: `// Reduce Network Load
rate "25000"
cl_cmdrate "64"
cl_updaterate "64"`,
    category: 'network',
  },
  {
    id: 'no-sound',
    title: 'No Sound / Audio Issues',
    symptoms: ['No game sounds', 'Crackling audio', 'Delayed sounds'],
    causes: ['Wrong audio device', 'Sound buffer issues', 'Driver problems'],
    solutions: [
      'Check Windows default audio device',
      'Adjust snd_mixahead value',
      'Disable hardware audio effects',
      'Update audio drivers',
      'Verify game files integrity',
    ],
    commands: `// Audio Fix Commands
volume "0.5"
snd_mixahead "0.1"
s_eax "0"
s_a3d "0"
hisound "1"`,
    category: 'audio',
  },
  {
    id: 'black-screen',
    title: 'Black Screen / Display Issues',
    symptoms: ['Black screen on start', 'Wrong resolution', 'Screen tearing'],
    causes: ['Resolution not supported', 'Refresh rate mismatch', 'Fullscreen issues'],
    solutions: [
      'Use launch options to force resolution',
      'Try windowed mode first',
      'Reset video settings via config',
      'Update graphics drivers',
    ],
    commands: `// Add to Launch Options:
// -w 1024 -h 768 -window

// Or reset video in config:
_vid_default_mode "0"
vid_config_x "1024"
vid_config_y "768"`,
    category: 'graphics',
  },
  {
    id: 'crash-startup',
    title: 'Game Crashes on Startup',
    symptoms: ['Crash to desktop', 'hl.exe stopped working', 'Freeze on loading'],
    causes: ['Corrupted files', 'Outdated drivers', 'Conflicting software', 'Bad config'],
    solutions: [
      'Verify game files in Steam',
      'Delete config files and restart',
      'Update graphics/audio drivers',
      'Disable antivirus temporarily',
      'Run as administrator',
    ],
    commands: `// Reset to defaults - delete these files:
// cstrike/config.cfg
// cstrike/userconfig.cfg
// cstrike/autoexec.cfg

// Then verify game files in Steam`,
    category: 'performance',
  },
  {
    id: 'console-not-opening',
    title: 'Console Won\'t Open',
    symptoms: ['~ key doesn\'t work', 'Console not appearing'],
    causes: ['Console not enabled', 'Key binding issue'],
    solutions: [
      'Enable in Options → Keyboard → Advanced',
      'Add -console to launch options',
      'Check if ~ key is bound to something else',
    ],
    commands: `// Add to Launch Options:
-console

// Or enable via options menu:
// Options → Keyboard → Advanced
// ✓ Enable Developer Console`,
    category: 'controls',
  },
];

const categories = [
  { id: 'all', label: 'All Issues' },
  { id: 'performance', label: 'Performance' },
  { id: 'graphics', label: 'Graphics' },
  { id: 'network', label: 'Network' },
  { id: 'audio', label: 'Audio' },
  { id: 'controls', label: 'Controls' },
];

const resetConfig = `// FULL CONFIG RESET
// Backup your settings first!

// 1. Exit Counter-Strike
// 2. Navigate to:
//    Steam/steamapps/common/Half-Life/cstrike/
// 3. Delete or rename these files:
//    - config.cfg
//    - userconfig.cfg
//    - autoexec.cfg
// 4. Start the game - fresh config will generate`;

export function TroubleshootingPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);

  const filteredIssues = issues.filter(
    (issue) => activeCategory === 'all' || issue.category === activeCategory
  );

  return (
    <div>
      <PageTitle
        title="Troubleshooting"
        subtitle="Common issues and how to fix them"
        icon={Wrench}
      />

      {/* Quick Tip */}
      <motion.div
        className="bg-cs-dark border border-cs-yellow/50 p-4 mb-6 flex items-start gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Info className="text-cs-yellow shrink-0 mt-0.5" size={18} />
        <p className="text-cs-yellow text-sm">
          Before trying complex fixes, always try: <span className="text-cs-green">Verify game files</span> in 
          Steam (Right-click game → Properties → Local Files → Verify integrity)
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1 text-xs uppercase tracking-wider border transition-all ${
              activeCategory === cat.id
                ? 'bg-cs-green text-cs-black border-cs-green'
                : 'bg-transparent text-cs-green/70 border-cs-green/30 hover:border-cs-green/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Issues List */}
      <ConsoleSection title={`Issues (${filteredIssues.length})`}>
        <div className="space-y-4">
          {filteredIssues.map((issue) => (
            <motion.div
              key={issue.id}
              className="bg-cs-dark border border-cs-green/30 overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Issue Header */}
              <button
                onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-cs-darker/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Bug className="text-cs-orange" size={18} />
                  <span className="text-cs-yellow font-bold text-left">{issue.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-cs-gray uppercase">{issue.category}</span>
                  <motion.span
                    className="text-cs-green"
                    animate={{ rotate: expandedIssue === issue.id ? 180 : 0 }}
                  >
                    ▼
                  </motion.span>
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedIssue === issue.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-cs-green/20"
                  >
                    <div className="p-4 space-y-4">
                      {/* Symptoms */}
                      <div>
                        <h4 className="text-cs-red text-sm font-bold mb-2 flex items-center gap-2">
                          <XCircle size={14} />
                          Symptoms
                        </h4>
                        <ul className="text-cs-gray text-xs space-y-1 ml-5">
                          {issue.symptoms.map((s, i) => (
                            <li key={i}>• {s}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Causes */}
                      <div>
                        <h4 className="text-cs-orange text-sm font-bold mb-2 flex items-center gap-2">
                          <AlertTriangle size={14} />
                          Possible Causes
                        </h4>
                        <ul className="text-cs-gray text-xs space-y-1 ml-5">
                          {issue.causes.map((c, i) => (
                            <li key={i}>• {c}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Solutions */}
                      <div>
                        <h4 className="text-cs-green text-sm font-bold mb-2 flex items-center gap-2">
                          <CheckCircle size={14} />
                          Solutions
                        </h4>
                        <ol className="text-cs-green/80 text-xs space-y-1 ml-5 list-decimal list-inside">
                          {issue.solutions.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ol>
                      </div>

                      {/* Commands */}
                      {issue.commands && (
                        <div className="mt-4">
                          <CodeBlock code={issue.commands} title="Fix Commands" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </ConsoleSection>

      {/* Nuclear Option */}
      <ConsoleSection title="Nuclear Option: Full Reset" variant="technical">
        <p className="text-sm mb-4">
          If nothing else works, completely reset your configuration:
        </p>
        <CodeBlock code={resetConfig} title="Config Reset Instructions" />
        
        <div className="mt-4 p-4 bg-cs-dark border border-cs-red/30">
          <h4 className="text-cs-red text-sm font-bold mb-2 flex items-center gap-2">
            <AlertTriangle size={14} />
            Warning
          </h4>
          <p className="text-cs-red/80 text-xs">
            This will delete ALL your settings including keybinds, crosshair, and network 
            settings. Make sure to backup your config files before deleting!
          </p>
        </div>
      </ConsoleSection>

      {/* Diagnostic Tools */}
      <ConsoleSection title="Diagnostic Commands">
        <p className="text-sm mb-4">
          Use these commands to diagnose issues:
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-cs-dark/50 border border-cs-green/20 p-4">
            <code className="text-cs-yellow">net_graph 3</code>
            <p className="text-cs-gray text-xs mt-1">
              Shows FPS, ping, choke, loss - essential for network debugging
            </p>
          </div>
          <div className="bg-cs-dark/50 border border-cs-green/20 p-4">
            <code className="text-cs-yellow">cl_showfps 1</code>
            <p className="text-cs-gray text-xs mt-1">
              Simple FPS counter - check if you're hitting target framerate
            </p>
          </div>
          <div className="bg-cs-dark/50 border border-cs-green/20 p-4">
            <code className="text-cs-yellow">status</code>
            <p className="text-cs-gray text-xs mt-1">
              Shows server info, your connection stats, and player list
            </p>
          </div>
          <div className="bg-cs-dark/50 border border-cs-green/20 p-4">
            <code className="text-cs-yellow">ping</code>
            <p className="text-cs-gray text-xs mt-1">
              Quick ping check to connected server
            </p>
          </div>
        </div>
      </ConsoleSection>

      {/* Still Need Help */}
      <motion.div
        className="bg-cs-dark border border-cs-green/50 p-6 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-cs-green font-bold mb-3">Still Having Issues?</h3>
        <ul className="text-cs-green/80 text-sm space-y-2">
          <li>• Check the <a href="https://steamcommunity.com/app/10/discussions/" className="text-cs-yellow hover:underline" target="_blank" rel="noopener noreferrer">Steam Community Forums</a></li>
          <li>• Search for your error message online</li>
          <li>• Try running the game as Administrator</li>
          <li>• Reinstall the game as a last resort</li>
        </ul>
      </motion.div>
    </div>
  );
}
