import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import * as usersController from "./controllers/users";
import * as boardController from "./controllers/boards";
import bodyParser from "body-parser";
import authMiddleware from './middlewares/auth'
import cors from 'cors'

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});
const port = process.env.PORT || 4001
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

mongoose.set('toJSON', {
  virtuals: true,
  transform: (_, converted) => {
    delete converted._id
  }
})

app.get("/", (req, res) => {
  res.send("API is UP");
});

app.post("/api/users", usersController.register);
app.post("/api/users/login", usersController.login);
app.get('/api/user', authMiddleware, usersController.currentUser)
app.get('/api/boards', authMiddleware, boardController.getBoards)
app.get("/api/boards/:boardId", authMiddleware, boardController.getBoard);
app.get("/api/boards", authMiddleware, boardController.createBoard);

io.on("connection", () => {
  console.log("connect");
});

mongoose.connect("mongodb://127.0.0.1:27017/trello").then(() => {
  console.log("connected to mongodb");
  httpServer.listen(port, () => {
    console.log(`server started on address: http://localhost:${port}`);
  });
});
