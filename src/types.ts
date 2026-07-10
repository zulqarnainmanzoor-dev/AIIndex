/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ModelBenchmark {
  mmlu?: number;
  gpqa?: number;
  math?: number;
  humanEval?: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface AIModel {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  releaseDate: string;
  overview: string;
  features: string[];
  pros: string[];
  cons: string[];
  pricingInput: number; // USD per 1M tokens
  pricingOutput: number; // USD per 1M tokens
  pricingFree?: string;
  contextWindow: number; // in tokens, e.g., 128000
  speedScore: number; // 1-100
  accuracyScore: number; // 1-100
  codingScore: number; // 1-100
  writingScore: number; // 1-100
  reasoningScore: number; // 1-100
  imagesScore: number; // 1-100 (0 if not supported)
  voiceScore: number; // 1-100 (0 if not supported)
  hasApi: boolean;
  bestFor: string;
  benchmarks: ModelBenchmark;
  alternatives: string[];
  faqs: FAQ[];
  logo: string; // Tailwind icon name or category logo color
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface AICompany {
  id: string;
  name: string;
  logo: string;
  history: string;
  founders: string[];
  foundedYear: number;
  headquarters: string;
  funding: string;
  valuation: string;
  products: string[];
  apisAvailable: string[];
  timeline: TimelineEvent[];
}

export interface AITool {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  pricingType: "Free" | "Freemium" | "Paid" | "Open Source";
  rating: number;
  features: string[];
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: string;
  source: string;
  readTime: string;
}

export interface Guide {
  id: string;
  title: string;
  category: "Beginner" | "Developer" | "Business" | "Marketing";
  date: string;
  summary: string;
  content: string;
  author: string;
  readTime: string;
}

export interface Prompt {
  id: string;
  title: string;
  category: string;
  promptText: string;
  useCase: string;
  tags: string[];
}
