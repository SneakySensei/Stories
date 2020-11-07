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
    <div className="flex flex-wrap w-1/2 h-screen">
      <div className="flex w-full h-screen">
        <div className="mt-auto">
          <div className="flex flex-wrap bg-green-500 overflow-y-scroll max-h-9/10">
            {props.messages.map((message) => (
              <div
                key={`${message.message.substring(0, 10)}${Math.random()}`}
                className="w-full flex"
              >
                <div
                  className={`message ${
                    message.role === props.role
                      ? "byYouMessage"
                      : "notByYouMessage"
                  }`}
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>
          <form className="flex flex-row h-1/10">
            <input
              type="text"
              name="message"
              placeholder="Start typing..."
              className="w-full bg-baseGreen"
              ref={messageInputRef}
            />
            <button
              type="submit"
              onClick={onMessageSubmit}
              className="flex w-24 h-24 p-3 rounded-full bg-red-600"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
