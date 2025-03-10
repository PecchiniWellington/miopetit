import { OpenAI } from "openai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return Response.json({ error: "Messaggio vuoto" }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Usa la variabile d'ambiente per sicurezza
    });

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Puoi usare anche "gpt-3.5-turbo" per ridurre i costi
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    });

    return Response.json(
      { reply: chatResponse.choices[0].message.content },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore ChatGPT:", error);
    return Response.json({ error: "Errore interno" }, { status: 500 });
  }
}
