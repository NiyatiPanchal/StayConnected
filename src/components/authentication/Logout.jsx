import React from "react";
import { useNavigate } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = await JSON.parse(localStorage.getItem("token"))._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <Button onClick={handleClick}>
      <MdExitToApp />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #fbf3f2;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #032539;
  }
`;
