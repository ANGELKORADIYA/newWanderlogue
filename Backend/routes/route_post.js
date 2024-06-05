const express = require("express");
const route_post = express.Router();
const { myposts, createpost, fetchposts } = require("../controllers/post");
const path = require("path");

route_post.post("/createpost", createpost);

route_post.post("/my-posts", myposts);

route_post.get("/fetch-posts", fetchposts);

module.exports.route_post = route_post;
