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

    const isLiked = existingDashboard.favorites.includes(req.userId);
    return res.status(200).json({
      likedset: isLiked,
      likedhowmany: existingDashboard.favorites.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.postLikes = async function (req, res) {
  try {
    const existingDashboard = await postModel.findOne({ _id: req.body.postId });

    if (!existingDashboard) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userIdIndex = existingDashboard.favorites.indexOf(req.userId);

    if (userIdIndex !== -1) {
      existingDashboard.favorites.splice(userIdIndex, 1);
      await existingDashboard.save();

      await favoriteModel.updateOne(
        { userId: req.userId },
        { $pull: { postId: req.body.postId } }
      );

      return res.status(200).json({
        likedhowmany: existingDashboard.favorites.length,
        likedset: false,
      });
    } else {
      existingDashboard.favorites.push(req.userId);
      await existingDashboard.save();

      const newFavorites = await favoriteModel.findOneAndUpdate(
        { userId: req.userId },
        { $push: { postId: req.body.postId } },
        { new: true, upsert: true }
      );

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
