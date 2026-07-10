import React from "react";
import AdUnit from "./AdUnit";

/**
 * InArticleAd Component for blog and article layouts.
 * Optimized for readability and engagement.
 */
export default function InArticleAd() {
  return (
    <div className="my-16 relative">
      <div className="absolute -inset-4 bg-gray-50/30 rounded-[2.5rem] -z-10" />
      <AdUnit 
        slot="in_article_responsive_main" 
        format="fluid" 
        className="max-w-3xl border-none bg-transparent"
      />
      <div className="flex justify-center mt-2">
        <span className="text-[9px] text-gray-300 font-medium uppercase tracking-[0.2em]">End of Advertisement</span>
      </div>
    </div>
  );
}
