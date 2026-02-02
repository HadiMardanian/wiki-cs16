import { Code2, Zap, ShoppingCart, Move, Info } from 'lucide-react';
import { PageTitle } from '../components/PageTitle';
import { ConsoleSection } from '../components/ConsoleSection';
import { CodeBlock } from '../components/CodeBlock';
import { motion } from 'framer-motion';

const buyScriptRifler = `// ===== RIFLER BUY SCRIPT =====
// Numpad Buy Binds

// Primary Weapons
bind "KP_INS" "buy m4a1; buy ak47"      // 0 - M4/AK
bind "KP_DOWNARROW" "buy awp"           // 2 - AWP
bind "KP_PGDN" "buy famas; buy galil"   // 3 - Famas/Galil

// Secondary
bind "KP_END" "buy deagle"              // 1 - Deagle
bind "KP_LEFTARROW" "buy usp"           // 4 - USP
bind "KP_5" "buy glock"                 // 5 - Glock

// Equipment
bind "KP_RIGHTARROW" "buy vesthelm"     // 6 - Kevlar+Helmet
bind "KP_HOME" "buy vest"               // 7 - Kevlar Only
bind "KP_UPARROW" "buy defuser"         // 8 - Defuse Kit

// Grenades
bind "KP_PGUP" "buy hegrenade"          // 9 - HE Grenade
bind "KP_PLUS" "buy flashbang"          // + - Flash
bind "KP_MINUS" "buy smokegrenade"      // - - Smoke
bind "KP_ENTER" "buy flashbang; buy flashbang; buy hegrenade; buy smokegrenade" // Full nades`;

const buyScriptAwper = `// ===== AWP PLAYER BUY SCRIPT =====
// One-key full buy

alias "awp_fullbuy" "buy awp; buy deagle; buy vesthelm; buy flashbang; buy flashbang; buy hegrenade; buy smokegrenade; buy defuser"
alias "awp_forcebuy" "buy scout; buy deagle; buy vest; buy flashbang"
alias "awp_eco" "buy deagle; buy vest"

bind "F1" "awp_fullbuy"
bind "F2" "awp_forcebuy"
bind "F3" "awp_eco"`;

const jumpThrowScript = `// ===== JUMP THROW BIND =====
// Perfect grenade throws every time

alias "+jumpthrow" "+jump; -attack"
alias "-jumpthrow" "-jump"
bind "n" "+jumpthrow"

// Usage:
// 1. Hold left-click with grenade
// 2. Press N to execute perfect throw
// 3. Release after jump`;

const quickSwitchScript = `// ===== QUICK SWITCH SCRIPTS =====
// Fast weapon switching for AWPers

// Method 1: Simple lastinv
bind "q" "lastinv"

// Method 2: Q for knife then back
alias "+knife" "slot3"
alias "-knife" "lastinv"
bind "q" "+knife"

// Method 3: Mouse wheel quick switch
bind "MWHEELUP" "invprev"
bind "MWHEELDOWN" "invnext"

// Method 4: Dedicated AWP quick switch
alias "+quickawp" "slot3"
alias "-quickawp" "slot1"
bind "mouse4" "+quickawp"`;

const movementScripts = `// ===== MOVEMENT SCRIPTS =====

// Bunny Hop Helper (scroll wheel jump)
bind "MWHEELUP" "+jump"
bind "MWHEELDOWN" "+jump"
bind "SPACE" "+jump"

// Duck Jump (crouch + jump combo)
alias "+duckjump" "+jump; +duck"
alias "-duckjump" "-jump; -duck"
bind "c" "+duckjump"

// Silent Walk (quiet movement)
alias "+silentrun" "+speed; +duck"
alias "-silentrun" "-speed; -duck"
bind "ALT" "+silentrun"`;

const chatBinds = `// ===== COMMUNICATION BINDS =====

// Quick Messages
bind "j" "say glhf"
bind "k" "say gg"
bind "l" "say ns"
bind "u" "say_team Need backup!"
bind "i" "say_team Flash coming!"
bind "o" "say_team Rush B don't stop"

// Radio Commands
bind "z" "radio1"  // Cover me, etc.
bind "x" "radio2"  // Need backup, etc.
bind "c" "radio3"  // Report in, etc.`;

const displayToggles = `// ===== DISPLAY TOGGLES =====

// Net Graph Toggle
alias "ngon" "net_graph 3; alias ngtoggle ngoff"
alias "ngoff" "net_graph 0; alias ngtoggle ngon"
alias "ngtoggle" "ngon"
bind "TAB" "+showscores; ngtoggle"

// FPS Display Toggle
alias "fpson" "cl_showfps 1; alias fpstoggle fpsoff"
alias "fpsoff" "cl_showfps 0; alias fpstoggle fpson"
alias "fpstoggle" "fpson"
bind "F5" "fpstoggle"

// Crosshair Size Toggle
alias "chsmall" "cl_crosshair_size small; alias chtoggle chmedium"
alias "chmedium" "cl_crosshair_size medium; alias chtoggle chlarge"
alias "chlarge" "cl_crosshair_size large; alias chtoggle chsmall"
alias "chtoggle" "chsmall"
bind "F6" "chtoggle"`;

