import { groq } from "@ai-sdk/groq"
import { generateObject } from "ai"
import { z } from "zod"

const analysisSchema = z.object({
  mood: z
    .string()
    .describe("The overall mood/emotion detected in the text (e.g., happy, sad, anxious, peaceful, excited, etc.)"),
  summary: z.string().describe("A very brief 10-15 word summary using 'you' to address the writer directly"),
})

export async function analyzeJournalEntry(content: string) {
  try {
    const result = await generateObject({
      model: groq("llama-3.1-8b-instant"),
      schema: analysisSchema,
      prompt: `Analyze this journal entry and determine the overall mood/emotion and provide a very brief summary.

Journal entry: "${content}"

Please provide:
1. A single word or short phrase describing the dominant mood/emotion
2. A very brief summary in exactly 10-15 words that directly addresses the writer using "you"

Examples of good summaries:
- "You reflected on work challenges and found new perspective"
- "You expressed gratitude for family time and felt content"
- "You're processing difficult emotions about recent changes"
- "You celebrated small wins and acknowledged personal growth"

Keep it concise, personal, and compassionate.`,
    })

    return {
      mood: result.object.mood,
      summary: result.object.summary,
    }
  } catch (error) {
    console.error("Error analyzing journal entry:", error)
    return {
      mood: "neutral",
      summary: "You shared your thoughts and feelings today",
    }
  }
}
