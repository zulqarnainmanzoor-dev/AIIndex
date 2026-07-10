import Groq from "groq-sdk";

const FALLBACK_NEWS = [
  {
    title: "DeepSeek-R1 Launches with Open-Source Reasoning Power",
    summary: "The open-weights reasoning model achieves performance comparable to OpenAI's o1 at a fraction of the cost.",
    source: "MIT Technology Review",
    url: "https://www.technologyreview.com/"
  },
  {
    title: "Google DeepMind Unveils Gemini 2.5 Pro with Direct Voice Pipelines",
    summary: "The upgraded multimodal model processes live vocal tones, emotions, and speed variations end-to-end.",
    source: "Google DeepMind Blog",
    url: "https://deepmind.google/technologies/gemini/"
  },
  {
    title: "Anthropic Releases Claude 3.5 Sonnet to Unmatched Coding Acclaim",
    summary: "With advanced reasoning and state-of-the-art artifact previewing, the model becomes the gold standard for software engineers.",
    source: "Anthropic Research",
    url: "https://www.anthropic.com/news/claude-3-5-sonnet"
  },
  {
    title: "OpenAI Rolls Out GPT-4o with Native Real-Time Voice and Vision",
    summary: "The new flagship model integrates audio, visual, and text reasoning seamlessly into a single ultra-fast interface.",
    source: "OpenAI Blog",
    url: "https://openai.com/blog/gpt-4o/"
  },
  {
    title: "Meta Releases Llama 3.3 70b with State-Of-The-Art Efficiency",
    summary: "The open-source powerhouse delivers tier-one intelligence at highly optimized system constraints.",
    source: "Meta AI",
    url: "https://ai.meta.com/blog/meta-llama-3/"
  }
];

let newsCache = null;
const CACHE_TTL = 1000 * 60 * 60 * 12;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (newsCache && Date.now() - newsCache.timestamp < CACHE_TTL) {
    return res.status(200).json({ news: newsCache.data });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ news: FALLBACK_NEWS });
  }

  try {
    const groq = new Groq({ apiKey });
    const prompt = `Provide the 5 most recent and impactful headlines in the Artificial Intelligence industry from the last 7 days.
For each headline provide a title, a brief 1-sentence summary, and the publication name.
Focus on major model releases (OpenAI, Google, Anthropic, Meta), regulatory changes, or significant hardware breakthroughs.
Return ONLY a valid JSON array of objects with keys: "title", "summary", "source", "url". No extra text outside the JSON array.`;

    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 1024,
    });

    const raw = completion.choices[0]?.message?.content || "[]";
    const jsonMatch = raw.match(/\[.*\]/s);
    const newsData = jsonMatch ? JSON.parse(jsonMatch[0]) : FALLBACK_NEWS;

    newsCache = { data: newsData, timestamp: Date.now() };
    return res.status(200).json({ news: newsData });
  } catch (error) {
    console.error("News fetch error:", error);
    if (newsCache) return res.status(200).json({ news: newsCache.data });
    return res.status(200).json({ news: FALLBACK_NEWS });
  }
}
