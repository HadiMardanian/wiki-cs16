import { Volume2, Headphones } from 'lucide-react';
import { PageTitle } from '../components/PageTitle';
import { ConsoleSection } from '../components/ConsoleSection';
import { CodeBlock } from '../components/CodeBlock';
import { motion } from 'framer-motion';
import { audioConfig, footstepConfig } from '../data/configBlocks';

export function AudioPage() {
  return (
    <div>
      <PageTitle
        title="Audio Settings"
        subtitle="Hear every footstep with crystal clarity"
        icon={Volume2}
      />

      {/* Audio Priority */}
      <motion.div
        className="bg-cs-dark border border-cs-green/50 p-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-cs-green font-bold mb-4 flex items-center gap-2">
          <Headphones size={18} />
          Sound Cues Priority
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-4">
            <span className="w-20 text-cs-yellow text-right">Critical:</span>
            <span className="text-cs-green">Footsteps, Reloads, Defuse/Plant sounds</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-cs-orange text-right">Important:</span>
            <span className="text-cs-green/80">Gunfire direction, Grenade bounces</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-cs-gray text-right">Minor:</span>
            <span className="text-cs-green/60">Radio commands, Voice chat</span>
          </div>
        </div>
      </motion.div>

      {/* Main Config */}
      <ConsoleSection title="The Config">
        <p className="mb-4 text-sm">
          Clean audio settings optimized for hearing enemy movement:
        </p>
        <CodeBlock code={audioConfig} title="Audio Configuration" />
      </ConsoleSection>

      {/* Technical Analysis */}
      <ConsoleSection title="Technical Analysis" variant="technical">
        <div className="space-y-4 text-sm">
          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">snd_mixahead "0.1"</h4>
            <p>
              Audio buffer size in seconds. Lower values = less audio latency but 
              potential crackling on slower systems. 0.1 (100ms) is the sweet spot 
              for most setups. Try 0.05 if you have audio issues.
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">s_eax "0" & s_a3d "0"</h4>
            <p>
              Disables hardware audio effects (EAX/A3D). These add reverb and 
              environmental effects that can mask important directional cues. 
              Keep disabled for cleaner, more accurate positional audio.
            </p>
          </div>

          <div className="bg-cs-dark/50 border-l-2 border-cs-yellow p-4">
            <h4 className="text-cs-yellow font-bold mb-2">hisound "1"</h4>
            <p>
              Enables high-quality sound mixing. Uses more CPU but provides 
              better audio fidelity and more accurate distance perception 
              for footsteps and gunfire.
            </p>
          </div>
        </div>
      </ConsoleSection>

      {/* Advanced */}
      <ConsoleSection title="Advanced Tweaks">
        <p className="mb-4 text-sm">
          Additional settings for audio enthusiasts:
        </p>
        <CodeBlock code={footstepConfig} title="Advanced Audio" />
        
        <div className="mt-4 p-4 bg-cs-dark border border-cs-green/30">
          <h4 className="text-cs-green text-sm font-bold mb-2">Pro Tips:</h4>
          <ul className="text-xs text-cs-green/80 space-y-1">
            <li>• Use <span className="text-cs-yellow">stereo headphones</span> - surround can muddy positioning</li>
            <li>• Disable Windows audio enhancements</li>
            <li>• Set Windows sound to 16-bit, 44100 Hz</li>
            <li>• Keep master volume at 50% to preserve dynamic range</li>
          </ul>
        </div>
      </ConsoleSection>
    </div>
  );
}
