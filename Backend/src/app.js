import express from 'express';
import http from "http";
import { port } from './config/index.js';
import loader from './loaders/index.js';
import {Server} from 'socket.io';
import { connectSocket } from './utils/socket.js';

const app = express();

loader(app);

const server = http.createServer(app)

const io= new Server(server,  {
  cors: {
    origin: "http://localhost:4200", // Set to your front-end origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],  // Methods allowed
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})

connectSocket(io);

server.listen(port, err => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  
  console.log(`Server is running on ${port}`);
});

export default app