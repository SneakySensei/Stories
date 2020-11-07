import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import { getGAuth } from "../../services/axios";
import { ReactComponent as LandingImg } from "../../assets/landingRight.svg";
import { ReactComponent as TopImg } from "../../assets/top.svg";
import { Landing, GoogleButton } from "./StyledComponents";

import Modal from "../Misc/Modal";

const Hero = () => {
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [role, setRole] = useState<"seeker" | "supporter" | null>();

  let history = useHistory();

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
  }, [history]);

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

  const submitTags = () => {
    history.push(`/${role}`);
  };

  return (
    <>
      {role && (
        <Modal
          role={role}
          submitTags={submitTags}
          onModalClose={() => {
            setRole(null);
          }}
        />
      )}
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
          {!isAuth && <span className="pt-2">Please log in to start</span>}
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
