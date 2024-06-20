import { promises as fs } from "fs";
import path from "path";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";

const sbURL = process.env.SUPABASE_URL!;
const sbApiKey = process.env.SUPABASE_API_KEY!;
const openAIApiKey = process.env.OPENAI_API_KEY!;

export async function textSplitToVector() {
  try {
    // Read FAC.txt
    const filePath = path.join(process.cwd(), "src/public", "fac.txt");
    const text = await fs.readFile(filePath, "utf-8");

    // Split text into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });
    const chunks = await splitter.createDocuments([text]);

    // Connect SupaBase
    const client = createClient(sbURL, sbApiKey);

    // Create an instance of OpenAI Embeddings
    const embeddings = new OpenAIEmbeddings({ openAIApiKey });

    // Turn chunks into vectors using embeddings
    // and insert into SupaBase vector store
    SupabaseVectorStore.fromDocuments(chunks, embeddings, {
      client,
      tableName: "documents",
    });
    console.log("Vectors inserted in vector store ");
  } catch (err) {
    console.error(err);
  }
}
