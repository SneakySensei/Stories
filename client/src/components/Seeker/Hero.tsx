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
  isToxic?: boolean;
}

const sampleMessages: Messages[] = [
  {
    message: "Hi welcome to Stories!",
    role: "supporter",
  },
  {
    message:
      "Start typing and share your worries away. Your identity is completely hidden ;)",
    role: "seeker",
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
  const [supporterId, setSupporterId] = useState<string>();

  const tagsContext = useContext(TagsContext);

  const socket = useRef<any>();

  // Random names generated
  const [myName] = useState<string>(uniqueNamesGenerator(randomNameConfig));

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    socket.current = io.connect({
      query: { "x-auth-token": token },
    });
    let data: any = {
      role: "seeker",
    };
    tagsContext.tags.forEach((tag: any) => {
      data[tag.name] = tag.isSelected;
    });
    socket.current.emit("waiting-room", data, (isBanned: boolean) => {
      console.log("user is banned", isBanned);
      if (isBanned) {
        alert(
          "You are a banned user. Please contact support if you think we made a mistake"
        );
        window.location.pathname = "/";
      }
    });
    socket.current.on("join-room", (data: { supporter: string }) => {
      setSupporterId(data.supporter);
      console.log(data.supporter, "is a supporter want to join room");
      socket.current.emit("join-room", data.supporter, (data: boolean) => {
        console.log("room match", data);
        setIsWaiting(false);
      });
      socket.current.on("close-room", () => {
        alert("You're being disconnected");
        window.location.pathname = "/";
      });
    });
    socket.current.on(
      "sent-from-supporter",
      (data: { message: string; isToxic: boolean }) => {
        console.log(`supporter says ${data.message}`);
        console.log(`supporter is toxic ${data.isToxic}`);
        setMessages((prevState) => [
          ...prevState,
          { message: data.message, role: "supporter", isToxic: data.isToxic },
        ]);
      }
    );
    window.addEventListener("beforeunload", () => {
      socket.current.emit("close-room", { otherUser: supporterId });
    });
  }, []);

  const sendMessage = (message: string) => {
    console.log(message, "from seeker component");
    socket.current.emit("send-to-supporter", { message }, () => {
      console.log(`sent ${message} to supporter`);
    });
    setMessages((prevState) => [...prevState, { message, role: "seeker" }]);
  };

  const onDisconnectHandler = () => {
    console.log("on disconnect", supporterId);
    alert("You're being disconnected");
    socket.current.emit("close-room", { otherUser: supporterId });
    window.location.pathname = "/";
  };

  const onReportHandler = () => {
    console.log("on report:", supporterId);
    socket.current.emit("ban-user", { supporter: supporterId });
    socket.current.emit("close-room", { otherUser: supporterId });
    alert("You have reported the 'supporter'. We apologise.");
    window.location.pathname = "/";
  };

  return (
    <div>
      <Room
        myName={myName}
        role="seeker"
        isWaiting={isWaiting}
        onDisconnect={onDisconnectHandler}
        onReport={onReportHandler}
      >
        {isWaiting ? (
          <Spinner />
        ) : (
          <Chat messages={messages} role="seeker" onSubmit={sendMessage} />
        )}
      </Room>
    </div>
  );
};

export default Hero;
