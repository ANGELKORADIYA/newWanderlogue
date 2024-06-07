const express = require("express");
const route_comments = express.Router();
const { getComments, postComments} = require("../controllers/comments");
const path = require("path");

route_comments.post("/get-comments", getComments);
route_comments.post("/post-comments", postComments);

module.exports = { route_comments };