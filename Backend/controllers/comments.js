const { mongoose } = require("mongoose");

const {
  postModel,
  favoriteModel,
  starModel,
  commentModel,
} = require("../models/postSchema");

module.exports.getComments = async function (req, res) {
  try {
    const existingDashboard = await commentModel.find(
      {
        postId: req.body.postId,
      },
      { _id: 0, __v: 0 }
    );
    if (!existingDashboard) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({
      comments: existingDashboard.filter(
        (comment) => comment.userId.toString() !== req.userId.toString()
      ),
      yourComments: existingDashboard.filter(
        (comment) => comment.userId.toString() === req.userId.toString()
      ),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.postComments = async function (req, res) {
  try {
    const existingDashboard = await postModel.findOne({
      _id: req.body.postId,
    });
    if (!existingDashboard) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log(req.body.content);
    const newComment = await commentModel.create({
      content: req.body.content.content,
      postId: req.body.postId,
      userId: req.userId,
    });
    await newComment.save();
    if (existingDashboard.comments && existingDashboard.comments.length > 0) {
      existingDashboard.comments.push(newComment._id);
      await existingDashboard.save();
    } else {
      existingDashboard.comments = [newComment._id];
      await existingDashboard.save();
    }
    return res
      .status(200)
      .json({ yourComment:req.content,message: "Comment added successfully", okk: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", okk: false });
  }
};
