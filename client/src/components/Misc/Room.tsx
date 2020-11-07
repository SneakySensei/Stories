import React, { useState } from "react";

interface RoomProps {
  children: React.ReactElement;
  role: "seeker" | "supporter";
}

const Room = (props: RoomProps) => {
  const [isAssigned, setIsAssigned] = useState<boolean>(false);
  const [helpers, setHelpers] = useState<number>(0);
  const [helpees, setHelpees] = useState<number>(0);

  return (
    <div className="flex flex-wrap w-full h-screen">
      <div className="flex flex-wrap h-screen w-1/4 bg-baseGreen">
        <div className="m-auto text-center">
          <div>
            <h2>{props.role}</h2>
          </div>
          <div>
            <h2>People currently helping</h2>
            <p>{helpers}</p>
          </div>
          <div>
            <h2 className="">People in need</h2>
            <p>{helpees}</p>
          </div>
        </div>
      </div>

      {props.children}

      <div className="flex flex-wrap h-screen w-1/4 bg-baseCream">
        <div className="m-auto text-center">
          <div>
            <button>Disconnect</button>
          </div>
          {props.role === "seeker" && (
            <>
              <div>
                <button>Report</button>
              </div>
              <div>
                <button>Still feeling troubled?</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
