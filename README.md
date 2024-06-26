# NextJS and TypeScript Example Project

## A functional EXAMPLE project written in TypeScript with NextJS framework using TailwindCSS

This project is an example that was built to show how to build a chat bot using LangChain library to integrate the power of AI Chat(ChatGPT) into our web application.

Workflow

- Get our organisation's data and turn it into vectors through OpenAI Embeddings and save it into a vector store(SupaBase )
- Get user input and turn it into a standalone question
- Create vector out of the standalone question and look for answer in our vector store
- Pass the possible answers to OpenAI with a template and return the answer to the user

## How to install and run this project

The easiest way is to watch the video series as it is self-explanatory, but here is a short version.

1. Clone the project
2. Pase your data into FAC.txt file in public folder
3. Create a .env file and paste your Supabase url, Supabase API Key and Open AI API Key
4. Run textSplitToVector in lib folder so your file would be inserted into VectorStore
5. Run **_npm run dev_** and happy coding!

## How to tweak this project for your own uses

Since this is an example project, I'd encourage you to clone and rename this project to use to your own purposes. it's a good starter boilerplate.

## Find a bug?

If you found an issue or would like to submit an improvement to this project, please submit an issue using the issues tab above. If you would like to submit a PR with a fix, reference the issue you created!
