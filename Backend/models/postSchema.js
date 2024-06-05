const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  author: { type: String, required: true },
  title: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  photoData: { type: Object, required: true },
  rating: { type: String, required: true },
  itinerary: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "favorite" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  stars: [{ type: mongoose.Schema.Types.ObjectId, ref: "star" }],
});

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
});

const starSchema = new mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
});

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
});

const postModel = mongoose.model("post", postSchema);
const favoriteModel = mongoose.model("favorite", favoriteSchema);
const starModel = mongoose.model("star", starSchema);
const commentModel = mongoose.model("comment", commentSchema);

module.exports = { postModel, favoriteModel, starModel, commentModel };
