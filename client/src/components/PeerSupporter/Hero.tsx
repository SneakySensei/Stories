import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import Room from "../Misc/Room";
import Chat from "../Misc/Chat";

interface Messages {
  message: string;
  role: "seeker" | "supporter";
}

const sampleMessages: Messages[] = [
  {
    message:
      "Consectetur elit dolore sunt amet ullamco pariatur culpa deserunt voluptate anim tempor reprehenderit. Exercitation dolor laborum dolore veniam dolor occaecat nisi qui est ipsum est.",
    role: "seeker",
  },
  {
    message:
      "Ad officia ullamco ipsum adipisicing pariatur anim. Ullamco exercitation voluptate dolore do pariatur dolore. Cupidatat dolor qui aliqua anim eu minim laborum anim proident.",
    role: "supporter",
  },
];

const Hero = () => {
  const [messages, setMessages] = useState<Messages[]>(sampleMessages);
  const socket = useRef<any>();

  useEffect(() => {
    socket.current = io.connect();
    socket.current.on("send-to-supporter", (data: { message: string }) => {
      console.log(`seeker says ${data.message}`);
      setMessages((prevState) => [
        ...prevState,
        { message: data.message, role: "seeker" },
      ]);
    });
  }, []);

  const sendMessage = (message: string) => {
    console.log(message, "from helper component");
    socket.current.emit("send-to-seeker", { message }, () => {
      console.log(`sent ${message} to seeker`);
    });
    setMessages((prevState) => [...prevState, { message, role: "supporter" }]);
  };

  return (
    <div>
      <Room role="supporter">
        <Chat messages={messages} role="supporter" onSubmit={sendMessage} />
      </Room>
    </div>
  );
};

export default Hero;
