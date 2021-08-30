const { AuthenticationError } = require('apollo-server-express');
const { Profile, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return User.find();
    },

    profile: async (parent, { profileId }) => {
      return User.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const profile = await User.create({ username, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Add a third argument to the resolver to access data in our `context`
    saveBook: async (parent, { book }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { books: book },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },
    // Make it so a logged in user can only remove a skill from their own profile
    removeBook: async (parent, { bookID }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
