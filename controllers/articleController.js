const Article = require("../models/article");
const Author = require("../models/author");
const async = require("async");
const { body, validationResult } = require("express-validator");

//list of all articles
exports.article_list = function (req, res, next) {
  Article.find({}, "title author")
    .populate("author")
    .exec(function(err, all_articles) {
      if (err) { return next(err); }
      //successful
      res.json(all_articles);
    })
};

//One requested article
exports.article_detail = function (req, res, next) {
  Article.findById(req.params.id)
    .populate("comments")
    .populate("author")
    .exec(function(err, article) {
      if (err) { return next(err); }
      //successful
      res.json(article);
    })
};

//Get article create from end points on GET
exports.article_create_get = function (req, res, next) {
  //get all authors, which can use for adding to article
  Author.find({}, "username").exec(function (err, all_authors) {
    if (err) {
      return next(err);
    }
    //successful
    res.json(all_authors);
  });
};

//Handle article create POST
exports.article_create_post = [
  //validate and sanitize fields
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("body", "Body must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  //proccess request after validation and sanitization
  (req, res, next) => {
    //extract validation errors from a request
    const errors = validationResult(req);

    //create article object with escaped and trimmed data
    let article = new Article({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
    });

    if (!errors.isEmpty()) {
      //there are errors. send same json data as articel_create_get
      Author.find({}, "username").exec(function (err, all_authors) {
        if (err) {
          return next(err);
        }
        //successful
        res.json(all_authors);
      });
      return;
    } else {
      //data is valid. save article
      article.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful
        res.json(article.url);
      });
    }
  },
]

//Article delete form data on GET
exports.article_delete_get = function (req, res, next) {
  Article.findById(req.params.id)
    .populate("author")
    .exec(function (err, article) {
      if (err) {
        return next(err);
      }
      //successful
      res.json(article);
    });
};

//Handle article delete on POST
exports.article_delete_post = function (req, res, next) {
  Article.findByIdAndRemove(req.body.articleid, function deleteArticle(err) {
    if (err) { next(err); }
    //success - send success message
    res.sendStatus(200);
  })
};

//Article update form data on GET
exports.article_update_get = function (req, res, next) {
  async.parallel({
    article: function(callback) {
      Article.findById(req.params.id)
        .populate("comments")
        .populate("author")
        .exec(callback);
    },
    author: function(callback) {
      Author.find(callback);
    },
  }, function(err, results) {
    if (err) { next(err); }
    if (results.article == null) {
      const err = new Error('Article not found');
      err.status = 404;
      return next(err);
    }
    //successful
    res.json(results);
  })
};

//Handle article update on POST
exports.article_update_post = [
  //validate and sanitize fields
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("body", "Body must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  //proccess request after validation and sanitization
  (req, res, next) => {
    //extreact the validation errors from a request
    const errors = validationResult(req);

    //create an article object with escaped/trimmed data and old id
    let article = new Article({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      _id: req.params.id
    })

    if (!errors.isEmpty()) {
      //there are errors. send same json data as articel_update_get
      async.parallel({
        article: function(callback) {
          Article.findById(req.params.id)
            .populate("comments")
            .populate("author")
            .exec(callback);
        },
        author: function(callback) {
          Author.find(callback);
        },
      }, function(err, results) {
        if (err) { next(err); }
        if (results.article == null) {
          const err = new Error('Article not found');
          err.status = 404;
          return next(err);
        }
        //successful
        res.json(results);
      })
      return;
    } else {
      //data from form is valid. update the record
      Article.findByIdAndUpdate(req.params.id, article, {}, function(err, thearticle) {
        if (err) { return next(err); }
        //successful
        res.sendStatus(200);
      })
    }
  }
]