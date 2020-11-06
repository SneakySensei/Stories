import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-wrap w-full h-1/2vh lg:h-screen">
      <h1 className="fixed w-full text-center">How are you feeling today?</h1>
      <div className="flex flex-wrap w-full lg:w-1/2 h-full bg-baseGreen">
        <Link
          to="/seeker"
          className="m-auto text-3xl border-solid border-2 border-white rounded-lg px-8 py-2 text-white"
        >
          Seeker
        </Link>
      </div>
      <div className="flex flex-wrap w-full lg:w-1/2 h-full bg-accentCream">
        <Link
          to="/peer-supporter"
          className="m-auto text-3xl border-solid border-2 border-black rounded-lg px-8 py-2"
        >
          Supporter
        </Link>
      </div>
    </div>
  );
};

export default Hero;
