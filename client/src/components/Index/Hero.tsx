import React, { useState, useEffect } from "react";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";

import { getGAuth } from "../../services/axios";
import { ReactComponent as LandingImg } from "../../assets/landingRight.svg";
import { ReactComponent as TopImg } from "../../assets/top.svg";

import { Landing, GoogleButton } from "./StyledComponents";

const Hero = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const tokenx64 = window.location.search.substring(
      7,
      window.location.search.length
    );
    const token = atob(tokenx64);
    sessionStorage.setItem("token", token);
    let history = createBrowserHistory();
    history.replace("/");
  });

  const GAuthHandler = () => {
    getGAuth();
  };

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

        <GoogleButton onClick={GAuthHandler}>
          <span className="icon"></span>
          <span className="label">
            {isAuth ? "Signed in" : "Sign in with Google"}
          </span>
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
