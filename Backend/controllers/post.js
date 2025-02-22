const { mongoose } = require("mongoose");

const {
  postModel,
  favoriteModel,
  starModel,
  commentModel,
} = require("../models/postSchema");

module.exports.createpost = async function (req, res) {
  try {
    let newDetails = req.body;
    newDetails.location = `${newDetails.country} ${newDetails.state} ${newDetails.district}`;
    newDetails.userId = req.email;
    newDetails.author = req.author;
    delete newDetails.country;
    delete newDetails.state;
    delete newDetails.district;
    const newPost = new postModel(newDetails);
    await newPost.save();
    res.status(200).json({ message: newPost, okk: true });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "error", okk: false });
  }
};

module.exports.myposts = async function (req, res) {
  try {
    const existingDashboard = await postModel.find({ userId: req.email });
    res.status(200).json(existingDashboard);
  } catch (error) {
    console.log(error);
    res.status(200).json([]);
  }
};

module.exports.fetchposts = async function (req, res) {
  try {
    let randomEmails = await postModel.aggregate([{ $sample: { size: 5 } }]);
    res.status(200).json(randomEmails);
  } catch (error) {
    console.log(error);
    res.status(200).json([]);
  }
};

module.exports.fetchfavorites = async function (req, res) {
  try {
    const postIdsfromUserId = await favoriteModel.find({ userId: req.email });
    const posts = await postModel.find({ _id: { $in: postIdsfromUserId[0].postId } });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(200).json([]);
  }
};

module.exports.fetchcomments = async function (req, res) {
  try {
    const postIdsfromUserId = await commentModel.find({ userId: req.email });
    const posts = await postModel.find({ _id: { $in: postIdsfromUserId[0].postId } });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(200).json([]);
  }
};

module.exports.getTrendingPosts = async (req, res) => {
  try {
    const trendingPosts = await postModel.find().sort({ views: -1 }).limit(5);
    res.status(200).json(trendingPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.getTopCommentedPosts = async (req, res) => {
  try {
    const topCommentedPosts = await postModel.find().sort({ comments: -1 }).limit(5);
    res.status(200).json(topCommentedPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.getPopularPosts = async (req, res) => {
  try {
    const popularPosts = await postModel.find().sort({ likes: -1 }).limit(5);
    res.status(200).json(popularPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};