export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const { apiKey, messages } = req.body;
  if (!apiKey || !messages) {
    return res.status(400).json({ error: "Brak apiKey lub messages" });
  }

  const contents = messages.map(m => ({
    role: m.role === "model" ? "model" : "user",
    parts: (m.parts || []).map(p => ({ text: String(p.text || "") }))
  })).filter(m => m.parts.length > 0 && m.parts[0].text.trim() !== "");

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );
    const data = await resp.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
