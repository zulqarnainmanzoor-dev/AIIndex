/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AIModel, AICompany, AITool, NewsItem, Guide, Prompt } from "./types";

export const COMPANIES: AICompany[] = [
  {
    id: "openai",
    name: "OpenAI",
    logo: "BrainCircuit",
    history: "Founded in 2015 as a non-profit AI research lab with a mission to ensure that artificial general intelligence benefits all of humanity. In 2019, it transitioned to a 'capped-profit' structure to secure funding for compute, leading to massive commercial products like ChatGPT.",
    founders: ["Sam Altman", "Elon Musk", "Ilya Sutskever", "Greg Brockman", "Wojciech Zaremba"],
    foundedYear: 2015,
    headquarters: "San Francisco, California, USA",
    funding: "$13.5 Billion (backed heavily by Microsoft)",
    valuation: "$157 Billion (as of late 2024)",
    products: ["ChatGPT", "DALL-E 3", "Sora", "OpenAI API", "Whisper"],
    apisAvailable: ["gpt-4o", "gpt-4o-mini", "o1-preview", "o1-mini", "text-embedding-3"],
    timeline: [
      { year: "2015", title: "OpenAI Founded", description: "Established as an open-source non-profit research lab." },
      { year: "2019", title: "Transition to Capped-Profit", description: "Created OpenAI LP to secure commercial funding." },
      { year: "2020", title: "GPT-3 Released", description: "Revolutionized natural language processing with 175B parameters." },
      { year: "2022", title: "ChatGPT Launched", description: "Triggered the global generative AI boom with 100M users in 2 months." },
      { year: "2024", title: "o1 Reasoning Series", description: "Introduced advanced reasoning models that 'think' before responding." }
    ]
  },
  {
    id: "google-deepmind",
    name: "Google DeepMind",
    logo: "Sparkles",
    history: "DeepMind was founded in London in 2010 and acquired by Google in 2014. In 2023, Google merged DeepMind with the Google Brain team to form Google DeepMind, centralizing all of Google's state-of-the-art AI efforts under Demis Hassabis.",
    founders: ["Demis Hassabis", "Shane Legg", "Mustafa Suleyman"],
    foundedYear: 2010,
    headquarters: "London, United Kingdom",
    funding: "Subsidiary of Alphabet (Google)",
    valuation: "Part of Alphabet ($2+ Trillion)",
    products: ["Google Gemini", "Gemini Advanced", "AlphaFold", "Imagen 3", "Veo", "Android AI"],
    apisAvailable: ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-2.0-flash", "gemini-2.5-pro"],
    timeline: [
      { year: "2010", title: "DeepMind Founded", description: "Started in London focusing on deep reinforcement learning." },
      { year: "2014", title: "Acquired by Google", description: "Bought by Google for over $500 million." },
      { year: "2016", title: "AlphaGo Victory", description: "Defeated world champion Lee Sedol in the complex game of Go." },
      { year: "2020", title: "AlphaFold 2", description: "Solved the 50-year-old protein folding grand challenge." },
      { year: "2023", title: "Google DeepMind Formed", description: "Merged Brain and DeepMind teams to build Gemini." }
    ]
  },
  {
    id: "anthropic",
    name: "Anthropic",
    logo: "Cpu",
    history: "Anthropic was founded in 2021 by former OpenAI researchers, including siblings Dario and Daniela Amodei. The company was founded on the principles of AI safety and 'Constitutional AI'—designing AI systems to be helpful, honest, and harmless.",
    founders: ["Dario Amodei", "Daniela Amodei", "Jared Kaplan", "Sam McCandlish"],
    foundedYear: 2021,
    headquarters: "San Francisco, California, USA",
    funding: "$8.4 Billion (backed by Amazon and Google)",
    valuation: "$18 Billion (as of mid-2024)",
    products: ["Claude.ai", "Claude Pro", "Claude API", "Artifacts Developer Workspace"],
    apisAvailable: ["claude-3-5-sonnet", "claude-3-5-haiku", "claude-3-opus"],
    timeline: [
      { year: "2021", title: "Anthropic Founded", description: "Formed after disagreement on OpenAI's commercial direction." },
      { year: "2023", title: "Claude 1 & 2 Released", description: "Introduced large context windows and safety-first constitution." },
      { year: "2024", title: "Claude 3 & Artifacts", description: "Claude 3 Opus beats GPT-4; Artifacts changes coding workflows." },
      { year: "2024", title: "Claude 3.5 Sonnet", description: "Widely regarded as the industry gold standard for coding and reasoning." }
    ]
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    logo: "ShieldCheck",
    history: "DeepSeek is a cutting-edge Chinese AI research firm backed by financial tech giant High-Flyer Quant. In 2024/2025, DeepSeek shocked the global tech community by releasing models like V3 and R1 that match US frontier models at a fraction of the training and inference cost.",
    founders: ["Liang Wenfeng (High-Flyer Quant Team)"],
    foundedYear: 2023,
    headquarters: "Hangzhou, China",
    funding: "Self-funded by High-Flyer Quant and domestic investments",
    valuation: "$10+ Billion (estimated)",
    products: ["DeepSeek Chat", "DeepSeek-R1", "DeepSeek API", "DeepSeek Coder"],
    apisAvailable: ["deepseek-chat", "deepseek-reasoner"],
    timeline: [
      { year: "2023", title: "DeepSeek Founded", description: "Launched with focus on high-efficiency, massive scale open-source AI." },
      { year: "2024", title: "DeepSeek V2 & Coder", description: "Offered top-tier programming capabilities at 95% cheaper prices." },
      { year: "2025", title: "DeepSeek-R1 Launch", description: "Stunned the world with open-source reasoning matching OpenAI o1 at extreme budget." }
    ]
  },
  {
    id: "xai",
    name: "xAI",
    logo: "Atom",
    history: "Founded by Elon Musk in 2023 with the goal of 'understanding the true nature of the universe'. xAI operates with deep ties to X (formerly Twitter) and Tesla, utilizing X's real-time public data feed to train and power its Grok assistant.",
    founders: ["Elon Musk"],
    foundedYear: 2023,
    headquarters: "Austin, Texas, USA",
    funding: "$6 Billion",
    valuation: "$24 Billion",
    products: ["Grok Chatbot", "Grok on X Premium", "Grok API"],
    apisAvailable: ["grok-beta", "grok-vision-beta"],
    timeline: [
      { year: "2023", title: "xAI Announced", description: "Elon Musk launches xAI to compete directly with OpenAI and Google." },
      { year: "2023", title: "Grok 1.0 Launched", description: "Released on X with a witty, rebellious personality." },
      { year: "2024", title: "Colossus Supercluster", description: "Built a 100,000 liquid-cooled Nvidia H100 cluster in record time." },
      { year: "2024", title: "Grok 2 released", description: "Achieved elite status on LMSYS Chatbot Arena." }
    ]
  },
  {
    id: "meta",
    name: "Meta",
    logo: "Globe",
    history: "Meta AI (formerly Facebook AI Research, FAIR) has long been a champion of open-source AI. Under Mark Zuckerberg and Chief AI Scientist Yann LeCun, Meta released the Llama family of large language models, sparking an explosion in open-weight AI development globally.",
    founders: ["Mark Zuckerberg"],
    foundedYear: 2004,
    headquarters: "Menlo Park, California, USA",
    funding: "Internal Meta Platforms funding",
    valuation: "$1.4+ Trillion (Alphabet & Meta level)",
    products: ["Meta AI Assistant", "Llama Models", "Segment Anything (SAM)", "Llama API Services"],
    apisAvailable: ["llama-3.1-70b", "llama-3.1-405b", "llama-3.3-70b-instruct"],
    timeline: [
      { year: "2013", title: "FAIR Founded", description: "Facebook AI Research founded with Yann LeCun leading." },
      { year: "2023", title: "Llama 1 & 2 Released", description: "Sparked the open-source community by making frontier weights downloadable." },
      { year: "2024", title: "Llama 3.1 405B", description: "First open-weight model to genuinely compete with top-tier closed models." }
    ]
  }
];

