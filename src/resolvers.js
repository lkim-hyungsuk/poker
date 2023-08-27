"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./models/User");
const resolvers = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User_1.User.find();
                return users;
            }
            catch (error) {
                throw new Error("Error fetching users");
            }
        },
    },
    Mutation: {
        createUser: async (_, { username }) => {
            try {
                const user = new User_1.User({ username });
                await user.save();
                return user;
            }
            catch (error) {
                throw new Error("Error creating user");
            }
        },
    },
};
exports.default = resolvers;
