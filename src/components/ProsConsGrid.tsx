import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface ProsConsGridProps {
  pros: string[];
  cons: string[];
}

export default function ProsConsGrid({ pros, cons }: ProsConsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
      <div className="bg-emerald-50/30 border border-emerald-100 rounded-[2rem] p-8 shadow-sm">
        <h4 className="flex items-center gap-2 font-sans font-bold text-emerald-900 mb-6 uppercase tracking-widest text-[10px]">
          <div className="p-1.5 bg-emerald-100 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          Technical Advantages
        </h4>
        <ul className="space-y-4">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed font-semibold group">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 group-hover:scale-150 transition-transform" />
              {pro.replace(/^PRO:\s*/i, "").trim()}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-rose-50/30 border border-rose-100 rounded-[2rem] p-8 shadow-sm">
        <h4 className="flex items-center gap-2 font-sans font-bold text-rose-900 mb-6 uppercase tracking-widest text-[10px]">
          <div className="p-1.5 bg-rose-100 rounded-lg">
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          Critical Limitations
        </h4>
        <ul className="space-y-4">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed font-semibold group">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0 group-hover:scale-150 transition-transform" />
              {con.replace(/^CON:\s*/i, "").trim()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
