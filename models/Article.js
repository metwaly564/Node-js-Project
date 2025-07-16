const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema is a class that we can take object from it

const articleSchema = new Schema({
  title: String,
  body: String,
  numberOfLikes:Number
});

const Article = mongoose.model("Article",articleSchema)
module.exports = Article;