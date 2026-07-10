import React from "react";
import { motion } from "motion/react";
import { Users, Rocket, Heart, MapPin, Clock, Briefcase, ChevronRight, Globe, Zap, Coffee } from "lucide-react";

const BENEFITS = [
  { icon: Globe, title: "Remote-First", desc: "Work from anywhere in the world. We value outcomes over hours." },
  { icon: Heart, title: "Wellness First", desc: "Comprehensive health insurance and unlimited mental health support." },
  { icon: Zap, title: "Latest Tech", desc: "Get the best hardware and software budget for your home setup." },
  { icon: Coffee, title: "Learning Fund", desc: "$2,000 annual budget for courses, books, and conferences." },
];

const POSITIONS = [
  { id: 1, title: "Senior AI Researcher", dept: "Engineering", location: "Remote / London", type: "Full-time" },
  { id: 2, title: "Product Designer (UI/UX)", dept: "Design", location: "Remote / NYC", type: "Full-time" },
  { id: 3, title: "Technical Content Strategist", dept: "Marketing", location: "Remote", type: "Contract" },
  { id: 4, title: "Full Stack Engineer (React/Node)", dept: "Engineering", location: "Remote / San Francisco", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-[100px] -z-10 blur-3xl opacity-50" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Rocket className="w-4 h-4" />
            <span>Join the AI Revolution</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8"
          >
            Help us build the <br />
            <span className="text-blue-600">future of AI transparency.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            We're a distributed team of engineers, designers, and AI enthusiasts working to make artificial intelligence accessible and understandable for everyone.
          </motion.p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Our Mission & Culture</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                At AIIndex, we believe that transparency is the key to safe and beneficial AI. We build tools that help researchers, developers, and businesses make informed decisions.
              </p>
              <div className="space-y-6">
                {[
                  "We prioritize truth and objective data.",
                  "We are a remote-first, async-heavy culture.",
                  "We value curiosity over certainty.",
                  "We celebrate deep work and focus."
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                      <Briefcase className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-900 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900">Diverse Team</h4>
                  <p className="text-sm text-gray-500 mt-2">15+ countries represented across our global team.</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900">Flexible Hours</h4>
                  <p className="text-sm text-gray-500 mt-2">Work when you're most productive, anywhere.</p>
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900">Health First</h4>
                  <p className="text-sm text-gray-500 mt-2">Comprehensive health and mental wellness packages.</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900">Fast Pace</h4>
                  <p className="text-sm text-gray-500 mt-2">We move quickly but always with intentionality.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Perks & Benefits</h2>
          <p className="text-gray-600">Everything you need to do your best work.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {BENEFITS.map((benefit, i) => (
            <div key={i} className="text-center p-8 rounded-3xl border border-gray-100 hover:border-blue-100 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl font-extrabold mb-4">Open Positions</h2>
              <p className="text-gray-400">Join our growing team and shape the future of AI indexers.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Filter by department:</span>
              <select className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm focus:ring-2 ring-blue-500 outline-none">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {POSITIONS.map((pos) => (
              <div key={pos.id} className="bg-gray-800/50 border border-gray-700/50 rounded-3xl p-6 hover:bg-gray-800 transition-colors group cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-gray-700 flex items-center justify-center text-blue-400">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{pos.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {pos.dept}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {pos.location}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {pos.type}</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 shrink-0">
                    Apply Now <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-8">Don't see a role that fits?</p>
            <button className="text-blue-400 font-bold hover:text-blue-300 transition-colors border-b border-blue-400/30 pb-1">
              Send us an open application
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
