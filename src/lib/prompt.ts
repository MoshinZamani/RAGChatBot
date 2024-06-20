import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { retriever } from "@/utils/retriever";
import { arrayToString } from "@/utils/arraytToString";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";

export async function prompt() {
  const openAIllm = new ChatOpenAI();

  const standaloneTemplate =
    "Generate a standalone question from the given question: {question}";

  const standalonePrompt = PromptTemplate.fromTemplate(standaloneTemplate);

  // const standaloneChain = RunnableSequence.from([
  //   standalonePrompt,
  //   openAIllm,
  //   new StringOutputParser(),
  // ]);

  // const retrieverChain = RunnableSequence.from([retriever,])

  const answerTemplate =
    "Given a question and possible answers to that question create a friendly, concise and helpful answer: {question} {possibleAnswers}";

  const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

  // const Chain = standalonePrompt
  //   .pipe(openAIllm)
  //   .pipe(new StringOutputParser())
  //   .pipe(retriever)
  //   .pipe(arrayToString)
  //   .pipe(answerPrompt);

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
      possibleAnswers: retrieverChain,
      question: ({ original_question }) => original_question.question,
    },
    answerChain,
  ]);
  const standaloneResponse = await chain.invoke({
    question:
      "what are the technical requirements for running scrimba? I only have a old laptop which is not that powerful.",
  });
  console.log(standaloneResponse);
}
