
//list of all articles
exports.article_list = function (req, res, next) {
    res.json({
      message: 'Welcome to article'
    });
};

//One requested article
exports.article_detail = function (req, res, next) {
  res.json({
    message: 'Welcome to single article'
  });
}



//Get article create from end points on GET
exports.article_create_get = function (req, res, next) {
  res.json({
    message: 'Welcome to article create get'
  });
}

//Handle article create POST
exports.article_create_post = function (req, res, next) {
  res.json({
    message: 'Welcome to article create post'
  });
}

//Article delete form data on GET
exports.article_delete_get = function (req, res, next) {
  res.json({
    message: 'Welcome to article delete get'
  });
}

//Handle article delete on POST
exports.article_delete_post = function (req, res, next) {
  res.json({
    message: 'Welcome to article delete post'
  });
}

//Article update form data on GET
exports.article_update_get = function(req, res, next) {
  res.json({
    message: 'Welcome to article update get'
  });
}

//Handle article update on POST
exports.article_update_post = function(req, res, next) {
  res.json({
    message: 'Welcome to article update post'
  });
}