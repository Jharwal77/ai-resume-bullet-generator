require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini setup
function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in .env file.");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
}

// Prompt builder
function buildPrompt({ jobRole, projectName, technologies, description }) {
  return `You are an expert resume writer specializing in ATS-optimized resumes for tech professionals.

Generate exactly 5 resume bullet points for the following project:

Job Role: ${jobRole}
Project Name: ${projectName}
Technologies Used: ${technologies}
Project Description: ${description}

Requirements:
- Each bullet must start with a strong action verb (Developed, Implemented, Designed, Engineered, Optimized, Built, Architected, Delivered, Automated, Enhanced, Integrated, Deployed, Reduced, Increased, Streamlined)
- Every bullet must be under 25 words
- Use ATS-friendly keywords related to the job role and technologies
- Focus on impact, results, and accomplishments
- Do NOT number the bullets
- Do NOT use bullet symbols, dashes, or asterisks
- Return ONLY the 5 bullet points, one per line
- No preamble, no explanations, no headers`;
}

// POST /api/generate
app.post("/api/generate", async (req, res) => {
  try {
    const { jobRole, projectName, technologies, description } = req.body;

    // Validate
    if (!jobRole || !projectName || !technologies || !description) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const model = getModel();
    const prompt = buildPrompt({ jobRole, projectName, technologies, description });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const bullets = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .slice(0, 5);

    if (bullets.length === 0) {
      return res.status(500).json({ error: "Failed to generate bullets. Please try again." });
    }

    return res.json({ bullets });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({
      error: err.message.includes("GEMINI_API_KEY")
        ? "API key not configured. Please set GEMINI_API_KEY in .env"
        : "Something went wrong. Please try again.",
    });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Resume Bullet Generator API is running." });
});

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
