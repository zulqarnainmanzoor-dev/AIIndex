/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HeadingItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Utility to extract headings and FAQ segments from long-form markdown posts.
 * This ensures dynamic generation of structured breadcrumb/FAQ JSON-LD schemas.
 */
export function extractHeadingsAndFAQs(content: string): { headings: HeadingItem[]; faqs: FAQItem[] } {
  const headings: HeadingItem[] = [];
  const faqs: FAQItem[] = [];
  const usedIds = new Map<string, number>();
  
  if (!content) return { headings, faqs };

  const lines = content.split("\n");
  let inFaqSection = false;
  let currentQuestion = "";
  let currentAnswerLines: string[] = [];

  const getUniqueId = (text: string) => {
    let id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    if (usedIds.has(id)) {
      const count = usedIds.get(id)! + 1;
      usedIds.set(id, count);
      id = `${id}-${count}`;
    } else {
      usedIds.set(id, 0);
    }
    return id;
  };

  const flushFaq = () => {
    if (currentQuestion && currentAnswerLines.length > 0) {
      faqs.push({
        question: currentQuestion.trim(),
        answer: currentAnswerLines.join("\n").trim()
      });
      currentQuestion = "";
      currentAnswerLines = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if entering Frequently Asked Questions
    if (line.match(/^##\s+Frequently\s+Asked\s+Questions/i) || line.match(/^##\s+FAQ/i)) {
      inFaqSection = true;
      continue;
    }

    // If we hit another H2, we flush the FAQ but remain open to other checks
    if (inFaqSection && line.startsWith("## ") && !line.match(/^##\s+Frequently\s+Asked\s+Questions/i) && !line.match(/^##\s+FAQ/i)) {
      flushFaq();
      inFaqSection = false;
    }

    if (line.startsWith("## ")) {
      const text = line.substring(3).trim();
      const id = getUniqueId(text);
      headings.push({ id, text, level: 2 });
    } else if (line.startsWith("### ")) {
      const text = line.substring(4).trim();
      const id = getUniqueId(text);
      headings.push({ id, text, level: 3 });

      if (inFaqSection) {
        flushFaq();
        currentQuestion = text.replace(/^\d+\.\s*/, "");
      }
    } else if (inFaqSection && currentQuestion) {
      if (line !== "" && !line.startsWith("---")) {
        currentAnswerLines.push(line);
      }
    }
  }
  flushFaq();

  return { headings, faqs };
}

/**
 * Utility to generate JSON-LD structured data (FAQ Schema) from extracted FAQ items
 * and inject it as a script element into the page head.
 */
export function generateAndInjectFAQSchema(content: string): void {
  const { faqs } = extractHeadingsAndFAQs(content);
  if (faqs.length === 0) {
    // Remove existing FAQ script if no FAQs found
    const existing = document.getElementById("faq-schema-ld-json");
    if (existing) {
      existing.remove();
    }
    return;
  }

  const faqSchema = {
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

  const scriptId = "faq-schema-ld-json";
  let scriptEl = document.getElementById(scriptId) as HTMLScriptElement;
  if (!scriptEl) {
    scriptEl = document.createElement("script");
    scriptEl.id = scriptId;
    scriptEl.type = "application/ld+json";
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(faqSchema, null, 2);
}

/**
 * Utility to generate JSON-LD structured data (Article Schema) for a blog post
 * and inject it as a script element into the page head.
 */
export function generateAndInjectArticleSchema(post: {
  id: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  fullContent?: string;
}, coverImageUrl: string): void {
  const content = post.fullContent || "";
  const wordCount = content ? content.split(/\s+/).length : 5800;

  // Attempt to parse or use a standard date format
  let datePublished = "2026-07-08T20:11:09-07:00"; // fallback
  try {
    if (post.date) {
      const parsedDate = new Date(post.date);
      if (!isNaN(parsedDate.getTime())) {
        datePublished = parsedDate.toISOString();
      }
    }
  } catch (e) {
    // ignore
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title,
    "description": post.summary,
    "image": coverImageUrl,
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "AIIndex Research Labs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=200&auto=format&fit=crop"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    },
    "wordCount": wordCount,
    "articleSection": post.category
  };

  const scriptId = "article-schema-ld-json";
  let scriptEl = document.getElementById(scriptId) as HTMLScriptElement;
  if (!scriptEl) {
    scriptEl = document.createElement("script");
    scriptEl.id = scriptId;
    scriptEl.type = "application/ld+json";
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(articleSchema, null, 2);
}
