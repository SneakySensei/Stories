import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-wrap z-0 w-full lg:h-screen">
      <div className="fixed w-full  text-center">
        <h1 className="z-10 relative px-1 inline-block mt-16 text-5xl font-bold">
          Hi, how are you feeling today?
        </h1>
      </div>
      <Link
        to="/seeker"
        className="section flex flex-wrap w-full lg:w-1/2 h-full bg-baseGreen"
      >
        <div className="m-auto text-3xl rounded-lg px-8 py-2 text-white">
          I need to talk to someone
        </div>
      </Link>
      <Link
        to="/peer-supporter"
        className="section flex flex-wrap w-full lg:w-1/2 h-full bg-accentCream"
      >
        <div className="m-auto text-3xl rounded-lg px-8 py-2">
          I'm feeling helpful
        </div>
      </Link>
    </div>
  );
};

export default Hero;
