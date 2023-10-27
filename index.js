// Node server which will handle socket.io connections
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

http.listen(8000, () => {
  console.log("server is started");
});

//socket

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    socket.broadcast.emit("new-user-joined", name);
  });

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
