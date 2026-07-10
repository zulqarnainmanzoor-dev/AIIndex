import React from "react";
import { Zap, Target, Code, Brain, Info, Award } from "lucide-react";

interface BenchmarkTableProps {
  headers: string[];
  rows: string[][];
}

export default function BenchmarkTable({ headers, rows }: BenchmarkTableProps) {
  // Helper to check if a value is the "best" in its column
  const isBestValue = (val: string, colIndex: number) => {
    if (colIndex === 0) return false;
    
    // For TTFT (usually last column or has ms), lower is better
    const isTime = val.includes("ms") || headers[colIndex].toLowerCase().includes("ttft");
    
    const numericValues = rows.map(row => {
      const v = row[colIndex];
      const match = v.match(/(\d+(\.\d+)?)/);
      return match ? parseFloat(match[0]) : null;
    }).filter((v): v is number => v !== null);

    if (numericValues.length === 0) return false;

    const currentMatch = val.match(/(\d+(\.\d+)?)/);
    if (!currentMatch) return false;
    const currentVal = parseFloat(currentMatch[0]);

    if (isTime) {
      return currentVal === Math.min(...numericValues);
    } else {
      return currentVal === Math.max(...numericValues);
    }
  };

  const getIcon = (header: string) => {
    const h = header.toLowerCase();
    if (h.includes("gpqa")) return <Brain className="w-4 h-4 text-purple-500" />;
    if (h.includes("human") || h.includes("code")) return <Code className="w-4 h-4 text-blue-500" />;
    if (h.includes("math")) return <Target className="w-4 h-4 text-rose-500" />;
    if (h.includes("mmlu") || h.includes("general")) return <Info className="w-4 h-4 text-amber-500" />;
    if (h.includes("ttft") || h.includes("time")) return <Zap className="w-4 h-4 text-yellow-500" />;
    return null;
  };

  return (
    <div className="my-10 overflow-hidden border border-gray-100 rounded-[2rem] shadow-xl bg-white">
      <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]">Verified Performance Matrix</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-blue-600" /> SOTA Peak</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-gray-200" /> Competitive</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {headers.map((header, i) => (
                <th key={i} className="p-5 first:pl-8">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 uppercase tracking-tight">
                      {getIcon(header)}
                      {header}
                    </div>
                    {i > 0 && <div className="h-1 w-8 bg-gray-200 rounded-full" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="group hover:bg-blue-50/20 transition-colors">
                {row.map((cell, colIndex) => {
                  const best = isBestValue(cell, colIndex);
                  const isModel = colIndex === 0;

                  return (
                    <td key={colIndex} className={`p-5 first:pl-8 ${isModel ? "bg-gray-50/30 font-bold text-gray-900" : ""}`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${best && !isModel ? "text-blue-600 font-bold" : "text-gray-600"}`}>
                          {cell.replace(/\*\*/g, "")}
                        </span>
                        {best && !isModel && (
                          <div className="bg-blue-100 p-1 rounded-full">
                            <Award className="w-3 h-3 text-blue-600" />
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50/80 p-4 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 italic text-center">
          * Data compiled from internal AIIndex evaluations and open-source benchmark repositories. Results may vary by quantization level.
        </p>
      </div>
    </div>
  );
}
