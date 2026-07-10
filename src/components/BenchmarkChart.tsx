/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MODELS } from "../data";
import { BarChart3, Info } from "lucide-react";

export default function BenchmarkChart() {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    MODELS.slice(0, 3).map((m) => m.id)
  );

  const toggleModel = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((x) => x !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Prepare chart data format:
  // Each benchmark test is an item, with scores for each model
  const benchmarkCategories = [
    { key: "mmlu", label: "MMLU (General Knowledge)" },
    { key: "gpqa", label: "GPQA (Expert Reasoning)" },
    { key: "math", label: "MATH (Hard Mathematics)" },
    { key: "humanEval", label: "HumanEval (Coding)" },
  ];

  const chartData = benchmarkCategories.map((cat) => {
    const dataRow: any = { name: cat.label };
    selectedIds.forEach((modelId) => {
      const model = MODELS.find((m) => m.id === modelId);
      if (model && model.benchmarks) {
        dataRow[model.name] = (model.benchmarks as any)[cat.key] || 0;
      }
    });
    return dataRow;
  });

  const colors = ["#2563EB", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div id="benchmark-chart-module" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-sans font-semibold text-lg text-gray-900 tracking-tight">
              Interactive Benchmark Explorer
            </h3>
            <p className="text-sm text-gray-500">
              Compare standard academic evaluations side-by-side. Higher is better.
            </p>
          </div>
        </div>
      </div>

      {/* Model Selection Checkboxes */}
      <div id="benchmark-model-selectors" className="flex flex-wrap gap-2.5 mb-6">
        {MODELS.map((model, idx) => {
          const isSelected = selectedIds.includes(model.id);
          return (
            <button
              key={`chart-select-${model.id}`}
              onClick={() => toggleModel(model.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-100"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full`}
                style={{
                  backgroundColor: isSelected ? "#FFFFFF" : colors[idx % colors.length],
                }}
              />
              {model.name}
            </button>
          );
        })}
      </div>

      {/* Chart Canvas */}
      <div id="chart-canvas-container" className="w-full h-[380px] bg-gray-50/50 p-4 rounded-xl border border-gray-100">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#6B7280", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#6B7280", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
            />
            {selectedIds.map((modelId, index) => {
              const model = MODELS.find((m) => m.id === modelId);
              if (!model) return null;
              return (
                <Bar
                  key={model.id}
                  dataKey={model.name}
                  fill={colors[MODELS.findIndex((m) => m.id === modelId) % colors.length]}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={45}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 bg-blue-50/40 p-3.5 rounded-xl border border-blue-100/30">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-blue-900 mb-0.5">Benchmark Key Glossary:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 list-disc list-inside">
            <li><strong>MMLU:</strong> Multi-task Language Understanding (general education breadth)</li>
            <li><strong>GPQA:</strong> Graduate-Level Google-Proof Q&A (hard deductive reasoning)</li>
            <li><strong>MATH:</strong> Multi-step competition level word math equations</li>
            <li><strong>HumanEval:</strong> Python functional code assembly coding tasks</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
