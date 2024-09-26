import { useRef, useState } from "react";
import "./App.css";
import ChatInput from "./components/ChatInput";
import MessageBox from "./components/MessageBox";

function App() {
  const [enteredText, setEnteredText] = useState("");
  const scrollRef = useRef(null);
  const [scroll, setScroll] = useState(false);

  return (
    <div className="bg-gray1 w-full h-screen flex flex-col gap-6">
      <MessageBox
        scrollState={scroll}
        enteredText={enteredText}
        scrollRef={scrollRef}
        setScroll={setScroll}
      />
      <ChatInput
        scrollState={scroll}
        scrollRef={scrollRef}
        enteredText={enteredText}
        setEnteredText={setEnteredText}
      />
    </div>
  );
}

export default App;
