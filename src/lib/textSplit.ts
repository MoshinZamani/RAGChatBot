import fs from "fs/promises";
import path from "path";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";

const sbUrl = process.env.SUPABASE_URL!;
const sbApiKey = process.env.SUPABASE_API_KEY!;
const openAIApiKey = process.env.OPENAI_API_KEY!;

export async function textSplit() {
  try {
    //Read file
    const filePath = path.join(process.cwd(), "/src/public", "scrimba.txt");
    const text = await fs.readFile(filePath, "utf-8");

    // Split file into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
      separators: ["\n\n", "\n", " ", ""],
    });
    const chunks = await splitter.createDocuments([text]);

    // Create client to connect to SupaBase
    const client = createClient(sbUrl, sbApiKey);

    const embeddings = new OpenAIEmbeddings({ openAIApiKey });
    // Use OpenAI Embeddings to create vectores
    // and insert into SupaBase Vectore Store
    SupabaseVectorStore.fromDocuments(chunks, embeddings, {
      client,
      tableName: "documents",
    });

    console.log("VectoreStore full!!!");
  } catch (err) {
    console.error(err);
  }
}
