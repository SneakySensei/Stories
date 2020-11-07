import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as LandingImg } from "../../assets/landingRight.svg";
import { ReactComponent as TopImg } from "../../assets/top.svg";

import { Landing, GoogleButton } from "./StyledComponents";

const Hero = () => {
  return (
    <Landing>
      <div className="left-section">
        <h1>Hi, how are you feeling today?</h1>
        <Link to="/seeker" className="link">
          <div>I need to talk to someone</div>
        </Link>
        <Link to="/peer-supporter" className="link">
          <div>I'm feeling helpful</div>
        </Link>

        <GoogleButton>
          <span className="icon"></span>
          <span className="label">Sign in with Google</span>
        </GoogleButton>
      </div>
      <div className="right-section">
        <TopImg className="topArt" />
        <LandingImg className="art" />
        <div className="logo">Stories</div>
      </div>
    </Landing>
  );
};

export default Hero;
