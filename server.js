const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});

// ইউজার কানেক্ট হলে
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // মেসেজ পাঠানো
  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });

  // Offer পাঠানো
  socket.on("offer", (data) => {
    socket.broadcast.emit("offer", data);
  });

  // Answer পাঠানো
  socket.on("answer", (data) => {
    socket.broadcast.emit("answer", data);
  });

  // ICE Candidate পাঠানো
  socket.on("candidate", (data) => {
    socket.broadcast.emit("candidate", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
