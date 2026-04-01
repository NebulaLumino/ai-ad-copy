import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: "https://api.deepseek.com/v1" });

export async function POST(req: NextRequest) {
  try {
    const { product, targetAudience, platform, goal } = await req.json();
    const prompt = `Write high-converting ad copy:\nProduct/Service: ${product || "Product description"}\nTarget Audience: ${targetAudience || "Ideal customer profile"}\nPlatform: ${platform || "Social media"}\nCampaign Goal: ${goal || "Drive conversions"}\n\nProvide 3 ad variations: headline, body copy, and CTA. Make them punchy, benefit-focused, and action-oriented.`;
    const completion = await client.chat.completions.create({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], max_tokens: 1500, temperature: 0.8 });
    return NextResponse.json({ result: completion.choices[0]?.message?.content || "No output." });
  } catch (e) { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