export function ScriptsPage() {
  return (
    <div>
      <PageTitle
        title="Scripts & Aliases"
        subtitle="Advanced configurations using alias commands"
        icon={Code2}
      />

      {/* Info Banner */}
      <motion.div
        className="bg-cs-dark border border-cs-yellow/50 p-4 mb-6 flex items-start gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Info className="text-cs-yellow shrink-0 mt-0.5" size={18} />
        <div>
          <p className="text-cs-yellow text-sm">
            Scripts use the <span className="text-cs-green">alias</span> command to create custom 
            commands. Place these in your <span className="text-cs-green">autoexec.cfg</span> to 
            load them automatically.
          </p>
          <p className="text-cs-gray text-xs mt-2">
            Note: Some servers may restrict certain scripts. Check league rules before competitive play.
          </p>
        </div>
      </motion.div>

      {/* Buy Scripts */}
      <ConsoleSection title="Buy Scripts">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart size={16} className="text-cs-green" />
          <p className="text-sm">
            Speed up your buy phase with organized keybinds:
          </p>
        </div>
        <div className="space-y-6">
          <CodeBlock code={buyScriptRifler} title="Rifler Buy Binds" />
          <CodeBlock code={buyScriptAwper} title="AWP Player Buy Binds" />
        </div>
      </ConsoleSection>

      {/* Technical Analysis */}
      <ConsoleSection title="How Aliases Work" variant="technical">
        <div className="space-y-4 text-sm">
          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">Basic Syntax</h4>
            <p className="mb-2">
              <code className="text-cs-green">alias "name" "command1; command2"</code>
            </p>
            <p>
              Creates a custom command that executes multiple commands. Separate commands 
              with semicolons. Aliases can call other aliases for complex behaviors.
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">+/- Prefixes</h4>
            <p className="mb-2">
              <code className="text-cs-green">+action</code> = on key press | 
              <code className="text-cs-green"> -action</code> = on key release
            </p>
            <p>
              Used for hold-to-use actions. The + version runs when you press the key, 
              the - version runs when you release it.
            </p>
          </div>
        </div>
      </ConsoleSection>

      {/* Jump Throw */}
      <ConsoleSection title="Jump-Throw Bind">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-cs-green" />
          <p className="text-sm">
            Essential for consistent grenade throws:
          </p>
        </div>
        <CodeBlock code={jumpThrowScript} title="Jump-Throw Script" />
        
        <div className="mt-4 p-4 bg-cs-dark border border-cs-orange/30">
          <h4 className="text-cs-orange text-sm font-bold mb-2">⚠️ Competition Warning</h4>
          <p className="text-xs text-cs-orange/80">
            Jump-throw binds are banned in some leagues and tournaments. Always verify 
            rules before using in official matches. ESEA, FACEIT, and most LANs have 
            varying policies on scripted binds.
          </p>
        </div>
      </ConsoleSection>

      {/* Quick Switch */}
      <ConsoleSection title="Quick Switch Scripts">
        <p className="mb-4 text-sm">
          Multiple methods for fast weapon switching:
        </p>
        <CodeBlock code={quickSwitchScript} title="Quick Switch Methods" />
      </ConsoleSection>

      {/* Movement Scripts */}
      <ConsoleSection title="Movement Scripts">
        <div className="flex items-center gap-2 mb-4">
          <Move size={16} className="text-cs-green" />
          <p className="text-sm">
            Enhance your movement capabilities:
          </p>
        </div>
        <CodeBlock code={movementScripts} title="Movement Enhancements" />
      </ConsoleSection>

      {/* Chat Binds */}
      <ConsoleSection title="Communication Binds">
        <p className="mb-4 text-sm">
          Quick chat binds for team communication:
        </p>
        <CodeBlock code={chatBinds} title="Chat & Radio Binds" />
      </ConsoleSection>

      {/* Display Toggles */}
      <ConsoleSection title="Display Toggles">
        <p className="mb-4 text-sm">
          Toggle scripts for HUD elements:
        </p>
        <CodeBlock code={displayToggles} title="Toggle Scripts" />
      </ConsoleSection>

      {/* Pro Tips */}
      <ConsoleSection title="Script Tips" variant="technical">
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-cs-dark/50 border border-cs-green/20 p-4">
            <h4 className="text-cs-green font-bold mb-2">Loading Order</h4>
            <p className="text-cs-gray text-xs">
              The game loads configs in this order: config.cfg → autoexec.cfg → userconfig.cfg. 
              Put scripts in autoexec.cfg and add <code className="text-cs-yellow">exec autoexec.cfg</code> at 
              the end of userconfig.cfg.
            </p>
          </div>

          <div className="bg-cs-dark/50 border border-cs-green/20 p-4">
            <h4 className="text-cs-green font-bold mb-2">Testing Scripts</h4>
            <p className="text-cs-gray text-xs">
              Test new scripts in a local server first. Use <code className="text-cs-yellow">sv_lan 1</code> and 
              create a listen server. This prevents accidentally using broken scripts online.
            </p>
          </div>

          <div className="bg-cs-dark/50 border border-cs-green/20 p-4">
            <h4 className="text-cs-green font-bold mb-2">Debugging</h4>
            <p className="text-cs-gray text-xs">
              Add <code className="text-cs-yellow">echo "Script loaded"</code> at the end of your 
              scripts to confirm they're executing. Check console for error messages.
            </p>
          </div>

          <div className="bg-cs-dark/50 border border-cs-green/20 p-4">
            <h4 className="text-cs-green font-bold mb-2">Backup Config</h4>
            <p className="text-cs-gray text-xs">
              Always backup your config files before making changes. Keep a copy of your 
              working setup in case you need to revert.
            </p>
          </div>
        </div>
      </ConsoleSection>
    </div>
  );
}
