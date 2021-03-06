import React, { FormEvent, useEffect, useRef } from "react";

import SendIcon from "./SendIcon";

interface Messages {
  message: string;
  role: "seeker" | "supporter";
  isToxic?: boolean;
}

interface ChatProps {
  role: "seeker" | "supporter";
  onSubmit: (message: string) => void;
  messages: Messages[];
}

const Chat = (props: ChatProps) => {
  const messageInputRef = useRef<HTMLInputElement>(null);

  const onMessageSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = messageInputRef.current?.value;
    if (message!.trim().length > 0) {
      props.onSubmit(message!);
      messageInputRef.current!.value = "";
    }
  };

  useEffect(() => {
    let chatDiv = document.getElementById("chatDiv");
    chatDiv!.scrollTop = chatDiv!.scrollHeight;
  }, [props]);

  return (
    <div className="chatContainer flex flex-col justify-end w-full h-screen bg-background">
      <div
        className="flex flex-1 flex-col bg-background overflow-y-scroll"
        id="chatDiv"
      >
        {props.messages.map((message) => (
          <div
            key={`${message.message.substring(0, 10)}${Math.random()}`}
            className="chat-msg w-full flex flex-col"
          >
            <button
              className={`message focus:outline-none ${
                message.isToxic ? "blurred" : ""
              } ${
                message.role === props.role ? "byYouMessage" : "notByYouMessage"
              }`}
            >
              {message.message}
            </button>
            {message.isToxic && (
              <div className="text-red-600 text-sm font-bold ml-8 -mt-2">
                Censored! Tap to view
              </div>
            )}
          </div>
        ))}
      </div>
      <form className="flex flex-row items-center bg-accentDark h-16">
        <input
          type="text"
          name="message"
          placeholder="Start typing..."
          className="flex-1 self-stretch rounded-full bg-accent outline-none mx-4 my-2 px-4"
          ref={messageInputRef}
        />
        <button
          type="submit"
          onClick={onMessageSubmit}
          className="flex h-12 w-12 p-1 rounded-full mr-4 outline-none focus:outline-none"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default Chat;
