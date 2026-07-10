/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { MODELS, COMPANIES } from "../data";
import { BLOG_POSTS } from "../blogData";
import { AIModel, AICompany } from "../types";
import { extractHeadingsAndFAQs } from "../utils/seoUtils";

interface SEOPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedModel: AIModel | null;
  setSelectedModel: (model: AIModel | null) => void;
  selectedCompany: AICompany | null;
  setSelectedCompany: (company: AICompany | null) => void;
  selectedBlogPost: any | null;
  setSelectedBlogPost: (post: any | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SEO({
  activeTab,
  setActiveTab,
  selectedModel,
  setSelectedModel,
  selectedCompany,
  setSelectedCompany,
  selectedBlogPost,
  setSelectedBlogPost,
  searchQuery,
  setSearchQuery,
}: SEOPanelProps) {

  // 1. URL State Synchronization (Router-like behavior for deep linking)
  useEffect(() => {
    const handleUrlParsing = () => {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab") || "home";
      const modelId = params.get("model");
      const companyId = params.get("company");
      const postId = params.get("post");
      const q = params.get("q");

      if (tab && tab !== activeTab) {
        setActiveTab(tab);
      }

      if (modelId) {
        const foundModel = MODELS.find((m) => m.id === modelId);
        if (foundModel && (!selectedModel || selectedModel.id !== modelId)) {
          setSelectedModel(foundModel);
        }
      } else if (selectedModel) {
        setSelectedModel(null);
      }

      if (companyId) {
        const foundCompany = COMPANIES.find((c) => c.id === companyId);
        if (foundCompany && (!selectedCompany || selectedCompany.id !== companyId)) {
          setSelectedCompany(foundCompany);
        }
      } else if (selectedCompany) {
        setSelectedCompany(null);
      }

      if (postId) {
        const foundPost = BLOG_POSTS.find((p) => p.id === postId);
        if (foundPost && (!selectedBlogPost || selectedBlogPost.id !== postId)) {
          setSelectedBlogPost(foundPost);
        }
      } else if (selectedBlogPost) {
        setSelectedBlogPost(null);
      }

      if (q !== null && q !== searchQuery) {
        setSearchQuery(q);
      }
    };

    // Parse on initial load
    handleUrlParsing();

    // Listen to back/forward button events
    window.addEventListener("popstate", handleUrlParsing);
    return () => {
      window.removeEventListener("popstate", handleUrlParsing);
    };
  }, []);

  // Update URL parameters when states change
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeTab && activeTab !== "home") {
      params.set("tab", activeTab);
    } else if (activeTab === "home") {
      // Keep URL clean, but set tab if deeper states are active
      if (selectedModel || selectedCompany || selectedBlogPost || searchQuery) {
        params.set("tab", "home");
      }
    }

    if (selectedModel) {
      params.set("model", selectedModel.id);
    }
    if (selectedCompany) {
      params.set("company", selectedCompany.id);
    }
    if (selectedBlogPost) {
      params.set("post", selectedBlogPost.id);
    }
    if (searchQuery) {
      params.set("q", searchQuery);
    }

    const newQueryStr = params.toString();
    const currentQueryStr = window.location.search.replace(/^\?/, "");

    if (newQueryStr !== currentQueryStr) {
      const searchSuffix = newQueryStr ? `?${newQueryStr}` : "";
      const newUrl = `${window.location.pathname}${searchSuffix}`;
      window.history.pushState({ tab: activeTab }, "", newUrl);
    }
  }, [activeTab, selectedModel, selectedCompany, selectedBlogPost, searchQuery]);

  // 2. Head Tags & JSON-LD updates based on the current state
  useEffect(() => {
    // 2.1 Dynamic Meta Titles and Descriptions
    let pageTitle = "AIIndex | Global AI Comparison, Pricing, and Benchmark Platform";
    let pageDesc = "Compare frontier AI models, pricing per 1M tokens, context windows, speed latencies, and accuracy benchmarks. Access independent deep-dive audits and developer resources.";
    let pageKeywords = "AI models, compare LLM, Claude 3.5 Sonnet, GPT-4o, Gemini 1.5, AI token pricing, AI speed benchmarks, model economics";

    // Adjust title and description for current sub-pages
    if (selectedBlogPost) {
      pageTitle = `${selectedBlogPost.title} | AIIndex Dispatch`;
      pageDesc = selectedBlogPost.summary || pageDesc;
      pageKeywords = `AI blog, model analysis, ${selectedBlogPost.category.toLowerCase()}, ${selectedBlogPost.author}`;
    } else if (selectedModel) {
      pageTitle = `${selectedModel.name} Specifications, Pricing, and Benchmarks | AIIndex`;
      pageDesc = `Detailed specs for ${selectedModel.name} by ${selectedModel.companyName}. Context window: ${selectedModel.contextWindow.toLocaleString()} tokens, speed score: ${selectedModel.speedScore}/100, accuracy: ${selectedModel.accuracyScore}%. Input: $${selectedModel.pricingInput}/1M, Output: $${selectedModel.pricingOutput}/1M.`;
      pageKeywords = `${selectedModel.name}, ${selectedModel.companyName}, model specs, context window, pricing per million, benchmarks`;
    } else if (selectedCompany) {
      pageTitle = `${selectedCompany.name} valuation, founders, and AI products | AIIndex`;
      pageDesc = `Analyze ${selectedCompany.name}'s history, funding size of ${selectedCompany.funding}, latest valuation of ${selectedCompany.valuation}, and core AI models directory.`;
      pageKeywords = `${selectedCompany.name}, AI company valuation, founders, history, Alphabet, Microsoft, Claude, ChatGPT`;
    } else {
      switch (activeTab) {
        case "models":
          pageTitle = "AI Models Comparison Directory & Benchmarks | AIIndex";
          pageDesc = "In-depth visual benchmark comparison matrices. Side-by-side performance audit curves of Claude, GPT, Gemini, Llama, and Mistral models.";
          break;
        case "companies":
          pageTitle = "Frontier AI Companies & Research Labs Directory | AIIndex";
          pageDesc = "Directory of major foundation model developers including Google DeepMind, OpenAI, Anthropic, Meta, and Mistral AI with historical valuation, founders, and specifications.";
          break;
        case "tools":
          pageTitle = "AI Developer Tools & SaaS Directory | AIIndex";
          pageDesc = "Curated workspace index of elite AI IDEs, visual agents, code compilers, and autonomous state machines. Submit custom tools to our index.";
          break;
        case "api-explorer":
          pageTitle = "REST API Endpoint & Developer Console | AIIndex";
          pageDesc = "Access zero-auth public JSON REST API streams of model benchmarks, real-time cost indicators, and specifications. Perfect for automation loops.";
          break;
        case "blogs":
          pageTitle = "The AIIndex Dispatch | Model Deep-dives & Benchmarks";
          pageDesc = "Weekly publication of rigorous engineering audits, speculative token economics, LLM state loops safeguarding patterns, and reasoning model traces.";
          break;
        case "contact":
          pageTitle = "Contact AIIndex Research Desk | Custom Benchmarks";
          pageDesc = "Inquire about custom foundation model benchmarking services, API integrations, data syndication streams, or correct indexed specifications.";
          break;
        default:
          break;
      }
    }

    // Set Document Title
    document.title = pageTitle;

    // Helper to get or create head elements
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Update standard meta tags
    setMetaTag("name", "description", pageDesc);
    setMetaTag("name", "keywords", pageKeywords);
    setMetaTag("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");

    // Dynamic Canonical URL
    let canonicalUrl = "https://aiindex.ai";
    const canonicalParams = new URLSearchParams();
    if (activeTab && activeTab !== "home") {
      canonicalParams.set("tab", activeTab);
    }
    if (selectedModel) canonicalParams.set("model", selectedModel.id);
    if (selectedCompany) canonicalParams.set("company", selectedCompany.id);
    if (selectedBlogPost) canonicalParams.set("post", selectedBlogPost.id);
    const paramStr = canonicalParams.toString();
    if (paramStr) {
      canonicalUrl = `${canonicalUrl}/?${paramStr}`;
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 2.2 Open Graph Tags (Facebook, LinkedIn, Discord)
    setMetaTag("property", "og:title", pageTitle);
    setMetaTag("property", "og:description", pageDesc);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:type", selectedBlogPost ? "article" : "website");
    setMetaTag("property", "og:site_name", "AIIndex");
    setMetaTag("property", "og:locale", "en_US");
    // Placeholders for social graphic preview image
    const ogImage = "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop";
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:image:width", "1200");
    setMetaTag("property", "og:image:height", "630");

    // 2.3 Twitter / X Card Meta Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:site", "@aiindex_platform");
    setMetaTag("name", "twitter:title", pageTitle);
    setMetaTag("name", "twitter:description", pageDesc);
    setMetaTag("name", "twitter:image", ogImage);

    // 2.4 Google Verification, Analytics, and AdSense Integration Placeholders
    // Verifications (Google Search Console & AdSense placeholder metadata)
    setMetaTag("name", "google-site-verification", "GSC-VERIFICATION-PLACEHOLDER-AIINDEX-2026");
    
    // Safety headers inside meta (CSP recommendations)
    // Note: In browser, CSP meta tags can restrict resources. We use a standard safe recommendation meta.
    setMetaTag("http-equiv", "X-Content-Type-Options", "nosniff");
    setMetaTag("name", "referrer", "strict-origin-when-cross-origin");

    // 3. Dynamic JSON-LD Structured Data Injection
    const schemas: any[] = [];

    // 3.1 Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AIIndex Research Consortium",
      "alternateName": "AIIndex",
      "url": "https://aiindex.ai",
      "logo": "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=500&auto=format&fit=crop",
      "description": "An independent, non-vendor-affiliated research syndicate cataloging actual execution latencies, token economics, and multi-variable logic benchmarks.",
      "sameAs": [
        "https://twitter.com/aiindex_platform",
        "https://github.com/aiindex-consortium"
      ]
    };
    schemas.push(organizationSchema);

    // 3.2 Website Schema & SearchAction
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "AIIndex",
      "url": "https://aiindex.ai",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://aiindex.ai/?tab=home&q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };
    schemas.push(websiteSchema);

    // 3.3 Dynamic Breadcrumbs
    const breadcrumbList: any[] = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://aiindex.ai"
      }
    ];

    if (activeTab && activeTab !== "home") {
      breadcrumbList.push({
        "@type": "ListItem",
        "position": 2,
        "name": activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
        "item": `https://aiindex.ai/?tab=${activeTab}`
      });

      if (selectedModel) {
        breadcrumbList.push({
          "@type": "ListItem",
          "position": 3,
          "name": selectedModel.name,
          "item": `https://aiindex.ai/?tab=models&model=${selectedModel.id}`
        });
      } else if (selectedCompany) {
        breadcrumbList.push({
          "@type": "ListItem",
          "position": 3,
          "name": selectedCompany.name,
          "item": `https://aiindex.ai/?tab=companies&company=${selectedCompany.id}`
        });
      } else if (selectedBlogPost) {
        breadcrumbList.push({
          "@type": "ListItem",
          "position": 3,
          "name": selectedBlogPost.title,
          "item": `https://aiindex.ai/?tab=blogs&post=${selectedBlogPost.id}`
        });
      }
    } else {
      // Home tab with selected sub-item
      if (selectedModel) {
        breadcrumbList.push({
          "@type": "ListItem",
          "position": 2,
          "name": selectedModel.name,
          "item": `https://aiindex.ai/?tab=home&model=${selectedModel.id}`
        });
      } else if (selectedCompany) {
        breadcrumbList.push({
          "@type": "ListItem",
          "position": 2,
          "name": selectedCompany.name,
          "item": `https://aiindex.ai/?tab=home&company=${selectedCompany.id}`
        });
      } else if (selectedBlogPost) {
        breadcrumbList.push({
          "@type": "ListItem",
          "position": 2,
          "name": selectedBlogPost.title,
          "item": `https://aiindex.ai/?tab=home&post=${selectedBlogPost.id}`
        });
      }
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbList
    };
    schemas.push(breadcrumbSchema);

    // 3.4 WebPage Schema
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": pageTitle,
      "description": pageDesc,
      "url": canonicalUrl,
      "publisher": {
        "@type": "Organization",
        "name": "AIIndex Research Consortium"
      }
    };
    schemas.push(webPageSchema);

    // 3.5 Specific Sub-Schemas (Article / SoftwareApplication / Product / FAQ)
    if (selectedBlogPost) {
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": selectedBlogPost.title,
        "description": selectedBlogPost.summary,
        "datePublished": new Date(selectedBlogPost.date).toISOString().split('T')[0],
        "dateModified": new Date(selectedBlogPost.date).toISOString().split('T')[0],
        "author": {
          "@type": "Person",
          "name": selectedBlogPost.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "AIIndex Research Consortium",
          "logo": {
            "@type": "ImageObject",
            "url": "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=200"
          }
        },
        "mainEntityOfPage": canonicalUrl
      };
      schemas.push(articleSchema);

      // Extract FAQs from article content to automatically generate JSON-LD FAQ Schema
      const { faqs } = extractHeadingsAndFAQs(selectedBlogPost.fullContent);
      if (faqs && faqs.length > 0) {
        const blogFaqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        };
        schemas.push(blogFaqSchema);
      }
    }

    if (selectedModel) {
      // SoftwareApplication Schema
      const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": selectedModel.name,
        "operatingSystem": "Cloud-based APIs",
        "applicationCategory": "Artificial Intelligence Assistant / Large Language Model",
        "releaseDate": selectedModel.releaseDate,
        "offers": {
          "@type": "Offer",
          "price": selectedModel.pricingInput.toString(),
          "priceCurrency": "USD",
          "description": "Per 1 million input tokens"
        },
        "creator": {
          "@type": "Organization",
          "name": selectedModel.companyName
        }
      };

      // Product Schema (for comparing specifications)
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": selectedModel.name,
        "description": selectedModel.overview,
        "brand": {
          "@type": "Brand",
          "name": selectedModel.companyName
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "USD",
          "lowPrice": selectedModel.pricingInput,
          "highPrice": selectedModel.pricingOutput,
          "offerCount": "2"
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Context Window",
            "value": `${selectedModel.contextWindow.toLocaleString()} tokens`
          },
          {
            "@type": "PropertyValue",
            "name": "Accuracy Benchmarks (MMLU / Reasoning)",
            "value": `${selectedModel.accuracyScore}%`
          },
          {
            "@type": "PropertyValue",
            "name": "Speed Rating",
            "value": `${selectedModel.speedScore}/100`
          }
        ]
      };
      
      schemas.push(softwareAppSchema);
      schemas.push(productSchema);
    }

    // 3.6 FAQ Schema (For standard home/help inquiries)
    if (!selectedBlogPost && !selectedModel && !selectedCompany && activeTab === "home") {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does AIIndex calculate model performance scores?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We aggregate empirical data directly from foundational whitepapers, validated live developer trials, and our specialized evaluation queries. Performance values map accuracy (MMLU, GPQA), response latencies, and instruction-adherence criteria into standardized percentage scales."
            }
          },
          {
            "@type": "Question",
            "name": "Are the token pricing indices real-time?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our researchers verify the pricing parameters weekly across global providers including Google Cloud, Azure AI, and Amazon Bedrock, accounting for both standard tiered and custom provisioned throughput."
            }
          },
          {
            "@type": "Question",
            "name": "Can I query model specs programmatically?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. AIIndex features a dynamic, public REST API endpoint at '/api/v1/models' which returns structural JSON streams of all model cost indices, evaluation curves, and architectural profiles without authentication."
            }
          }
        ]
      };
      schemas.push(faqSchema);
    }

    // Inject dynamic schemas into document head
    // Remove existing schema scripts first
    document.querySelectorAll("script[data-seo-schema]").forEach((el) => el.remove());

    // Create and append new script tags
    schemas.forEach((schemaObj, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-schema", `schema-${index}`);
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

  }, [activeTab, selectedModel, selectedCompany, selectedBlogPost, searchQuery]);

  return null; // This is a controller component that handles metadata side-effects
}
