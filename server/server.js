const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const app = express();
const port = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello world");
});
const server = http.createServer(app);

const users = [{}];
const io = socketIO(server);
io.on("connection", (socket) => {
  console.log("socket connections successfully");

  //user join
  socket.on("joined", ({ user }) => {
    //push the user
    users[socket.id] = user;
    // console.log(`${user} has joined`);

    //welcome msg
    socket.emit("welcome", {
      user: "Admin",
      message: ` Welcome to the chat, ${users[socket.id]} `,
    });

    //tell to all this is user is join
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has Joined`,
    });
  });
  //communication b/w users

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  //when user is left
  socket.on("disconnect", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} has left`,
    });
  });
});

server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
