const connectDB = require("./db");
const express = require("express");
var cors = require("cors");
const app = express();
require("dotenv").config();
const socket = require("socket.io");
const bodyParser = require("body-parser");

app.use(cors());

const port = process.env.PORT || 5000;

connectDB();

// middleware
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Available Routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/messages", require("./routes/messages.js"));

const server = app.listen(port, () => {
  console.log(`StayConnected backend listening on port ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
