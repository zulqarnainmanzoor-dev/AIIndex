/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { MODELS, COMPANIES } from "./src/data";
import { BLOG_POSTS } from "./src/blogData";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Cache for comparisons
  const compareCache = new Map<string, { data: any; timestamp: number }>();
  const COMPARE_CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours for comparisons

  // API Route: AI Comparison Assistant
  app.post("/api/gemini/compare", async (req, res) => {
    try {
      const { modelA, modelB, customQuery } = req.body;
      const apiKey = process.env.GROQ_API_KEY;

      // Check cache
      const cacheKey = `${modelA}-${modelB}-${customQuery || ""}`;
      const cached = compareCache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp < COMPARE_CACHE_TTL)) {
        return res.json({ analysis: cached.data });
      }

      if (!apiKey) {
        return res.status(400).json({
          error: "GROQ_API_KEY environment variable is not configured."
        });
      }

      const groq = new Groq({ apiKey });

      const prompt = `You are the Lead AI Analyst for AIIndex, the global authority on artificial intelligence models, tools, and comparisons (the IMDb & GSMArena of AI).
Analyze and compare **${modelA}** vs **${modelB}** in a highly professional, clinical, and data-driven manner.
${customQuery ? `The user has specified a specific topic/question they want you to address: "${customQuery}"` : "Provide a comprehensive side-by-side analysis."}

Please format your response using professional Markdown. Do not include any HTML tags. Organize it with the following clear headings:

### Executive Summary
Provide a 2-3 sentence definitive verdict on when to choose which model.

### Key Performance Trade-offs
Compare their context windows, pricing, response latencies, and reasoning depth. Use numbers where possible (e.g., pricing per 1M tokens, speed scores).

### Code & Engineering Analysis
Evaluate how they handle coding, schema generation, API integrations, and developer tooling.

### Final Verdict & Use Cases
Specify which model is recommended for:
1. Enterprise scale production
2. Solo developer workflows on a budget
3. Real-time customer experience applications

Ensure your tone is authoritative, completely unbiased, deeply technical, and professional. Avoid marketing fluff or empty buzzwords.`;

      const completion = await groq.chat.completions.create({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2048,
      });

      const analysisText = completion.choices[0]?.message?.content || "";

      // Update cache
      compareCache.set(cacheKey, { data: analysisText, timestamp: Date.now() });

      return res.json({ analysis: analysisText });
    } catch (error: any) {
      if (error.message?.includes("429") || error.status === 429) {
        return res.status(429).json({ 
          error: "Our AI Analyst is currently handling too many requests. Please wait a few minutes or try one of our pre-analyzed comparisons below." 
        });
      }
      console.error("Gemini API error:", error);
      return res.status(500).json({ error: error.message || "An error occurred during comparison analysis." });
    }
  });

  // Dynamic robots.txt
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *
Allow: /

