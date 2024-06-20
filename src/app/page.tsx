import { textSplit } from "@/lib/textSplit";
import { prompt } from "@/lib/prompt";
import { runnable } from "@/lib/runnable";

export default async function Home() {
  // await textSplit();
  prompt();
  // runnable();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
