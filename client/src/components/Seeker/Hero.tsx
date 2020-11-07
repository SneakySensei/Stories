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
    socket.current.on("send-to-seeker", (data: { message: string }) => {
      console.log(`supporter says ${data.message}`);
      setMessages((prevState) => [
        ...prevState,
        { message: data.message, role: "supporter" },
      ]);
    });
  }, []);

  const sendMessage = (message: string) => {
    console.log(message, "from seeker component");
    socket.current.emit("send-to-supporter", { message }, () => {
      console.log(`sent ${message} to supporter`);
    });
    setMessages((prevState) => [...prevState, { message, role: "seeker" }]);
  };

  return (
    <div>
      <Room role="seeker">
        <Chat messages={messages} role="seeker" onSubmit={sendMessage} />
      </Room>
    </div>
  );
};

export default Hero;
