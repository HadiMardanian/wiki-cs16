export type ConfigBlock = {
  id: string;
  label: string;
  description: string;
  code: string;
  defaultEnabled?: boolean;
};

export type ConfigGroup = {
  id: string;
  title: string;
  description: string;
  blocks: ConfigBlock[];
};

export const welcomeConfig = `// CS 1.6 Starter Config
// Place in: cstrike/userconfig.cfg

echo "Loading starter config..."
exec userconfig.cfg`;

export const netcodeConfig = `// Network Settings - Optimized for LAN/High-Speed
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

export const lowLatencyConfig = `// Low Latency Optimizations
cl_showfps "1"
net_graph "3"
net_graphpos "2"
developer "0"`;

export const mouseConfig = `// Mouse Settings - Raw Input
m_rawinput "1"
m_filter "0"
m_customaccel "0"
m_mouseaccel1 "0"
m_mouseaccel2 "0"

// Sensitivity (adjust to preference)
sensitivity "2.0"
zoom_sensitivity_ratio "1.0"

// Mouse Buttons
bind "MOUSE1" "+attack"
bind "MOUSE2" "+attack2"
bind "MOUSE3" "+speed"`;

export const crosshairConfig = `// Crosshair Settings
cl_crosshair_color "50 250 50"
cl_crosshair_size "small"
cl_crosshair_translucent "0"
cl_dynamiccrosshair "0"`;

export const videoConfig = `// Video Settings - Maximum Performance
fps_max "999"
fps_override "1"
gl_vsync "0"

// Renderer Settings
gl_max_size "512"
gl_picmip "2"
gl_playermip "0"

// Visual Clarity
r_detailtextures "0"
r_bmodelhighfrac "1.0"
cl_himodels "0"
cl_minmodels "1"

// Lighting
gamma "3"
brightness "3"`;

export const resolutionConfig = `// Resolution Commands
// Use in-game menu or launch options:
// -w 1024 -h 768 -freq 144

// Aspect Ratio Settings
_cl_autowepswitch "0"
hud_centerid "1"`;

export const audioConfig = `// Audio Settings - Competitive
volume "0.5"
snd_mixahead "0.1"
hisound "1"
s_eax "0"
s_a3d "0"

// Voice Settings
voice_enable "1"
voice_scale "0.75"
voice_loopback "0"

// Music (disable for focus)
mp3_volume "0"`;

export const footstepConfig = `// Enhanced Audio Clarity
_snd_mixahead "0.1"
snd_noextraupdate "1"

// Launch option for surround:
// -snd_headphone_pan_exponent 2`;

export const movementBinds = `// Movement Binds
bind "w" "+forward"
bind "s" "+back"
bind "a" "+moveleft"
bind "d" "+moveright"
bind "SPACE" "+jump"
bind "CTRL" "+duck"
bind "SHIFT" "+speed"`;

export const weaponBinds = `// Weapon Quick-Switch
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

export const utilityBinds = `// Buy Binds (Numpad)
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

export const proBind = `// Pro Jump-Throw Bind (for consistent nade throws)
alias "+jumpthrow" "+jump; -attack"
alias "-jumpthrow" "-jump"
bind "n" "+jumpthrow"`;

export const configGroups: ConfigGroup[] = [
  {
    id: 'netcode',
    title: 'Netcode',
    description: 'Low-latency network tuning for stable hitreg.',
    blocks: [
      {
        id: 'netcode-core',
        label: 'Network Core',
        description: 'Rate, cmdrate, updaterate, interpolation.',
        code: netcodeConfig,
        defaultEnabled: true,
      },
      {
        id: 'netcode-debug',
        label: 'Netcode Debug',
        description: 'Monitoring tools (net_graph, fps).',
        code: lowLatencyConfig,
      },
    ],
  },
  {
    id: 'mouse',
    title: 'Mouse & Crosshair',
    description: 'Raw input plus a clean static crosshair.',
    blocks: [
      {
        id: 'mouse-core',
        label: 'Mouse Raw Input',
        description: 'Acceleration off with consistent sensitivity.',
        code: mouseConfig,
        defaultEnabled: true,
      },
      {
        id: 'mouse-crosshair',
        label: 'Crosshair',
        description: 'Static green crosshair.',
        code: crosshairConfig,
      },
    ],
  },
  {
    id: 'video',
    title: 'Video',
    description: 'High FPS, clear visuals, optimized rendering.',
    blocks: [
      {
        id: 'video-core',
        label: 'Performance Video',
        description: 'Maximum FPS and clarity settings.',
        code: videoConfig,
        defaultEnabled: true,
      },
      {
        id: 'video-resolution',
        label: 'Resolution Notes',
        description: 'Launch options and aspect hints.',
        code: resolutionConfig,
      },
    ],
  },
  {
    id: 'audio',
    title: 'Audio',
    description: 'Footstep-focused competitive audio.',
    blocks: [
      {
        id: 'audio-core',
        label: 'Competitive Audio',
        description: 'Low latency, clean mix.',
        code: audioConfig,
        defaultEnabled: true,
      },
      {
        id: 'audio-advanced',
        label: 'Advanced Audio',
        description: 'Extra clarity tweaks.',
        code: footstepConfig,
      },
    ],
  },
  {
    id: 'binds',
    title: 'Key Binds',
    description: 'Movement, weapons, utility, and pro binds.',
    blocks: [
      {
        id: 'binds-movement',
        label: 'Movement Binds',
        description: 'WASD, jump, duck, walk.',
        code: movementBinds,
        defaultEnabled: true,
      },
      {
        id: 'binds-weapons',
        label: 'Weapon Binds',
        description: 'Quick switch and grenade binds.',
        code: weaponBinds,
        defaultEnabled: true,
      },
      {
        id: 'binds-utility',
        label: 'Utility & Buy Binds',
        description: 'Numpad buy binds and comms.',
        code: utilityBinds,
      },
      {
        id: 'binds-pro',
        label: 'Jump-Throw Bind',
        description: 'Consistent grenade throws (league-dependent).',
        code: proBind,
      },
    ],
  },
];
