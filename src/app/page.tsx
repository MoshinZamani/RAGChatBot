import { textSplit } from "@/lib/textSplit";
import { prompt } from "@/lib/prompt";

export default async function Home() {
  // await textSplit();
  prompt();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
