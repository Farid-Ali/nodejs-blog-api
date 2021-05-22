const User = require("../models/user");
const { body, validationResult } = require("express-validator");

//List of all users
exports.user_list = function (req, res, next) {
  User.find({}, "username").exec(function (err, all_users) {
    if (err) {
      return next(err);
    }
    //successful
    res.json(all_users);
  });
};

//Details for a specific user
exports.user_detail = function (req, res, next) {
  User.findById(req.params.id, "username email").exec(function (err, user) {
    if (err) {
      return next(err);
    }
    //successful
    res.json(user);
  });
};

//User create on GET
exports.user_create_get = function (req, res, next) {
  res.json({
    message: "Create new user",
  });
};

//Handle user create on POST
exports.user_create_post = [
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
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      //there are errors. send same json data as user_create_get
      res.json({
        message: "Create new user",
      });
      return;
    } else {
      //data is valid. save article
      user.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful
        res.sendStatus(200);
      });
    }
  },
];

//User delete on GET
exports.user_delete_get = function (req, res, next) {
  User.findById(req.params.id).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    //successful
    res.json(user);
  });
};

//User delete on POST
exports.user_delete_post = function (req, res, next) {
  User.findByIdAndRemove(req.body.userid, function deleteUser(err) {
    if (err) {
      next(err);
    }
    //success - send success message
    res.sendStatus(200);
  });
};

//User update on GET FIXME
exports.user_update_get = function (req, res, next) {
  User.findById(req.params.id).exec(function (err, user) {
    if (err) {
      next(err);
    }
    //successful
    res.json(user);
  });
};

//User update on POST
exports.user_update_post = [
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
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      //there are errors. send same json data as user_update_get
      User.findById(req.params.id).exec(function (err, user) {
        if (err) {
          next(err);
        }
        //successful
        res.json(user);
      });
      return;
    } else {
      //data from form is valid. update the record
      User.findByIdAndUpdate(req.params.id, user, {}, function (err, theuser) {
        if (err) {
          return next(err);
        }
        //successful
        res.sendStatus(200);
      });
    }
  },
];
