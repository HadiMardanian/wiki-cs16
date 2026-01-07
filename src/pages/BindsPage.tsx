import { Keyboard, Zap } from 'lucide-react';
import { PageTitle } from '../components/PageTitle';
import { ConsoleSection } from '../components/ConsoleSection';
import { CodeBlock } from '../components/CodeBlock';
import { motion } from 'framer-motion';

const movementBinds = `// Movement Binds
bind "w" "+forward"
bind "s" "+back"
bind "a" "+moveleft"
bind "d" "+moveright"
bind "SPACE" "+jump"
bind "CTRL" "+duck"
bind "SHIFT" "+speed"`;

const weaponBinds = `// Weapon Quick-Switch
bind "1" "slot1"           // Primary
bind "2" "slot2"           // Secondary  
bind "3" "slot3"           // Knife
bind "4" "slot4"           // Grenades
bind "5" "slot5"           // C4/Defuser

// Quick-Switch (AWP trick)
bind "q" "lastinv"

// Direct Grenade Binds
bind "f" "use weapon_flashbang"
bind "g" "use weapon_hegrenade"
bind "c" "use weapon_smokegrenade"`;

const utilityBinds = `// Buy Binds (Numpad)
bind "KP_INS" "buy m4a1; buy ak47"    // 0 - Rifle
bind "KP_END" "buy deagle"             // 1 - Deagle
bind "KP_DOWNARROW" "buy awp"          // 2 - AWP
bind "KP_PGDN" "buy vesthelm"          // 3 - Kevlar+Helm
bind "KP_LEFTARROW" "buy flashbang"    // 4 - Flash
bind "KP_5" "buy hegrenade"            // 5 - HE
bind "KP_RIGHTARROW" "buy smokegrenade"// 6 - Smoke
bind "KP_HOME" "buy defuser"           // 7 - Defuser

// Communication
bind "z" "radio1"
bind "x" "radio2"  
bind "v" "+voicerecord"`;

const proBind = `// Pro Jump-Throw Bind (for consistent nade throws)
alias "+jumpthrow" "+jump; -attack"
alias "-jumpthrow" "-jump"
bind "n" "+jumpthrow"`;

export function BindsPage() {
  return (
    <div>
      <PageTitle
        title="Key Bindings"
        subtitle="Optimize your muscle memory with smart binds"
        icon={Keyboard}
      />

      {/* Quick Reference */}
      <motion.div
        className="bg-cs-dark border border-cs-green/50 p-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-cs-green font-bold mb-4 flex items-center gap-2">
          <Zap size={18} />
          Bind Syntax
        </h3>
        <div className="font-mono text-sm bg-cs-black p-4 border border-cs-green/30">
          <span className="text-cs-yellow">bind</span>
          <span className="text-cs-gray"> "</span>
          <span className="text-cs-green">KEY</span>
          <span className="text-cs-gray">" "</span>
          <span className="text-cs-orange">command</span>
          <span className="text-cs-gray">"</span>
        </div>
        <p className="text-cs-gray text-xs mt-3">
          Use <span className="text-cs-yellow">unbind "KEY"</span> to remove a binding
        </p>
      </motion.div>

      {/* Movement */}
      <ConsoleSection title="Movement Binds">
        <p className="mb-4 text-sm">
          Standard WASD configuration with modifiers:
        </p>
        <CodeBlock code={movementBinds} title="Movement" />
      </ConsoleSection>

      {/* Weapons */}
      <ConsoleSection title="Weapon Binds">
        <p className="mb-4 text-sm">
          Quick weapon selection and grenade shortcuts:
        </p>
        <CodeBlock code={weaponBinds} title="Weapons & Equipment" />
      </ConsoleSection>

      {/* Technical Analysis */}
      <ConsoleSection title="Technical Analysis" variant="technical">
        <div className="space-y-4 text-sm">
          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">Quick-Switch (lastinv)</h4>
            <p>
              The <span className="text-cs-green">lastinv</span> command switches to your 
              previous weapon instantly. Essential for AWPers who need to cancel the scope 
              animation after a shot. Press Q twice rapidly for fastest re-scope.
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">Direct Grenade Binds</h4>
            <p>
              Using <span className="text-cs-green">use weapon_</span> commands is faster than 
              cycling through the grenade slot. Competitive players bind each grenade 
              type to a dedicated key for instant access in clutch situations.
            </p>
          </div>
        </div>
      </ConsoleSection>

      {/* Buy Binds */}
      <ConsoleSection title="Buy Binds">
        <p className="mb-4 text-sm">
          Numpad buy binds for lightning-fast purchases:
        </p>
        <CodeBlock code={utilityBinds} title="Buy Menu & Utility" />
      </ConsoleSection>

      {/* Pro Binds */}
      <ConsoleSection title="Advanced: Jump-Throw Bind">
        <p className="mb-4 text-sm">
          Consistent grenade throws using alias commands:
        </p>
        <CodeBlock code={proBind} title="Jump-Throw Alias" />
        
        <div className="mt-4 p-4 bg-cs-dark border border-cs-yellow/30">
          <h4 className="text-cs-yellow text-sm font-bold mb-2">How it works:</h4>
          <p className="text-xs text-cs-yellow-dim">
            Hold left-click with grenade equipped, then press the bind key. The alias 
            executes +jump and -attack simultaneously, ensuring perfectly timed release 
            for consistent long-range throws. <span className="text-cs-red">Note: May be 
            banned in some leagues.</span>
          </p>
        </div>
      </ConsoleSection>
    </div>
  );
}