export const MODELS: AIModel[] = [
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    companyId: "anthropic",
    companyName: "Anthropic",
    releaseDate: "June 2024",
    overview: "Claude 3.5 Sonnet is Anthropic's flagship model and currently widely considered the overall best AI model in the world for coding, logic, complex writing, and system control. It introduced 'Computer Use' capabilities allowing the model to control mouse and keyboard functions directly.",
    features: [
      "Industry-leading software engineering and code generation",
      "Stunning visual reasoning and chart analysis",
      "Artifacts workspace integration for live UI rendering",
      "Advanced multi-step agent reasoning and computer use",
      "Extremely natural, objective, and empathetic writing style"
    ],
    pros: [
      "The undisputed absolute best model for coding and debugging",
      "Extremely reliable instruction following",
      "Artifacts provide a revolutionary interactive interface",
      "Fewer safety hallucination refusals compared to older Claude versions"
    ],
    cons: [
      "No native image generation tool",
      "Lacks real-time search grounding in standard client",
      "Rate limits can be restrictive on Claude Pro"
    ],
    pricingInput: 3.00, // per 1M tokens
    pricingOutput: 15.00, // per 1M tokens
    contextWindow: 200000,
    speedScore: 88,
    accuracyScore: 97,
    codingScore: 99,
    writingScore: 96,
    reasoningScore: 95,
    imagesScore: 90, // vision
    voiceScore: 0,
    hasApi: true,
    bestFor: "Software development, code-refactoring, long-document comprehension, and building web apps.",
    benchmarks: {
      mmlu: 88.7,
      gpqa: 59.4,
      math: 71.1,
      humanEval: 92.0
    },
    alternatives: ["gpt-4o", "gemini-1.5-pro", "deepseek-coder"],
    faqs: [
      { question: "What is Claude's context window?", answer: "Claude 3.5 Sonnet features a massive 200,000-token context window, letting you paste entire codebases or 500-page books." },
      { question: "Does Claude support image generation?", answer: "No, Claude cannot generate images, though it has world-class vision capabilities for reading images, PDFs, and charts." }
    ],
    logo: "Cpu"
  },
  {
    id: "gpt-4o",
    name: "GPT-4o (Omni)",
    companyId: "openai",
    companyName: "OpenAI",
    releaseDate: "May 2024",
    overview: "GPT-4o is OpenAI's flagship multimodal model, engineered for high-speed voice, vision, and text processing. It represents the 'Omni' generation where voice and image understanding are processed end-to-end natively without latencies.",
    features: [
      "Native real-time conversational voice mode",
      "DALL-E 3 image generation integrated directly",
      "Lightning-fast response speeds",
      "Sophisticated web search and grounding",
      "Strong coding, analytics, and tool manipulation"
    ],
    pros: [
      "Fastest response latency in the elite class",
      "Best-in-class multi-lingual voice conversations",
      "Integrated image generation with excellent text alignment",
      "Incredible web browsing and data scraping"
    ],
    cons: [
      "Coding logical consistency can occasionally slip below Claude 3.5 Sonnet",
      "Strict rate limits on free plans"
    ],
    pricingInput: 2.50,
    pricingOutput: 10.00,
    contextWindow: 128000,
    speedScore: 95,
    accuracyScore: 94,
    codingScore: 91,
    writingScore: 92,
    reasoningScore: 91,
    imagesScore: 95, // has native gen & vision
    voiceScore: 98,
    hasApi: true,
    bestFor: "Real-time voice chats, web-grounded research, multi-turn generic assistants, and rapid ideation.",
    benchmarks: {
      mmlu: 88.7,
      gpqa: 53.6,
      math: 76.6,
      humanEval: 90.2
    },
    alternatives: ["claude-3-5-sonnet", "gemini-2.0-flash", "grok-2"],
    faqs: [
      { question: "Can GPT-4o browse the internet?", answer: "Yes, GPT-4o has highly advanced Bing search grounding that lets it crawl live web pages to answer recent events." },
      { question: "Is GPT-4o free?", answer: "Yes, OpenAI offers limited free access on ChatGPT, with paid subscribers getting 5x the limit and advanced Voice." }
    ],
    logo: "Brain"
  },
  {
    id: "gemini-2-5-pro",
    name: "Gemini 2.5 Pro",
    companyId: "google-deepmind",
    companyName: "Google DeepMind",
    releaseDate: "December 2024",
    overview: "Gemini 2.5 Pro is Google's flagship reasoning and context model. It features an unprecedented 2-Million-token context window that can digest hours of video, massive code repos, or audio files natively.",
    features: [
      "Unmatched 2-Million token native context window",
      "Native multimodal video and audio ingestion",
      "Google Search live grounding with clickable sources",
      "High-speed reasoning and logic",
      "Built-in Google Workspace integrations"
    ],
    pros: [
      "Unique ability to analyze up to 2 hours of HD video or 1.5M lines of code",
      "Flawless retrieval accuracy across the entire 2M window (needle-in-a-haystack)",
      "Best integration with live search and Maps grounding"
    ],
    cons: [
      "Can occasionally be overly safety-restrictive",
      "API pricing is higher than newer competitors like DeepSeek"
    ],
    pricingInput: 7.00,
    pricingOutput: 21.00,
    contextWindow: 2000000,
    speedScore: 84,
    accuracyScore: 95,
    codingScore: 90,
    writingScore: 93,
    reasoningScore: 94,
    imagesScore: 92,
    voiceScore: 95,
    hasApi: true,
    bestFor: "Video content analysis, massive multi-file code debugging, Workspace automation, and research reports.",
    benchmarks: {
      mmlu: 89.0,
      gpqa: 58.5,
      math: 74.5,
      humanEval: 88.9
    },
    alternatives: ["claude-3-5-sonnet", "gpt-4o", "o1"],
    faqs: [
      { question: "How large is Gemini's context window?", answer: "Gemini 2.5 Pro features a 2,000,000 token context window, which is 10 times larger than almost any competitor." },
      { question: "Can Gemini process video directly?", answer: "Yes, you can upload video files and Gemini will analyze both the visual action and spoken dialogue directly without needing a transcript." }
    ],
    logo: "Sparkles"
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek-R1",
    companyId: "deepseek",
    companyName: "DeepSeek",
    releaseDate: "January 2025",
    overview: "DeepSeek-R1 is an elite reasoning model that uses reinforcement learning to 'think' in a visible scratchpad before outputting answers. It matches OpenAI's o1 in math, coding, and STEM reasoning while being completely open-source (MIT licensed) and 95% cheaper to run.",
    features: [
      "Visible thinking process showing self-correction loops",
      "Open-weights available for offline local execution",
      "Unmatched cost-to-performance ratio globally",
      "Shattering performance in math, science, and competition coding"
    ],
    pros: [
      "Math and reasoning capabilities that rival or beat closed frontier models",
      "Open-source weights can be self-hosted on private servers",
      "Incredible price point ($0.55 per 1M input tokens is virtually free)"
    ],
    cons: [
      "Slower response time due to generation of 'thinking' tokens",
      "Less optimized for casual conversations or rapid, short chats",
      "English/Chinese bilingual focuses; some other languages lack nuances"
    ],
    pricingInput: 0.55,
    pricingOutput: 2.19,
    contextWindow: 128000,
    speedScore: 60,
    accuracyScore: 96,
    codingScore: 98,
    writingScore: 85,
    reasoningScore: 99,
    imagesScore: 0,
    voiceScore: 0,
    hasApi: true,
    bestFor: "Hard logic problems, advanced scientific queries, math tutoring, and complex code architecture synthesis.",
    benchmarks: {
      mmlu: 90.8,
      gpqa: 62.1,
      math: 93.1,
      humanEval: 92.8
    },
    alternatives: ["o1", "gpt-4o", "claude-3-5-sonnet"],
    faqs: [
      { question: "What are thinking tokens?", answer: "DeepSeek-R1 uses intermediate tokens where it drafts and critiques its own logic. You see this as a 'Thinking...' block before the final answer." },
      { question: "Is DeepSeek-R1 safe for corporate data?", answer: "Since the model is open source, companies can self-host the weights, ensuring 100% data privacy." }
    ],
    logo: "ShieldCheck"
  },
  {
    id: "grok-2",
    name: "Grok 2",
    companyId: "xai",
    companyName: "xAI",
    releaseDate: "August 2024",
    overview: "Grok 2 is xAI's premier assistant integrated natively into X (Twitter). It specializes in real-time information retrieval, witty commentary, and high-quality Flux image generation with very few creative constraints.",
    features: [
      "Direct integration with X's real-time public feed",
      "State-of-the-art Flux 1.0 image generation integrated",
      "Humorous and 'rebellious' modes",
      "Rapid reasoning and excellent factual retrieval"
    ],
    pros: [
      "Unequaled access to breaking news and viral trends",
      "Flux image generation is considered the best for photo-realism and text inside images",
      "Excellent coding and logic performance"
    ],
    cons: [
      "Can occasionally include unverified social media opinions in searches",
      "Requires an X Premium subscription for web chat access"
    ],
    pricingInput: 2.00,
    pricingOutput: 10.00,
    contextWindow: 131072,
    speedScore: 90,
    accuracyScore: 91,
    codingScore: 88,
    writingScore: 89,
    reasoningScore: 89,
    imagesScore: 96, // vision + Flux image gen is supreme
    voiceScore: 0,
    hasApi: true,
    bestFor: "Tracking breaking news, trend analysis, unrestricted image generation, and social media writing.",
    benchmarks: {
      mmlu: 87.5,
      gpqa: 48.0,
      math: 68.0,
      humanEval: 85.0
    },
    alternatives: ["gpt-4o", "claude-3-5-sonnet", "gemini-2.0-flash"],
    faqs: [
      { question: "How does Grok get live news?", answer: "Grok is plugged directly into the X platform, allowing it to read posts, links, and breaking stories as they happen." },
      { question: "What image generator does Grok use?", answer: "Grok uses Flux.1 by Black Forest Labs, which is famous for hyper-realistic human skin textures and writing text inside images cleanly." }
    ],
    logo: "Atom"
  },
  {
    id: "llama-3-3-70b",
    name: "Llama 3.3 (70B)",
    companyId: "meta",
    companyName: "Meta",
    releaseDate: "December 2024",
    overview: "Llama 3.3 70B is Meta's flagship open-weights model designed for high efficiency. It delivers the same performance tier as GPT-4 class models while requiring only standard enterprise GPUs to run locally.",
    features: [
      "Highly optimized 70 Billion parameter weights",
      "Native support for complex tool-calling and agent steps",
      "Multilingual support across 8+ languages",
      "Excellent structured JSON outputs"
    ],
    pros: [
      "Completely free to download, modify, and run locally",
      "Excellent safety tuning that doesn't over-refuse",
      "Outstanding speed and throughput"
    ],
    cons: [
      "Requires substantial server memory (VRAM) to host independently",
      "Not as strong in raw reasoning as DeepSeek-R1 or Claude 3.5 Sonnet"
    ],
    pricingInput: 0.70,
    pricingOutput: 2.10,
    contextWindow: 128000,
    speedScore: 92,
    accuracyScore: 90,
    codingScore: 85,
    writingScore: 88,
    reasoningScore: 86,
    imagesScore: 0,
    voiceScore: 0,
    hasApi: true,
    bestFor: "Enterprise custom fine-tuning, local secure database integrations, high-volume classification, and JSON parsing.",
    benchmarks: {
      mmlu: 86.0,
      gpqa: 46.2,
      math: 60.5,
      humanEval: 81.0
    },
    alternatives: ["qwen-2-5-coder", "mistral-large-2", "gpt-4o-mini"],
    faqs: [
      { question: "Is Llama free?", answer: "Yes, Meta releases Llama under an open license that is free for commercial use up to 700M monthly active users." }
    ],
    logo: "Globe"
  }
];

