const mongoose = require("mongoose");
const User = require("./models/UserModel");

const memoryUsers = new Map();
let dbMode = "memory";

const connectDatabase = async () => {
  const mongoUri =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/netflix";

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
    dbMode = "mongo";
    console.log("DB Connection Successful");
  } catch (err) {
    dbMode = "memory";
    console.log(
      `MongoDB unavailable (${err.message}). Using in-memory liked-list storage.`
    );
  }

  return dbMode;
};

const findUser = async (email) => {
  if (dbMode === "mongo") {
    return User.findOne({ email });
  }
  return memoryUsers.get(email) || null;
};

const createUser = async (email, likedMovies) => {
  if (dbMode === "mongo") {
    return User.create({ email, likedMovies });
  }
  const user = { email, likedMovies };
  memoryUsers.set(email, user);
  return user;
};

const updateLikedMovies = async (email, likedMovies) => {
  if (dbMode === "mongo") {
    const user = await User.findOne({ email });
    if (!user) return null;
    user.likedMovies = likedMovies;
    await user.save();
    return user;
  }
  const user = memoryUsers.get(email);
  if (!user) return null;
  user.likedMovies = likedMovies;
  memoryUsers.set(email, user);
  return user;
};

const getDbMode = () => dbMode;

module.exports = {
  connectDatabase,
  findUser,
  createUser,
  updateLikedMovies,
  getDbMode,
};
