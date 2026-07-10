import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { modelA, modelB, customQuery } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(400).json({ error: "GROQ_API_KEY is not configured." });
  }

  const prompt = `You are the Lead AI Analyst for AIIndex, the global authority on artificial intelligence models, tools, and comparisons.
Analyze and compare **${modelA}** vs **${modelB}** in a highly professional, clinical, and data-driven manner.
${customQuery ? `The user has specified a specific topic/question: "${customQuery}"` : "Provide a comprehensive side-by-side analysis."}

Format your response using professional Markdown with these headings:

### Executive Summary
2-3 sentence definitive verdict on when to choose which model.

### Key Performance Trade-offs
Compare context windows, pricing, response latencies, and reasoning depth with numbers.

### Code & Engineering Analysis
Evaluate coding, schema generation, API integrations, and developer tooling.

### Final Verdict & Use Cases
Recommend which model for:
1. Enterprise scale production
2. Solo developer workflows on a budget
3. Real-time customer experience applications

Be authoritative, unbiased, deeply technical, and professional.`;

  try {
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const analysis = completion.choices[0]?.message?.content || "";
    return res.status(200).json({ analysis });
  } catch (error) {
    if (error.status === 429) {
      return res.status(429).json({ error: "Too many requests. Please wait a moment and try again." });
    }
    console.error("Groq API error:", error);
    return res.status(500).json({ error: error.message || "An error occurred." });
  }
}
