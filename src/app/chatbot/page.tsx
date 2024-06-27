"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { RiSendPlane2Fill } from "react-icons/ri";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      user: "",
      ai: "Hello, my name is Chatty Mate. How can I help you today?",
    },
  ]);
  const [question, setQuestion] = useState<string>("");

  const messagesDiv = useRef<HTMLDivElement>(null);
  const idRef = useRef<number>(0);

  useEffect(() => {
    if (messagesDiv.current)
      messagesDiv.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClick = async () => {
    setMessages([...messages, { id: idRef.current++, user: question, ai: "" }]);
    setQuestion("");

    try {
      const result = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
      const { response } = await result.json();
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === idRef.current++
            ? { ...message, ai: response }
            : message
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center h-5/6 bg-gray-300 py-4">
      <div className="flex flex-col justify-center w-1/4 items-center bg-white h-screen py-4 rounded-3xl rounded-r-none shadow-xl shadow-outline">
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
        <div className="h-full w-full my-2 bg-gray-300 p-2 overflow-y-auto">
          {messages.length !== 0 &&
            messages.map((message) => (
              <ul key={message.ai}>
                {message.user && (
                  <span className="flex justify-end">
                    <li className="ml-auto bg-blue-500 rounded-lg rounded-br-none p-2 mb-4 inline-block text-white">
                      {message.user}
                    </li>
                  </span>
                )}
                {message.ai && (
                  <li className="bg-white rounded-lg rounded-tl-none p-2 mb-4 inline-block">
                    {message.ai}
                  </li>
                )}
              </ul>
            ))}
          <div ref={messagesDiv} />
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
