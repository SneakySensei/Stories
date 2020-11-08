import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen flex-col justify-center items-center text-center ">
      <div className="text-5xl my-4">😵 Uh-oh!</div>
      <div className="text-lg my-2">This story wasn't found</div>
      <Link to="/" className="text-lg my-2 text-indigo-500 font-bold">
        🡐 Let's take you home
      </Link>
    </div>
  );
};

export default NotFound;
