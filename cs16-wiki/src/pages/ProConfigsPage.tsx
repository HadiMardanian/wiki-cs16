import { Trophy, Star, User, Info } from 'lucide-react';
import { PageTitle } from '../components/PageTitle';
import { ConsoleSection } from '../components/ConsoleSection';
import { CodeBlock } from '../components/CodeBlock';
import { motion } from 'framer-motion';

interface ProPlayer {
  name: string;
  team: string;
  role: string;
  mouse: string;
  dpi: number;
  sensitivity: number;
  resolution: string;
  config: string;
}

const proPlayers: ProPlayer[] = [
  {
    name: 'f0rest',
    team: 'NiP',
    role: 'Rifler',
    mouse: 'Zowie EC2',
    dpi: 400,
    sensitivity: 2.6,
    resolution: '1024x768',
    config: `// f0rest Config
sensitivity "2.6"
m_rawinput "1"
m_filter "0"

// Video
fps_max "999"
cl_righthand "1"

// Network
rate "128000"
cl_cmdrate "128"
cl_updaterate "128"

// Crosshair
cl_crosshair_color "50 250 50"
cl_crosshair_size "small"
cl_dynamiccrosshair "0"`,
  },
  {
    name: 'Neo',
    team: 'Frag Executors',
    role: 'Entry Fragger',
    mouse: 'Intelli 1.1a',
    dpi: 400,
    sensitivity: 2.5,
    resolution: '800x600',
    config: `// Neo Config
sensitivity "2.5"
m_rawinput "1"
m_filter "0"
m_customaccel "0"

// Video
fps_max "101"
gl_vsync "0"
brightness "2.5"
gamma "2.5"

// Network
rate "25000"
cl_cmdrate "101"
cl_updaterate "101"

// Gameplay
cl_dynamiccrosshair "0"
cl_minmodels "1"
hud_fastswitch "1"`,
  },
  {
    name: 'GeT_RiGhT',
    team: 'NiP',
    role: 'Lurker',
    mouse: 'Zowie FK1',
    dpi: 400,
    sensitivity: 2.9,
    resolution: '1024x768',
    config: `// GeT_RiGhT Config
sensitivity "2.9"
m_rawinput "1"
m_filter "0"

// Video
fps_max "300"
cl_righthand "1"
gl_vsync "0"

// Network
rate "128000"
cl_cmdrate "128"
cl_updaterate "128"
cl_interp "0"
cl_interp_ratio "1"

// Crosshair
cl_crosshair_color "50 250 50"
cl_crosshair_size "medium"`,
  },
  {
    name: 'markeloff',
    team: 'Na`Vi',
    role: 'AWPer',
    mouse: 'Steelseries Kinzu',
    dpi: 450,
    sensitivity: 2.2,
    resolution: '800x600',
    config: `// markeloff Config
sensitivity "2.2"
zoom_sensitivity_ratio "0.9"
m_rawinput "1"
m_filter "0"

// Video
fps_max "100"
brightness "3"
gamma "3"

// Network
rate "25000"
cl_cmdrate "101"
cl_updaterate "101"

// AWP Settings
cl_dynamiccrosshair "0"
cl_bob "0"
_cl_autowepswitch "0"`,
  },
  {
    name: 'n0thing',
    team: 'compLexity',
    role: 'Rifler/IGL',
    mouse: 'Logitech MX518',
    dpi: 400,
    sensitivity: 3.0,
    resolution: '640x480',
    config: `// n0thing Config
sensitivity "3.0"
m_rawinput "1"
m_filter "0"

// Video
fps_max "101"
cl_righthand "0"
brightness "2"
gamma "3"

// Network
rate "25000"
cl_cmdrate "101"
cl_updaterate "101"

// Gameplay
cl_dynamiccrosshair "0"
hud_centerid "1"
hud_fastswitch "1"`,
  },
  {
    name: 'SpawN',
    team: 'SK Gaming',
    role: 'Entry Fragger',
    mouse: 'Intelli 3.0',
    dpi: 400,
    sensitivity: 2.0,
    resolution: '640x480',
    config: `// SpawN Config
sensitivity "2.0"
m_rawinput "1"
m_filter "0"

// Video
fps_max "101"
cl_righthand "1"
brightness "2"
gamma "2.5"

// Network
rate "20000"
cl_cmdrate "100"
cl_updaterate "100"

// Gameplay
cl_dynamiccrosshair "0"
cl_weather "0"
cl_minmodels "1"`,
  },
];

const edpiExplanation = `// eDPI (Effective DPI) Calculation
// eDPI = DPI × In-Game Sensitivity
//
// Example: 400 DPI × 2.5 sens = 1000 eDPI
//
// Pro Average: 800-1200 eDPI
// Lower = More precision (AWP)
// Higher = Faster flicks (Entry)`;

