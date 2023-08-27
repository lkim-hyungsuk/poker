"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = require("./schema");
const resolvers_1 = __importDefault(require("./resolvers"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = new apollo_server_express_1.ApolloServer({ typeDefs: schema_1.typeDefs, resolvers: resolvers_1.default });
// Add this line to start the server
const startServer = async () => {
    // Connect to MongoDB here
    console.log("MONGODB_URI", process.env.MONGODB_URI);
    await mongoose_1.default.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB! (◠‿◠✿)");
    await server.start();
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
};
startServer();
