import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";

import Room from "../Misc/Room";
import Chat from "../Misc/Chat";
import Spinner from "../Misc/Spinner";
import { TagsContext } from "../../context/tagsContext";
import {
  adjectives,
  animals,
  colors,
  Config,
  uniqueNamesGenerator,
} from "unique-names-generator";
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

const randomNameConfig: Config = {
  dictionaries: [[...colors, ...adjectives], animals],
  length: 2,
  separator: " ",
  style: "capital",
};
const Hero = () => {
  const [messages, setMessages] = useState<Messages[]>(sampleMessages);
  const [isWaiting, setIsWaiting] = useState<boolean>(true);

  const tagsContext = useContext(TagsContext);

  const socket = useRef<any>();

  // Random names generated
  const [myName, setMyName] = useState<string>(
    uniqueNamesGenerator(randomNameConfig)
  );
  const [otherName, setOtherName] = useState<string>(
    uniqueNamesGenerator(randomNameConfig)
  );

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    socket.current = io.connect({
      query: { "x-auth-token": token },
    });
    let data: any = {
      role: "supporter",
    };
    tagsContext.tags.forEach((tag: any) => {
      data[tag.name] = tag.isSelected;
    });
    socket.current.emit("waiting-room", data);
    socket.current.on("join-room", (data: { seeker: string }) => {
      console.log(data.seeker, " is seeker and want to join room");
      socket.current.emit("join-room", data.seeker);
    });
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
      <Room myName={myName} isWaiting={isWaiting} role="supporter">
        {isWaiting ? (
          <Spinner />
        ) : (
          <Chat messages={messages} role="supporter" onSubmit={sendMessage} />
        )}
      </Room>
    </div>
  );
};

export default Hero;
