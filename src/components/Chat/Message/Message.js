import styles from "styled-components";
import "./Message.css";

const Message = ({ user, message, classes }) => {
  if (user) {
    return (
      <>
        <MessageBox
          className={`${classes}`}
        >{`${user}: ${message}`}</MessageBox>
      </>
    );
  } else {
    return (
      <>
        <MessageBox className={`${classes}`}>{`You: ${message}`}</MessageBox>
      </>
    );
  }
};

const MessageBox = styles.div`
width: 50%;
padding: 0.6em;
margin:1.4em;
border-radius:5px;
color:#fff;
display: inline-block;
clear: both;

`;

export default Message;
