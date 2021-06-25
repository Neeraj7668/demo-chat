// import { css } from "emotion";
import React, { useEffect, useState } from "react";
import { user } from "./Join/Join";

import styles from "styled-components";
import socketIo from "socket.io-client";
import Message from "./Message/Message";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";
// const EndPoint = "https://demo-test-chat.herokuapp.com/";
const EndPoint = "http://52.1.249.231:5001";
let socket;
function Chat() {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMsg = () => {
    const message = document.getElementById("chat__input").value;
    if (message === "") {
      return false;
    } else {
      socket.emit("message", { message, id });
      document.getElementById("chat__input").value = "";
    }
  };

  useEffect(() => {
    socket = socketIo(EndPoint);

    socket.on("connect", () => {
      console.log("connected");
      // setId(socket.id);
    });
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect", () => {
        console.log("user has left");
      });

      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);

      // console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div>
      <ChatPage>
        <ChatContainer>
          <ChatHeader className="d-flex">
            <a href="/" className="float-right ">
              X
            </a>
          </ChatHeader>

          <ScrollToBottom className="chatBox">
            {messages.map((msg, index) => (
              <Message
                message={msg.message}
                classes={msg.id === id ? "right" : "left"}
                user={msg.id === id ? "" : msg.user}
              />
            ))}
          </ScrollToBottom>

          <ChatInput>
            <input
              onKeyPress={(e) => (e.key === "Enter" ? sendMsg() : null)}
              type="text"
              id="chat__input"
            />
            <button className="sendBtn" onClick={sendMsg}>
              Send
            </button>
          </ChatInput>
        </ChatContainer>
      </ChatPage>
    </div>
  );
}

const ChatPage = styles.div`
  background-color: rgb(31, 29, 29);
  display: flex;
  justify-content: center;
  align-items: center;
  height:100vh;
  width:100vw;
`;
const ChatContainer = styles.div`
  background-color: #fff;
  height:75%;
  width:80%;
`;
const ChatHeader = styles.div`
  background-color: rgb(0, 55, 143);
  height:15%;
  align-items: center;
  & a{
    right:10px;
    text-align: center;
    justify-content: flex-end;
    display: flex;
    right: 10px;
   
    padding: 16px;
    color: aliceblue;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transiton: all 0.3s;
  }
  & a:hover {
    transform: scale(1);
  }
  
`;

const ChatInput = styles.div`
  border-top: 0.1em solid #000;
  height:15%;
  & #chat__input {
    width: 80%;
    border:none;
    background-color:#fff;
    padding: 1.2rem;
    box-sizing: border-box;
    outline:none;
  }
  & .sendBtn{
    width:20%;
    border:none;
     padding: 1.2rem;
    box-sizing: border-box;
    cursor:pointer;
  background-color: rgb(0, 55, 143);
  color:#fff;
  font-size:1rem;
  font-weight:bold;
  }
  & button:hover{
    opacity: 0.8;
  

  }
`;
export default Chat;
