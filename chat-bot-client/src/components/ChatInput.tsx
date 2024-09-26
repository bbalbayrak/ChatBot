import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

interface ChatInputProps {
  enteredText: string;
  setEnteredText: (text: string) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  scrollState?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  enteredText,
  setEnteredText,
  scrollRef,
  scrollState,
}) => {
  const [value, setValue] = useState("");
  const [scroll, setScroll] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEnteredText(e.currentTarget.value);
      setValue("");
      setScroll(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
    setScroll(false);
    console.log(enteredText, scrollRef, scroll, scrollState);
  }, [enteredText, scrollRef, scroll, scrollState]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center w-1/2 relative">
        <input
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-grow h-12 rounded-lg px-4 py-1 bg-gray2 focus:border-1 border-gray-300 text-gray-300"
          placeholder="Type your message..."
        />
        <div className="ml-2 bg-gray-500 flex justify-center items-center p-3 rounded-full">
          <FaArrowUp className="text-gray-200 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
