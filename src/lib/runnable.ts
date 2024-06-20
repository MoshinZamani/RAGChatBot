import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";

const openAIApiKey = process.env.OPENAI_API_KEY!;

export async function runnable() {
  const llm = new ChatOpenAI({ openAIApiKey });

  const puntuationTemplate = `Given a sentence, add punctuation where needed.
    sentence: {sentence}
    sentence with punctuation:`;

  const punctuationPrompt = PromptTemplate.fromTemplate(puntuationTemplate);

  const grammerTemplate = `Given a sentence correct the grammer.
  sentence:{puntuated_sentence}
  sentence with correct grammer:`;

  const grammerPrompt = PromptTemplate.fromTemplate(grammerTemplate);

  const translationTemplate = `Given a sentence, translate that sentence into {language}
  sentence: {grammatically_correct_sentence}
  translated sentence:`;

  const translationPrompt = PromptTemplate.fromTemplate(translationTemplate);

  const punctuationChain = RunnableSequence.from([
    punctuationPrompt,
    llm,
    new StringOutputParser(),
  ]);

  const grammerChain = RunnableSequence.from([
    grammerPrompt,
    llm,
    new StringOutputParser(),
  ]);

  const translationChain = RunnableSequence.from([
    translationPrompt,
    llm,
    new StringOutputParser(),
  ]);

  const chain = RunnableSequence.from([
    {
      puntuated_sentence: punctuationChain,
      original_input: new RunnablePassthrough(),
    },
    {
      grammatically_correct_sentence: grammerChain,
      language: ({ original_input }) => original_input.language,
    },
    translationChain,
  ]);

  const response = await chain.invoke({
    sentence: "i dont liked mondays",
    language: "french",
  });

  console.log(response);
}
