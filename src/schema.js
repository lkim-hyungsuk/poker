"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type User {
    id: ID!
    username: String!
    totalWins: Int!
    totalLosses: Int!
    balance: Int!
  }

  # schema.graphql
  # type Game {
  #   id: ID!
  #   players: [User!]!
  #   hands: [Hand!]!
  # }

  # type Hand {
  #   id: ID!
  #   gameId: ID!
  #   cards: [String!]!
  #   bets: [Bet!]!
  # }

  # type Bet {
  #   id: ID!
  #   handId: ID!
  #   amount: Int!
  # }

  # Define more types and mutations as needed

  type Query {
    # games: [Game!]!
    getUsers(id: ID!): [User!]!
  }

  type Mutation {
    # createGame(playerIds: [ID!]!): Game!
    createUser(username: String!): User
    # More mutations
  }
`;
