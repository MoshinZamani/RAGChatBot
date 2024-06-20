import { ask } from "@/lib/ask";

export async function POST(request: Request, response: Response) {
  const { question } = await request.json();
  const result = await ask(question);

  return Response.json({ response: result });
}
