import { User } from "./models/User";

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
        const user = new User({ username });
        await user.save();
        return user;
      } catch (error) {
        throw new Error("Error creating user");
      }
    },
  },
};

export default resolvers;
