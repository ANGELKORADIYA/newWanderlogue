const express = require("express");
const route_favorites = express.Router();
const { getLikes, postLikes} = require("../controllers/favorites");
const path = require("path");

route_favorites.post("/get-likes", getLikes);
route_favorites.post("/post-likes", postLikes);

module.exports = { route_favorites };