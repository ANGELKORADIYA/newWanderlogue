const express = require("express");
const route_post = express.Router();
const { myposts, createpost, fetchposts ,fetchfavorites} = require("../controllers/post");
const path = require("path");

route_post.post("/createpost", createpost);

route_post.post("/my-posts", myposts);

route_post.post("/fetch-posts", fetchposts);

route_post.post("/my-favorites", fetchfavorites);

route_post.post("/my-comments", fetchfavorites);


module.exports.route_post = route_post;
