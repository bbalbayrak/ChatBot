import React, { useEffect, useRef, useState } from "react";
import Chat from "./Chat";

interface MessageBoxProps {
  enteredText: string;
  scrollRef: React.RefObject<HTMLDivElement>;
  scrollState: boolean;
  setScroll: (scroll: boolean) => void;
}

interface Message {
  sender: "bot" | "user";
  text: string;
}
const MessageBox: React.FC<MessageBoxProps> = ({
  enteredText,
  scrollRef,
  scrollState,
  setScroll,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const isFirstFetch = useRef(true);

  const fetchQuestion = async (answer?: string) => {
    setScroll(true);
    const url = answer
      ? `http://localhost:3000/chat-bot/ask?answer=${answer}`
      : "http://localhost:3000/chat-bot/ask";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      if (data.question) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: data.question },
        ]);
      }
      if (data.message === "All questions done.") {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "All questions done." },
        ]);
      }
      setScroll(false);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  useEffect(() => {
    if (isFirstFetch.current) {
      fetchQuestion();
      isFirstFetch.current = false;
      return () => {
        console.log("First fetch done.");
      };
    }
  });

  useEffect(() => {
    if (enteredText === "") {
      return;
    }

    const sendAnswerAndFetchNextQuestion = async () => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: enteredText },
      ]);

      await fetchQuestion(enteredText);
    };

    if (enteredText) {
      sendAnswerAndFetchNextQuestion();
    }
  }, [enteredText]);

  return (
    <>
      <div className="h-[600px] bg-gray1 w-full overflow-y-auto flex flex-col items-center">
        {messages.map((message, index) => (
          <Chat key={index} sender={message.sender} text={message.text} />
        ))}
        <div ref={scrollRef} />
      </div>
    </>
  );
};

export default MessageBox;
