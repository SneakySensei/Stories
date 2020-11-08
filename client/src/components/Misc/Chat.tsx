import React, { FormEvent, useRef, useState } from "react";

import SendIcon from "./SendIcon";

interface Messages {
  message: string;
  role: "seeker" | "supporter";
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
    props.onSubmit(message!);
    messageInputRef.current!.value = "";
  };

  return (
    <div className="flex flex-col justify-end w-full h-screen bg-background">
      <div className="flex flex-1 flex-col bg-background overflow-y-scroll">
        {props.messages.map((message) => (
          <div
            key={`${message.message.substring(0, 10)}${Math.random()}`}
            className="chat-msg w-full flex"
          >
            <div
              className={`message ${
                message.role === props.role ? "byYouMessage" : "notByYouMessage"
              }`}
            >
              {message.message}
            </div>
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
          className="flex h-12 w-12 p-1 rounded-full mr-4"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default Chat;
