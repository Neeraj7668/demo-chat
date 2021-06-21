import React, { useState } from "react";
import styles from "styled-components";
import { Link } from "react-router-dom";

let user;
function Join() {
  const sendUser = () => {
    user = document.getElementById("join__input").value;
    document.getElementById("join__input").value = "";
  };
  const [name, setName] = useState("");
  return (
    <div>
      <JoinPageContainer>
        <JoinContainer>
          <h1>Join</h1>
          <InputContainer>
            <input
              type="text"
              placeholder="Enter your name"
              id="join__input"
              onChange={(e) => setName(e.target.value)}
            />
            <Link
              onClick={(event) => (!name ? event.preventDefault() : null)}
              to="/chat"
            >
              {" "}
              <button type="submit" onClick={() => sendUser()}>
                Join
              </button>
            </Link>
          </InputContainer>
        </JoinContainer>
      </JoinPageContainer>
    </div>
  );
}

const JoinPageContainer = styles.div`
  background-color: rgb(31, 29, 29);
  width:100%;
  height:100vh;
  display: flex;
  justify-content:center;
  align-items:center;
  text-align: center;
 
`;
const JoinContainer = styles.div`
border: 2px solid #fff;
height: 50%;
width: 50%;
border-radius: 8px;
& h1{
   margin-top:5%;
 font-family:roboto;
  color: #fff;
}

`;

const InputContainer = styles.div`
 margin-top:10%;
 & input{
   width: 80%;
   padding: 10px 10px 10px 20px;
   border-radius:100px;
   outline: none;
 }
 & button{
   margin-top: 20px;
   border:none;
   border-bottom:1px solid red;
   width:60%;
    padding: 10px 10px 10px 20px;
   border-radius:100px;
   outline: none;
     background-color: rgb(0, 55, 143);

  color:#fff;
  font-size:1rem;
  font-weight:bold;
   transition: all 0.3s;
 }
 & button:hover{
    background-color:rgb(8, 45, 82);
 }
`;

export default Join;
export { user };
