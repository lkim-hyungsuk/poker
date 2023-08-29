import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    totalWins: Int!
    totalLosses: Int!
    balance: Int!
  }

  type DeleteResult {
    acknowledged: Boolean!
    deletedCount: Int!
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
    getUsers: [User!]!
  }

  type Mutation {
    # createGame(playerIds: [ID!]!): Game!
    createUser(username: String!): User
    deleteAllUsers: DeleteResult
  }
`;
