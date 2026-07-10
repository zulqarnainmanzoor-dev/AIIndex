import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, ArrowLeft, Home, TrendingUp, BookOpen, Newspaper } from "lucide-react";

export default function NotFoundPage({ onBackHome }: { onBackHome: () => void }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 30;
      const y = (clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      <div className="relative mb-12">
        {/* Animated Robot Illustration */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            {/* Robot Head */}
            <rect x="50" y="40" width="140" height="120" rx="40" fill="#2563EB" />
            <rect x="65" y="55" width="110" height="90" rx="30" fill="white" />
            
            {/* Eyes */}
            <motion.g 
              style={{ x: mousePos.x, y: mousePos.y }}
              transition={{ type: "spring", damping: 15, stiffness: 150 }}
            >
              <circle cx="95" cy="100" r="10" fill="#1E293B" />
              <circle cx="145" cy="100" r="10" fill="#1E293B" />
              
              {/* Eye Highlights */}
              <circle cx="98" cy="97" r="3" fill="white" />
              <circle cx="148" cy="97" r="3" fill="white" />
            </motion.g>

            {/* Blink Animation Overlay */}
            <motion.rect
              animate={{ height: [0, 10, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
              x="85" y="95" width="20" rx="5" fill="#2563EB"
            />
            <motion.rect
              animate={{ height: [0, 10, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
              x="135" y="95" width="20" rx="5" fill="#2563EB"
            />

            {/* Antennas */}
            <rect x="115" y="10" width="10" height="30" rx="5" fill="#2563EB" />
            <motion.circle 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              cx="120" cy="10" r="8" fill="#F87171" 
            />
          </svg>
        </motion.div>

        {/* Floating Background Elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 -z-10"
        >
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full bg-blue-200"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.5
              }}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-8xl font-black text-gray-900 mb-4 tracking-tighter">404</h1>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Oops! My circuits got crossed.</h2>
        <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed mb-10">
          The page you're looking for has moved to a different sector of the AIIndex database or never existed in this timeline.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button 
            onClick={onBackHome}
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2 group"
          >
            <Home className="w-5 h-5" />
            Return Home
          </button>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search AIIndex..."
              className="bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl w-64 focus:ring-2 ring-blue-500 outline-none transition-all pl-12"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-3xl text-left border border-gray-100 hover:border-blue-100 transition-colors cursor-pointer group">
            <TrendingUp className="w-6 h-6 text-blue-600 mb-4" />
            <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Trending Models</h4>
            <p className="text-sm text-gray-500 mt-1">See what's leading the benchmarks this week.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-3xl text-left border border-gray-100 hover:border-blue-100 transition-colors cursor-pointer group">
            <BookOpen className="w-6 h-6 text-indigo-600 mb-4" />
            <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">Expert Guides</h4>
            <p className="text-sm text-gray-500 mt-1">Learn how to implement AI in your production stack.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-3xl text-left border border-gray-100 hover:border-blue-100 transition-colors cursor-pointer group">
            <Newspaper className="w-6 h-6 text-emerald-600 mb-4" />
            <h4 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">Latest News</h4>
            <p className="text-sm text-gray-500 mt-1">Daily updates on foundation models and research.</p>
          </div>
        </div>

        <div className="mt-20 py-8 border-t border-gray-100 max-w-lg mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Random AI Fact</p>
          <p className="text-sm text-gray-500 italic">
            "The term 'Artificial Intelligence' was first coined in 1956 by John McCarthy for the Dartmouth Summer Research Project."
          </p>
        </div>
      </motion.div>
    </div>
  );
}
