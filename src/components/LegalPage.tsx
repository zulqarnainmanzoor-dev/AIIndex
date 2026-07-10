import React, { useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { Shield, Clock, Book, ArrowLeft, Calendar } from "lucide-react";
import { calculateReadingTime, formatLastUpdated } from "../utils/articleUtils";
import { getCleanText } from "./ComparisonArticle";

interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
  onBack: () => void;
}

export default function LegalPage({ title, description, lastUpdated, sections, onBack }: LegalPageProps) {
  useEffect(() => {
    // Article Schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "datePublished": lastUpdated,
      "dateModified": lastUpdated,
      "author": {
        "@type": "Organization",
        "name": "AIIndex Legal Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AIIndex",
        "logo": {
          "@type": "ImageObject",
          "url": "https://aiindex.ai/logo.png"
        }
      }
    };

    // FAQ Schema from sections
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": sections.map(section => ({
        "@type": "Question",
        "name": section.title,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": getCleanText(section.content)
        }
      }))
    };

    const script1 = document.createElement("script");
    script1.type = "application/ld+json";
    script1.id = `legal-article-schema-${title.replace(/\s+/g, "-").toLowerCase()}`;
    script1.text = JSON.stringify(articleSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "application/ld+json";
    script2.id = `legal-faq-schema-${title.replace(/\s+/g, "-").toLowerCase()}`;
    script2.text = JSON.stringify(faqSchema);
    document.head.appendChild(script2);

    return () => {
      document.getElementById(script1.id)?.remove();
      document.getElementById(script2.id)?.remove();
    };
  }, [title, description, lastUpdated, sections]);

  const readingTime = useMemo(() => {
    const allText = sections.map(s => getCleanText(s.content)).join(" ");
    return calculateReadingTime(allText);
  }, [sections]);

  const formattedDate = useMemo(() => formatLastUpdated(lastUpdated), [lastUpdated]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium text-sm">Back to Home</span>
      </button>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 md:p-12 border-b border-gray-100">
          <div className="flex items-center gap-3 text-blue-600 mb-4">
            <Shield className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-widest">Legal Document</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap items-center gap-6 mt-8 text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Last updated: {formattedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row p-8 md:p-12 gap-12">
          {/* Table of Contents */}
          <aside className="md:w-64 shrink-0">
            <div className="sticky top-8">
              <div className="flex items-center gap-2 text-gray-900 font-bold mb-4">
                <Book className="w-4 h-4" />
                <span>On this page</span>
              </div>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm text-gray-500 hover:text-blue-600 py-1 transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-1 h-6 bg-blue-600 rounded-full" />
                  {section.title}
                </h2>
                <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-4">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Have questions about our policies?</h3>
        <p className="text-blue-100 mb-8 max-w-lg mx-auto">
          Our legal and privacy teams are here to help. Reach out to us for any clarifications regarding our terms or data practices.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
          Contact Support
        </button>
      </div>
    </motion.div>
  );
}
