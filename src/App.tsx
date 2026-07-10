/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  Sparkles,
  Cpu,
  ShieldCheck,
  Atom,
  Globe,
  Search,
  Scale,
  TrendingUp,
  Newspaper,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  Star,
  Zap,
  DollarSign,
  AlertCircle,
  Maximize2,
  Menu,
  X,
  Mail,
  User,
  Activity,
  Award,
  Database,
  Download,
  SlidersHorizontal,
  Copy,
  Mic,
  MicOff,
  Share2,
  Rss,
  Layers,
  Building2,
  Printer,
  Twitter,
  Linkedin,
  Github,
  MessageSquare,
  Layout,
  Code,
  Info
} from "lucide-react";

import { MODELS, COMPANIES, TOOLS, NEWS, GUIDES } from "./data";
import { BLOG_POSTS } from "./blogData";
import Markdown from "react-markdown";
import { AIModel, AICompany, AITool, NewsItem, Guide } from "./types";
import InfiniteMarquee from "./components/InfiniteMarquee";
import SEO from "./components/SEO";
import Breadcrumbs from "./components/Breadcrumbs";
import ComparisonArticle from "./components/ComparisonArticle";
import LegalPage from "./components/LegalPage";
import CareersPage from "./components/CareersPage";
import NotFoundPage from "./components/NotFoundPage";
import SidebarAd from "./components/SidebarAd";
import { LEGAL_PAGES } from "./legalData";

const BenchmarkChart = React.lazy(() => import("./components/BenchmarkChart"));
const CostCalculator = React.lazy(() => import("./components/CostCalculator"));
const PromptLibrary = React.lazy(() => import("./components/PromptLibrary"));

// Deterministic 7-day sparkline trend data generator based on modelId and currentValue
const getSparklineData = (modelId: string, metric: string, currentValue: number): number[] => {
  const seed = (modelId + metric).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const points: number[] = [];
  for (let i = 0; i < 7; i++) {
    const factor = Math.sin(seed + i) * 0.08; // up to 8% fluctuation
    if (i === 6) {
      points.push(currentValue);
    } else {
      points.push(currentValue * (1 + factor * (1 - i / 6)));
    }
  }
  return points;
};

