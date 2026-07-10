import React from "react";
import { TrendingUp, Activity, Zap, Target, Brain, Award } from "lucide-react";

interface MetricCalloutProps {
  label: string;
  value: string;
  description?: string;
  trend?: string;
  type?: "speed" | "accuracy" | "reasoning" | "default";
}

export default function MetricCallout({ label, value, description, trend, type = "default" }: MetricCalloutProps) {
  const getIcon = () => {
    switch (type) {
      case "speed": return <Zap className="w-5 h-5 text-yellow-600" />;
      case "accuracy": return <Target className="w-5 h-5 text-rose-600" />;
      case "reasoning": return <Brain className="w-5 h-5 text-purple-600" />;
      default: return <Activity className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBg = () => {
    switch (type) {
      case "speed": return "bg-yellow-50";
      case "accuracy": return "bg-rose-50";
      case "reasoning": return "bg-purple-50";
      default: return "bg-blue-50";
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex items-center gap-5 border-b-4 border-b-blue-600/10">
      <div className={`w-14 h-14 rounded-2xl ${getBg()} flex items-center justify-center group-hover:scale-110 transition-transform`}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{label}</span>
          {trend && (
            <div className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </div>
          )}
        </div>
        <div className="text-3xl font-black text-gray-900 tracking-tight">{value}</div>
        {description && <div className="text-[11px] text-gray-500 mt-1 font-medium leading-tight line-clamp-2">{description}</div>}
      </div>
    </div>
  );
}
