import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { retriever } from "@/utils/retriever";
import { arrayToString } from "@/utils/arraytToString";

export async function prompt() {
  const openAIllm = new ChatOpenAI();

  const standaloneTemplate =
    "Generate a standalone question from the given question: {question}";

  const standalonePrompt = PromptTemplate.fromTemplate(standaloneTemplate);

  const Chain = standalonePrompt
    .pipe(openAIllm)
    .pipe(new StringOutputParser())
    .pipe(retriever);

  const standaloneResponse = await Chain.invoke({
    question:
      "I am a web developer, recently graduated from university and want to know where to start to find a job?",
  });

  const answerTemplate =
    "Given a question and possible answers to that question create a friendly, concise and helpful answer: {question} {possibleAnswers}";

  const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

  const answerChain = answerPrompt.pipe(openAIllm);

  const answerResponse = await answerChain.invoke({
    question:
      "I am a web developer, recently graduated from university and want to know where to start to find a job?",
    possibleAnswers: arrayToString(standaloneResponse),
  });
  //   console.log(standaloneResponse);
}
