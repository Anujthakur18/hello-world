const {
  findUser,
  createUser,
  updateLikedMovies,
} = require("../userStore");

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await findUser(email);
    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    }
    return res.json({ msg: "User with given email not found.", movies: [] });
  } catch (error) {
    return res.status(500).json({ msg: "Error fetching movies." });
  }
};

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    if (!email || !data) {
      return res.status(400).json({ msg: "Email and movie data are required." });
    }

    const user = await findUser(email);
    if (user) {
      const movieAlreadyLiked = user.likedMovies.find(({ id }) => id === data.id);
      if (movieAlreadyLiked) {
        return res.json({ msg: "Movie already added to the liked list." });
      }
      await updateLikedMovies(email, [...user.likedMovies, data]);
      return res.json({ msg: "Movie successfully added to liked list." });
    }

    await createUser(email, [data]);
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.status(500).json({ msg: "Error adding movie to the liked list" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await findUser(email);
    if (!user) {
      return res.json({ msg: "User with given email not found.", movies: [] });
    }

    const movies = [...user.likedMovies];
    const movieIndex = movies.findIndex(({ id }) => id === movieId);
    if (movieIndex === -1) {
      return res.status(400).json({ msg: "Movie not found." });
    }
    movies.splice(movieIndex, 1);
    await updateLikedMovies(email, movies);
    return res.json({ msg: "Movie successfully removed.", movies });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error removing movie from the liked list" });
  }
};
