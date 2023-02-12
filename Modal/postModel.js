const mongoose = require("mongoose");


// #1 => make the schema
const postSchema = new mongoose.Schema(
  {
    title:String,
    summery:String,
    content:String,
    cover:String,
    category:String,
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

const Post =
  mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;