# Host & Sitemaps
Host: https://ai-index.vercel.app
Sitemap: https://ai-index.vercel.app/sitemap.xml
`);
  });

  // Dynamic XML Sitemap
  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml");
    
    const baseUrl = "https://ai-index.vercel.app";
    const dateStr = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Main & tabs
    const mainPages = [
      "",
      "?tab=models",
      "?tab=companies",
      "?tab=tools",
      "?tab=api-explorer",
      "?tab=blogs",
      "?tab=contact"
    ];

    mainPages.forEach(p => {
      xml += `
  <url>
    <loc>${baseUrl}/${p}</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${p === "" ? "1.0" : "0.8"}</priority>
  </url>`;
    });

    // Dynamic Blog posts
    BLOG_POSTS.forEach(post => {
      xml += `
  <url>
    <loc>${baseUrl}/?tab=blogs&amp;post=${post.id}</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Dynamic Models
    MODELS.forEach(model => {
      xml += `
  <url>
    <loc>${baseUrl}/?tab=models&amp;model=${model.id}</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    // Dynamic Companies
    COMPANIES.forEach(company => {
      xml += `
  <url>
    <loc>${baseUrl}/?tab=companies&amp;company=${company.id}</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    xml += `
</urlset>`;

    res.send(xml);
  });

  // Dynamic RSS Feed
  app.get("/rss.xml", (req, res) => {
    res.type("application/xml");
    const baseUrl = "https://ai-index.vercel";

    let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>The AIIndex Dispatch</title>
  <link>${baseUrl}/?tab=blogs</link>
  <description>Analytical deep-dives, benchmark reviews, and structural breakdowns of foundation models.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />`;

    BLOG_POSTS.forEach(post => {
      rss += `
  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${baseUrl}/?tab=blogs&amp;post=${post.id}</link>
    <guid>${baseUrl}/?tab=blogs&amp;post=${post.id}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description>${escapeXml(post.summary)}</description>
    <author>research@aiindex.ai (${escapeXml(post.author)})</author>
    <category>${escapeXml(post.category)}</category>
  </item>`;
    });

    rss += `
</channel>
</rss>`;

    res.send(rss);
  });

  const FALLBACK_NEWS = [
    {
      title: "DeepSeek-R1 Launches with Open-Source Reasoning Power",
      summary: "The open-weights reasoning model achieves performance comparable to OpenAI's o1 at a fraction of the cost, starting a new era of efficient open-source AI.",
      source: "MIT Technology Review",
      url: "https://www.technologyreview.com/"
    },
    {
      title: "Google DeepMind Unveils Gemini 2.5 Pro with Direct Voice Pipelines",
      summary: "The upgraded multimodal model processes live vocal tones, emotions, and speed variations end-to-end, unlocking next-generation interactive voice agents.",
      source: "Google DeepMind Blog",
      url: "https://deepmind.google/technologies/gemini/"
    },
    {
      title: "Anthropic Releases Claude 3.5 Sonnet to Unmatched Coding Acclaim",
      summary: "With advanced reasoning and state-of-the-art artifact previewing, the model becomes the gold standard for software engineers globally.",
      source: "Anthropic Research",
      url: "https://www.anthropic.com/news/claude-3-5-sonnet"
    },
    {
      title: "OpenAI Rolls Out GPT-4o with Native Real-Time Voice and Vision",
      summary: "The new flagship model integrates audio, visual, and text reasoning seamlessly into a single ultra-fast interface with reduced API latency.",
      source: "OpenAI Blog",
      url: "https://openai.com/blog/gpt-4o/"
    },
    {
      title: "Meta Releases Llama 3.3 70b with State-Of-The-Art Efficiency",
      summary: "The open-source powerhouse delivers tier-one intelligence at highly optimized system constraints, enabling local enterprise fine-tuning.",
      source: "Meta AI",
      url: "https://ai.meta.com/blog/meta-llama-3/"
    }
  ];

  // Simple in-memory cache for news
  let newsCache: { data: any; timestamp: number } | null = null;
  const CACHE_TTL = 1000 * 60 * 60 * 12; // 12 hours - news doesn't change that fast

  // API Route: AI News Grounding
  app.get("/api/news", async (req, res) => {
    try {
      // Check cache first
      if (newsCache && (Date.now() - newsCache.timestamp < CACHE_TTL)) {
        return res.json({ news: newsCache.data });
      }

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        console.warn("GROQ_API_KEY is not configured. Returning fallback news feed.");
        return res.json({ news: FALLBACK_NEWS });
      }

      const groq = new Groq({ apiKey });

      const prompt = `Provide the 5 most recent and impactful headlines in the Artificial Intelligence industry from the last 7 days.
      For each headline, provide a title, a brief 1-sentence summary, and the publication name.
      Focus on major model releases (OpenAI, Google, Anthropic, Meta), regulatory changes, or significant hardware breakthroughs.
      Return ONLY a valid JSON array of objects with keys: "title", "summary", "source", "url". No extra text.`;

      const completion = await groq.chat.completions.create({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
        max_tokens: 1024,
      });

      const raw = completion.choices[0]?.message?.content || "[]";
      const jsonMatch = raw.match(/\[.*\]/s);
      const newsData = jsonMatch ? JSON.parse(jsonMatch[0]) : FALLBACK_NEWS;

      // Update cache
      newsCache = { data: newsData, timestamp: Date.now() };

      return res.json({ news: newsData });
    } catch (error: any) {
      // Gracefully handle rate limits without flooding logs if we have fallbacks
      if (error.message?.includes("429") || error.status === 429) {
        console.warn("News fetch rate limited (429). Using fallback/cache.");
      } else {
        console.error("News fetch error:", error);
      }
      
      // If we have a stale cache, return it on error instead of just fallback
      if (newsCache) {
        return res.json({ news: newsCache.data });
      }
      
      return res.json({ news: FALLBACK_NEWS });
    }
  });

  // Serve static assets or mount Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n  ✅ Server running at: http://localhost:${PORT}\n`);
  });
}

startServer();
