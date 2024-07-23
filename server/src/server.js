import express from "express";
import router from "./router.js";
import expressWs from "express-ws";
import { v4 as uuidv4 } from 'uuid';
import {changeTypes} from './constants.js';

class Server {
  constructor() {
    const app = express();
    const wss = expressWs(app).getWss();
    app.use(express.json());
    app.use(router);
    app.ws("/ws", (ws) => {
      console.log("ws client connected");
      const clientId = uuidv4();
      ws.clientId = clientId;
      ws.onclose = () => console.log("ws client disconnected");

      ws.send(JSON.stringify({ type: changeTypes.CLIENT_ID, clientId }));
    });

    this.app = app;
    this.wss = wss;
  }
  broadcast(msg, senderId) {
    this.wss.clients.forEach((client) => {
      // Don't broadcast to the sender
      if (client.clientId !== senderId) {
        client.send(JSON.stringify(msg));
      }
    });
  }
  start() {
    return new Promise((resolve) => {
      this.server = this.app.listen(3000, () => {
        resolve(this.server);
        console.log("server started", `http://localhost:3000`);
      });
    });
  }
}

export const server = new Server();
