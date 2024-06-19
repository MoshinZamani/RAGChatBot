import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";

const openAIApiKey = process.env.OPENAI_API_KEY!;
const sbUrl = process.env.SUPABASE_URL!;
const sbApiKey = process.env.SUPABASE_API_KEY!;

const client = createClient(sbUrl, sbApiKey);
const embeddings = new OpenAIEmbeddings({ openAIApiKey });

const vectoreStore = new SupabaseVectorStore(embeddings, {
  client,
  tableName: "documents",
  queryName: "match_documents",
});

const retriever = vectoreStore.asRetriever();

export { retriever };
