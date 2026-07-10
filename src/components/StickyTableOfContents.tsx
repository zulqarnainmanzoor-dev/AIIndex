/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface StickyTableOfContentsProps {
  articleContainerId: string;
}

export default function StickyTableOfContents({ articleContainerId }: StickyTableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // We delay the initial scan slightly to ensure the content has fully rendered in DOM
    const scanHeadings = () => {
      const container = document.getElementById(articleContainerId);
      if (!container) return;

      const headingElements = container.querySelectorAll("h2, h3");
      const items: HeadingItem[] = [];
      headingElements.forEach((el) => {
        if (el.id) {
          items.push({
            id: el.id,
            text: el.textContent || "",
            level: el.tagName.toLowerCase() === "h2" ? 2 : 3,
          });
        }
      });
      setHeadings(items);
    };

    // Scan initially after a tiny delay
    const timer = setTimeout(scanHeadings, 150);

    // Re-scan if DOM changes (dynamic content loading, etc.)
    const container = document.getElementById(articleContainerId);
    let observer: MutationObserver | null = null;
    if (container) {
      observer = new MutationObserver(scanHeadings);
      observer.observe(container, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [articleContainerId]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset for header navbar
      
      let currentActiveId = "";
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element && element.offsetTop <= scrollPosition) {
          currentActiveId = heading.id;
        }
      }
      
      if (currentActiveId) {
        setActiveId(currentActiveId);
      } else if (headings.length > 0) {
        setActiveId(headings[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger scroll spy check initially
    const timer = setTimeout(handleScroll, 200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [headings]);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 95; // offset for navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-4">
        <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
          Table of Contents
        </h4>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => handleScrollToSection(heading.id)}
              className={`w-full text-left font-sans text-xs transition-all duration-200 block truncate cursor-pointer rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-100 ${
                activeId === heading.id 
                  ? "text-blue-600 bg-blue-50/50 font-bold border-l-2 border-l-blue-600 pl-3" 
                  : heading.level === 3 
                  ? "text-gray-400 hover:text-gray-900 pl-4" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-gradient-to-br from-blue-50/40 to-purple-50/40 border border-blue-50 rounded-3xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
          <Sparkles className="w-4 h-4" />
          <span>AIIndex Deep Benchmarks</span>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
          Compare actual Time to First Token metrics, instruction follow rates, and mathematical logical arrays dynamically on our benchmark directories.
        </p>
        <button className="w-full text-left inline-flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
          <span>View specs matrix</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