export const TOOLS: AITool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "AI Chatbots",
    description: "The world's most popular conversational AI. Supports search, voice, image creation via DALL-E, and complex data analysis.",
    url: "https://chatgpt.com",
    pricingType: "Freemium",
    rating: 4.8,
    features: ["Advanced voice mode", "DALL-E 3 image generation", "GPT Store plugins", "Custom GPTs"],
    image: "chatgpt.png"
  },
  {
    id: "cursor",
    name: "Cursor AI",
    category: "Coding",
    description: "The AI-first code editor built on top of VS Code. Allows multi-file edits, inline code generation, and chat with your entire codebase.",
    url: "https://cursor.com",
    pricingType: "Freemium",
    rating: 4.9,
    features: ["Composer (multi-file editing)", "Codebase indexing", "Tab autocomplete", "Terminal command prediction"],
    image: "cursor.png"
  },
  {
    id: "perplexity",
    name: "Perplexity",
    category: "AI Search",
    description: "An AI-powered search engine that scans the web, synthesizes sources, and provides structured answers with full citations.",
    url: "https://perplexity.ai",
    pricingType: "Freemium",
    rating: 4.7,
    features: ["Pro Search with multi-step reasoning", "File and image upload", "Focus search modes", "Collections and notes"],
    image: "perplexity.png"
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "Image Generation",
    description: "The gold-standard for artistic, hyper-realistic, and cinematic image generation. Accessible via web and Discord.",
    url: "https://midjourney.com",
    pricingType: "Paid",
    rating: 4.8,
    features: ["Unmatched image aesthetics", "Web UI editor", "Pan, zoom, and regional editing", "Style reference and character weight"],
    image: "midjourney.png"
  },
  {
    id: "suno",
    name: "Suno",
    category: "Music Generation",
    description: "Generate full-length songs with vocals, lyrics, and complex instrumentation in any genre from a simple text description.",
    url: "https://suno.com",
    pricingType: "Freemium",
    rating: 4.6,
    features: ["Vocal generation", "Custom lyrics editor", "Audio-to-audio style transfer", "MP3/WAV export"],
    image: "suno.png"
  },
  {
    id: "runway-gen3",
    name: "Runway Gen-3 Alpha",
    category: "Video Generation",
    description: "State-of-the-art AI video generation model capable of creating photorealistic cinematic scenes, smooth camera motion, and deep physics.",
    url: "https://runwayml.com",
    pricingType: "Paid",
    rating: 4.7,
    features: ["Photorealistic video output", "Advanced motion brush", "High frame rates", "Inpainting and outpainting"],
    image: "runway.png"
  },
  {
    id: "v0-dev",
    name: "v0 by Vercel",
    category: "Coding",
    description: "A generative UI system by Vercel. Input a description of a component, and v0 generates beautiful React/TypeScript code using Tailwind CSS and Radix.",
    url: "https://v0.dev",
    pricingType: "Freemium",
    rating: 4.9,
    features: ["Live previewing", "Tailwind + Shadcn React output", "Figma design system mapping", "One-click Vercel deploy"],
    image: "v0.png"
  }
];