export function ProConfigsPage() {
  return (
    <div>
      <PageTitle
        title="Pro Configs"
        subtitle="Settings from legendary Counter-Strike players"
        icon={Trophy}
      />

      {/* Info Banner */}
      <motion.div
        className="bg-cs-dark border border-cs-green/50 p-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-cs-green font-bold mb-4 flex items-center gap-2">
          <Info size={18} />
          About Pro Settings
        </h3>
        <p className="text-cs-green/80 text-sm mb-4">
          These settings are from professional CS 1.6 players during their competitive careers. 
          Remember: what works for pros may not work for you. Use these as reference points 
          and adjust to your own playstyle and hardware.
        </p>
        <div className="grid grid-cols-3 gap-4 text-center text-xs">
          <div className="bg-cs-black p-3 border border-cs-green/30">
            <p className="text-cs-yellow">Average eDPI</p>
            <p className="text-cs-green text-lg font-bold">1000</p>
          </div>
          <div className="bg-cs-black p-3 border border-cs-green/30">
            <p className="text-cs-yellow">Most Used DPI</p>
            <p className="text-cs-green text-lg font-bold">400</p>
          </div>
          <div className="bg-cs-black p-3 border border-cs-green/30">
            <p className="text-cs-yellow">Popular Res</p>
            <p className="text-cs-green text-lg font-bold">800×600</p>
          </div>
        </div>
      </motion.div>

      {/* eDPI Explanation */}
      <ConsoleSection title="Understanding eDPI">
        <CodeBlock code={edpiExplanation} title="eDPI Calculator Reference" />
      </ConsoleSection>

      {/* Pro Players Grid */}
      <ConsoleSection title="Pro Player Configs">
        <div className="space-y-8">
          {proPlayers.map((player, index) => (
            <motion.div
              key={player.name}
              className="bg-cs-dark border border-cs-green/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Player Header */}
              <div className="bg-cs-darker border-b border-cs-green/30 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="text-cs-yellow" size={20} />
                  <div>
                    <h3 className="text-cs-yellow font-bold">{player.name}</h3>
                    <p className="text-cs-gray text-xs">{player.team} • {player.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="text-cs-yellow" size={14} />
                  <Star className="text-cs-yellow" size={14} />
                  <Star className="text-cs-yellow" size={14} />
                </div>
              </div>

              {/* Player Stats */}
              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-2 bg-cs-black/50 border border-cs-green/20">
                    <p className="text-cs-gray text-xs">Mouse</p>
                    <p className="text-cs-green text-sm font-bold">{player.mouse}</p>
                  </div>
                  <div className="text-center p-2 bg-cs-black/50 border border-cs-green/20">
                    <p className="text-cs-gray text-xs">DPI</p>
                    <p className="text-cs-green text-sm font-bold">{player.dpi}</p>
                  </div>
                  <div className="text-center p-2 bg-cs-black/50 border border-cs-green/20">
                    <p className="text-cs-gray text-xs">Sensitivity</p>
                    <p className="text-cs-green text-sm font-bold">{player.sensitivity}</p>
                  </div>
                  <div className="text-center p-2 bg-cs-black/50 border border-cs-green/20">
                    <p className="text-cs-gray text-xs">Resolution</p>
                    <p className="text-cs-green text-sm font-bold">{player.resolution}</p>
                  </div>
                </div>

                <div className="text-center p-2 bg-cs-black/50 border border-cs-yellow/30 mb-4">
                  <p className="text-cs-gray text-xs">eDPI (DPI × Sens)</p>
                  <p className="text-cs-yellow text-lg font-bold">
                    {player.dpi * player.sensitivity}
                  </p>
                </div>

                <CodeBlock code={player.config} title={`${player.name}'s Config`} />
              </div>
            </motion.div>
          ))}
        </div>
      </ConsoleSection>

      {/* Tips */}
      <ConsoleSection title="Using Pro Configs" variant="technical">
        <div className="space-y-4 text-sm">
          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">Don't Copy Blindly</h4>
            <p>
              Pro settings are highly personal. Start with their general setup but adjust 
              sensitivity and crosshair to match your own aim style. What feels natural to 
              you is more important than copying exact values.
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">Hardware Matters</h4>
            <p>
              Many pros used specific mice with native DPI steps. The Intelli 1.1a at 400 DPI 
              was legendary for its sensor. Modern mice can emulate this, but sensor 
              performance varies. Match your mouse's native DPI for best results.
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">Resolution Trade-offs</h4>
            <p>
              Lower resolutions (640×480, 800×600) were used because:
              <br/>• Higher FPS on older hardware
              <br/>• Larger player models (stretched 4:3)
              <br/>• Less visual clutter
              <br/>
              On modern systems, 1024×768 offers a good balance.
            </p>
          </div>
        </div>
      </ConsoleSection>

      {/* Quick Reference */}
      <ConsoleSection title="Quick Comparison">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cs-green/30">
                <th className="text-left py-2 px-3 text-cs-yellow">Player</th>
                <th className="text-center py-2 px-3 text-cs-yellow">DPI</th>
                <th className="text-center py-2 px-3 text-cs-yellow">Sens</th>
                <th className="text-center py-2 px-3 text-cs-yellow">eDPI</th>
                <th className="text-center py-2 px-3 text-cs-yellow">Resolution</th>
              </tr>
            </thead>
            <tbody>
              {proPlayers.map((player) => (
                <tr key={player.name} className="border-b border-cs-green/10 hover:bg-cs-dark/50">
                  <td className="py-2 px-3 text-cs-green">{player.name}</td>
                  <td className="py-2 px-3 text-center text-cs-gray">{player.dpi}</td>
                  <td className="py-2 px-3 text-center text-cs-gray">{player.sensitivity}</td>
                  <td className="py-2 px-3 text-center text-cs-yellow font-bold">
                    {player.dpi * player.sensitivity}
                  </td>
                  <td className="py-2 px-3 text-center text-cs-gray">{player.resolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ConsoleSection>
    </div>
  );
}
