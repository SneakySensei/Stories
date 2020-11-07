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
    const setToken = atob(tokenx64);
    setToken && sessionStorage.setItem("token", setToken);
    let token = sessionStorage.getItem("token");
    token && setIsAuth(true);
    let history = createBrowserHistory();
    isAuth && history.replace("/");
  });

  const GAuthHandler = () => {
    getGAuth();
  };

  return (
    <Landing>
      <div className="left-section">
        <h1>Hi, how are you feeling today?</h1>
        <button className="link" disabled={!isAuth}>
          {isAuth ? (
            <Link to="/seeker">I need to talk to someone</Link>
          ) : (
            <p className="cursor-not-allowed">I need to talk to someone</p>
          )}
        </button>
        <button className="link" disabled={!isAuth}>
          {isAuth ? (
            <Link to="/supporter">I'm feeling helpful</Link>
          ) : (
            <p className="cursor-not-allowed">I'm feeling helpful</p>
          )}
        </button>

        <GoogleButton
          onClick={GAuthHandler}
          style={{ backgroundColor: isAuth ? "#35AC55" : "#4285f4" }}
          disabled={isAuth}
          className="focus:outline-none outline-none"
        >
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
