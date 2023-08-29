import { User } from "./models/User";
import { DeleteResult } from "mongodb";
/**
 * @description This is the interface for the Poker related models.
 * @api https://mongoosejs.com/docs/api/model.html
 */
const resolvers = {
  Query: {
    getUsers: async (): Promise<IUser[]> => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error("Error fetching users");
      }
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { username }: { username: string }
    ): Promise<IUser> => {
      try {
        const user = new User({
          username,
          balance: 1000,
          totalWins: 0,
          totalLosses: 0,
        });
        await user.save();
        return user;
      } catch (error) {
        throw new Error("Error creating user");
      }
    },
    deleteAllUsers: async (): Promise<DeleteResult> => {
      try {
        return await User.deleteMany({});
      } catch (error) {
        throw new Error("Error deleting all users");
      }
    },
  },
};

export default resolvers;