export const NEWS: NewsItem[] = [
  {
    id: "deepseek-r1-launch",
    title: "DeepSeek-R1 Launch Stuns Silicon Valley",
    category: "Model Release",
    date: "July 5, 2026",
    summary: "The Chinese quantitative firm's open-weights model matches OpenAI's o1 at 95% cheaper inference and training costs, triggering a worldwide scramble for efficient reasoning architectures.",
    content: `In a stunning development, Hangzhou-based DeepSeek has released **DeepSeek-R1**, a massive open-source reasoning model that directly competes with top-tier closed models like OpenAI's o1 and Anthropic's Claude 3.5 Sonnet.

The model represents a massive breakthrough in open weights:
- **Reinforcement Learning Breakthrough**: DeepSeek used purely reinforcement learning to train R1, showing a visible scratchpad where the model self-corrects, loops back, and reasons before outputting.
- **Extreme Cost Efficiency**: While OpenAI o1 costs $15 per million tokens, DeepSeek-R1 is priced at $0.55 per million input tokens, bringing advanced reasoning to independent developers.
- **MIT License**: The model is fully open-weights, meaning anyone can download, fine-tune, or host it locally without any restrictive API paywalls.

Many top analysts in the US and Europe are calling this the "Netscape moment" of artificial intelligence, forcing major tech giants to reconsider high-cost model training strategies.`,
    source: "MIT Technology Review",
    readTime: "3 min read"
  },
  {
    id: "gemini-native-audio",
    title: "Google DeepMind Unveils Gemini 2.5 Pro with Live Audio Pipeline",
    category: "Company Announcement",
    date: "July 2, 2026",
    summary: "Google's newest model processes native vocal tones, sarcasm, and speed variations end-to-end with virtually zero delay, opening new doors for phone agent automation.",
    content: `Google DeepMind has officially rolled out **Gemini 2.5 Pro**, upgrading its multi-modal framework to support fully native audio input and output.

Unlike traditional voice bots that convert speech-to-text, send it to an LLM, and convert text-to-speech back, Gemini 2.5 Pro processes audio directly:
- **Emotional Latency**: The model can hear sarcasm, urgency, and whispers, adapting its own output tone to match the user.
- **Instant Response**: Latency has been cut down to under 200ms, making conversations feel completely natural and human-like.
- **2-Million Context Window**: Users can upload hours of podcasts or client calls and search them instantly for specific spoken phrases.

Gemini 2.5 Pro is now live in Google AI Studio and Google Cloud Vertex AI, with pricing set at highly competitive developer rates.`,
    source: "AIIndex News Desk",
    readTime: "4 min read"
  }
];

