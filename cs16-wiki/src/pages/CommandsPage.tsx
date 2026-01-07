import { Terminal, Search, Info } from 'lucide-react';
import { useState } from 'react';
import { PageTitle } from '../components/PageTitle';
import { ConsoleSection } from '../components/ConsoleSection';
import { CodeBlock } from '../components/CodeBlock';
import { motion } from 'framer-motion';

interface Command {
  name: string;
  description: string;
  example?: string;
  category: string;
}

const commands: Command[] = [
  // Display Commands
  { name: 'cl_showfps 1', description: 'Display FPS counter on screen', category: 'display' },
  { name: 'net_graph 3', description: 'Show network statistics overlay', category: 'display' },
  { name: 'net_graphpos 2', description: 'Position of net_graph (1=right, 2=center, 3=left)', category: 'display' },
  { name: 'cl_righthand 1', description: 'Weapon in right hand (0=left)', category: 'display' },
  { name: 'hud_centerid 1', description: 'Center player names on screen', category: 'display' },
  { name: 'cl_weather 0', description: 'Disable weather effects', category: 'display' },

  // Gameplay Commands
  { name: 'cl_dynamiccrosshair 0', description: 'Static crosshair (no expansion when moving)', category: 'gameplay' },
  { name: '_cl_autowepswitch 0', description: 'Disable auto weapon switch on pickup', category: 'gameplay' },
  { name: 'cl_observercrosshair 1', description: 'Show crosshair while spectating', category: 'gameplay' },
  { name: 'hud_fastswitch 1', description: 'Fast weapon switching without confirmation', category: 'gameplay' },
  { name: 'cl_minmodels 1', description: 'Use minimal player models (same skin per team)', category: 'gameplay' },
  { name: 'cl_himodels 0', description: 'Disable high detail models', category: 'gameplay' },

  // Server Commands
  { name: 'status', description: 'Show server info and connected players', category: 'server' },
  { name: 'ping', description: 'Display ping to server', category: 'server' },
  { name: 'connect <ip>', description: 'Connect to a server', example: 'connect 192.168.1.1:27015', category: 'server' },
  { name: 'disconnect', description: 'Disconnect from current server', category: 'server' },
  { name: 'retry', description: 'Reconnect to last server', category: 'server' },
  { name: 'reconnect', description: 'Reconnect to current server', category: 'server' },

  // Demo Commands
  { name: 'record <name>', description: 'Start recording a demo', example: 'record mydemo', category: 'demo' },
  { name: 'stop', description: 'Stop recording demo', category: 'demo' },
  { name: 'playdemo <name>', description: 'Play a recorded demo', example: 'playdemo mydemo', category: 'demo' },
  { name: 'viewdemo <name>', description: 'View demo with controls', example: 'viewdemo mydemo', category: 'demo' },
  { name: 'stopdemo', description: 'Stop playing demo', category: 'demo' },

  // System Commands
  { name: 'exec <file>', description: 'Execute a config file', example: 'exec autoexec.cfg', category: 'system' },
  { name: 'clear', description: 'Clear console text', category: 'system' },
  { name: 'echo <text>', description: 'Print text to console', example: 'echo Config loaded!', category: 'system' },
  { name: 'quit', description: 'Exit the game', category: 'system' },
  { name: 'fps_max 999', description: 'Set maximum FPS limit', category: 'system' },
  { name: 'developer 0', description: 'Developer mode (0=off, 1=on)', category: 'system' },
];

const categories = [
  { id: 'all', label: 'All Commands' },
  { id: 'display', label: 'Display' },
  { id: 'gameplay', label: 'Gameplay' },
  { id: 'server', label: 'Server' },
  { id: 'demo', label: 'Demo' },
  { id: 'system', label: 'System' },
];

const usefulConfig = `// Essential Console Commands
cl_showfps "1"
net_graph "3"
cl_righthand "1"
hud_centerid "1"
cl_dynamiccrosshair "0"
_cl_autowepswitch "0"
hud_fastswitch "1"
cl_minmodels "1"`;

export function CommandsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCommands = commands.filter((cmd) => {
    const matchesSearch = cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || cmd.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <PageTitle
        title="Console Commands"
        subtitle="Master the ~ console with these essential commands"
        icon={Terminal}
      />

      {/* Search Bar */}
      <motion.div
        className="bg-cs-dark border border-cs-green/50 p-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cs-green/50" size={18} />
          <input
            type="text"
            placeholder="Search commands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-cs-black border border-cs-green/30 px-10 py-2 text-cs-green 
                       placeholder-cs-green/30 font-mono text-sm focus:outline-none 
                       focus:border-cs-green/60"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
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
      </motion.div>

      {/* Quick Config */}
      <ConsoleSection title="Quick Setup">
        <p className="mb-4 text-sm">
          Copy these essential commands to your <span className="text-cs-yellow">userconfig.cfg</span>:
        </p>
        <CodeBlock code={usefulConfig} title="Essential Commands" />
      </ConsoleSection>

      {/* Commands List */}
      <ConsoleSection title={`Commands (${filteredCommands.length})`}>
        <div className="space-y-3">
          {filteredCommands.map((cmd, index) => (
            <motion.div
              key={cmd.name}
              className="bg-cs-dark/50 border border-cs-green/20 p-4 hover:border-cs-green/40 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <code className="text-cs-yellow font-bold text-sm">{cmd.name}</code>
                  <p className="text-cs-green/80 text-sm mt-1">{cmd.description}</p>
                  {cmd.example && (
                    <p className="text-cs-gray text-xs mt-2">
                      Example: <span className="text-cs-orange">{cmd.example}</span>
                    </p>
                  )}
                </div>
                <span className="text-xs text-cs-green/40 uppercase">{cmd.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </ConsoleSection>

      {/* Tips */}
      <ConsoleSection title="Console Tips" variant="technical">
        <div className="space-y-4 text-sm">
          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2 flex items-center gap-2">
              <Info size={14} />
              Opening the Console
            </h4>
            <p>
              Press the <span className="text-cs-green">~</span> (tilde) key to open the console. 
              If it doesn't work, enable it in Options → Keyboard → Advanced → Enable Developer Console.
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2 flex items-center gap-2">
              <Info size={14} />
              Auto-Complete
            </h4>
            <p>
              Start typing a command and press <span className="text-cs-green">Tab</span> to 
              auto-complete. Press Tab multiple times to cycle through matches.
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2 flex items-center gap-2">
              <Info size={14} />
              Command History
            </h4>
            <p>
              Use <span className="text-cs-green">↑</span> and <span className="text-cs-green">↓</span> arrow 
              keys to navigate through previously entered commands.
            </p>
          </div>
        </div>
      </ConsoleSection>
    </div>
  );
}
