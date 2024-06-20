"use client";

import { textSplitToVector } from "@/lib/textSplitToVector";
import { useState } from "react";

export default function Chat() {
  //   await textSplitToVector();
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState<string>("");

  const handleClick = async () => {
    try {
      const result = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
      const { response } = await result.json();
      setMessages([...messages, { user: question, ai: response }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-screen border-2 border-black justify-center items-center">
      <div className="h-full w-1/2 border-2 border-black">
        {messages.length !== 0 &&
          messages.map((message) => (
            <div key={message.ai}>
              <li>{message.user}</li>
              <li>{message.ai}</li>
            </div>
          ))}
      </div>
      <div className="w-1/2 border-2 border-black">
        <input
          type="text"
          value={question}
          placeholder="Ask here..."
          onChange={(e) => setQuestion(e.target.value)}
          className="w-3/4"
        />
        <button className="bg-green-300" onClick={handleClick}>
          Send
        </button>
      </div>
    </div>
  );
}