export const GUIDES: Guide[] = [
  {
    id: "prompt-engineering-mastery",
    title: "The Ultimate Guide to Advanced Prompt Engineering",
    category: "Beginner",
    date: "June 28, 2026",
    summary: "Stop writing simple paragraphs. Learn the exact structures, system variables, and XML tag techniques used by top AI engineers to get consistent, structured results.",
    content: `Many users treat Large Language Models like Google searches, writing simple 5-word sentences and expecting magic. To truly unlock models like Claude 3.5 Sonnet and GPT-4o, you need structured, semantic formatting.

### 1. The Roleplay & Intent Setup
Always tell the model exactly who it is and what the boundaries are.
*Bad:* "Write an article about gardening."
*Good:* "You are an expert horticulturalist with 20 years of experience. Write a concise, actionable guide on organic soil aeration for urban environments."

### 2. Using XML Tags for Context Separation
Frontier models like Claude are heavily trained on XML tags (e.g., \`<context>\`, \`<rules>\`). It helps the model distinguish instructions from inputs.
\`\`\`xml
<system_instructions>
Analyze the following email and categorize it as high, medium, or low priority.
</system_instructions>

<email_content>
Hello, our database is down and we are losing $500 per hour. Help!
</email_content>
\`\`\`

### 3. Chain-of-Thought (CoT) Prompting
For hard math or logic problems, explicitly instruct the model to write out its steps first.
Add: "Explain your reasoning step-by-step in a <thinking> tag before providing the final answer."

By implementing these three simple structures, you will see an immediate 40%+ improvement in response structure and accuracy.`,
    author: "Elena Rostov, Chief Prompt Architect",
    readTime: "5 min read"
  },
  {
    id: "cursor-ai-developers",
    title: "AI for Developers: Mastering Cursor and v0 for Rapid Coding",
    category: "Developer",
    date: "June 20, 2026",
    summary: "Discover how to combine Cursor's multi-file Composer with Vercel's v0 to build, style, and deploy full React applications in under an hour.",
    content: `Software engineering has evolved. We are no longer just writing lines of code; we are orchestrating AI models to build architectures for us. Here is the dual-combo workflow used by elite modern developers.

### Step 1: UI Generation with Vercel v0
Start by using **v0.dev** to describe your user interface. Mention layout, colors, and interactive elements.
- *Prompt Example*: "Create a responsive, dashboard page with a sidebar, dark-mode slate theme, a user-profile widget, and interactive Recharts bar charts using Tailwind."
- v0 will output beautiful, clean React components using Tailwind CSS and Radix.

### Step 2: Full-Stack Orchestration with Cursor
Copy the v0 code into **Cursor**. Open Cursor's **Composer** (Cmd + I / Ctrl + I):
- **Index your codebase**: Make sure Cursor has fully read your project structure.
- **Use Multi-File Edit**: Ask Composer to bind the components together.
- *Prompt Example*: "I need to connect this new dashboard component to our local express backend. Create the API routes in server.ts, add typings in types.ts, and link the fetch triggers."

By utilizing this stack, you skip 4 hours of boilerplate styling and API binding, letting you focus 100% on core business logic and features.`,
    author: "Marcus Vance, Full Stack Lead",
    readTime: "7 min read"
  }
];

export const PROMPTS: Prompt[] = [
  {
    id: "code-architect",
    title: "Front-End Code Architect & Refactorer",
    category: "Coding",
    promptText: "Act as an expert Senior Frontend Engineer. Review the following React component and refactor it for performance, modern TypeScript safety, accessibility, and strict Tailwind styling. Explain every optimization you make inside a <reasoning> block, then output the fully refactored, production-ready code.",
    useCase: "Refactoring messy React files into clean, modular, and optimized components.",
    tags: ["React", "Tailwind", "TypeScript", "Performance"]
  },
  {
    id: "marketing-wizard",
    title: "Viral Copywriting & Hook Generator",
    category: "Marketing",
    promptText: "You are a world-class copywriter specializing in viral organic marketing on Twitter and LinkedIn. Read the following article summary and generate 5 distinct 'hooks' (opening sentences) that maximize click-through rate, avoiding generic AI-isms. Each hook should leverage a different psychological trigger (curiosity, loss aversion, counter-intuitive data, story-first, or direct-benefit).",
    useCase: "Drafting high-converting social media headers for technology announcements.",
    tags: ["Copywriting", "Marketing", "Hooks", "Social Media"]
  }
];
