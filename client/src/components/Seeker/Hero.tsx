import React, { useEffect, useRef } from "react";
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
  const socket = useRef<any>();

  useEffect(() => {
    socket.current = io.connect();
    socket.current.on("test", (data: any) => {
      console.log(data);
    });
    socket.current.on("message-to-seeker", (data: any) => {});
  }, []);

  return (
    <div>
      <Room role="seeker">
        <Chat messages={sampleMessages} role="seeker" />
      </Room>
    </div>
  );
};

export default Hero;
