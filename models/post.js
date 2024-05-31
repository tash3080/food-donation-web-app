const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    text: String,
    link: String,
    imageUrl: String,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
