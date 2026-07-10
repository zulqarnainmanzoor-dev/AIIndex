import React, { useEffect } from "react";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable Google AdSense Component
 * Ensures compliance with Google policies by providing a standardized container.
 */
export default function AdUnit({ 
  slot, 
  format = "auto", 
  responsive = true, 
  className = "",
  style = {}
}: AdUnitProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense push error:", e);
    }
  }, []);

  return (
    <div className={`ad-container my-8 mx-auto overflow-hidden text-center flex flex-col items-center ${className}`}>
      <span className="text-[9px] text-gray-300 uppercase tracking-widest mb-2 block select-none">Advertisement</span>
      <div className="w-full bg-gray-50/50 rounded-xl border border-gray-100 flex items-center justify-center min-h-[100px]">
        <ins
          className="adsbygoogle"
          style={{ display: "block", ...style }}
          data-ad-client="ca-pub-3035416217056603"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}
