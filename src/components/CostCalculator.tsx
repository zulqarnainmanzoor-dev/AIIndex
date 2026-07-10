/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { MODELS } from "../data";
import { Calculator, HelpCircle, TrendingDown, DollarSign } from "lucide-react";

export default function CostCalculator() {
  const [selectedModelId, setSelectedModelId] = useState(MODELS[0].id);
  const [dailyRequests, setDailyRequests] = useState(10000);
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [billingDays, setBillingDays] = useState(30);

  const selectedModel = MODELS.find((m) => m.id === selectedModelId) || MODELS[0];

  // Calculations
  const dailyInputMillions = (dailyRequests * inputTokens) / 1000000;
  const dailyOutputMillions = (dailyRequests * outputTokens) / 1000000;

  const monthlyInputMillions = dailyInputMillions * billingDays;
  const monthlyOutputMillions = dailyOutputMillions * billingDays;

  const monthlyInputCost = monthlyInputMillions * selectedModel.pricingInput;
  const monthlyOutputCost = monthlyOutputMillions * selectedModel.pricingOutput;
  const totalMonthlyCost = monthlyInputCost + monthlyOutputCost;

  // Comparison list
  const comparisonList = MODELS.map((m) => {
    const mInputCost = monthlyInputMillions * m.pricingInput;
    const mOutputCost = monthlyOutputMillions * m.pricingOutput;
    const mTotal = mInputCost + mOutputCost;
    return {
      ...m,
      total: mTotal,
      savings: totalMonthlyCost - mTotal,
    };
  }).sort((a, b) => a.total - b.total);

  return (
    <div id="cost-calculator-container" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-sans font-semibold text-lg text-gray-900 tracking-tight">
            AI Token Cost Calculator
          </h3>
          <p className="text-sm text-gray-500">
            Estimate production costs and compare model savings based on token volume.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Panel */}
        <div id="calculator-inputs-panel" className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Select Core Model
            </label>
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              {MODELS.map((model) => (
                <option key={`calc-opt-${model.id}`} value={model.id}>
                  {model.name} (${model.pricingInput.toFixed(2)} / ${model.pricingOutput.toFixed(2)} per M)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex justify-between">
              <span>Daily API Requests</span>
              <span className="font-mono text-blue-600 font-bold">{dailyRequests.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={dailyRequests}
              onChange={(e) => setDailyRequests(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
              <span>500</span>
              <span>50k</span>
              <span>100k</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Avg. Input Tokens
              </label>
              <input
                type="number"
                value={inputTokens}
                onChange={(e) => setInputTokens(Math.max(1, Number(e.target.value)))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-[10px] text-gray-400">Context / Prompts</span>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Avg. Output Tokens
              </label>
              <input
                type="number"
                value={outputTokens}
                onChange={(e) => setOutputTokens(Math.max(1, Number(e.target.value)))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-[10px] text-gray-400">Response Length</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Billing Days per Month: <span className="font-mono text-gray-700 font-semibold">{billingDays}</span>
            </label>
            <input
              type="range"
              min="1"
              max="31"
              value={billingDays}
              onChange={(e) => setBillingDays(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Right Output results Panel */}
        <div id="calculator-results-panel" className="lg:col-span-7 flex flex-col justify-between space-y-6">
          {/* Main cost Card */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest block mb-1">
                Estimated Monthly Cost ({selectedModel.name})
              </span>
              <div className="flex items-baseline gap-1 text-4xl font-extrabold text-gray-900 tracking-tight">
                <span className="text-2xl font-semibold text-gray-400">$</span>
                {totalMonthlyCost.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-200/60 text-xs text-gray-500">
              <div>
                <p className="text-gray-400 font-medium">Input Volume</p>
                <p className="font-mono font-bold text-gray-800 text-sm mt-0.5">
                  {monthlyInputMillions.toFixed(1)}M tokens
                </p>
                <p className="text-[10px] mt-0.5">${monthlyInputCost.toFixed(2)} subtotal</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Output Volume</p>
                <p className="font-mono font-bold text-gray-800 text-sm mt-0.5">
                  {monthlyOutputMillions.toFixed(1)}M tokens
                </p>
                <p className="text-[10px] mt-0.5">${monthlyOutputCost.toFixed(2)} subtotal</p>
              </div>
            </div>
          </div>

          {/* Pricing Comparison Table */}
          <div id="model-savings-comparison">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-blue-500" />
              Alternative Model Costs
            </h4>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {comparisonList.map((m) => {
                const isCurrent = m.id === selectedModelId;
                const priceDiff = totalMonthlyCost - m.total;

                return (
                  <div
                    key={`comparison-row-${m.id}`}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-sm transition-all ${
                      isCurrent
                        ? "bg-blue-50/50 border-blue-200/60 ring-1 ring-blue-100"
                        : "bg-white border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{m.name}</span>
                      {isCurrent && (
                        <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                          Selected
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="font-mono font-bold text-gray-900 text-sm">
                          ${m.total.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                        </span>
                        <p className="text-[9px] text-gray-400">/ month</p>
                      </div>

                      {!isCurrent && (
                        <div className="w-24 text-[10px] font-medium">
                          {priceDiff > 0 ? (
                            <span className="text-emerald-600 font-bold">
                              Saves ${priceDiff.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                            </span>
                          ) : priceDiff < 0 ? (
                            <span className="text-red-500">
                              +${Math.abs(priceDiff).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                            </span>
                          ) : (
                            <span className="text-gray-400">Equal</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
