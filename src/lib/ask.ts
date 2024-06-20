import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { retriever } from "@/utils/retriever";
import { arrayToString } from "@/utils/arraytToString";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";

export async function ask(question: string) {
  try {
    const openAIllm = new ChatOpenAI();

    const standaloneTemplate =
      "Generate a standalone question from the given question: {question}";

    const standalonePrompt = PromptTemplate.fromTemplate(standaloneTemplate);

    const answerTemplate = `You are an enthusiadtic and helpful chat bot who can answer questions about Founders and Coders based on the provided possible answers in a friendly manner. If you really do not know the answer, say that you are sorry and for more question refer them to email hello@foundersandcoders.com
        possible answers:{possible_answers}
        question:{question}
        answer:`;

    const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

    const standaloneChain = RunnableSequence.from([
      standalonePrompt,
      openAIllm,
      new StringOutputParser(),
    ]);

    const retrieverChain = RunnableSequence.from([
      (prev) => prev.standalone_question,
      retriever,
      arrayToString,
    ]);

    const answerChain = answerPrompt
      .pipe(openAIllm)
      .pipe(new StringOutputParser());

    const chain = RunnableSequence.from([
      {
        standalone_question: standaloneChain,
        original_question: new RunnablePassthrough(),
      },
      {
        possible_answers: retrieverChain,
        question: ({ original_question }) => original_question.question,
      },
      answerChain,
    ]);
    const chainResponse = await chain.invoke({
      question,
    });
    return chainResponse;
  } catch (err) {
    console.error(err);
    return "";
  }
}
