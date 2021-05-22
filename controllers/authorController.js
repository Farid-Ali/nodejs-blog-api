const Author = require("../models/author");
const { body, validationResult } = require("express-validator");

//List of all authors
exports.author_list = function (req, res, next) {
  Author.find({}, "username").exec(function (err, all_authors) {
    if (err) {
      return next(err);
    }
    //successful
    res.json(all_authors);
  });
};

exports.author_detail = function (req, res, next) {
  Author.findById(req.params.id, "username email").exec(function (err, author) {
    if (err) {
      return next(err);
    }
    //successful
    res.json(author);
  });
};

//Author create on GET
exports.author_create_get = function (req, res, next) {
  res.json({
    message: "Create new author",
  });
};

//Handle author create on POST
exports.author_create_post = [
  //validate and sanitize fields
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Email must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  //proccess request after validation and sanitization
  (req, res, next) => {
    //extract validation errors from a request
    const errors = validationResult(req);

    //create User object with escaped and trimmed data
    let author = new Author({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      //there are errors. send same json data as user_create_get
      res.json({
        message: "Create new author",
      });
      return;
    } else {
      //data is valid. save article
      author.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful
        res.sendStatus(200);
      });
    }
  },
];

//Author delete on GET
exports.author_delete_get = function (req, res, next) {
  Author.findById(req.params.id).exec(function (err, author) {
    if (err) {
      return next(err);
    }
    //successful
    res.json(author);
  });
};

//Handle author delete on POST
exports.author_delete_post = function (req, res, next) {
  Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
    if (err) {
      next(err);
    }
    //success - send success message
    res.sendStatus(200);
  });
};

//Author update on GET
exports.author_update_get = function (req, res, next) {
  Author.findById(req.params.id).exec(function (err, user) {
    if (err) {
      next(err);
    }
    //successful
    res.json(user);
  });
};

//Author create on GET
exports.author_update_post = [
  //validate and sanitize fields
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Email must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  //proccess request after validation and sanitization
  (req, res, next) => {
    //extreact the validation errors from a request
    const errors = validationResult(req);

    //create an user object with escaped/trimmed data and old id
    let author = new Author({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      //there are errors. send same json data as user_update_get
      Author.findById(req.params.id).exec(function (err, author) {
        if (err) {
          next(err);
        }
        //successful
        res.json(author);
      });
      return;
    } else {
      //data from form is valid. update the record
      Author.findByIdAndUpdate(
        req.params.id,
        author,
        {},
        function (err, theauthor) {
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
