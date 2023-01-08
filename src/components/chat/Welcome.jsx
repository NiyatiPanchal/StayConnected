import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../../assets/robot.gif";
import Logout from "../authentication/Logout";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const data = await JSON.parse(localStorage.getItem("token"));
      setUserName(data.username);
    }
    fetchUser();
  }, []);

  return (
    <Container>
      <div className="chat-header">
        <Logout />
      </div>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #032539;
  align-items: center;
  color: #fbf3f2;
  flex-direction: column;

  .chat-header {
    display: flex;
    justify-content: end;
    padding: 0 2rem;
    width: 100%;
  }

  img {
    height: 20rem;
  }
  span {
    color: #fbf3f2;
  }
`;
