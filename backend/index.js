require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const { createServer } = require('http');
const socketAuth = require('./middleware/socketAuth');
const Room = require('./models/roomModel');
const { v4: uuidv4 } = require('uuid');

const app = express(); //initializing app
const port = 3000; //port name

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
})); //cross origin resourse sharing

app.use(express.json());  //parse JSON string to JS Object

//Database connection
const mongodbPath = process.env.DATABASEURL
mongoose.connect(mongodbPath).then(() => {
  console.log("connection successfull!")
}).catch((err) => {
  console.log(err)
})

//router imports
const HomeRouter = require('./Router/homeRouter');
const AuthRouter = require('./Router/authRouter');

app.use('/', HomeRouter);
app.use('/auth', AuthRouter);


//error handler
app.use((err, req, res, next) => {
  res.status(400).json({
    message: err.message || "Something went wrong",
  });
});

// ------ HTTP Server and Socket.io setup ------
const server = createServer(app);

//Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

//socket Middleware Token Authentication
io.use(socketAuth)

//----Join ROOM Logic
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('createRoom', async ({ roomName }) => {
    try {
      const roomId = uuidv4().replace(/-/g, '').slice(0, 8); //generating unique room id
      const user = socket.user;

      //create room in db
      await Room.create({
        roomName,
        host: user._id,
        roomId,
        users: [{
          userId: user._id,
          name: user.fullName,
          socketId: socket.id
        }]
      });

      socket.join(roomId); //joining socket.io room

      socket.emit('roomCreated', { roomId, roomName });
    } catch (err) {
      console.log("Create Room Error:", err);
      socket.emit('error', { msg: "Error creating room" });
    }
  })

  //======JoinRoomi Login=====
  socket.on('joinRoom', async ({ roomId }) => {
    try {
      const user = socket.user; //user

      //room search
      const room = await Room.findOne({ roomId, isActive: true });
      //if room not found return error
      if (!room) {
        return socket.emit('error', { msg: "Room not found or inactive" });
      }

      const alreadyInRoom = room.users.some(u => u.userId.toString() === user._id.toString());
      if (!alreadyInRoom) {
        room.users.push({
          userId: user._id,
          name: user.fullName,
          socketId: socket.id
        });
        await room.save();
      }

      socket.join(roomId); //joining socket.io room

      socket.emit('roomJoined', {
        roomId: room.roomId,
        roomName: room.roomName,
        boardData: room.boardData,
        users: room.users.map(u => ({ userId: u.userId, name: u.name }))
      });

      socket.to(roomId).emit('userJoined', {
        userId: user._id,
        name: user.fullName
      });

    } catch (err) {
      console.log("Join Room Error:", err);
      socket.emit('error', { msg: "Error joining room" });
    }
  })

  //====Disconnection Logic====
  socket.on("disconnect", async () => {
    try {
      const user = socket.user; // authenticated user

      // find the active room where this user exists
      const room = await Room.findOne({
        "users.userId": user._id,
        isActive: true,
      });

      if (!room) return;

      // remove user from room
      room.users = room.users.filter(
        (u) => u.userId.toString() !== user._id.toString()
      );

      //HOST LEFT
      if (room.host.toString() === user._id.toString()) {
        room.isActive = false;
        await room.save();

        // notify everyone
        io.to(room.roomId).emit("room-closed");
        return;
      }

      //NORMAL USER LEFT
      await room.save();
      console.log(user);
      socket.to(room.roomId).emit("user-left", {
        userId: user._id,
        name: user.fullName,
      });
      room.isActive = true;
      

    } catch (err) {
      console.error("Disconnect error:", err);
    }
  });


});





//listening to port 3000 (Backend Running)
server.listen(port, () => {
  console.log("listening!!");
})