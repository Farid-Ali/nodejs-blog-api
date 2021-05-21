const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 100 },
    body: { type: String, require: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  },
  { timestamps: true }
);

//virtual for article's URL
ArticleSchema.virtual("url").get(function () {
  return "/api/article/" + this._id;
});

module.exports = mongoose.model("Article", ArticleSchema);
