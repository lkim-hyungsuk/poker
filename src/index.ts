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

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      console.log(`----------------------Received message => ${message}`);
    });
    ws.send("Hello! Welcome to the chat.");
  });

  httpServer.listen({ port: 4000 }, (): void => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
