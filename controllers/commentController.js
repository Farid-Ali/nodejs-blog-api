const Comment = require("../models/comment");
const Article = require("../models/article");
const { body, validationResult } = require("express-validator");

//Comment create on GET
exports.comment_create_get = function (req, res, next) {
  res.json({
    message: "Create new comment",
  });
};

//Handle comment create on POST
exports.comment_create_post = [
  //validate and sanitize fields
  body("body", "Comment body must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("user", "User must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("article", "Article must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  //proccess request after validation and sanitization
  (req, res, next) => {
    //extract validation errors from a request
    const errors = validationResult(req);

    //create User object with escaped and trimmed data
    let comment = new Comment({
      body: req.body.body,
      user: req.body.user,
      article: req.body.article,
    });

    if (!errors.isEmpty()) {
      //there are errors. send same json data as comment_create_get
      res.json({
        message: "Create new comment",
      });
      return;
    } else {
      //data is valid. save comment
      comment.save(function (err) {
        if (err) {
          return next(err);
        }
        //add comment to the article
        Article.findOne({ _id: comment.article }, function (err, article) {
          if (err) {
            next(err);
          }
          article.comments.push(comment._id);
          article.save();
        });
        //successful
        res.sendStatus(200);
      });
    }
  },
];

//Comment delete on GET
exports.comment_delete_get = function (req, res, next) {
  Comment.findById(req.params.id).exec(function (err, comment) {
    if (err) {
      return next(err);
    }
    //successful
    res.json(comment);
  });
};

//Comment delete on POST
exports.comment_delete_post = function (req, res, next) {
  Comment.findByIdAndRemove(req.body.commentid, function deleteComment(err) {
    if (err) {
      next(err);
    }
    //remove comment from article
    Article.findOne({ comments: req.body.commentid }, function (err, article) {
      if (err) {
        next(err);
      }
      //determine the index of the comment which we want to remove
      const index = article.comments.indexOf(req.body.commentid);
      //remove the comment
      if (index > -1) {
        article.comments.splice(index, 1);
      }
      article.save();
    });
    //success - send success message
    res.sendStatus(200);
  });
};

//Comment update on GET
exports.comment_update_get = function (req, res, next) {
  Comment.findById(req.params.id).exec(function (err, comment) {
    if (err) {
      next(err);
    }
    //successful
    res.json(comment);
  });
};

//Comment create on GET
exports.comment_update_post = [
  //validate and sanitize fields
  body("body", "Comment body must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("user", "User must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("article", "Article must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  //proccess request after validation and sanitization
  (req, res, next) => {
    //extreact the validation errors from a request
    const errors = validationResult(req);

    //create an comment object with escaped/trimmed data and old id
    let comment = new Comment({
      body: req.body.body,
      user: req.body.user,
      article: req.body.article,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      //there are errors. send same json data as comment_update_get
      Comment.findById(req.params.id).exec(function (err, comment) {
        if (err) {
          next(err);
        }
        //successful
        res.json(comment);
      });
      return;
    } else {
      //data from form is valid. update the record
      Comment.findByIdAndUpdate(
        req.params.id,
        comment,
        {},
        function (err, thecomment) {
          if (err) {
            return next(err);
          }
          //successful
          res.sendStatus(200);
        }
      );
    }
  },
];
