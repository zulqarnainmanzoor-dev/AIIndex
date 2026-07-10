/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

// Real vector SVGs for brand logos
const OpenAILogo = () => (
  <svg className="w-6 h-6 text-[#10A37F]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.28 9.5c0-1.76-1.44-3.2-3.2-3.2-.32 0-.64.05-.94.14-1.12-1.74-3.04-2.84-5.14-2.84-.44 0-.87.05-1.29.15-.65-1.7-2.31-2.95-4.26-2.95-2.48 0-4.5 2.02-4.5 4.5 0 .42.06.84.18 1.24-1.72.63-2.98 2.27-2.98 4.21 0 2.48 2.02 4.5 4.5 4.5.42 0 .84-.06 1.24-.18.63 1.72 2.27 2.98 4.21 2.98 2.48 0 4.5-2.02 4.5-4.5 0-.42-.06-.84-.18-1.24 1.72-.63 2.98-2.27 2.98-4.21 0-.15-.01-.3-.03-.45.01-.05.02-.1.02-.15zm-11 5.09c-.19.06-.39.09-.6.09-1.05 0-1.9-.85-1.9-1.9v-2.73l2.5 1.44v3.1zm1.2-12.24c1.05 0 1.9.85 1.9 1.9v2.73l-2.5-1.44V2.35zm-2.5 1.44l2.5 1.44V8.36L9.78 6.92V4.19c.19-.06.39-.09.6-.09zm-5.19 1.75c1.05 0 1.9.85 1.9 1.9v2.73l-2.5-1.44V5.54zm5.19 5.8l-2.5-1.44V6.8l2.5 1.44v3.1zm1.2 5.8l-2.5-1.44v-3.1l2.5 1.44v3.1zm5.19-1.75c-1.05 0-1.9-.85-1.9-1.9v-2.73l2.5 1.44v3.19zm-5.19-5.8l2.5-1.44V6.8l-2.5 1.44v3.1z" />
  </svg>
);

const GoogleDeepMindLogo = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" fill="url(#deepmind-gradient)" />
    <path d="M12 7L13.2 10.8L17 12L13.2 13.2L12 17L10.8 13.2L7 12L10.8 10.8L12 7Z" fill="#FFF" opacity="0.8" />
    <defs>
      <linearGradient id="deepmind-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="30%" stopColor="#34A853" />
        <stop offset="70%" stopColor="#FBBC05" />
        <stop offset="100%" stopColor="#EA4335" />
      </linearGradient>
    </defs>
  </svg>
);

const AnthropicLogo = () => (
  <svg className="w-6 h-6 text-[#191919]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.41 2L2 22h3l2.5-5.5h9L19 22h3L12.41 2zm-3.5 12l3.5-7.5 3.5 7.5h-7z" />
  </svg>
);

const DeepSeekLogo = () => (
  <svg className="w-6 h-6 text-[#0D62FE]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.4 2C6.65 2 2 6.65 2 12.4s4.65 10.4 10.4 10.4 10.4-4.65 10.4-10.4S18.15 2 12.4 2zm0 18.4c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z M11 7h2.8c1.2 0 2.2 1 2.2 2.2v6.4c0 1.2-1 2.2-2.2 2.2H11V7z" />
  </svg>
);

const XAILogo = () => (
  <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MetaLogo = () => (
  <svg className="w-6 h-6 text-[#0668E1]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.2 6c-1.8 0-3.3 1-4.2 2.5-.9-1.5-2.4-2.5-4.2-2.5-2.7 0-4.8 2.2-4.8 4.9s2.1 4.9 4.8 4.9c1.8 0 3.3-1 4.2-2.5.9 1.5 2.4 2.5 4.2 2.5 2.7 0 4.8-2.2 4.8-4.9S18.9 6 16.2 6zm-8.4 7.6c-1.5 0-2.6-1.1-2.6-2.6s1.1-2.6 2.6-2.6 2.6 1.1 2.6 2.6-1.1 2.6-2.6 2.6zm8.4 0c-1.5 0-2.6-1.1-2.6-2.6s1.1-2.6 2.6-2.6 2.6 1.1 2.6 2.6-1.1 2.6-2.6 2.6z" />
  </svg>
);

const BRANDS = [
  { name: "OpenAI", icon: OpenAILogo },
  { name: "Google DeepMind", icon: GoogleDeepMindLogo },
  { name: "Anthropic", icon: AnthropicLogo },
  { name: "DeepSeek", icon: DeepSeekLogo },
  { name: "xAI", icon: XAILogo },
  { name: "Meta", icon: MetaLogo },
];

export default function InfiniteMarquee() {
  // Duplicate list to ensure seamless looping
  const marqueeItems = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div id="brand-marquee-container" className="relative w-full overflow-hidden bg-gray-50 border-y border-gray-200 py-6">
      {/* Gradients to hide edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex w-max">
        <motion.div
          id="marquee-scroll-track"
          className="flex gap-16 items-center px-4"
          animate={{ x: [0, -1000] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {marqueeItems.map((brand, idx) => {
            const Logo = brand.icon;
            return (
              <div
                key={`marquee-item-${brand.name}-${idx}`}
                className="flex items-center gap-3 text-gray-700 font-medium tracking-tight whitespace-nowrap"
              >
                <div className="hover:scale-110 transition-transform duration-200">
                  <Logo />
                </div>
                <span className="text-lg font-sans font-semibold text-gray-800">{brand.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
