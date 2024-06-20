import { textSplitToVector } from "@/lib/textSplitToVector";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <h1 className="font-bold">RAG ChatBot using OpenAI</h1>
        <p className="p-2">
          In order to use this application, first past your data into
          &quot;FAC.txt&quot; file and click the link below.
        </p>
        <Link href="/chatbot" className="underline text-blue-400">
          .../chatbot
        </Link>
      </div>
    </main>
  );
}
