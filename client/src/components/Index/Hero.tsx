import React, { useState, useEffect } from "react";
import { createBrowserHistory } from "history";
import { Link, Redirect } from "react-router-dom";

import { getGAuth } from "../../services/axios";
import { ReactComponent as LandingImg } from "../../assets/landingRight.svg";
import { ReactComponent as TopImg } from "../../assets/top.svg";
import { Landing, GoogleButton } from "./StyledComponents";

import Modal from "../Misc/Modal";

const Hero = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [role, setRole] = useState<"seeker" | "supporter" | null>();

  let history = createBrowserHistory();

  useEffect(() => {
    const tokenx64 = window.location.search.substring(
      7,
      window.location.search.length
    );
    const setToken = atob(tokenx64);
    setToken && sessionStorage.setItem("token", setToken);
    let token = sessionStorage.getItem("token");
    token && setIsAuth(true);
    isAuth && history.replace("/");
  });

  const GAuthHandler = () => {
    if (isAuth) {
      sessionStorage.removeItem("token");
      setIsAuth(false);
    } else {
      getGAuth();
    }
  };

  const OnClickRoleHandler = (role: "seeker" | "supporter") => {
    setRole(role);
  };

  let tags;
  const submitTags = (_tags: any) => {
    tags = _tags;
    console.log(tags, "from index hero");
    history.replace(`/${role}`);
  };

  return (
    <>
      {role && <Modal role={role} submitTags={(tags) => submitTags(tags)} />}
      <Landing>
        <div className="left-section">
          <div className="logo">Stories</div>
          <h1>Hi, how are you feeling today?</h1>
          <button className="link" disabled={!isAuth}>
            {isAuth ? (
              <p onClick={() => OnClickRoleHandler("supporter")}>
                I'm feeling helpful
              </p>
            ) : (
              <p className="cursor-not-allowed">I'm feeling helpful</p>
            )}
          </button>
          <button className="link" disabled={!isAuth}>
            {isAuth ? (
              <p onClick={() => OnClickRoleHandler("seeker")}>
                I need to talk to someone
              </p>
            ) : (
              <p className="cursor-not-allowed">I need to talk to someone</p>
            )}
          </button>

          <GoogleButton
            onClick={GAuthHandler}
            style={{ backgroundColor: isAuth ? "#EA4335" : "#4285f4" }}
            className="focus:outline-none outline-none"
          >
            <span className="icon"></span>
            <span className="label">
              {isAuth ? "Log Out" : "Sign in with Google"}
            </span>
          </GoogleButton>
        </div>
        <div className="right-section">
          <TopImg className="topArt" />
          <LandingImg className="art" />
          <div className="logo">Stories</div>
        </div>
      </Landing>
    </>
  );
};

export default Hero;
