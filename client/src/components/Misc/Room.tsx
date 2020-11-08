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
}

const RoomContainer = styled.div`
  display: grid;
  grid-auto-flow: column dense;
  overflow: hidden;

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
`;

const Room = (props: RoomProps) => {
  return (
    <RoomContainer>
      <div className="left-section bg-accent">
        <BigHead />
        <div className="name">{props.myName}</div>
        <div className="role">{props.role}</div>
        {/* <h2>People currently helping</h2>
          <p>{helpers}</p>
          <h2 className="">People in need</h2>
          <p>{helpees}</p> */}
        {props.role === "seeker" && (
          <>
            <div className="button bg-secondary text-background font-bold cursor-pointer">
              Report
            </div>
            <div className="button bg-secondary text-background font-bold cursor-pointer">
              Still feeling troubled?
            </div>
          </>
        )}

        <button
          disabled={props.isWaiting}
          className="button red text-background cursor-pointer"
        >
          Disconnect
        </button>
      </div>

      {props.children}
    </RoomContainer>
  );
};

export default Room;
