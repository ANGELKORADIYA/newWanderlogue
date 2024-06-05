const { mongoose } = require("mongoose");

const {
  postModel,
  favoriteModel,
  starModel,
  commentModel,
} = require("../models/postSchema");

module.exports.getLikes = async function (req, res) {
  try {
    const existingDashboard = await postModel.findOne({ _id: req.body.postId });

    if (!existingDashboard) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (existingDashboard.favorites && existingDashboard.favorites.length > 0) {
      for (let i = 0; i < existingDashboard.favorites.length; i++) {
        if (
          existingDashboard.favorites[i].toString() === req.userId.toString()
        ) {
          return res.status(200).json({
            likedset: true,
            likedhowmany: existingDashboard.favorites.length,
          });
        }
      }
      return res.status(200).json({
        likedset: false,
        likedhowmany: existingDashboard.favorites.length,
      });
    } else {
      return res.status(200).json({
        likedset: false,
        likedhowmany: 0,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.postLikes = async function (req, res) {
  try {
    const existingDashboard = await postModel.findOne({
      _id: req.body.postId,
    });

    if (!existingDashboard) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (existingDashboard.favorites && existingDashboard.favorites.length > 0) {
      for (let i = 0; i < existingDashboard.favorites.length; i++) {
        if (
          existingDashboard.favorites[i].toString() === req.userId.toString()
        ) {
          existingDashboard.favorites.splice(i, 1);
          await existingDashboard.save();
          return res.status(200).json({
            likedhowmany: existingDashboard.favorites.length,
            likedset: false,
          });
        }
      }

      existingDashboard.favorites.push(req.userId);
      await existingDashboard.save();
      return res.status(200).json({
        likedhowmany: existingDashboard.favorites.length,
        likedset: true,
      });
    } else {
      // If there are no favorites, initialize and add the userId
      existingDashboard.favorites = [req.userId];
      await existingDashboard.save();
      return res.status(200).json({
        likedhowmany: existingDashboard.favorites.length,
        likedset: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
