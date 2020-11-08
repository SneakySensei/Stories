import React, { ReactElement, useEffect, useState } from "react";
import { BigHead } from "@bigheads/core";
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

import styled from "styled-components";

interface RoomProps {
  children: React.ReactElement;
  role: "seeker" | "supporter";
  isWaiting: boolean;
  myName: string;
  onDisconnect: () => void;
  onReport?: () => void;
}

const RoomContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
  overflow: hidden;
  position: relative;

  .logo {
    display: none;
  }

  .left-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    svg {
      width: 65%;
      margin-bottom: 1rem;
    }

    div {
      margin-bottom: 1rem;
    }

    .name {
      font-weight: bold;
    }
    .role {
      text-transform: capitalize;
    }
    .button {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      &:hover {
        filter: brightness(1.1);
      }
    }
    .red {
      background-color: #ea4335;
    }
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;

    .logo {
      display: block;
      font-size: xx-large;
      font-family: "Pacifico";
      text-align: center;
      color: #fff;
      background-color: #212121;
      position: relative;

      svg {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 2rem;
        margin-left: 0.5rem;
      }
    }
    .left-section {
      position: absolute;
      top: 3.5rem;
      left: 0.5rem;
      border-radius: 2rem;
      border-top-left-radius: 0;
      width: 90%;
      max-width: 300px;
      padding-bottom: 1rem;
    }
    .chatContainer {
      flex: 1;
    }

    .disabled {
      display: none;
    }
  }
`;

const Room = (props: RoomProps) => {
  const [sideBar, setSideBar] = useState(false);

  return (
    <RoomContainer>
      <div className="logo">
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            setSideBar(!sideBar);
          }}
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Stories
      </div>
      <div
        className={
          "left-section bg-accent max-w-xl" + (sideBar ? "" : " disabled")
        }
      >
        <BigHead />
        <div className="name">{props.myName}</div>
        <div className="role">{props.role}</div>
        {/* <h2>People currently helping</h2>
          <p>{helpers}</p>
          <h2 className="">People in need</h2>
          <p>{helpees}</p> */}
        {props.role === "seeker" && (
          <>
            <div
              className="button bg-secondary text-background font-bold cursor-pointer"
              onClick={props.onReport}
            >
              Report
            </div>
            <div className="button bg-secondary text-background font-bold cursor-pointer">
              Still feeling troubled?
            </div>
          </>
        )}

        <button
          className="button red text-background cursor-pointer focus:outline-none"
          onClick={props.onDisconnect}
        >
          Disconnect
        </button>
      </div>

      {props.children}
    </RoomContainer>
  );
};

export default Room;
