import styled from "styled-components";

import googleNormal from "../../assets/google/google_normal.svg";

export const Landing = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  height: 100vh;
  position: relative;

  .left-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background-color: #f2f2f2;
    padding: 1rem 1rem 1rem 1rem;

    h1 {
      text-align: center;
      margin: 8rem 0 5rem 0;
      font-size: 1.7rem;
      font-weight: bold;
      padding: 0 1rem;
    }
    .link {
      text-align: center;
      font-size: 1.5rem;
      position: relative;
      z-index: 0;
      padding: 0 0.5rem;
      margin-bottom: 3rem;
      cursor: pointer;
    }

    .link::after {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 0.75rem;
      background-color: #a5dbe1dd;
      opacity: 0.7;
      content: "";
      transform: translateY(-100%);
      transition: transform 200ms ease-out, height 200ms ease-out;
      z-index: -10;
    }

    .link:hover::after {
      transform: translateY(-95%);
      height: 100%;
    }
  }

  .right-section {
    position: relative;
    background: linear-gradient(220deg, #a6dce2, #72aab6);
    height: 100%;

    svg {
      width: 100%;
      padding: 0 1rem;
    }
    .art {
      margin-left: -3rem;
    }

    .logo {
      position: absolute;
      font-family: "Pacifico";
      font-size: 4rem;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
      margin-top: 2rem;
      animation: zoom 400ms ease-out;
      color: #f2f2f2;
    }
  }

  @media screen and (max-width: 990px) {
    display: block;

    .left-section {
      position: absolute;
      left: 1rem;
      right: 1rem;
      top: 1rem;
      bottom: 1rem;
      z-index: 100;
      background-color: #fffe;
    }

    .right-section {
      .logo {
        z-index: 1000;
        color: #2c2c2c;
      }
      .art {
        margin: 0 auto;
        padding: 0 1rem;
      }
    }
  }
`;

export const GoogleButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0.2rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  margin: 2rem 0;

  .icon {
    background: url(${googleNormal}) transparent 50% no-repeat;
    display: inline-block;
    vertical-align: middle;
    width: 42px;
    height: 42px;
  }

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    filter: brightness(0.9) !important;
  }
  &:disabled {
    filter: none !important;
    opacity: 0.8;
    cursor: not-allowed;
  }
  .label {
    padding: 0 0.5rem;
  }
`;
