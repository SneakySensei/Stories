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
    message: "Hi welcome to Stories!",
    role: "seeker",
  },
  {
    message: "Start typing and helping people.",
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
  let seekerId: string;

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
      seekerId = data.seeker;
      socket.current.emit("join-room", data.seeker, (data: boolean) => {
        console.log("room match", data);
        setIsWaiting(false);
      });
    });
    socket.current.on("sent-from-seeker", (data: { message: string }) => {
      console.log(`seeker says ${data.message}`);
      setMessages((prevState) => [
        ...prevState,
        { message: data.message, role: "seeker" },
      ]);
    });
    socket.current.on("close-room", () => {
      window.location.pathname = "/";
    });
  }, []);

  const sendMessage = (message: string) => {
    console.log(message, "from helper component");
    socket.current.emit("send-to-seeker", { message }, () => {
      console.log(`sent ${message} to seeker`);
    });
    setMessages((prevState) => [...prevState, { message, role: "supporter" }]);
  };

  const onDisconnectHandler = () => {
    console.log("on disconnect");
    socket.current.emit("close-room", { otherUser: seekerId });
    window.location.pathname = "/";
  };

  return (
    <div>
      <Room
        myName={myName}
        isWaiting={isWaiting}
        role="supporter"
        onDisconnect={onDisconnectHandler}
      >
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
