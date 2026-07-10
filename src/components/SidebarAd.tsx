import React from "react";
import AdUnit from "./AdUnit";
import { Info, ShieldCheck, Zap } from "lucide-react";

/**
 * SidebarAd Component for desktop layouts.
 * Used in Model Directory and Comparison views.
 */
export default function SidebarAd() {
  return (
    <div className="sticky top-24 space-y-6 hidden xl:block">
      <AdUnit 
        slot="sidebar_desktop_model_directory" 
        format="vertical" 
        responsive={false} 
        style={{ width: "300px", height: "600px" }}
        className="shadow-xl rounded-2xl border border-gray-100"
      />
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100/50 shadow-sm">
        <div className="flex items-center gap-2 text-blue-600 mb-3">
          <ShieldCheck className="w-5 h-5" />
          <h4 className="font-sans font-extrabold text-sm uppercase tracking-tight">Independent Audit</h4>
        </div>
        <p className="text-xs text-blue-900/70 leading-relaxed font-medium">
          AIIndex remains 100% independent. We do not accept sponsorship for benchmark placement. Our advertising revenue supports our research infrastructure.
        </p>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest">
          <Zap className="w-3 h-3 fill-current" />
          <span>Verified Specs</span>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-gray-400 mb-3">
          <Info className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Ad Disclosure</span>
        </div>
        <p className="text-[10px] text-gray-400 leading-normal">
          This site uses Google AdSense. Some links may be affiliate-supported at no cost to you.
        </p>
      </div>
    </div>
  );
}
