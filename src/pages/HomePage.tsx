import { motion } from 'framer-motion';
import { Home, Terminal, Zap, Shield, Target } from 'lucide-react';
import { PageTitle } from '../components/PageTitle';
import { ConsoleSection } from '../components/ConsoleSection';
import { CodeBlock } from '../components/CodeBlock';
import { ConfigBuilder } from '../components/ConfigBuilder';
import { welcomeConfig } from '../data/configBlocks';

const features = [
  { icon: Zap, title: 'Optimized Netcode', desc: 'Low latency network settings' },
  { icon: Target, title: 'Precision Mouse', desc: 'Perfect raw input configuration' },
  { icon: Shield, title: 'Stable Framerate', desc: 'Rock-solid video settings' },
];

export function HomePage() {
  return (
    <div>
      <PageTitle
        title="New Config"
        subtitle="Welcome to the ultimate CS 1.6 configuration resource"
        icon={Home}
      />

      {/* Welcome Banner */}
      <motion.div
        className="bg-cs-dark border border-cs-green/50 p-4 md:p-6 mb-6 md:mb-8"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start gap-3 md:gap-4">
          <Terminal className="text-cs-green mt-0.5 md:mt-1 shrink-0 w-5 h-5 md:w-6 md:h-6" />
          <div>
            <h2 className="text-cs-green font-bold text-base md:text-lg mb-1.5 md:mb-2">
              Console Initialized
            </h2>
            <p className="text-cs-green/80 text-xs md:text-sm leading-relaxed">
              This wiki contains professional-grade configuration settings used by competitive 
              players. Each setting has been tested and optimized for the GoldSrc engine.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Start */}
      <ConsoleSection title="Quick Start">
        <p className="mb-3 md:mb-4 text-xs md:text-sm">
          Create a new file called <span className="text-cs-yellow">userconfig.cfg</span> in 
          your <span className="text-cs-yellow">cstrike</span> folder and add your settings.
        </p>
        <CodeBlock code={welcomeConfig} title="userconfig.cfg" />
      </ConsoleSection>

      <ConfigBuilder />

      {/* Features Grid */}
      <ConsoleSection title="What You'll Find Here">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-cs-dark border border-cs-green/30 p-3 md:p-4 hover:border-cs-green/60 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <feature.icon className="text-cs-green mb-2 md:mb-3 w-4 h-4 md:w-5 md:h-5" />
              <h3 className="text-cs-yellow font-bold text-xs md:text-sm mb-1">{feature.title}</h3>
              <p className="text-cs-gray text-[10px] md:text-xs">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </ConsoleSection>

      {/* Technical Note */}
      <ConsoleSection title="Technical Notes" variant="technical">
        <p className="text-xs md:text-sm">
          All configurations are designed for the WON/Steam version of Counter-Strike 1.6 
          running on the GoldSrc (Half-Life) engine. Settings may differ slightly depending 
          on your server's tickrate and your internet connection quality.
        </p>
        <div className="mt-3 md:mt-4 flex items-center gap-2 text-[10px] md:text-xs">
          <span className="text-cs-green">●</span>
          <span>Compatible with Build 4554 and later</span>
        </div>
      </ConsoleSection>
    </div>
  );
}
