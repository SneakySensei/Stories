import React, { FormEvent, useRef, useState } from "react";

import SendIcon from "./SendIcon";

interface ChatProps {
  role: "helping" | "seeking help";
}

interface Messages {
  message: string;
  byYou: boolean;
}

const sampleMessages: Messages[] = [
  {
    message:
      "Consectetur elit dolore sunt amet ullamco pariatur culpa deserunt voluptate anim tempor reprehenderit. Exercitation dolor laborum dolore veniam dolor occaecat nisi qui est ipsum est.",
    byYou: true,
  },
  {
    message:
      "Ad officia ullamco ipsum adipisicing pariatur anim. Ullamco exercitation voluptate dolore do pariatur dolore. Cupidatat dolor qui aliqua anim eu minim laborum anim proident.",
    byYou: false,
  },
  {
    message:
      "In esse do consequat excepteur labore excepteur excepteur excepteur mollit sunt esse nostrud.",
    byYou: true,
  },
  {
    message:
      "Laborum velit exercitation occaecat et ipsum occaecat nisi dolore sit occaecat magna.",
    byYou: true,
  },
  {
    message:
      "Laborum velit exercitation occaecat et ipsum occaecat nisi dolore sit occaecat magna.",
    byYou: true,
  },
  {
    message:
      "Cupidatat cillum magna consectetur ut aliquip in duis eu excepteur duis enim est.",
    byYou: false,
  },
  {
    message:
      "Laborum velit exercitation occaecat et ipsum occaecat nisi dolore sit occaecat magna.",
    byYou: true,
  },
  {
    message:
      "Laborum velit exercitation occaecat et ipsum occaecat nisi dolore sit occaecat magna.",
    byYou: true,
  },
];

const Chat = (props: ChatProps) => {
  const [messages, setMessages] = useState<Messages[]>(sampleMessages);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const onMessageSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = messageInputRef.current?.value;
    console.log(message);
    setMessages((prevState: Messages[]) => [
      ...prevState,
      { message: message!, byYou: true },
    ]);
    messageInputRef.current!.value = "";
  };

  return (
    <div className="flex flex-wrap w-1/2 h-screen">
      <div className="flex w-full h-screen">
        <div className="mt-auto">
          <div className="flex flex-wrap bg-green-500 overflow-y-scroll max-h-9/10">
            {messages.map((message) => (
              <div className="w-full flex">
                <div
                  className={`message ${
                    message.byYou ? "byYouMessage" : "notByYouMessage"
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
