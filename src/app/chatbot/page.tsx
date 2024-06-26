"use client";

import { useState } from "react";
import Image from "next/image";
import { RiSendPlane2Fill } from "react-icons/ri";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      user: "",
      ai: "Hello, my name is Chatty Mate. How can I help you today?",
    },
  ]);
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
    <div className="flex justify-center h-5/6 bg-gray-200 py-4">
      <div className="flex flex-col justify-center w-1/4 items-center bg-white h-screen py-4 rounded-3xl rounded-r-none">
        <div className="flex justify-start items-center w-full mt-2 pl-4 bg-white ">
          <Image
            src="/images/logo.png"
            alt="Chatty Mate Logo"
            width={80}
            height={80}
            className="pr-8 rounded-full"
          />
          <h3 className="font-bold">Chatty Mate</h3>
        </div>
        <div className="h-full w-full my-2 bg-blue-500 p-2">
          {messages.length !== 0 &&
            messages.map((message) => (
              <ul key={message.ai}>
                <li className="bg-white rounded-lg rounded-tl-none p-2 mb-2">
                  {message.ai}
                </li>
                <li className="bg-white rounded-lg rounded-br-none p-2">
                  {message.user}
                </li>
              </ul>
            ))}
        </div>
        <div className="flex justify-center w-full px-2">
          <div className="flex justify-between w-full border-2 border-blue-500 rounded-lg rounded-tl-none mb-2 mx-4 bg-white">
            <input
              type="text"
              value={question}
              placeholder="Ask here..."
              onChange={(e) => setQuestion(e.target.value)}
              className="w-3/4 p-2 focus:outline-none"
            />
            <button
              className="p-2 px-4 bg-blue-500 text-white"
              onClick={handleClick}
            >
              <RiSendPlane2Fill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
