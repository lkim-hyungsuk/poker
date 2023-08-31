import express, { Request, Response } from "express";
import { ApolloServer, gql } from "apollo-server-express";
import dotenv from "dotenv";
import { typeDefs } from "./schema";
import resolvers from "./resolvers";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import WebSocket from "ws";

import http from "http";

dotenv.config();

const app: express.Application = express();
const server = new ApolloServer({ typeDefs, resolvers });

// Add this line to start the server
const startServer = async () => {
  // Connect to MongoDB here
  console.log("MONGODB_URI", process.env.MONGODB_URI);
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB! (◠‿◠✿)");

  app.use(cors());

  // Serve static files (including index.html) from the 'public' folder
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle requests for the root URL
  app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });

  app.get("/testApi", (req: Request, res: Response) => {
    res.send({ message: "Hello from the API!" });
  });

  await server.start();
  server.applyMiddleware({ app });

  // get the HTTP server and pass it to WebSocket
  // Create a WebSocket server
  const httpServer = http.createServer(app);
  const wss = new WebSocket.Server({ server: httpServer });
  const chatRooms: Record<string, WebSocketWithRoom[]> = {};

  // Storing the room counter in memory is not ideal, but it works for now
  let roomCounter = 0;
  function generateUniqueRoomID(): string {
    roomCounter += 1;
    return `Room${roomCounter}`;
  }

  wss.on("connection", (ws: WebSocketWithRoom) => {
    ws.on("message", (message: WebSocket.Data) => {
      console.log(`----------------------Received message => ${message}`);
      const messageString = message.toString();
      const parsedMessage: ParsedMessage = JSON.parse(messageString);

      if (parsedMessage.type === "join") {
        const room: string = parsedMessage.room || generateUniqueRoomID();
        ws.room = room;

        if (!chatRooms[room]) {
          chatRooms[room] = [];
        }

        chatRooms[room].push(ws);
        console.log(`----------------------Added ${ws} to room ${room}`);
        ws.send(JSON.stringify({ type: "joined", room }));
      } else if (parsedMessage.type === "message") {
        // Send a message to all participants in the room
        const room: string = parsedMessage.room;
        const text: string = parsedMessage.text;
        if (chatRooms[room]) {
          chatRooms[room].forEach((client: WebSocketWithRoom) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: "message", text }));
            }
          });
        }
      }
    });
  });

  httpServer.listen({ port: 4000 }, (): void => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