// Beautiful inline SVG Sparkline Component
const Sparkline = ({ values, color = "#2563EB" }: { values: number[]; color?: string }) => {
  const width = 75;
  const height = 18;
  const padding = 2;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min === 0 ? 1 : max - min;
  
  const points = values.map((val, index) => {
    const x = padding + (index / (values.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (val - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="flex items-center gap-1.5" title="7-day historical trend (simulated)">
      <svg width={width} height={height} className="overflow-visible inline-block">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {values.length > 0 && (
          <circle
            cx={padding + (width - padding * 2)}
            cy={padding + (1 - (values[values.length - 1] - min) / range) * (height - padding * 2)}
            r="2"
            fill={color}
            className="animate-pulse"
          />
        )}
      </svg>
    </div>
  );
};

// AdSense Placeholder Component
const AdPlaceholder = ({ position }: { position: string }) => (
  <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl flex items-center justify-center p-8 my-8 group transition-colors hover:border-blue-100">
    <div className="text-center">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sponsored Advertisement</p>
      <p className="text-xs text-gray-400 italic">Ad slot: {position}</p>
    </div>
  </div>
);

// Reading Progress Bar
const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
      }
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-gray-100 pointer-events-none">
      <motion.div 
        className="h-full bg-blue-600" 
        style={{ width: `${progress}%` }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      />
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [prevTab, setPrevTab] = useState<string>("home");

  const handleTabChange = (tab: string) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<AICompany | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Dropdowns and Interactive features sub-navbar states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showFeaturesSubNavbar, setShowFeaturesSubNavbar] = useState<boolean>(false);

  // Custom simulation modals
  const [submitToolModalOpen, setSubmitToolModalOpen] = useState<boolean>(false);
  const [apiDocsModalOpen, setApiDocsModalOpen] = useState<boolean>(false);
  const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false);
  
  // Submit Tool Form States
  const [toolName, setToolName] = useState<string>("");
  const [toolCategory, setToolCategory] = useState<string>("Reasoning LLM");
  const [toolUrl, setToolUrl] = useState<string>("");
  const [toolDescription, setToolDescription] = useState<string>("");
  const [toolPricing, setToolPricing] = useState<string>("Freemium");
  const [toolSubmitSuccess, setToolSubmitSuccess] = useState<boolean>(false);

  // Custom Interactive Section States
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactSubject, setContactSubject] = useState<string>("Model Indexing");
  const [contactMessage, setContactMessage] = useState<string>("");
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<any | null>(null);
  const [mobileFeaturesExpanded, setMobileFeaturesExpanded] = useState<boolean>(false);

  // Compare Tab States
  const [compareModelA, setCompareModelA] = useState<string>(MODELS[0].id);
  const [compareModelB, setCompareModelB] = useState<string>(MODELS[1].id);
  const [highlightDifferences, setHighlightDifferences] = useState<boolean>(false);
  const [compareQuery, setCompareQuery] = useState<string>("");
  const [groqAnalysis, setGroqAnalysis] = useState<string>("");
  const [groqLoading, setGroqLoading] = useState<boolean>(false);
  const [groqError, setGroqError] = useState<string>("");
  const [expandedRowLabel, setExpandedRowLabel] = useState<string | null>(null);
  const [copiedRowLabel, setCopiedRowLabel] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("aiindex-favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recommended Based on Needs States & Configuration
  const [recommendationCriteria, setRecommendationCriteria] = useState<"speed" | "cost" | "creative" | "coding" | "reasoning">("coding");

  const recommendationNeeds = {
    speed: {
      title: "Ultra-Fast Execution & Real-Time Responses",
      description: "Optimized for applications requiring sub-second latencies, native streaming, interactive agent feedback, or conversational voice services.",
      metricLabel: "Speed Index Rating",
      getRecommendations: () => {
        return MODELS.filter(m => m.speedScore >= 80)
          .sort((a, b) => b.speedScore - a.speedScore);
      }
    },
    cost: {
      title: "Cost-Efficiency & Budget Optimization",
      description: "Excellent performance at rock-bottom operation rates. Ideal for processing high-volume requests, large-scale dataset labeling, or batch classification tasks.",
      metricLabel: "Price per 1M Input/Output Tokens",
      getRecommendations: () => {
        return [...MODELS].sort((a, b) => (a.pricingInput + a.pricingOutput) - (b.pricingInput + b.pricingOutput));
      }
    },
    creative: {
      title: "Creative Writing, Marketing & Natural Nuance",
      description: "Tailored for long-form prose generation, copywriting, localization, storytelling, and professional branding with highly natural tone and style.",
      metricLabel: "Writing Nuance Rating",
      getRecommendations: () => {
        return MODELS.filter(m => m.writingScore >= 80)
          .sort((a, b) => b.writingScore - a.writingScore);
      }
    },
    coding: {
      title: "Software Engineering & Technical Synthesizing",
      description: "Superb capabilities in code-generation, debugging complex architectures, translating languages, and following multi-file codebase logical relationships.",
      metricLabel: "Coding Competency Rating",
      getRecommendations: () => {
        return MODELS.filter(m => m.codingScore >= 80)
          .sort((a, b) => b.codingScore - a.codingScore);
      }
    },
    reasoning: {
      title: "Complex Multi-Step Logic, Math & Science",
      description: "Engineered with visible chain-of-thought scratchpads to think, critique, and self-correct on deep scientific, mathematical, or advanced STEM queries.",
      metricLabel: "Logical Reasoning Index",
      getRecommendations: () => {
        return MODELS.filter(m => m.reasoningScore >= 80)
          .sort((a, b) => b.reasoningScore - a.reasoningScore);
      }
    }
  };

  // Voice Search States
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [dynamicNews, setDynamicNews] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("aiindex-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setVoiceSupported(true);
    }
  }, []);

  const toggleFavorite = (modelId: string) => {
    setFavorites(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId) 
        : [...prev, modelId]
    );
  };

  const startVoiceSearch = () => {
    if (!voiceSupported) return;
    
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setShowSearchSuggestions(true);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const fetchNews = async () => {
    setNewsLoading(true);
    try {
      const response = await fetch("/api/news");
      const data = await response.json();
      if (data.news) {
        setDynamicNews(data.news);
      }
    } catch (err) {
      console.error("Failed to fetch news:", err);
    } finally {
      setNewsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const shareItem = (type: string, id: string, name: string) => {
    const url = `${window.location.origin}/?tab=${type}&${type === 'models' ? 'model' : 'tool'}=${id}`;
    navigator.clipboard.writeText(url);
    // Visual feedback handled by state if needed, or just toast-style if available.
    // For now we'll use a local state for the specific item if possible or just alert
    // but the prompt asked for sharing utility.
  };

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const handleShare = (id: string, type: string, name: string) => {
    const url = `${window.location.origin}/?tab=${type}&id=${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Model Directory sorting and status badge helpers
  const [modelSortOrder, setModelSortOrder] = useState<"highest-speed" | "lowest-price" | "highest-coding">("highest-speed");
  const [groupByCompany, setGroupByCompany] = useState<boolean>(false);

  const getModelStatus = (modelId: string | undefined) => {
    if (!modelId) return "Public API";
    switch (modelId) {
      case "claude-3-5-sonnet":
        return "Public API";
      case "gpt-4o":
        return "Public API";
      case "gemini-2-5-pro":
        return "Beta";
      case "deepseek-r1":
        return "Public API";
      case "grok-2":
        return "Beta";
      case "llama-3-3-70b":
        return "Enterprise Only";
      default:
        return "Public API";
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Public API":
        return (
          <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
            Public API
          </span>
        );
      case "Beta":
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            Beta
          </span>
        );
      case "Enterprise Only":
        return (
          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
            Enterprise Only
          </span>
        );
      default:
        return null;
    }
  };

  // Newsletter States
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  // Floating news item expanded
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  // Floating guide expanded
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  // Keep search box active list
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const handleGroqCompare = async () => {
    setGroqLoading(true);
    setGroqError("");
    setGroqAnalysis("");

    const modelAObj = MODELS.find((m) => m.id === compareModelA);
    const modelBObj = MODELS.find((m) => m.id === compareModelB);

    try {
      const response = await fetch("/api/groq/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modelA: modelAObj?.name || compareModelA,
          modelB: modelBObj?.name || compareModelB,
          customQuery: compareQuery,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "An error occurred during verification.");
      }
      setGroqAnalysis(data.analysis);
    } catch (err: any) {
      console.error(err);
      setGroqError(err.message || "Failed to reach AI analyst. Please try again.");
    } finally {
      setGroqLoading(false);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSuccess(false), 4000);
    }
  };

  // Global search matching
  const searchResults = MODELS.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  ).concat(
    MODELS.filter((m) => !m.name.toLowerCase().includes(searchQuery.toLowerCase())) // avoid duplicates
      .filter((m) => false) // template logic
  );

  const sortedAndFilteredModels = [...MODELS]
    .filter((m) => {
      const query = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(query) ||
        m.companyName.toLowerCase().includes(query) ||
        m.overview.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (modelSortOrder === "highest-speed") {
        return b.speedScore - a.speedScore;
      } else if (modelSortOrder === "lowest-price") {
        return (a.pricingInput + a.pricingOutput) - (b.pricingInput + b.pricingOutput);
      } else if (modelSortOrder === "highest-coding") {
        return b.codingScore - a.codingScore;
      }
      return 0;
    });

  const groupedModelsByCompany = React.useMemo(() => {
    const groups: Record<string, AIModel[]> = {};
    sortedAndFilteredModels.forEach((model) => {
      const company = model.companyName;
      if (!groups[company]) {
        groups[company] = [];
      }
      groups[company].push(model);
    });
    return groups;
  }, [sortedAndFilteredModels]);

  return (
    <div id="aether-hub-main" className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* SEO Dynamic Metadata & Router Synchronization */}
      <SEO
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        selectedBlogPost={selectedBlogPost}
        setSelectedBlogPost={setSelectedBlogPost}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <ReadingProgressBar />
      
      {/* Click outside shield to dismiss dropdowns */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-30 bg-transparent" 
          onClick={() => setActiveDropdown(null)} 
        />
      )}

      {/* HEADER / NAVIGATION */}
      <header id="aether-header" className="sticky top-0 z-45 w-full bg-white border-b border-gray-200/85 px-4 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <div
            onClick={() => {
              handleTabChange("home");
              setActiveDropdown(null);
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200 group-hover:scale-105 transition-all">
              <Database className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="font-sans font-extrabold text-xl tracking-tight text-gray-900">
                AI<span className="text-blue-600">Index</span>
              </span>
              <span className="text-[10px] font-mono font-bold block text-gray-400 tracking-wider uppercase -mt-1">
                Global Index
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-navbar" className="hidden lg:flex items-center gap-6 h-full">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "features", label: "Features", isFeaturesDropdown: true },
              { id: "contact", label: "Contact" },
              { id: "docs", label: "Docs" },
              { id: "blogs", label: "Blogs" },
            ].map((tab) => {
              const isActive = activeTab === tab.id || (tab.isFeaturesDropdown && (activeDropdown === "features" || showFeaturesSubNavbar));
              
              // Define dropdown items
              const getDropdownItems = (id: string) => {
                switch (id) {
                  case "features":
                    return [
                      { label: "AI Comparison", desc: "Interactive side-by-side specs showdown", action: () => handleTabChange("compare") },
                      { label: "Cost Calculator", desc: "Monthly API token rate estimator", action: () => handleTabChange("calculator") },
                      { label: "Benchmarks", desc: "MMLU & HumanEval evaluation matrix", action: () => handleTabChange("benchmarks") },
                      { label: "AI Models", desc: "Browse comprehensive LLM directory", action: () => { setSelectedModel(null); handleTabChange("models"); } },
                      { label: "Companies", desc: "Profiles of top foundation laboratories", action: () => { setSelectedCompany(null); handleTabChange("companies"); } },
                      { label: "Prompts", desc: "Structured helper templates for developers", action: () => handleTabChange("prompts") },
                      { label: "Guides & News", desc: "Analytical deepdives and industry headlines", action: () => handleTabChange("news") },
                    ];
                  default:
                    return [];
                }
              };

              const items = getDropdownItems(tab.id);
              const hasDropdown = items.length > 0;
              const isOpen = activeDropdown === tab.id;

              return (
                <div key={`nav-link-container-${tab.id}`} className="relative h-full flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (tab.isFeaturesDropdown) {
                        setShowFeaturesSubNavbar(!showFeaturesSubNavbar);
                        setActiveDropdown(isOpen ? null : "features");
                      } else {
                        // Regular tab navigation
                        handleTabChange(tab.id);
                        setActiveDropdown(null);
                        setShowFeaturesSubNavbar(false);
                      }
                    }}
                    className={`relative text-xs xl:text-sm font-semibold py-5 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-1 ${
                      isActive ? "text-blue-600 font-bold" : ""
                    }`}
                  >
                    <span>{tab.label}</span>
                    {hasDropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                    )}

                    {isActive && !tab.isFeaturesDropdown && (
                      <motion.div
                        layoutId="active-nav-line"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>

                  {/* Dropdown Box overlay */}
                  <AnimatePresence>
                    {isOpen && hasDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-[56px] left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-3 flex flex-col gap-1 text-left"
                      >
                        <div className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest px-3 py-1 border-b border-gray-100 mb-1">
                          Platform Features
                        </div>
                        {items.map((item, itemIdx) => (
                          <button
                            key={`dropdown-item-${tab.id}-${itemIdx}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              item.action();
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left p-2 rounded-xl hover:bg-blue-50/70 transition-all group/item"
                          >
                            <p className="text-xs font-bold text-gray-800 group-hover/item:text-blue-600 transition-colors">
                              {item.label}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5 font-medium line-clamp-1">
                              {item.desc}
                            </p>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setSubmitToolModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              Submit Tool
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Dynamic SEO Breadcrumbs Trail */}
      <Breadcrumbs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        selectedBlogPost={selectedBlogPost}
        setSelectedBlogPost={setSelectedBlogPost}
      />

      {/* SPECIAL INTERACTIVE FEATURES SUB-NAVBAR */}
      <AnimatePresence>
        {showFeaturesSubNavbar && (
          <motion.div
            id="features-dropdown-navbar"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-600 text-white border-b border-blue-700 shadow-lg relative z-40"
          >
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-blue-500 rounded-lg">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-100">
                    AIIndex Features Navbar
                  </p>
                  <p className="text-[10px] text-blue-200">
                    Interactive tools and engines to decode Artificial Intelligence
                  </p>
                </div>
              </div>

              {/* Sub-navbar interactive options */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { id: "compare", label: "Analyst Compare", icon: Scale, desc: "Side-by-side benchmark analyst" },
                  { id: "benchmarks", label: "Evaluations Matrix", icon: TrendingUp, desc: "Dynamic MMLU charts" },
                  { id: "calculator", label: "Token Cost Estimator", icon: DollarSign, desc: "Calculate monthly API bills" },
                  { id: "prompts", label: "System Prompts", icon: BookOpen, desc: "Structured prompt templates" },
                ].map((item) => (
                  <button
                    key={`feat-subnav-${item.id}`}
                    onClick={() => {
                      handleTabChange(item.id);
                      setShowFeaturesSubNavbar(false);
                    }}
                    className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-700/50 hover:bg-white hover:text-blue-600 rounded-xl text-xs font-bold transition-all border border-blue-500/40 cursor-pointer shadow-sm group"
                  >
                    <item.icon className="w-3.5 h-3.5 text-blue-100 group-hover:text-blue-600 transition-colors" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowFeaturesSubNavbar(false)}
                className="text-xs font-bold text-blue-200 hover:text-white bg-blue-700/30 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-all"
              >
                Close Subnav
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[40]"
            />
            
            {/* Drawer */}
            <motion.div
              id="mobile-nav-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 right-0 w-[280px] bg-white shadow-2xl z-[50] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">AI</div>
                  <span className="font-sans font-black text-lg text-gray-900 tracking-tighter">AIIndex</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {[
                  { id: "home", label: "Dashboard", icon: Layout },
                  { id: "features", label: "Core Features", isFeaturesDropdown: true, icon: Layers },
                  { id: "blogs", label: "Research & News", icon: BookOpen },
                  { id: "docs", label: "API Docs", icon: Code },
                  { id: "about", label: "Our Mission", icon: Info },
                  { id: "contact", label: "Get in Touch", icon: MessageSquare },
                ].map((tab) => {
                  if (tab.isFeaturesDropdown) {
                    return (
                      <div key="mobile-features-accordion-container" className="space-y-1">
                        <button
                          onClick={() => setMobileFeaturesExpanded(!mobileFeaturesExpanded)}
                          className={`flex items-center justify-between w-full text-left py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                            mobileFeaturesExpanded ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <tab.icon className={`w-4 h-4 ${mobileFeaturesExpanded ? "text-blue-600" : "text-gray-400"}`} />
                            <span>{tab.label}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileFeaturesExpanded ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {mobileFeaturesExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-11 space-y-1 overflow-hidden"
                            >
                              {[
                                { id: "compare", label: "AI Comparison" },
                                { id: "calculator", label: "Cost Calculator" },
                                { id: "benchmarks", label: "Benchmarks" },
                                { id: "models", label: "AI Models" },
                                { id: "companies", label: "Companies" },
                                { id: "prompts", label: "Prompts" },
                              ].map((feat) => {
                                const isFeatActive = activeTab === feat.id;
                                return (
                                  <button
                                    key={`mobile-feat-${feat.id}`}
                                    onClick={() => {
                                      handleTabChange(feat.id);
                                      setMobileFeaturesExpanded(false);
                                      setMobileMenuOpen(false);
                                    }}
                                    className={`block w-full text-left py-2.5 px-4 rounded-lg text-[13px] font-medium transition-all ${
                                      isFeatActive ? "text-blue-600 font-bold bg-blue-50/50" : "text-gray-500 hover:text-gray-800"
                                    }`}
                                  >
                                    {feat.label}
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={`mobile-nav-link-${tab.id}`}
                      onClick={() => {
                        handleTabChange(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                        isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <button className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-bold shadow-xl shadow-gray-200 active:scale-95 transition-transform">
                  Sign In to AIIndex
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-4 font-medium uppercase tracking-widest">
                  &copy; 2026 AIIndex Platform
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* RENDER ACTIVE TAB */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            
            {/* 1. HOME TAB */}
            {activeTab === "home" && (
              <div id="home-view-wrapper" className="space-y-16">
                
                {/* HERO SECTION */}
                <section id="homepage-hero" className="relative py-12 md:py-20 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
                  {/* Floating Graphic Accents */}
                  <div className="absolute -top-10 left-10 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50 pointer-events-none" />
                  <div className="absolute -bottom-10 right-10 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

                  {/* Trust Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-xs font-bold shadow-sm animate-bounce">
                    <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                    <span>Authoritative Index for US, UK, CA & AU</span>
                  </div>

                  {/* Main Display Typography */}
                  <h1 className="font-sans font-extrabold text-4xl sm:text-6xl text-gray-900 tracking-tight leading-[1.1] max-w-3xl">
                    Discover, Compare & Decode the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">World's Best AI</span>
                  </h1>

                  <p className="text-gray-500 text-lg sm:text-xl max-w-2xl font-normal leading-relaxed">
                    The ultimate technology hub & directory. Read real specifications, compare model pricing, analyze benchmark charts, and calculate monthly API costs.
                  </p>

                  {/* Integrated Search Box */}
                  <div className="w-full max-w-xl relative">
                    <div className="relative">
                      <Search className="absolute left-4.5 top-4 h-5.5 w-5.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search models, developer tools, or AI labs..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowSearchSuggestions(true);
                        }}
                        onFocus={() => setShowSearchSuggestions(true)}
                        className="w-full bg-white border border-gray-200 rounded-2xl pl-13 pr-12 py-4 text-sm text-gray-800 shadow-md hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <button
                        onClick={startVoiceSearch}
                        className={`absolute right-4 top-3.5 p-1.5 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        title="Voice Search"
                      >
                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Instant Search Suggestions */}
                    {showSearchSuggestions && searchQuery.trim() && (
                      <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-20 overflow-hidden text-left max-h-80 overflow-y-auto">
                        <div className="p-3 bg-gray-50 border-b border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-400 flex justify-between items-center">
                          <span>Search Results</span>
                          <button
                            onClick={() => setShowSearchSuggestions(false)}
                            className="hover:text-gray-600 text-gray-400 font-bold"
                          >
                            Close
                          </button>
                        </div>
                        {searchResults.slice(0, 6).map((model) => (
                          <div
                            key={`search-suggest-${model.id}`}
                            onClick={() => {
                              setSelectedModel(model);
                              handleTabChange("models");
                              setSearchQuery("");
                              setShowSearchSuggestions(false);
                            }}
                            className="p-4 hover:bg-blue-50/50 cursor-pointer border-b border-gray-50 last:border-0 flex items-center justify-between transition-colors"
                          >
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{model.name}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{model.companyName} • Context: {model.contextWindow.toLocaleString()}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        ))}
                        {searchResults.length === 0 && (
                          <div className="p-4 text-center text-sm text-gray-400 italic">
                            No models found matching "{searchQuery}"
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Hot Tags */}
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
                    <span className="font-bold uppercase tracking-widest text-[10px] text-gray-400">Trending Comparisons:</span>
                    {[
                      { a: "claude-3-5-sonnet", b: "gpt-4o", label: "GPT vs Claude" },
                      { a: "claude-3-5-sonnet", b: "gemini-2-5-pro", label: "Claude vs Gemini" },
                      { a: "deepseek-r1", b: "gpt-4o", label: "GPT vs DeepSeek-R1" },
                    ].map((comp, idx) => (
                      <button
                        key={`hot-comp-${idx}`}
                        onClick={() => {
                          setCompareModelA(comp.a);
                          setCompareModelB(comp.b);
                          handleTabChange("compare");
                        }}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full cursor-pointer transition-colors font-medium"
                      >
                        {comp.label}
                      </button>
                    ))}
                  </div>

                  {/* Bullet Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full pt-8 border-t border-gray-100/80">
                    {[
                      { value: "12+", label: "Frontier Models" },
                      { value: "$0.55", label: "Cheapest 1M Price" },
                      { value: "2.0M", label: "Largest Context" },
                      { value: "99.9%", label: "Uptime Verified" },
                    ].map((stat, index) => (
                      <div key={`stat-card-${index}`} className="text-center">
                        <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight font-mono">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <AdPlaceholder position="Below Hero" />

                {/* LOGO MARQUEE */}
                <InfiniteMarquee />

                {/* FEATURED MODELS */}
                <section id="featured-models-section" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-sans font-bold text-2xl text-gray-900 tracking-tight">
                        Featured LLM Directory
                      </h2>
                      <p className="text-sm text-gray-500">
                        Explore core details of the world's most widely adopted artificial intelligence models.
                      </p>
                    </div>
                    <button
                      onClick={() => handleTabChange("models")}
                      className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      View All Models <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {MODELS.slice(0, 3).map((model) => (
                      <div
                        key={`home-model-${model.id}`}
                        onClick={() => {
                          setSelectedModel(model);
                          handleTabChange("models");
                        }}
                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                              {model.companyName}
                            </span>
                            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                              <Maximize2 className="w-4 h-4" />
                            </div>
                          </div>
                          <h3 className="font-sans font-extrabold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                            {model.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                            {model.overview}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-1">
                            {model.features.slice(0, 2).map((feat, fIdx) => (
                              <span
                                key={`feat-tag-${fIdx}`}
                                className="bg-gray-50 text-gray-500 text-[10px] px-2 py-0.5 rounded font-medium"
                              >
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                          <div>
                            <p className="text-gray-400">Context Window</p>
                            <p className="font-mono font-bold text-gray-700 mt-0.5">
                              {model.contextWindow >= 1000000
                                ? `${model.contextWindow / 1000000}M`
                                : `${model.contextWindow / 1000}k`}{" "}
                              tokens
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400">API Cost / 1M</p>
                            <p className="font-mono font-bold text-gray-700 mt-0.5">
                              ${model.pricingInput.toFixed(2)} / ${model.pricingOutput.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* THE DUAL GRID: BENCHMARKS & TRENDING TOOLS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Benchmarks Widget */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-sans font-bold text-lg text-gray-900">
                        Live Model Evaluations
                      </h3>
                      <button
                        onClick={() => handleTabChange("benchmarks")}
                        className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        Explore Chart
                      </button>
                    </div>
                    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white p-4">
                      <div className="space-y-4">
                        {MODELS.slice(0, 4).map((model) => (
                          <div key={`bench-progress-${model.id}`} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold text-gray-700">
                              <span>{model.name}</span>
                              <span className="font-mono font-bold text-blue-600">
                                MMLU: {model.benchmarks.mmlu}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-blue-600 h-full rounded-full"
                                style={{ width: `${model.benchmarks.mmlu}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Trending AI Tools */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-sans font-bold text-lg text-gray-900">
                        Trending Product Directory
                      </h3>
                      <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full">
                        Updated Daily
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      {TOOLS.slice(0, 3).map((tool) => (
                        <div
                          key={`home-tool-${tool.id}`}
                          className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 shadow-sm transition-all group"
                        >
                          <div className="flex-1">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-0.5">
                              {tool.category}
                            </span>
                            <div className="flex items-center gap-2">
                              <a
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-sans font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors flex items-center gap-1.5"
                              >
                                {tool.name} <ExternalLink className="w-3 h-3 text-gray-300" />
                              </a>
                              <button
                                onClick={() => handleShare(tool.id, 'tools', tool.name)}
                                className="p-1 text-gray-300 hover:text-blue-600 transition-colors"
                                title="Share Tool"
                              >
                                {copiedId === tool.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Share2 className="w-3 h-3" />}
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                              {tool.description}
                            </p>
                          </div>
                          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-lg ml-4">
                            {tool.pricingType}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI LABS & NEWS */}
                <section id="homepage-companies-news" className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Left: Top Laboratories */}
                  <div className="md:col-span-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-sans font-bold text-lg text-gray-900">AI Research Labs</h3>
                      <button
                        onClick={() => handleTabChange("companies")}
                        className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        All Labs
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {COMPANIES.slice(0, 3).map((company) => (
                        <div
                          key={`home-company-${company.id}`}
                          onClick={() => {
                            setSelectedCompany(company);
                            handleTabChange("companies");
                          }}
                          className="p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-100 cursor-pointer shadow-sm transition-all flex items-center gap-3"
                        >
                          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                            {company.name[0]}
                          </div>
                          <div>
                            <h4 className="font-sans font-bold text-sm text-gray-900">{company.name}</h4>
                            <p className="text-xs text-gray-400">HQ: {company.headquarters.split(",")[0]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Latest Technology News */}
                  <div className="md:col-span-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-sans font-bold text-lg text-gray-900">Latest AI Weekly News</h3>
                      <button
                        onClick={() => handleTabChange("news")}
                        className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        All News
                      </button>
                    </div>

                    <div className="space-y-4">
                      {NEWS.map((item) => (
                        <div
                          key={`home-news-${item.id}`}
                          onClick={() => {
                            setSelectedNews(item);
                          }}
                          className="p-5 bg-white border border-gray-100 rounded-xl hover:border-gray-200 cursor-pointer shadow-sm transition-all"
                        >
                          <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 mb-2">
                            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase">
                              {item.category}
                            </span>
                            <span>{item.date}</span>
                          </div>
                          <h4 className="font-sans font-extrabold text-gray-900 text-base mb-1.5 hover:text-blue-600 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {item.summary}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* LATEST AI INDUSTRY NEWS SECTION */}
                <section id="ai-dynamic-news" className="space-y-6 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-sans font-bold text-xl text-gray-900 tracking-tight flex items-center gap-2">
                        <Globe className="w-6 h-6 text-blue-600" /> Latest AI Industry Headlines
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Verified breakthroughs and regulatory shifts from global foundation labs.
                      </p>
                    </div>
                    <button 
                      onClick={fetchNews}
                      className="text-[10px] font-bold text-gray-400 hover:text-blue-600 flex items-center gap-1 uppercase tracking-widest transition-colors"
                    >
                      <Rss className="w-3.5 h-3.5" /> Refresh Feed
                    </button>
                  </div>

                  {newsLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3].map((n) => (
                        <div key={`news-skeleton-${n}`} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4 animate-pulse">
                          <div className="h-3 bg-gray-100 rounded w-1/4" />
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-3 bg-gray-100 rounded w-full" />
                        </div>
                      ))}
                    </div>
                  ) : dynamicNews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {dynamicNews.map((news, idx) => (
                        <a
                          key={`dynamic-news-${idx}`}
                          href={news.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest block mb-2">
                              {news.source}
                            </span>
                            <h4 className="font-sans font-bold text-gray-900 text-sm mb-2 group-hover:text-blue-600 transition-colors">
                              {news.title}
                            </h4>
                            <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                              {news.summary}
                            </p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-1 text-[10px] font-bold text-gray-400 group-hover:text-blue-600 transition-colors">
                            Read Original <ExternalLink className="w-3 h-3" />
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      <p className="text-sm text-gray-400">No headlines found. Check back in a few moments.</p>
                    </div>
                  )}
                </section>

                {/* EMAIL NEWSLETTER DRAWER */}
                <section id="home-newsletter" className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="max-w-2xl space-y-4 relative">
                    <Mail className="w-10 h-10 text-blue-500 animate-pulse" />
                    <h3 className="font-sans font-extrabold text-xl sm:text-2xl tracking-tight">
                      Subscribe to AIIndex Dispatch
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Join 42,000+ engineers, researchers, and tech founders in the US, UK, and Australia. Get the weekly brief on new model updates, prompt hacks, and api valuation guides.
                    </p>

                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                      <input
                        type="email"
                        placeholder="Enter your work email..."
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3 rounded-xl cursor-pointer transition-colors whitespace-nowrap"
                      >
                        Subscribe Free
                      </button>
                    </form>

                    {newsletterSuccess && (
                      <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                        <Check className="w-4 h-4" /> Subscription successful! Welcome to the loop.
                      </p>
                    )}
                  </div>
                </section>

                {/* GLOBAL FAQS */}
                <section id="global-faqs-section" className="space-y-6 pt-6">
                  <div>
                    <h3 className="font-sans font-bold text-xl text-gray-900 tracking-tight">
                      Frequently Asked Questions
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Everything you need to know about comparing modern LLM parameters.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        q: "How does AIIndex calculate benchmark scores?",
                        a: "We curate data directly from model publishers' official whitepapers, verified third-party logs (e.g. LMSYS Chatbot Arena), and strict replication evaluations.",
                      },
                      {
                        q: "Which coding LLM is the overall fastest and most robust?",
                        a: "Currently, Claude 3.5 Sonnet is considered the benchmark champion for code engineering logic, while DeepSeek-R1 provides the highest reasoning accuracy on a lower budget.",
                      },
                    ].map((faq, idx) => (
                      <div key={`gfaq-${idx}`} className="bg-gray-50 p-5 rounded-2xl border border-gray-100/50">
                        <h4 className="font-sans font-bold text-gray-900 text-sm mb-2">{faq.q}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* 2. MODELS TAB */}
            {activeTab === "models" && (
              <div id="models-view" className="space-y-8">
                {selectedModel ? (
                  /* Model Detail Sub-view */
                  <div className="space-y-8 animate-fade-in">
                    <button
                      onClick={() => setSelectedModel(null)}
                      className="text-xs font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-1 mb-4"
                    >
                      ← Back to All Models
                    </button>

                    {/* Model Title Header */}
                    <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                            {selectedModel.companyName}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(selectedModel.id);
                              }}
                              className={`p-1.5 rounded-full transition-colors ${favorites.includes(selectedModel.id) ? 'text-amber-500 bg-amber-50' : 'text-gray-300 hover:text-amber-500 hover:bg-gray-100'}`}
                              title={favorites.includes(selectedModel.id) ? "Remove from Favorites" : "Add to Favorites"}
                            >
                              <Star className={`w-5 h-5 ${favorites.includes(selectedModel.id) ? 'fill-current' : ''}`} />
                            </button>
                            <button
                              onClick={() => handleShare(selectedModel.id, 'models', selectedModel.name)}
                              className="p-1.5 rounded-full text-gray-400 hover:text-blue-600 hover:bg-gray-100 transition-colors relative"
                              title="Share Model"
                            >
                              {copiedId === selectedModel.id ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                        <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
                          {selectedModel.name}
                        </h2>
                        <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
                          {selectedModel.overview}
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200/80 p-5 rounded-2xl flex flex-col justify-between h-28 md:w-56 text-xs text-gray-500 shadow-sm shrink-0">
                        <div>
                          <p className="text-gray-400 font-semibold uppercase tracking-wider text-[9px]">API Pricing / 1M</p>
                          <p className="text-lg font-bold text-gray-800 font-mono mt-1">
                            ${selectedModel.pricingInput.toFixed(2)} / ${selectedModel.pricingOutput.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-[10px] text-gray-400">Tokens (Input/Output)</p>
                      </div>
                    </div>

                    {/* Specifications Grid & Scoring */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      
                      {/* Left specs list */}
                      <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                          <h3 className="font-sans font-bold text-gray-900 text-base border-b border-gray-100 pb-2 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-blue-600" /> Specifications
                          </h3>
                          <div className="space-y-3.5 text-xs text-gray-600">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Release Date:</span>
                              <span className="font-semibold text-gray-800">{selectedModel.releaseDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Context Window Size:</span>
                              <span className="font-mono font-bold text-gray-800">
                                {selectedModel.contextWindow.toLocaleString()} tokens
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">API Access:</span>
                              <span className="font-semibold text-gray-800">
                                {selectedModel.hasApi ? "✓ Fully Available" : "✗ Proprietary UI Only"}
                              </span>
                            </div>
                            <div className="flex flex-col gap-1 pt-2">
                              <span className="text-gray-400 font-semibold">Best Used For:</span>
                              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 leading-relaxed">
                                {selectedModel.bestFor}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Pros and Cons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-emerald-50/40 border border-emerald-100 p-5 rounded-2xl text-xs space-y-2.5">
                            <h4 className="font-bold text-emerald-900 uppercase tracking-wider text-[10px]">Pros</h4>
                            <ul className="space-y-2 text-emerald-800 list-disc list-inside">
                              {selectedModel.pros.map((p, idx) => (
                                <li key={`pro-${idx}`} className="leading-relaxed">{p}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-red-50/40 border border-red-100 p-5 rounded-2xl text-xs space-y-2.5">
                            <h4 className="font-bold text-red-950 uppercase tracking-wider text-[10px]">Cons</h4>
                            <ul className="space-y-2 text-red-900 list-disc list-inside">
                              {selectedModel.cons.map((c, idx) => (
                                <li key={`con-${idx}`} className="leading-relaxed">{c}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Right capability scores */}
                      <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                          <h3 className="font-sans font-bold text-gray-900 text-base border-b border-gray-100 pb-2 flex items-center gap-2">
                            <Award className="w-5 h-5 text-blue-600" /> Competency Ratings
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                              { label: "Coding & Formatting", score: selectedModel.codingScore },
                              { label: "Math & Reasoning", score: selectedModel.reasoningScore },
                              { label: "Accuracy & Hallucination", score: selectedModel.accuracyScore },
                              { label: "Latency & Speed", score: selectedModel.speedScore },
                              { label: "Writing & Nuance", score: selectedModel.writingScore },
                              { label: "Multimodal Voice", score: selectedModel.voiceScore },
                            ].map((scoreObj, idx) => (
                              <div key={`comp-score-${idx}`} className="space-y-1.5">
                                <div className="flex justify-between text-xs text-gray-600 font-medium">
                                  <span>{scoreObj.label}</span>
                                  <span className="font-mono font-bold text-blue-600">{scoreObj.score ? `${scoreObj.score}/100` : "N/A"}</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                  <div
                                    className="bg-blue-600 h-full rounded-full"
                                    style={{ width: `${scoreObj.score || 0}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Model Academic Benchmarks */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                          <h3 className="font-sans font-bold text-gray-900 text-base border-b border-gray-100 pb-2">
                            Standard Benchmark Evaluations
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                              { name: "MMLU (General)", value: selectedModel.benchmarks.mmlu },
                              { name: "GPQA (Reasoning)", value: selectedModel.benchmarks.gpqa },
                              { name: "MATH (equations)", value: selectedModel.benchmarks.math },
                              { name: "HumanEval (Coding)", value: selectedModel.benchmarks.humanEval },
                            ].map((bench, idx) => (
                              <div key={`spec-bench-${idx}`} className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 text-center">
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">{bench.name}</p>
                                <p className="text-xl font-extrabold text-blue-600 font-mono mt-1">
                                  {bench.value ? `${bench.value}%` : "N/A"}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Model-specific FAQs */}
                    <div className="space-y-4">
                      <h3 className="font-sans font-bold text-gray-900 text-lg">FAQs regarding {selectedModel.name}</h3>
                      <div className="space-y-3">
                        {selectedModel.faqs.map((faq, idx) => (
                          <div key={`mfaq-${idx}`} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                            <h4 className="font-sans font-bold text-gray-900 text-sm mb-1">{faq.question}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* List view of models */
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                    <div className="xl:col-span-9 space-y-12">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                        <div>
                          <h2 className="font-sans font-bold text-2xl text-gray-900 tracking-tight">AI Model Directory</h2>
                          <p className="text-sm text-gray-500 font-medium">
                            Compare technical dimensions, limits, and pricing rates of leading frontier systems.
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                          <button
                            onClick={() => setGroupByCompany(!groupByCompany)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border shadow-sm cursor-pointer ${
                              groupByCompany
                                ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                                : "bg-white text-gray-600 hover:text-gray-800 border-gray-150 hover:bg-gray-50"
                            }`}
                            title="Group models by their creator company"
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>Group by Company</span>
                          </button>

                          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-150 shadow-sm">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">
                              Sort By
                            </span>
                            <select
                              id="directory-sort"
                              value={modelSortOrder}
                              onChange={(e) => setModelSortOrder(e.target.value as any)}
                              className="bg-transparent border-none text-xs font-extrabold text-blue-600 focus:outline-none cursor-pointer pr-1"
                            >
                              <option value="highest-speed">Highest Speed</option>
                              <option value="lowest-price">Lowest Price</option>
                              <option value="highest-coding">Highest Coding Score</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Recommended Based on Needs Interactive Advisor */}
                      <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6 relative overflow-hidden">
                        {/* background ambient blurs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />

                        <div className="relative space-y-2">
                          <span className="bg-blue-500/40 text-blue-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-blue-400/20 inline-block">
                            Smart Advisor
                          </span>
                          <h3 className="font-sans font-extrabold text-2xl tracking-tight">
                            Recommended Based on Needs
                          </h3>
                          <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
                            Select a high-level operational focus below to view the top-recommended frontier models evaluated across latency, coding, pricing, and writing nuance.
                          </p>
                        </div>

                        {/* Criteria Selector Tabs */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 relative z-10">
                          {[
                            { id: "coding", label: "Coding / Dev", icon: Cpu },
                            { id: "reasoning", label: "Deep Reasoning", icon: Brain },
                            { id: "speed", label: "High Speed", icon: Zap },
                            { id: "cost", label: "Best Cost", icon: DollarSign },
                            { id: "creative", label: "Creative Writing", icon: Sparkles },
                          ].map((item) => {
                            const Icon = item.icon;
                            const isActive = recommendationCriteria === item.id;
                            return (
                              <button
                                key={`rec-criteria-${item.id}`}
                                onClick={() => setRecommendationCriteria(item.id as any)}
                                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer select-none border ${
                                  isActive
                                    ? "bg-white text-indigo-950 border-white scale-[1.02]"
                                    : "bg-white/10 text-white hover:bg-white/15 border-white/10"
                                }`}
                              >
                                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-600" : "text-blue-200"}`} />
                                <span>{item.label}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Active Criteria Details and Recommended Models */}
                        <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-6 relative z-10">
                          <div className="space-y-1.5">
                            <h4 className="font-sans font-extrabold text-lg text-white flex items-center gap-2">
                              {recommendationNeeds[recommendationCriteria].title}
                            </h4>
                            <p className="text-xs text-blue-100/95 leading-relaxed max-w-4xl font-medium">
                              {recommendationNeeds[recommendationCriteria].description}
                            </p>
                          </div>

                          {/* Top Matches Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {recommendationNeeds[recommendationCriteria].getRecommendations().slice(0, 2).map((model, index) => {
                              const isFav = favorites.includes(model.id);
                              return (
                                <div
                                  key={`rec-model-${model.id}`}
                                  onClick={() => setSelectedModel(model)}
                                  className="bg-white/95 text-gray-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:translate-y-[-2px] transition-all relative group cursor-pointer border border-white/20 hover:border-blue-300"
                                >
                                  {index === 0 && (
                                    <span className="absolute -top-2.5 left-4 bg-amber-500 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
                                      ★ Top Recommendation
                                    </span>
                                  )}

                                  <div>
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                                        {model.companyName}
                                      </span>
                                      <div className="flex items-center gap-1">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(model.id);
                                          }}
                                          className={`p-1.5 rounded-full transition-all ${isFav ? 'bg-amber-50 text-amber-500' : 'text-gray-300 hover:text-amber-500 hover:bg-gray-100'}`}
                                        >
                                          <Star className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                                        </button>
                                      </div>
                                    </div>

                                    <h5 className="font-sans font-extrabold text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {model.name}
                                    </h5>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                                      {model.overview}
                                    </p>

                                    {/* Stats highlight according to need */}
                                    <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                                      <div>
                                        <span className="text-gray-400 block text-[9px] font-bold uppercase tracking-wider">
                                          {recommendationNeeds[recommendationCriteria].metricLabel}
                                        </span>
                                        <span className="font-mono font-extrabold text-blue-700 mt-0.5 block">
                                          {recommendationCriteria === "speed" && `${model.speedScore}/100`}
                                          {recommendationCriteria === "cost" && `$${model.pricingInput.toFixed(2)} / $${model.pricingOutput.toFixed(2)}`}
                                          {recommendationCriteria === "creative" && `${model.writingScore}/100`}
                                          {recommendationCriteria === "coding" && `${model.codingScore}/100`}
                                          {recommendationCriteria === "reasoning" && `${model.reasoningScore}/100`}
                                        </span>
                                      </div>
                                      <div className="text-right">
                                        <span className="text-gray-400 block text-[9px] font-bold uppercase tracking-wider">Context Window</span>
                                        <span className="font-mono font-bold text-gray-700 mt-0.5 block">
                                          {model.contextWindow >= 1000000
                                            ? `${model.contextWindow / 1000000}M`
                                            : `${model.contextWindow / 1000}k`}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-[10px] text-gray-400 font-bold max-w-[65%] truncate">
                                      Best for: <span className="text-gray-600 font-normal">{model.bestFor.split(",")[0]}</span>
                                    </span>
                                    <span
                                      className="text-blue-600 hover:text-blue-800 font-extrabold text-xs flex items-center gap-1 group-hover:underline"
                                    >
                                      View Specs <ArrowRight className="w-3 h-3" />
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <AnimatePresence mode="popLayout">
                        {groupByCompany ? (
                          <motion.div
                            key="grouped-directory-view"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="space-y-12"
                          >
                            {Object.entries(groupedModelsByCompany).map(([company, models]) => (
                              <motion.div
                                key={`company-group-${company}`}
                                layout="position"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.25 }}
                                className="space-y-4"
                              >
                                <div className="flex items-center gap-2.5 border-b border-gray-150 pb-2">
                                  <Building2 className="w-4 h-4 text-blue-600" />
                                  <h3 className="font-sans font-extrabold text-base text-gray-800 tracking-wider uppercase">{company}</h3>
                                  <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2.5 py-0.5 rounded-full border border-gray-200">
                                    {models.length} {models.length === 1 ? "model" : "models"}
                                  </span>
                                </div>
                                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <AnimatePresence mode="popLayout">
                                    {models.map((model) => (
                                      <motion.div
                                        key={`model-item-group-${model.id}`}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        onClick={() => setSelectedModel(model)}
                                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative"
                                      >
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(model.id);
                                          }}
                                          className={`absolute top-4 right-4 p-2 rounded-full transition-all z-10 ${favorites.includes(model.id) ? 'bg-amber-50 text-amber-500' : 'bg-transparent text-gray-200 hover:text-amber-500 group-hover:text-gray-300'}`}
                                        >
                                          <Star className={`w-5 h-5 ${favorites.includes(model.id) ? 'fill-current' : ''}`} />
                                        </button>
                                        <div>
                                          <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                                              {model.companyName}
                                            </span>
                                            {renderStatusBadge(getModelStatus(model.id))}
                                          </div>
                                          <h3 className="font-sans font-extrabold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {model.name}
                                          </h3>
                                          <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                                            {model.overview}
                                          </p>
                                        </div>

                                        <div>
                                          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                            <div>
                                              <p className="text-gray-400">Context Window</p>
                                              <p className="font-mono font-bold text-gray-700 mt-0.5">
                                                {model.contextWindow >= 1000000
                                                  ? `${model.contextWindow / 1000000}M`
                                                  : `${model.contextWindow / 1000}k`}
                                              </p>
                                            </div>
                                            <div className="text-right">
                                              <p className="text-gray-400">Pricing / 1M Input</p>
                                              <p className="font-mono font-bold text-gray-700 mt-0.5">
                                                ${model.pricingInput.toFixed(2)}
                                              </p>
                                            </div>
                                          </div>

                                          {/* Action Buttons: Quick Compare & Specs */}
                                          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setCompareModelA(model.id);
                                                handleTabChange("compare");
                                              }}
                                              className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 border border-blue-100 cursor-pointer"
                                              title="Compare this model side-by-side"
                                            >
                                              <Scale className="w-3.5 h-3.5" />
                                              <span>Quick Compare</span>
                                            </button>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedModel(model);
                                              }}
                                              className="py-2 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-800 text-xs font-bold rounded-xl transition-all border border-gray-200 cursor-pointer flex items-center gap-1 shrink-0"
                                            >
                                              <span>Specs</span>
                                              <ArrowRight className="w-3 h-3" />
                                            </button>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </AnimatePresence>
                                </motion.div>
                              </motion.div>
                            ))}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="flat-directory-view"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            layout
                          >
                            <AnimatePresence mode="popLayout">
                              {sortedAndFilteredModels.map((model) => (
                                <motion.div
                                  key={`model-item-${model.id}`}
                                  layout
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                  onClick={() => setSelectedModel(model)}
                                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative"
                                >
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFavorite(model.id);
                                    }}
                                    className={`absolute top-4 right-4 p-2 rounded-full transition-all z-10 ${favorites.includes(model.id) ? 'bg-amber-50 text-amber-500' : 'bg-transparent text-gray-200 hover:text-amber-500 group-hover:text-gray-300'}`}
                                  >
                                    <Star className={`w-5 h-5 ${favorites.includes(model.id) ? 'fill-current' : ''}`} />
                                  </button>
                                  <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                      <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                                        {model.companyName}
                                      </span>
                                      {renderStatusBadge(getModelStatus(model.id))}
                                    </div>
                                    <h3 className="font-sans font-extrabold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {model.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                                      {model.overview}
                                    </p>
                                  </div>

                                  <div>
                                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                      <div>
                                        <p className="text-gray-400">Context Window</p>
                                        <p className="font-mono font-bold text-gray-700 mt-0.5">
                                          {model.contextWindow >= 1000000
                                            ? `${model.contextWindow / 1000000}M`
                                            : `${model.contextWindow / 1000}k`}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-gray-400">Pricing / 1M Input</p>
                                        <p className="font-mono font-bold text-gray-700 mt-0.5">
                                          ${model.pricingInput.toFixed(2)}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Action Buttons: Quick Compare & Specs */}
                                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setCompareModelA(model.id);
                                          handleTabChange("compare");
                                        }}
                                        className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 border border-blue-100 cursor-pointer"
                                        title="Compare this model side-by-side"
                                      >
                                        <Scale className="w-3.5 h-3.5" />
                                        <span>Quick Compare</span>
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedModel(model);
                                        }}
                                        className="py-2 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-800 text-xs font-bold rounded-xl transition-all border border-gray-200 cursor-pointer flex items-center gap-1 shrink-0"
                                      >
                                        <span>Specs</span>
                                        <ArrowRight className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right Column: Sidebar Ad */}
                    <aside className="xl:col-span-3">
                      <SidebarAd />
                    </aside>
                  </div>
                )}
              </div>
            )}

            {/* 3. COMPANIES TAB */}
            {activeTab === "companies" && (
              <div id="companies-view" className="space-y-8">
                {selectedCompany ? (
                  /* Company detail Sub-view */
                  <div className="space-y-8 animate-fade-in">
                    <button
                      onClick={() => setSelectedCompany(null)}
                      className="text-xs font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-1 mb-4"
                    >
                      ← Back to All Companies
                    </button>

                    <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-4">
                      <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        AI Lab Portfolio
                      </span>
                      <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900">
                        {selectedCompany.name}
                      </h2>
                      <p className="text-gray-600 text-sm max-w-3xl leading-relaxed">
                        {selectedCompany.history}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left Company Stats */}
                      <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                          <h3 className="font-sans font-bold text-gray-900 text-base border-b border-gray-100 pb-2">
                            Overview Specs
                          </h3>
                          <div className="space-y-3.5 text-xs text-gray-600">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Founded:</span>
                              <span className="font-semibold text-gray-800">{selectedCompany.foundedYear}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Headquarters:</span>
                              <span className="font-semibold text-gray-800">{selectedCompany.headquarters}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Funding Level:</span>
                              <span className="font-semibold text-gray-800">{selectedCompany.funding}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Valuation:</span>
                              <span className="font-semibold text-gray-800">{selectedCompany.valuation}</span>
                            </div>
                            <div className="flex flex-col gap-1.5 pt-2">
                              <span className="text-gray-400 font-semibold">Founders:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {selectedCompany.founders.map((f, idx) => (
                                  <span key={`founder-${idx}`} className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded text-[10px] font-semibold">
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Timeline Milestones */}
                      <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                          <h3 className="font-sans font-bold text-gray-900 text-base border-b border-gray-100 pb-2">
                            Historical Timeline
                          </h3>
                          <div className="space-y-6 relative border-l border-gray-100 pl-4.5 ml-2 pt-2">
                            {selectedCompany.timeline.map((event, idx) => (
                              <div key={`timeline-event-${idx}`} className="relative">
                                <span className="absolute -left-7 top-0.5 w-3.5 h-3.5 bg-blue-600 rounded-full ring-4 ring-blue-50" />
                                <span className="font-mono text-[10px] font-extrabold text-blue-600 uppercase tracking-widest">
                                  {event.year}
                                </span>
                                <h4 className="font-sans font-bold text-gray-900 text-sm mt-0.5">{event.title}</h4>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                  {event.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Grid list of companies */
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-sans font-bold text-2xl text-gray-900 tracking-tight">AI Research Laboratories</h2>
                      <p className="text-sm text-gray-500">
                        Explore profiles of leading organizations training elite foundation systems.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {COMPANIES.map((company) => (
                        <div
                          key={`company-grid-${company.id}`}
                          onClick={() => setSelectedCompany(company)}
                          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                        >
                          <div>
                            <h3 className="font-sans font-extrabold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                              {company.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-2.5 line-clamp-3 leading-relaxed">
                              {company.history}
                            </p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                            <span>Founded: {company.foundedYear}</span>
                            <span>HQ: {company.headquarters.split(",")[0]}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. COMPARE TAB */}
            {activeTab === "compare" && (() => {
              const modelA = MODELS.find((m) => m.id === compareModelA);
              const modelB = MODELS.find((m) => m.id === compareModelB);

              const METRIC_DEFINITIONS: Record<string, string> = {
                "Developer / Creator": "The company or AI laboratory that trained and published this model.",
                "Context Window size": "The max length of input and output tokens the model can retain in active memory (1 token ≈ 0.75 words).",
                "API Price (Input per 1M)": "The developer API cost in USD to process 1,000,000 prompt (input) tokens.",
                "API Price (Output per 1M)": "The developer API cost in USD to generate 1,000,000 completion (output) tokens.",
                "Coding proficiency score": "Evaluated capabilities in software engineering, multi-file code generation, syntactical accuracy, and bug-fixing.",
                "Logical reasoning score": "Performance in multi-step planning, mathematical deduction, reasoning trace correctness, and GPQA graduate-level evaluations.",
                "Response speed score": "Our measured token generation throughput (tokens per second) under typical production API workloads.",
                "Best suited use-case": "The primary recommended operational domain where this model demonstrates maximum comparative advantage.",
                "Technical Metrics": "The specific performance parameters and technical specifications compared side-by-side.",
                "Status": "The deployment state and developer access tier currently available for integration."
              };

              const METRIC_DETAILS: Record<string, { methodology: string; sources: { name: string; url: string }[] }> = {
                "Developer / Creator": {
                  methodology: "Collected directly from official company press releases, developer blogs, and corporate registries. Updated within 24 hours of any restructuring or new launches.",
                  sources: [
                    { name: "OpenAI Blog", url: "https://openai.com/blog" },
                    { name: "Google DeepMind", url: "https://deepmind.google" },
                    { name: "Anthropic News", url: "https://www.anthropic.com/news" }
                  ]
                },
                "Context Window size": {
                  methodology: "Verified through programmatic needle-in-a-haystack retrieval evaluations and official API parameter constraints as documented in developer reference manuals.",
                  sources: [
                    { name: "LMSYS Arena", url: "https://chat.lmsys.org/" },
                    { name: "Anthropic Claude API Doc", url: "https://docs.anthropic.com/" }
                  ]
                },
                "API Price (Input per 1M)": {
                  methodology: "Calculated from official pay-as-you-go developer pricing tiers. Excludes custom enterprise volume discounts and token caching credits.",
                  sources: [
                    { name: "OpenAI Pricing", url: "https://openai.com/api/pricing/" },
                    { name: "DeepSeek Pricing", url: "https://api-docs.deepseek.com/pricing" }
                  ]
                },
                "API Price (Output per 1M)": {
                  methodology: "Calculated from official pay-as-you-go developer pricing tiers. Real-time pricing models are updated whenever the public cost structure changes.",
                  sources: [
                    { name: "Google Gemini API Pricing", url: "https://ai.google.dev/pricing" },
                    { name: "Anthropic Pricing", url: "https://www.anthropic.com/pricing" }
                  ]
                },
                "Coding proficiency score": {
                  methodology: "Aggregated performance score across SWE-bench (Software Engineering benchmark), HumanEval, and our custom internal multi-file software suite tests.",
                  sources: [
                    { name: "SWE-bench Leaderboard", url: "https://www.swebench.com/" },
                    { name: "HumanEval Paper", url: "https://github.com/openai/human-eval" }
                  ]
                },
                "Logical reasoning score": {
                  methodology: "Tested via GPQA (Graduate-Level Google-Proof Q&A Benchmark), MATH datasets, and multi-step reasoning planning chains evaluated under zero-shot conditions.",
                  sources: [
                    { name: "GPQA Dataset Hub", url: "https://github.com/davidrein/gpqa" },
                    { name: "MATH Benchmark", url: "https://github.com/hendrycks/math" }
                  ]
                },
                "Response speed score": {
                  methodology: "Measured under a standardized load of 100 concurrent requests with identical system prompts, averaging the time-to-first-token (TTFT) and token-to-token speed.",
                  sources: [
                    { name: "Artificial Analysis", url: "https://artificialanalysis.ai/" },
                    { name: "LMSYS Speed Leaderboard", url: "https://chat.lmsys.org/" }
                  ]
                },
                "Best suited use-case": {
                  methodology: "Qualitative synthesis based on model specialization profiles, benchmark peaks, latency tolerances, and production safety alignments.",
                  sources: [
                    { name: "Hugging Face Model Hub", url: "https://huggingface.co/models" },
                    { name: "AIIndex Analyst consensus", url: "https://ai.studio/build" }
                  ]
                }
              };

              let winsA = 0;
              let winsB = 0;

              if (modelA && modelB) {
                if (modelA.contextWindow > modelB.contextWindow) winsA++;
                else if (modelB.contextWindow > modelA.contextWindow) winsB++;

                if (modelA.pricingInput < modelB.pricingInput) winsA++;
                else if (modelB.pricingInput < modelA.pricingInput) winsB++;

                if (modelA.pricingOutput < modelB.pricingOutput) winsA++;
                else if (modelB.pricingOutput < modelA.pricingOutput) winsB++;

                if (modelA.codingScore > modelB.codingScore) winsA++;
                else if (modelB.codingScore > modelA.codingScore) winsB++;

                if (modelA.reasoningScore > modelB.reasoningScore) winsA++;
                else if (modelB.reasoningScore > modelA.reasoningScore) winsB++;

                if (modelA.speedScore > modelB.speedScore) winsA++;
                else if (modelB.speedScore > modelA.speedScore) winsB++;
              }

              const getRowWinner = (label: string) => {
                if (!modelA || !modelB) return null;
                switch (label) {
                  case "Context Window size":
                    return modelA.contextWindow > modelB.contextWindow ? "A" : modelB.contextWindow > modelA.contextWindow ? "B" : null;
                  case "API Price (Input per 1M)":
                    return modelA.pricingInput < modelB.pricingInput ? "A" : modelB.pricingInput < modelA.pricingInput ? "B" : null;
                  case "API Price (Output per 1M)":
                    return modelA.pricingOutput < modelB.pricingOutput ? "A" : modelB.pricingOutput < modelA.pricingOutput ? "B" : null;
                  case "Coding proficiency score":
                    return modelA.codingScore > modelB.codingScore ? "A" : modelB.codingScore > modelA.codingScore ? "B" : null;
                  case "Logical reasoning score":
                    return modelA.reasoningScore > modelB.reasoningScore ? "A" : modelB.reasoningScore > modelA.reasoningScore ? "B" : null;
                  case "Response speed score":
                    return modelA.speedScore > modelB.speedScore ? "A" : modelB.speedScore > modelA.speedScore ? "B" : null;
                  default:
                    return null;
                }
              };

              const handleDownloadReport = () => {
                if (!modelA || !modelB) return;
                const reportData = {
                  reportTitle: `AIIndex - Model Comparison Report`,
                  timestamp: new Date().toISOString(),
                  comparedModels: {
                    modelA: {
                      id: modelA.id,
                      name: modelA.name,
                      company: modelA.companyName,
                      contextWindow: modelA.contextWindow,
                      pricing: {
                        inputPerMillion: modelA.pricingInput,
                        outputPerMillion: modelA.pricingOutput,
                      },
                      scores: {
                        coding: modelA.codingScore,
                        reasoning: modelA.reasoningScore,
                        accuracy: modelA.accuracyScore,
                        speed: modelA.speedScore,
                        writing: modelA.writingScore,
                      },
                      benchmarks: modelA.benchmarks,
                      bestFor: modelA.bestFor
                    },
                    modelB: {
                      id: modelB.id,
                      name: modelB.name,
                      company: modelB.companyName,
                      contextWindow: modelB.contextWindow,
                      pricing: {
                        inputPerMillion: modelB.pricingInput,
                        outputPerMillion: modelB.pricingOutput,
                      },
                      scores: {
                        coding: modelB.codingScore,
                        reasoning: modelB.reasoningScore,
                        accuracy: modelB.accuracyScore,
                        speed: modelB.speedScore,
                        writing: modelB.writingScore,
                      },
                      benchmarks: modelB.benchmarks,
                      bestFor: modelB.bestFor
                    }
                  },
                  metricsComparison: [
                    { metric: "Context Window", modelA: modelA.contextWindow, modelB: modelB.contextWindow, winner: modelA.contextWindow > modelB.contextWindow ? "Model A" : modelB.contextWindow > modelA.contextWindow ? "Model B" : "Tie" },
                    { metric: "Input Price per 1M Tokens", modelA: modelA.pricingInput, modelB: modelB.pricingInput, winner: modelA.pricingInput < modelB.pricingInput ? "Model A" : modelB.pricingInput < modelA.pricingInput ? "Model B" : "Tie" },
                    { metric: "Output Price per 1M Tokens", modelA: modelA.pricingOutput, modelB: modelB.pricingOutput, winner: modelA.pricingOutput < modelB.pricingOutput ? "Model A" : modelB.pricingOutput < modelA.pricingOutput ? "Model B" : "Tie" },
                    { metric: "Coding Score", modelA: modelA.codingScore, modelB: modelB.codingScore, winner: modelA.codingScore > modelB.codingScore ? "Model A" : modelB.codingScore > modelA.codingScore ? "Model B" : "Tie" },
                    { metric: "Reasoning Score", modelA: modelA.reasoningScore, modelB: modelB.reasoningScore, winner: modelA.reasoningScore > modelB.reasoningScore ? "Model A" : modelB.reasoningScore > modelA.reasoningScore ? "Model B" : "Tie" },
                    { metric: "Speed Score", modelA: modelA.speedScore, modelB: modelB.speedScore, winner: modelA.speedScore > modelB.speedScore ? "Model A" : modelB.speedScore > modelA.speedScore ? "Model B" : "Tie" }
                  ],
                  overallSummary: {
                    winsModelA: winsA,
                    winsModelB: winsB,
                    winner: winsA > winsB ? modelA.name : winsB > winsA ? modelB.name : "Tie"
                  }
                };

                const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(reportData, null, 2)
                )}`;
                const downloadAnchor = document.createElement("a");
                downloadAnchor.setAttribute("href", jsonString);
                downloadAnchor.setAttribute("download", `aether_comparison_${modelA.id}_vs_${modelB.id}.json`);
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
              };

              // Setup radar chart dimensions and points
              const dimensions = [
                { key: "codingScore", label: "Coding" },
                { key: "reasoningScore", label: "Reasoning" },
                { key: "accuracyScore", label: "Accuracy" },
                { key: "speedScore", label: "Speed" },
                { key: "writingScore", label: "Writing" }
              ];

              const cx = 150;
              const cy = 130;
              const rMax = 100;
              const angles = dimensions.map((_, i) => (i * 2 * Math.PI) / 5 - Math.PI / 2);

              const getPoints = (model: any) => {
                return dimensions.map((dim, i) => {
                  const score = model[dim.key] || 0;
                  const r = (score / 100) * rMax;
                  const x = cx + r * Math.cos(angles[i]);
                  const y = cy + r * Math.sin(angles[i]);
                  return { x, y };
                });
              };

              const pointsA = modelA ? getPoints(modelA) : [];
              const pointsB = modelB ? getPoints(modelB) : [];

              const pathA = pointsA.map(p => `${p.x},${p.y}`).join(" ");
              const pathB = pointsB.map(p => `${p.x},${p.y}`).join(" ");

              return (
                  <div id="comparison-view-module" className="space-y-8">
                    {/* Print-Only Header with Logo */}
                    <div className="print-only-header">
                      <div className="logo-icon">AI</div>
                      <div>
                        <h1 className="font-sans font-extrabold text-2xl text-blue-600">AIIndex Official Intelligence Report</h1>
                        <p className="text-[10px] text-gray-400 font-medium">
                          Empirical Benchmarking & Architectural Analysis • {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Comparative Metadata (Visible on Print) */}
                    <div className="print-only-header border-none p-0 m-0 -mt-4">
                      <div className="grid grid-cols-2 gap-8 w-full py-6 bg-gray-50/50 rounded-2xl border border-gray-100 px-6">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Subject A</p>
                          <p className="text-xl font-black text-gray-900">{modelA?.name}</p>
                          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{modelA?.companyName}</p>
                        </div>
                        <div className="border-l border-gray-200 pl-8">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Subject B</p>
                          <p className="text-xl font-black text-gray-900">{modelB?.name}</p>
                          <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{modelB?.companyName}</p>
                        </div>
                      </div>
                    </div>

                  <div className="no-print">
                    <h2 className="font-sans font-bold text-2xl text-gray-900 tracking-tight">Side-by-Side Model Compare</h2>
                    <p className="text-sm text-gray-500">
                      Directly compare parameters, scoring margins, pricing rates, and get an automated expert analysis.
                    </p>
                  </div>

                  {/* Model Selector Dropdowns */}
                  <div id="compare-selectors" className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Model A
                      </label>
                      <select
                        value={compareModelA}
                        onChange={(e) => setCompareModelA(e.target.value)}
                        className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                      >
                        {MODELS.map((model) => (
                          <option key={`opt-a-${model.id}`} value={model.id}>
                            {model.name} ({model.companyName})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Model B
                      </label>
                      <select
                        value={compareModelB}
                        onChange={(e) => setCompareModelB(e.target.value)}
                        className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                      >
                        {MODELS.map((model) => (
                          <option key={`opt-b-${model.id}`} value={model.id}>
                            {model.name} ({model.companyName})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Toolbar with Download & Print Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4.5 border border-gray-150 rounded-2xl shadow-sm no-print">
                    <div>
                      <h3 className="font-sans font-bold text-gray-900 text-sm">Comparison Report</h3>
                      <p className="text-[11px] text-gray-500">Download side-by-side specs, context limits, pricing, and capabilities.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {/* Highlight Differences Toggle Button */}
                      <button
                        onClick={() => setHighlightDifferences(!highlightDifferences)}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          highlightDifferences
                            ? "bg-amber-50 border-amber-300 text-amber-700 shadow-sm"
                            : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                        }`}
                        title="Shade rows where compared models have different specifications"
                      >
                        <SlidersHorizontal className={`w-3.5 h-3.5 ${highlightDifferences ? "text-amber-600 animate-pulse" : "text-gray-400"}`} />
                        <span>Highlight Differences</span>
                        <span className={`w-2 h-2 rounded-full ${highlightDifferences ? "bg-amber-500" : "bg-gray-300"}`} />
                      </button>

                      <button
                        onClick={handleDownloadReport}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Report (.JSON)
                      </button>

                      <button
                        onClick={() => window.print()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        title="Print comparison table & expert analysis report"
                      >
                        <Printer className="w-3.5 h-3.5" /> Print Comparison
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Specs Table comparison */}
                  <div id="compare-specs-grid" className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-wider border-b border-gray-100">
                          {/* Col 1 Header: Technical Metrics with hover tooltip */}
                          <th className="p-4 w-1/4">
                            <div className="flex items-center gap-1.5 group relative">
                              <span>Technical Metrics</span>
                              <div className="relative inline-block">
                                <AlertCircle className="w-3.5 h-3.5 text-gray-400 hover:text-blue-500 cursor-help transition-colors" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-[10px] p-2.5 rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 text-center leading-normal font-medium normal-case">
                                  <div className="font-bold border-b border-gray-800 pb-1 mb-1 text-blue-400">Technical Metrics</div>
                                  {METRIC_DEFINITIONS["Technical Metrics"]}
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                                </div>
                              </div>
                            </div>
                          </th>
                          
                          {/* Col 2 Header: Model A Name & Leader Badge */}
                          <th className="p-4 w-1/4 text-blue-600 font-extrabold bg-blue-50/20">
                            <div className="flex items-center justify-between gap-2">
                              <span>{modelA?.name}</span>
                              {winsA > winsB ? (
                                <span className="bg-emerald-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold shadow-sm flex items-center gap-1 shrink-0">
                                  🏆 Leader ({winsA} wins)
                                </span>
                              ) : winsA === winsB && winsA > 0 ? (
                                <span className="bg-gray-400 text-white text-[9px] px-2 py-0.5 rounded-full font-bold shadow-sm shrink-0">
                                  🤝 Tie ({winsA} wins)
                                </span>
                              ) : (
                                <span className="bg-gray-100 text-gray-500 text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0">
                                  {winsA} wins
                                </span>
                              )}
                            </div>
                          </th>

                          {/* Col 3 Header: Model B Name & Leader Badge */}
                          <th className="p-4 w-1/4 text-indigo-600 font-extrabold">
                            <div className="flex items-center justify-between gap-2">
                              <span>{modelB?.name}</span>
                              {winsB > winsA ? (
                                <span className="bg-emerald-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold shadow-sm flex items-center gap-1 shrink-0">
                                  🏆 Leader ({winsB} wins)
                                </span>
                              ) : winsB === winsA && winsB > 0 ? (
                                <span className="bg-gray-400 text-white text-[9px] px-2 py-0.5 rounded-full font-bold shadow-sm shrink-0">
                                  🤝 Tie ({winsB} wins)
                                </span>
                              ) : (
                                <span className="bg-gray-100 text-gray-500 text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0">
                                  {winsB} wins
                                </span>
                              )}
                            </div>
                          </th>

                          {/* Col 4 Header: Status with hover tooltip */}
                          <th className="p-4 w-1/4">
                            <div className="flex items-center gap-1.5 group relative">
                              <span>Status</span>
                              <div className="relative inline-block">
                                <AlertCircle className="w-3.5 h-3.5 text-gray-400 hover:text-blue-500 cursor-help transition-colors" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-[10px] p-2.5 rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 text-center leading-normal font-medium normal-case">
                                  <div className="font-bold border-b border-gray-800 pb-1 mb-1 text-blue-400">Deployment Status</div>
                                  {METRIC_DEFINITIONS["Status"]}
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                                </div>
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-xs divide-y divide-gray-100">
                        {(() => {
                          // Calculate averages across all models for trend indicator comparisons
                          const totalModels = MODELS.length;
                          const avgContext = MODELS.reduce((sum, m) => sum + (m.contextWindow || 0), 0) / totalModels;
                          const avgPricingInput = MODELS.reduce((sum, m) => sum + (m.pricingInput || 0), 0) / totalModels;
                          const avgPricingOutput = MODELS.reduce((sum, m) => sum + (m.pricingOutput || 0), 0) / totalModels;
                          const avgCoding = MODELS.reduce((sum, m) => sum + (m.codingScore || 0), 0) / totalModels;
                          const avgReasoning = MODELS.reduce((sum, m) => sum + (m.reasoningScore || 0), 0) / totalModels;
                          const avgSpeed = MODELS.reduce((sum, m) => sum + (m.speedScore || 0), 0) / totalModels;

                          return [
                            {
                              label: "Developer / Creator",
                              valA: modelA?.companyName,
                              valB: modelB?.companyName,
                            },
                            {
                              label: "Context Window size",
                              valA: `${modelA?.contextWindow.toLocaleString()} tokens`,
                              valB: `${modelB?.contextWindow.toLocaleString()} tokens`,
                              isMono: true,
                              rawA: modelA?.contextWindow,
                              rawB: modelB?.contextWindow,
                              avg: avgContext,
                            },
                            {
                              label: "API Price (Input per 1M)",
                              valA: `$${modelA?.pricingInput.toFixed(2)}`,
                              valB: `$${modelB?.pricingInput.toFixed(2)}`,
                              isMono: true,
                              rawA: modelA?.pricingInput,
                              rawB: modelB?.pricingInput,
                              avg: avgPricingInput,
                              isPrice: true,
                            },
                            {
                              label: "API Price (Output per 1M)",
                              valA: `$${modelA?.pricingOutput.toFixed(2)}`,
                              valB: `$${modelB?.pricingOutput.toFixed(2)}`,
                              isMono: true,
                              rawA: modelA?.pricingOutput,
                              rawB: modelB?.pricingOutput,
                              avg: avgPricingOutput,
                              isPrice: true,
                            },
                            {
                              label: "Coding proficiency score",
                              valA: `${modelA?.codingScore}/100`,
                              valB: `${modelB?.codingScore}/100`,
                              scoreA: modelA?.codingScore,
                              scoreB: modelB?.codingScore,
                              isScore: true,
                              rawA: modelA?.codingScore,
                              rawB: modelB?.codingScore,
                              avg: avgCoding,
                            },
                            {
                              label: "Logical reasoning score",
                              valA: `${modelA?.reasoningScore}/100`,
                              valB: `${modelB?.reasoningScore}/100`,
                              scoreA: modelA?.reasoningScore,
                              scoreB: modelB?.reasoningScore,
                              isScore: true,
                              rawA: modelA?.reasoningScore,
                              rawB: modelB?.reasoningScore,
                              avg: avgReasoning,
                            },
                            {
                              label: "Response speed score",
                              valA: `${modelA?.speedScore}/100`,
                              valB: `${modelB?.speedScore}/100`,
                              scoreA: modelA?.speedScore,
                              scoreB: modelB?.speedScore,
                              isScore: true,
                              rawA: modelA?.speedScore,
                              rawB: modelB?.speedScore,
                              avg: avgSpeed,
                            },
                            {
                              label: "Best suited use-case",
                              valA: modelA?.bestFor,
                              valB: modelB?.bestFor,
                            },
                          ].map((row, idx) => {
                            const rowWinner = getRowWinner(row.label);
                            const isDifferent = row.valA !== row.valB;
                            const isExpanded = expandedRowLabel === row.label;
                            const isSparklineRow = row.label === "API Price (Input per 1M)" || row.label === "API Price (Output per 1M)" || row.label === "Response speed score";

                            // Render trend indicator function
                            const renderTrendIndicator = (rawVal: number | undefined, avgVal: number | undefined, isPrice: boolean = false) => {
                              if (rawVal === undefined || avgVal === undefined) return null;
                              const diff = rawVal - avgVal;
                              if (Math.abs(diff) < 0.001) return null;
                              const percent = Math.abs((diff / avgVal) * 100).toFixed(0);
                              const isAbove = diff > 0;
                              const isBetter = isPrice ? !isAbove : isAbove;

                              return (
                                <span
                                  className={`inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                                    isBetter
                                      ? "text-emerald-700 bg-emerald-50 border border-emerald-100"
                                      : "text-rose-700 bg-rose-50 border border-rose-100"
                                  }`}
                                  title={`Compared to index average of ${avgVal.toFixed(1)} (${percent}% ${isAbove ? "above" : "below"})`}
                                >
                                  {isAbove ? "↑" : "↓"} {percent}%
                                </span>
                              );
                            };

                            return (
                              <React.Fragment key={`comp-fragment-${idx}`}>
                                <motion.tr
                                  layout="position"
                                  onClick={() => setExpandedRowLabel(isExpanded ? null : row.label)}
                                  animate={{
                                    backgroundColor: isExpanded
                                      ? "rgba(219, 234, 254, 0.35)"
                                      : highlightDifferences && isDifferent
                                      ? "rgba(254, 243, 199, 0.4)"
                                      : "rgba(255, 255, 255, 0)"
                                  }}
                                  whileHover={{
                                    backgroundColor: isExpanded
                                      ? "rgba(219, 234, 254, 0.6)"
                                      : highlightDifferences && isDifferent
                                      ? "rgba(254, 243, 199, 0.7)"
                                      : "rgba(239, 246, 255, 0.9)"
                                  }}
                                  transition={{ duration: 0.15, ease: "easeOut" }}
                                  className="cursor-pointer select-none border-b border-gray-100"
                                >
                                  {/* Col 1: Metric Label with Hover Tooltip & Difference Dot */}
                                  <td className="p-4 font-semibold text-gray-500">
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="flex items-center gap-2">
                                        {highlightDifferences && isDifferent && (
                                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" title="Values differ" />
                                        )}
                                        <div className="relative flex items-center gap-1.5 group" onClick={(e) => e.stopPropagation()}>
                                          <span className="text-gray-800 font-bold">{row.label}</span>
                                          <div className="relative inline-block">
                                            <AlertCircle className="w-3.5 h-3.5 text-gray-400 hover:text-blue-500 cursor-help transition-colors" />
                                            {/* Floating Tooltip Card */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-[10px] p-2.5 rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 text-center leading-normal font-medium normal-case">
                                              <div className="font-bold border-b border-gray-800 pb-1 mb-1 text-blue-400">{row.label}</div>
                                              {METRIC_DEFINITIONS[row.label] || "Technical parameter comparison."}
                                              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Copy & Expand Buttons */}
                                      <div className="flex items-center gap-1.5 no-print">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const def = METRIC_DEFINITIONS[row.label] || "Technical specification comparison.";
                                            const text = `Metric: ${row.label}\nDefinition: ${def}\n${modelA?.name || 'Model A'}: ${row.valA}\n${modelB?.name || 'Model B'}: ${row.valB}`;
                                            navigator.clipboard.writeText(text);
                                            setCopiedRowLabel(row.label);
                                            setTimeout(() => setCopiedRowLabel(null), 1500);
                                          }}
                                          className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all shrink-0 cursor-pointer"
                                          title="Copy metric and values to clipboard"
                                        >
                                          {copiedRowLabel === row.label ? (
                                            <Check className="w-3 h-3 text-emerald-600 animate-fade-in" />
                                          ) : (
                                            <Copy className="w-3 h-3" />
                                          )}
                                        </button>

                                        <span className="text-gray-300">|</span>

                                        <div className="p-1 text-gray-400 hover:text-blue-600">
                                          {isExpanded ? (
                                            <ChevronUp className="w-3.5 h-3.5" />
                                          ) : (
                                            <ChevronDown className="w-3.5 h-3.5" />
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </td>

                                  {/* Col 2: Model A Value */}
                                  <td className={`p-4 font-medium text-gray-900 bg-blue-50/5 ${row.isMono ? "font-mono" : ""}`}>
                                    <div className="flex flex-col gap-1.5">
                                      <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2 group/val relative">
                                          <span>{row.valA}</span>
                                          {"rawA" in row && renderTrendIndicator((row as any).rawA, (row as any).avg, (row as any).isPrice)}
                                          
                                          {/* Benchmark Score Tooltip */}
                                          {row.isScore && (
                                            <div className="absolute bottom-full left-0 mb-2 w-32 bg-gray-900 text-white text-[9px] p-2 rounded-lg shadow-xl opacity-0 pointer-events-none group-hover/val:opacity-100 transition-all duration-200 z-50 text-center leading-normal font-medium border border-gray-800">
                                              Score: {row.scoreA}/100 based on academic benchmarks.
                                              <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-900" />
                                            </div>
                                          )}
                                        </div>
                                        {rowWinner === "A" && (
                                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm shrink-0">
                                            <Sparkles className="w-2.5 h-2.5 text-emerald-600" /> Best
                                          </span>
                                        )}
                                      </div>
                                      {row.isScore && (row as any).scoreA !== undefined && (
                                        <div className="w-full max-w-[150px] bg-gray-150 h-1.5 rounded-full overflow-hidden">
                                          <div
                                            className="bg-blue-600 h-full rounded-full"
                                            style={{ width: `${(row as any).scoreA}%` }}
                                          />
                                        </div>
                                      )}
                                      {isSparklineRow && (row as any).rawA !== undefined && (
                                        <div className="flex items-center gap-1.5 mt-0.5" onClick={(e) => e.stopPropagation()}>
                                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider shrink-0">7d Trend:</span>
                                          <Sparkline values={getSparklineData(modelA?.id || "", row.label, (row as any).rawA)} color={row.label.includes("speed") ? "#10B981" : "#2563EB"} />
                                        </div>
                                      )}
                                    </div>
                                  </td>

                                  {/* Col 3: Model B Value */}
                                  <td className={`p-4 font-medium text-gray-900 ${row.isMono ? "font-mono" : ""}`}>
                                    <div className="flex flex-col gap-1.5">
                                      <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2 group/val relative">
                                          <span>{row.valB}</span>
                                          {"rawB" in row && renderTrendIndicator((row as any).rawB, (row as any).avg, (row as any).isPrice)}
                                          
                                          {/* Benchmark Score Tooltip */}
                                          {row.isScore && (
                                            <div className="absolute bottom-full left-0 mb-2 w-32 bg-gray-900 text-white text-[9px] p-2 rounded-lg shadow-xl opacity-0 pointer-events-none group-hover/val:opacity-100 transition-all duration-200 z-50 text-center leading-normal font-medium border border-gray-800">
                                              Score: {row.scoreB}/100 based on academic benchmarks.
                                              <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-900" />
                                            </div>
                                          )}
                                        </div>
                                        {rowWinner === "B" && (
                                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm shrink-0">
                                            <Sparkles className="w-2.5 h-2.5 text-emerald-600" /> Best
                                          </span>
                                        )}
                                      </div>
                                      {row.isScore && (row as any).scoreB !== undefined && (
                                        <div className="w-full max-w-[150px] bg-gray-150 h-1.5 rounded-full overflow-hidden">
                                          <div
                                            className="bg-indigo-600 h-full rounded-full"
                                            style={{ width: `${(row as any).scoreB}%` }}
                                          />
                                        </div>
                                      )}
                                      {isSparklineRow && (row as any).rawB !== undefined && (
                                        <div className="flex items-center gap-1.5 mt-0.5" onClick={(e) => e.stopPropagation()}>
                                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider shrink-0">7d Trend:</span>
                                          <Sparkline values={getSparklineData(modelB?.id || "", row.label, (row as any).rawB)} color={row.label.includes("speed") ? "#10B981" : "#4F46E5"} />
                                        </div>
                                      )}
                                    </div>
                                  </td>

                                  {/* Col 4: Status badges */}
                                  <td className="p-4 font-medium text-gray-900" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex flex-col gap-1.5">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[8px] font-mono font-extrabold text-gray-400 bg-gray-100 px-1 py-0.5 rounded tracking-wide shrink-0">{modelA?.name.substring(0, 6)}</span>
                                        {renderStatusBadge(getModelStatus(modelA?.id))}
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[8px] font-mono font-extrabold text-gray-400 bg-gray-100 px-1 py-0.5 rounded tracking-wide shrink-0">{modelB?.name.substring(0, 6)}</span>
                                        {renderStatusBadge(getModelStatus(modelB?.id))}
                                      </div>
                                    </div>
                                  </td>
                                </motion.tr>

                                {/* Animated Expanded Methodology & Sources Row */}
                                <AnimatePresence initial={false}>
                                  {isExpanded && (
                                    <tr className="bg-blue-50/20 border-l-4 border-l-blue-600 border-b border-gray-100">
                                      <td colSpan={4} className="p-0" onClick={(e) => e.stopPropagation()}>
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.35, ease: "easeInOut" }}
                                          className="overflow-hidden"
                                        >
                                          <div className="p-5 space-y-4 max-w-3xl pl-8">
                                            {/* Methodology Section */}
                                            <div className="space-y-1.5">
                                              <h4 className="font-sans font-bold text-gray-900 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                                                Methodology & Evaluation Protocol
                                              </h4>
                                              <p className="text-gray-500 leading-relaxed font-sans pl-3 text-[11px]">
                                                {METRIC_DETAILS[row.label]?.methodology || "Evaluated through dynamic testing, industry benchmarks, and official pricing indexes under active developer supervision."}
                                              </p>
                                            </div>

                                            {/* Source Documentation Section */}
                                            <div className="space-y-2 no-print">
                                              <h4 className="font-sans font-bold text-gray-900 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                                                Source Documentation Links
                                              </h4>
                                              <div className="flex flex-wrap gap-2.5 pl-3">
                                                {(METRIC_DETAILS[row.label]?.sources || [
                                                  { name: "Official Documentation", url: "https://ai.studio/build" }
                                                ]).map((src, sIdx) => (
                                                  <a
                                                    key={`src-${sIdx}`}
                                                    href={src.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold transition-colors bg-white border border-gray-150 px-2.5 py-1 rounded shadow-sm hover:shadow text-[11px]"
                                                  >
                                                    <span>{src.name}</span>
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                  </a>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        </motion.div>
                                      </td>
                                    </tr>
                                  )}
                                </AnimatePresence>
                              </React.Fragment>
                            );
                          });
                        })()}

                        {/* Visual Radar capability chart row */}
                        <tr className="bg-gray-50/30">
                          <td className="p-5 font-semibold text-gray-600 valign-middle">
                            <div className="space-y-1">
                              <p className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                                <TrendingUp className="w-4 h-4 text-blue-600" /> Capability Profile Overlap
                              </p>
                              <p className="text-[10px] text-gray-400 font-medium leading-normal max-w-[180px]">
                                SVG-based radar projection mapping out Coding, Reasoning, Accuracy, Latency and Writing scores simultaneously.
                              </p>
                              <div className="flex flex-col gap-1.5 pt-4 text-[10px]">
                                <div className="flex items-center gap-1.5 font-bold">
                                  <span className="w-3 h-3 bg-blue-600 rounded-sm border border-blue-400" />
                                  <span className="text-gray-700">{modelA?.name}</span>
                                </div>
                                <div className="flex items-center gap-1.5 font-bold">
                                  <span className="w-3 h-3 bg-indigo-600 rounded-sm border border-indigo-400" />
                                  <span className="text-gray-700">{modelB?.name}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td colSpan={3} className="p-6">
                            <div className="flex justify-center items-center">
                              <svg width="340" height="260" className="overflow-visible select-none">
                                {/* Grid Pentagons */}
                                {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, levelIdx) => {
                                  const pointsStr = angles.map(angle => {
                                    const r = level * rMax;
                                    const x = cx + r * Math.cos(angle);
                                    const y = cy + r * Math.sin(angle);
                                    return `${x},${y}`;
                                  }).join(" ");
                                  return (
                                    <polygon
                                      key={`radar-grid-${levelIdx}`}
                                      points={pointsStr}
                                      fill="none"
                                      stroke="#E2E8F0"
                                      strokeWidth={1}
                                      strokeDasharray={levelIdx < 4 ? "2,2" : "none"}
                                    />
                                  );
                                })}

                                {/* Axis lines */}
                                {angles.map((angle, i) => {
                                  const x = cx + rMax * Math.cos(angle);
                                  const y = cy + rMax * Math.sin(angle);
                                  return (
                                    <line
                                      key={`radar-axis-${i}`}
                                      x1={cx}
                                      y1={cy}
                                      x2={x}
                                      y2={y}
                                      stroke="#E2E8F0"
                                      strokeWidth={1}
                                    />
                                  );
                                })}

                                {/* Labels */}
                                {dimensions.map((dim, i) => {
                                  const labelDist = rMax + 16;
                                  const x = cx + labelDist * Math.cos(angles[i]);
                                  const y = cy + labelDist * Math.sin(angles[i]);
                                  
                                  let textAnchor: "start" | "middle" | "end" | "inherit" = "middle";
                                  if (Math.cos(angles[i]) > 0.1) textAnchor = "start";
                                  else if (Math.cos(angles[i]) < -0.1) textAnchor = "end";

                                  return (
                                    <text
                                      key={`radar-label-${i}`}
                                      x={x}
                                      y={y + 3}
                                      textAnchor={textAnchor}
                                      className="text-[10px] font-extrabold text-gray-500 font-sans tracking-tight fill-current"
                                    >
                                      {dim.label}
                                    </text>
                                  );
                                })}

                                {/* Model A Filled Area */}
                                {modelA && pathA && (
                                  <polygon
                                    points={pathA}
                                    fill="rgba(59, 130, 246, 0.2)"
                                    stroke="#3B82F6"
                                    strokeWidth={2}
                                    className="transition-all duration-300"
                                  />
                                )}

                                {/* Model B Filled Area */}
                                {modelB && pathB && (
                                  <polygon
                                    points={pathB}
                                    fill="rgba(99, 102, 241, 0.2)"
                                    stroke="#6366F1"
                                    strokeWidth={2}
                                    className="transition-all duration-300"
                                  />
                                )}

                                {/* Model A Circle Points */}
                                {pointsA.map((p, i) => (
                                  <circle
                                    key={`radar-pt-a-${i}`}
                                    cx={p.x}
                                    cy={p.y}
                                    r={4}
                                    fill="#3B82F6"
                                    stroke="#FFF"
                                    strokeWidth={1.5}
                                  />
                                ))}

                                {/* Model B Circle Points */}
                                {pointsB.map((p, i) => (
                                  <circle
                                    key={`radar-pt-b-${i}`}
                                    cx={p.x}
                                    cy={p.y}
                                    r={4}
                                    fill="#6366F1"
                                    stroke="#FFF"
                                    strokeWidth={1.5}
                                  />
                                ))}
                              </svg>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* INTERACTIVE GEMINI ANALYST PORTAL */}
                  <div id="gemini-analyst-panel" className="bg-gray-50 border border-blue-100 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-600 text-white rounded-xl shadow-md">
                        <Sparkles className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <h3 className="font-sans font-extrabold text-base sm:text-lg text-gray-900 tracking-tight">
                          AIIndex Analyst (Powered by Groq)
                        </h3>
                        <p className="text-xs text-gray-500">
                          Query our automated agent with customized topics or run standard evaluations.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <textarea
                        placeholder="Optional: Ask a specific question (e.g., 'Which is safer for healthcare apps?' or 'Compare their multi-file code capability in depth.')"
                        value={compareQuery}
                        onChange={(e) => setCompareQuery(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        rows={3}
                      />

                      <button
                        onClick={handleGroqCompare}
                        disabled={groqLoading}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3.5 rounded-xl cursor-pointer disabled:bg-gray-300 transition-colors shadow-md shadow-blue-100 flex items-center justify-center gap-2"
                      >
                        {groqLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Consulting Expert Database...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                            Generate Expert Deep-Dive Report
                          </>
                        )}
                      </button>
                    </div>

                    {/* Groq Response Panel */}
                    <AnimatePresence>
                      {(groqAnalysis || groqLoading || groqError) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm mt-4 space-y-4"
                        >
                          {groqLoading ? (
                            <div className="space-y-3 animate-pulse">
                              <div className="h-4 bg-gray-200 rounded w-1/4" />
                              <div className="h-3 bg-gray-100 rounded w-full" />
                              <div className="h-3 bg-gray-100 rounded w-5/6" />
                              <div className="h-3 bg-gray-100 rounded w-full" />
                            </div>
                          ) : groqError ? (
                            <div className="text-red-500 text-xs flex items-center gap-2">
                              <AlertCircle className="w-5 h-5 shrink-0" />
                              <span>{groqError}</span>
                            </div>
                          ) : (
                            <div id="groq-markdown-output" className="prose prose-sm max-w-none text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                              {groqAnalysis}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Print-Only Footer Disclaimer */}
                  <div className="print-only-footer">
                    <p className="font-sans font-bold text-[10px] text-gray-900 uppercase tracking-[0.1em] mb-2">Official AIIndex Assessment Disclaimer</p>
                    <div className="print-disclaimer">
                      This report is generated for informational and research purposes only. AI benchmark scores and pricing are subject to rapid change. 
                      AIIndex does not guarantee absolute accuracy or real-world performance parity for every use-case. 
                      Decisions based on this report should be verified against the official documentation of the respective model providers.
                      &copy; {new Date().getFullYear()} AIIndex Research Group. All rights reserved.
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* 5. BENCHMARKS TAB */}
            {activeTab === "benchmarks" && (
              <div id="benchmarks-tab-view" className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="font-sans font-bold text-2xl text-gray-900 tracking-tight">AIIndex Deep Benchmarks</h2>
                  <p className="text-sm text-gray-500 font-medium">
                    Compare actual Time to First Token metrics, instruction follow rates, and mathematical logical arrays dynamically on our benchmark directories.
                  </p>
                </div>

                <React.Suspense fallback={
                  <div className="bg-white border border-gray-100 rounded-3xl p-8 h-80 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-mono text-gray-400 font-medium">Bootstrapping benchmark visual arrays...</span>
                  </div>
                }>
                  <BenchmarkChart />
                </React.Suspense>
              </div>
            )}

            {/* 6. CALCULATOR TAB */}
            {activeTab === "calculator" && (
              <div id="calculator-tab-view" className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="font-sans font-bold text-2xl text-gray-900 tracking-tight">AI Token Cost Estimator</h2>
                  <p className="text-sm text-gray-500">
                    Model API valuations based on your custom prompt lengths and server execution scaling.
                  </p>
                </div>

                <React.Suspense fallback={
                  <div className="bg-white border border-gray-100 rounded-3xl p-8 h-80 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-mono text-gray-400 font-medium">Calibrating economic sliding systems...</span>
                  </div>
                }>
                  <CostCalculator />
                </React.Suspense>
              </div>
            )}

            {/* 7. PROMPTS TAB */}
            {activeTab === "prompts" && (
              <div id="prompts-tab-view" className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="font-sans font-bold text-2xl text-gray-900 tracking-tight">Curated Prompt Library</h2>
                  <p className="text-sm text-gray-500">
                    Copy pre-engineered battle-tested templates styled to extract rich, logically coherent outputs.
                  </p>
                </div>

                <React.Suspense fallback={
                  <div className="bg-white border border-gray-100 rounded-3xl p-8 h-80 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-mono text-gray-400 font-medium">Assembling prompt context templates...</span>
                  </div>
                }>
                  <PromptLibrary />
                </React.Suspense>
              </div>
            )}

            {/* 8. NEWS / GUIDES TAB */}
            {activeTab === "news" && (
              <div id="news-tab-view" className="space-y-12 animate-fade-in">
                
                {/* Guides Section */}
                <section className="space-y-6">
                  <div>
                    <h2 className="font-sans font-bold text-2xl text-gray-900 tracking-tight">Expert Guides & Tutorials</h2>
                    <p className="text-sm text-gray-500">
                      Deep dives on prompt engineering, API bindings, and developer workflows.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {GUIDES.map((guide) => (
                      <div
                        key={guide.id}
                        onClick={() => setSelectedGuide(guide)}
                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <span className="bg-blue-50 text-blue-600 font-bold text-[10px] px-2.5 py-1 rounded">
                            {guide.category}
                          </span>
                          <h3 className="font-sans font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors">
                            {guide.title}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                            {guide.summary}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                          <span>By {guide.author}</span>
                          <span>{guide.readTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* News Feed Section */}
                <section className="space-y-6">
                  <div>
                    <h2 className="font-sans font-bold text-2xl text-gray-900 tracking-tight">Technical AI News Feed</h2>
                    <p className="text-sm text-gray-500">
                      Weekly briefing on foundation model changes, industry mergers, and supercomputing updates.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {NEWS.map((news) => (
                      <div
                        key={news.id}
                        onClick={() => setSelectedNews(news)}
                        className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all"
                      >
                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 mb-2.5">
                          <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase">
                            {news.category}
                          </span>
                          <span>{news.date}</span>
                        </div>
                        <h3 className="font-sans font-extrabold text-gray-900 text-base mb-2 hover:text-blue-600 transition-colors">
                          {news.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {news.summary}
                        </p>
                        <span className="text-xs text-blue-600 font-semibold inline-flex items-center gap-0.5 mt-4 hover:underline">
                          Read full dispatch <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* 9. ABOUT TAB */}
            {/* LEGAL & POLICY PAGES */}
            {["privacy", "terms", "cookies", "disclaimer", "editorial", "aipolicy", "affiliate", "accessibility"].includes(activeTab) && (
              <LegalPage 
                {...(LEGAL_PAGES as any)[activeTab]} 
                onBack={() => handleTabChange("home")}
              />
            )}

            {activeTab === "careers" && <CareersPage />}

            {activeTab === "404" && <NotFoundPage onBackHome={() => handleTabChange("home")} />}

            {activeTab === "about" && (
              <div id="about-tab-view" className="space-y-12 animate-fade-in max-w-4xl mx-auto">
                <div className="text-center space-y-4">
                  <span className="bg-blue-50 text-blue-600 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    Our Mission
                  </span>
                  <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
                    Democratizing Frontier Intelligence
                  </h2>
                  <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    AIIndex is an independent, non-vendor-affiliated research syndicate cataloging actual execution latencies, token economics, and multi-variable logic benchmarks.
                  </p>
                </div>

                {/* Grid of Core Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Empirical Auditing", desc: "No vendor claims or optimized marketing stats. We benchmark real-world production APIs under heavy server loads.", icon: ShieldCheck },
                    { title: "Cost Transparency", desc: "API bills shouldn't be a mystery. We calculate real pricing down to 1M tokens across mixed context patterns.", icon: DollarSign },
                    { title: "Global Latency Tracking", desc: "Testing from Edge nodes in the US, UK, Canada, and Australia to verify real round-trip connectivity benchmarks.", icon: Globe },
                  ].map((val, idx) => (
                    <div key={`val-${idx}`} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <val.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-sans font-bold text-gray-900 text-base">{val.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{val.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Team & Laboratories segment */}
                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-sans font-bold text-gray-900 text-xl">The AIIndex Consortium</h3>
                    <p className="text-xs text-gray-500 max-w-xl">
                      Formed in late 2024 by a cohort of compiler engineers, distributed systems developers, and mathematical evaluators committed to safe open systems.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    {[
                      { name: "Dr. Clara Mercer", role: "Chief of Evaluations", dept: "Formerly at DeepMind" },
                      { name: "Marcus Chen", role: "Lead Systems Architect", dept: "Distributed Compute Lab" },
                      { name: "Siddharth Nair", role: "Principal Benchmarker", dept: "MMLU Advisory Panel" },
                      { name: "Elena Rostova", role: "Developer Relations Director", dept: "Open-source Advocate" }
                    ].map((member, mIdx) => (
                      <div key={`member-${mIdx}`} className="p-4 bg-gray-50 rounded-xl text-center space-y-1">
                        <p className="font-bold text-gray-800 text-sm">{member.name}</p>
                        <p className="text-[11px] text-blue-600 font-medium">{member.role}</p>
                        <p className="text-[10px] text-gray-400">{member.dept}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CATCH-ALL 404 FOR UNKNOWN TABS */}
            {!["home", "models", "companies", "compare", "benchmarks", "calculator", "prompts", "news", "about", "contact", "docs", "blogs", "careers", "privacy", "terms", "cookies", "disclaimer", "editorial", "aipolicy", "affiliate", "accessibility", "404"].includes(activeTab) && (
              <NotFoundPage onBackHome={() => handleTabChange("home")} />
            )}

            {/* 10. CONTACT TAB */}
            {activeTab === "contact" && (
              <div id="contact-tab-view" className="space-y-8 animate-fade-in max-w-2xl mx-auto">
                <div className="text-center space-y-2">
                  <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">Contact AIIndex Research Desk</h2>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    Have model specs to correct, a custom API to bench, or want to integrate our global benchmark streams? Drop us a line.
                  </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-md">
                  {contactSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-4"
                    >
                      <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Check className="w-8 h-8" />
                      </div>
                      <h3 className="font-sans font-bold text-lg text-gray-900">Message Received!</h3>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                        Thank you, <span className="font-semibold text-gray-700">{contactName}</span>. Your ticket reference has been logged. Our mathematical evaluations desk will contact you at <span className="font-semibold text-gray-700">{contactEmail}</span> shortly.
                      </p>
                      <button
                        onClick={() => {
                          setContactSuccess(false);
                          setContactName("");
                          setContactEmail("");
                          setContactMessage("");
                        }}
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (contactName && contactEmail && contactMessage) {
                          setContactSuccess(true);
                        }
                      }} 
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alexis Vance"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="alexis@laboratory.ai"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Inquiry Subject</label>
                        <select
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Model Indexing">Request Custom Model Indexing</option>
                          <option value="Enterprise Audit">Enterprise System Latency Audit</option>
                          <option value="Partnership">Academic/Research Collaboration</option>
                          <option value="General">General Feedback & Support</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Inquiry Details</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Please supply model link, framework specs, or API keys..."
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl p-4 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Mail className="w-4 h-4" />
                        Submit Request to Desk
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* 11. DOCS TAB */}
            {activeTab === "docs" && (
              <div id="docs-tab-view" className="space-y-8 animate-fade-in max-w-5xl mx-auto">
                <div className="border-b border-gray-200 pb-5">
                  <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">Technical API Reference</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Integrate live AI latency streams, token pricing structures, and evaluation matrices into your own dashboards.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Table of Contents */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-1">
                      <p className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Getting Started</p>
                      <button className="w-full text-left px-3 py-2 text-xs font-bold text-blue-600 bg-blue-50 rounded-lg">Introduction</button>
                      <button className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-50">Authentication</button>
                      <button className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-50">Rate Limits</button>

                      <p className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest px-2 mt-4 mb-2">REST Endpoints</p>
                      <button className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-50 flex items-center gap-1.5">
                        <span className="text-[9px] font-bold bg-green-500 text-white px-1 rounded uppercase">GET</span>
                        <span>/v1/models</span>
                      </button>
                      <button className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-50 flex items-center gap-1.5">
                        <span className="text-[9px] font-bold bg-green-500 text-white px-1 rounded uppercase">GET</span>
                        <span>/v1/benchmarks</span>
                      </button>
                      <button className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-50 flex items-center gap-1.5">
                        <span className="text-[9px] font-bold bg-blue-500 text-white px-1 rounded uppercase">POST</span>
                        <span>/v1/calculator</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="lg:col-span-9 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
                      <h3 className="font-sans font-bold text-gray-900 text-lg">AIIndex JSON API Endpoint</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        We host a zero-config, highly-cached regional REST API that returns the exact pricing per 1M tokens, evaluated context windows, and academic benchmarks for all indexed frontier models. No authentication is required for public non-commercial development.
                      </p>

                      <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed space-y-3 shadow-inner">
                        <p className="text-gray-400">// Fetch current LLM directory with costs and scores</p>
                        <p><span className="text-pink-400">curl</span> <span className="text-green-300 font-bold">"https://api.aiindex.ai/v1/models"</span> \</p>
                        <p>  -H <span className="text-green-300 font-bold">"Accept: application/json"</span> \</p>
                        <p>  -H <span className="text-green-300 font-bold">"X-AIIndex-Region: AU"</span></p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Example Response (200 OK)</h4>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-[10px] leading-relaxed max-h-60 overflow-y-auto">
                          <pre>{JSON.stringify({
  status: "success",
  count: 12,
  region: "AU",
  models: [
    {
      id: "claude-3-5-sonnet",
      name: "Claude 3.5 Sonnet",
      developer: "Anthropic",
      inputCostPerMillion: 3.00,
      outputCostPerMillion: 15.00,
      benchmarks: {
        mmlu: 88.7,
        humanEval: 92.0,
        gpqa: 59.4
      }
    }
  ]
}, null, 2)}</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 12. BLOGS TAB */}
            {activeTab === "blogs" && (
              <div id="blogs-tab-view" className="space-y-8 animate-fade-in max-w-5xl mx-auto">
                <div className="space-y-2 border-b border-gray-100 pb-6">
                  <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">The AIIndex Dispatch</h2>
                  <p className="text-sm text-gray-500">
                    Analytical deep-dives, benchmark reviews, and structural breakdowns of foundation models.
                  </p>
                </div>

                {selectedBlogPost ? (
                  <ComparisonArticle
                    post={selectedBlogPost}
                    onBack={() => setSelectedBlogPost(null)}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {BLOG_POSTS.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => setSelectedBlogPost(post)}
                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <span className="bg-blue-50 text-blue-600 font-bold text-[10px] px-2.5 py-1 rounded uppercase tracking-wider">
                            {post.category}
                          </span>
                          <h3 className="font-sans font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                            {post.summary}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                          <span>By {post.author}</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* FLOATING DIALOGS / SLIDE OUTS (Modals) */}
      
      {/* 1. News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            id="news-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              id="news-modal"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-6 right-6 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase">
                  <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded">{selectedNews.category}</span>
                  <span>{selectedNews.date}</span>
                </div>

                <h3 className="font-sans font-extrabold text-2xl text-gray-900 tracking-tight leading-tight">
                  {selectedNews.title}
                </h3>

                <p className="text-xs text-gray-400 italic">Source: {selectedNews.source} • {selectedNews.readTime}</p>

                <hr className="border-gray-100" />

                <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-sans space-y-3">
                  {selectedNews.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Guide Detail Modal */}
      <AnimatePresence>
        {selectedGuide && (
          <motion.div
            id="guide-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              id="guide-modal"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedGuide(null)}
                className="absolute top-6 right-6 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-5">
                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase">
                  <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded">{selectedGuide.category}</span>
                  <span>{selectedGuide.date}</span>
                </div>

                <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-gray-900 tracking-tight leading-tight">
                  {selectedGuide.title}
                </h3>

                <p className="text-xs text-gray-400 italic">By {selectedGuide.author} • {selectedGuide.readTime}</p>

                <hr className="border-gray-100" />

                <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-sans space-y-4">
                  {selectedGuide.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Submit Tool Modal */}
      <AnimatePresence>
        {submitToolModalOpen && (
          <motion.div
            id="submit-tool-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              id="submit-tool-modal"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => {
                  setSubmitToolModalOpen(false);
                  setToolSubmitSuccess(false);
                }}
                className="absolute top-6 right-6 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!toolSubmitSuccess ? (
                <div className="space-y-6">
                  <div>
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-sans font-extrabold text-xl text-gray-900 tracking-tight">
                      Submit Your AI Innovation
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Our content review board will analyze your model or tool for speed, pricing, and context limits.
                    </p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (toolName && toolUrl) {
                        setToolSubmitSuccess(true);
                        setToolName("");
                        setToolUrl("");
                        setToolDescription("");
                      }
                    }} 
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Tool or Model Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={toolName}
                        onChange={(e) => setToolName(e.target.value)}
                        placeholder="e.g. DeepSeek-Coder-V3"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                          Classification Category
                        </label>
                        <select
                          value={toolCategory}
                          onChange={(e) => setToolCategory(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        >
                          <option>Reasoning LLM</option>
                          <option>Image Synthesis</option>
                          <option>Voice & TTS Agent</option>
                          <option>Developer Productivity</option>
                          <option>Autonomous Agent</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                          Pricing Model
                        </label>
                        <select
                          value={toolPricing}
                          onChange={(e) => setToolPricing(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        >
                          <option>Freemium</option>
                          <option>100% Free</option>
                          <option>Paid Subscription</option>
                          <option>Commercial API Pricing</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Production or Website URL *
                      </label>
                      <input
                        type="url"
                        required
                        value={toolUrl}
                        onChange={(e) => setToolUrl(e.target.value)}
                        placeholder="https://your-ai-domain.com"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Value Proposition & Pitch
                      </label>
                      <textarea
                        rows={3}
                        value={toolDescription}
                        onChange={(e) => setToolDescription(e.target.value)}
                        placeholder="Describe context window limits, speed (T/s), architecture, and what separates this tool..."
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-700 transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" /> Register Submission
                    </button>
                  </form>
                </div>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-sans font-extrabold text-lg text-gray-900">Application successfully queued!</h4>
                    <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto leading-relaxed">
                      Your repository and rate limit sheets have been entered into the active index pipeline. Review timeline completes in 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitToolModalOpen(false);
                      setToolSubmitSuccess(false);
                    }}
                    className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Close Dialog
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. API Docs Modal */}
      <AnimatePresence>
        {apiDocsModalOpen && (
          <motion.div
            id="api-docs-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              id="api-docs-modal"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gray-900 text-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative border border-gray-800"
            >
              <button
                onClick={() => setApiDocsModalOpen(false)}
                className="absolute top-6 right-6 p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-900">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-extrabold text-lg text-white tracking-tight">
                      AIIndex REST APIs
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Query context windows, live model pricing, and evaluation parameters programmatically
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-950 rounded-2xl border border-gray-800 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-green-500/15 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono">
                        GET
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">
                        https://api.aiindex.io/v1/models
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Retrieves full structural list of curated AI systems, featuring input/output pricing arrays and context limit thresholds.
                    </p>
                    <div className="bg-black/50 p-2.5 rounded-lg border border-gray-900/60 font-mono text-[10px] text-blue-400 overflow-x-auto whitespace-pre">
                      curl -H "Authorization: Bearer YOUR_API_KEY" https://api.aiindex.ai/v1/models
                    </div>
                  </div>

                  <div className="bg-gray-950 rounded-2xl border border-gray-800 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-green-500/15 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono">
                        GET
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">
                        https://api.aiindex.ai/v1/benchmarks
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Access live MMLU, GPQA, HumanEval coding scores and MATH evaluation tables compiled by regional cloud runners.
                    </p>
                    <div className="bg-black/50 p-2.5 rounded-lg border border-gray-900/60 font-mono text-[10px] text-blue-400 overflow-x-auto whitespace-pre">
                      curl -H "Authorization: Bearer YOUR_API_KEY" https://api.aiindex.ai/v1/benchmarks
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <p className="text-[10px] text-gray-500 font-medium">
                    Rate limits apply: 5,000 queries per minute per account credentials.
                  </p>
                  <button
                    onClick={() => setApiDocsModalOpen(false)}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Done Reading
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Status Monitor Modal */}
      <AnimatePresence>
        {statusModalOpen && (
          <motion.div
            id="status-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              id="status-modal"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl relative border border-gray-100"
            >
              <button
                onClick={() => setStatusModalOpen(false)}
                className="absolute top-6 right-6 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-green-500 mb-1">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="font-sans font-extrabold text-sm tracking-tight text-gray-900">
                      All Systems Operational
                    </span>
                  </div>
                  <h3 className="font-sans font-extrabold text-lg text-gray-900 mt-2">
                    Global Regional Performance
                  </h3>
                  <p className="text-xs text-gray-400">
                    Real-time network benchmarks of AIIndex analytics nodes.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { region: "US East (N. Virginia)", ping: "22ms", uptime: "99.99%", load: "14%" },
                    { region: "Europe West (London)", ping: "89ms", uptime: "99.98%", load: "28%" },
                    { region: "Canada Central (Toronto)", ping: "44ms", uptime: "100.00%", load: "8%" },
                    { region: "Australia Southeast (Sydney)", ping: "144ms", uptime: "99.96%", load: "19%" },
                  ].map((node, nodeIdx) => (
                    <div key={`status-node-${nodeIdx}`} className="bg-gray-50 border border-gray-150 p-4.5 rounded-2xl flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-gray-800">
                          {node.region}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          Uptime: <span className="text-green-600 font-semibold">{node.uptime}</span> • Server load: {node.load}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-blue-50 text-blue-600 text-[10px] font-mono font-bold px-2 py-1 rounded">
                          {node.ping}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-medium">
                    Last updated: Just now
                  </span>
                  <button
                    onClick={() => setStatusModalOpen(false)}
                    className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Close status
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOBAL FOOTER */}
      <footer id="ai-index-footer" className="bg-white border-t border-gray-100 pt-20 pb-12 px-6 lg:px-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
            {/* Brand Column */}
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
                  AI
                </div>
                <span className="font-sans font-extrabold text-xl text-gray-900 tracking-tight">
                  AI<span className="text-blue-600">Index</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                The definitive platform for artificial intelligence research, model comparison, and enterprise benchmarking. We simplify the complex LLM landscape for developers and tech leaders.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 transition-all group"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#0077B5] hover:bg-[#0077B5]/5 transition-all group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#24292F] hover:bg-[#24292F]/5 transition-all group"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#5865F2] hover:bg-[#5865F2]/5 transition-all group"
                  aria-label="Discord"
                >
                  <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 127.14 96.36" fill="currentColor">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.48,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.24-16.14h0C130.46,50.45,121.78,26.79,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Resources */}
            <div className="space-y-6">
              <h4 className="font-bold text-gray-900 text-sm">Company</h4>
              <ul className="space-y-3">
                {[
                  { name: "About Us", tab: "about" },
                  { name: "Careers", tab: "careers" },
                  { name: "Contact", tab: "contact" },
                  { name: "Our Labs", tab: "companies" }
                ].map((item) => (
                  <li key={item.name}>
                    <button onClick={() => handleTabChange(item.tab)} className="text-gray-500 hover:text-blue-600 text-sm transition-colors">{item.name}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product */}
            <div className="space-y-6">
              <h4 className="font-bold text-gray-900 text-sm">Platform</h4>
              <ul className="space-y-3">
                {[
                  { name: "Model Directory", tab: "models" },
                  { name: "Side-by-Side", tab: "compare" },
                  { name: "API Benchmarks", tab: "benchmarks" },
                  { name: "Cost Estimator", tab: "calculator" }
                ].map((item) => (
                  <li key={item.name}>
                    <button onClick={() => handleTabChange(item.tab)} className="text-gray-500 hover:text-blue-600 text-sm transition-colors">{item.name}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-6">
              <h4 className="font-bold text-gray-900 text-sm">Legal</h4>
              <ul className="space-y-3">
                {[
                  { name: "Privacy Policy", tab: "privacy" },
                  { name: "Terms of Service", tab: "terms" },
                  { name: "Cookie Policy", tab: "cookies" },
                  { name: "Disclaimer", tab: "disclaimer" }
                ].map((item) => (
                  <li key={item.name}>
                    <button onClick={() => handleTabChange(item.tab)} className="text-gray-500 hover:text-blue-600 text-sm transition-colors">{item.name}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Editorial */}
            <div className="space-y-6">
              <h4 className="font-bold text-gray-900 text-sm">Editorial</h4>
              <ul className="space-y-3">
                {[
                  { name: "Editorial Policy", tab: "editorial" },
                  { name: "AI Content Policy", tab: "aipolicy" },
                  { name: "Affiliate Disclosure", tab: "affiliate" },
                  { name: "Accessibility", tab: "accessibility" }
                ].map((item) => (
                  <li key={item.name}>
                    <button onClick={() => handleTabChange(item.tab)} className="text-gray-500 hover:text-blue-600 text-sm transition-colors">{item.name}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-500">
                <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">All Systems Operational</span>
              </div>
              <span className="text-gray-300">|</span>
              <p className="text-xs text-gray-400">© {new Date().getFullYear()} AIIndex. Global HQ: London, UK.</p>
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-gray-50 hover:bg-gray-100 text-gray-500 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
