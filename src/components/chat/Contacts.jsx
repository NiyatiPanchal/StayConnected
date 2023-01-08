import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../../assets/logo.png";
import account from "../../assets/account.jpg";

export default function Contacts({ contacts, changeChat, currentChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function fetchUser() {
      const data = await JSON.parse(localStorage.getItem("token"));
      setCurrentUserName(data.username);
    }
    fetchUser();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      <Container>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h2>StayConnected</h2>
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected && currentChat ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img src={account} alt="" />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img src={account} alt="avatar" />
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 75% 10%;
  overflow: hidden;
  background-color: #fbf3f2;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h2 {
      color: #032539;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #1c768f;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      // background-color: #1c768f;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
          border-radius: 40px;
          color: #1c768f;
        }
      }
      .username {
        h3 {
          color: #1c768f;
        }
      }
    }
    .selected {
      background-color: #1c768f;

      .username {
        h3 {
          color: #fbf3f2;
        }
      }
    }
  }

  .current-user {
    background-color: #1c768f;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
