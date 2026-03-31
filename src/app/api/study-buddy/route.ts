import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await generateText({
      model: google("gemini-1.5-pro"),
      messages,
    });

    return Response.json({
      text: result.text,
    });
  } catch (err: any) {
    console.log("AI ERROR:", err);

    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}