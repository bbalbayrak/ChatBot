interface Message {
  text: string;
  sender: "user" | "bot"; // 'user' sağda, 'bot' solda olacak
}

const Chat: React.FC<Message> = ({ sender, text }) => {
  return (
    <div className="w-1/2 mt-8">
      <div
        className={`flex mb-2 ${
          sender === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`${
            sender === "user" ? "bg-gray2" : "bg-gray2"
          } text-white p-3 rounded-lg max-w-xs`}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default Chat;
