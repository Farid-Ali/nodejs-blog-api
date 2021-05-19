const express = require('express');
const router = express.Router();

//Require controller modules
const article_controller = require('../controllers/articleController');
const author_controller = require('../controllers/authorController');
const comment_controller = require('../controllers/commentController');
const user_controller = require('../controllers/userController');

/// ARTICLE ROUTES ///

//GET home page data aka list of all articles data
router.get('/', article_controller.article_list);


// GET request for creating a article (NOTE This must come before routes that display category (uses id))
router.get('/article/create', article_controller.article_create_get);

// POST request for creating article
router.post('/article/create', article_controller.article_create_post);

// GET request to delete article
router.get('/article/:id/delete', article_controller.article_delete_get);

// POST request to delete article
router.post('/article/:id/delete', article_controller.article_delete_post);

// GET request to update article
router.get('/article/:id/update', article_controller.article_update_get);

// POST request to update article
router.post('/article/:id/update', article_controller.article_update_post);

// GET request for one article
router.get('/article/:id', article_controller.article_detail);

// GET request for list of all article
router.get('/articles', article_controller.article_list);



/// AUTHOR ROUTES ///


// GET request for creating a author (NOTE This must come before routes that display category (uses id))
router.get('/author/create', author_controller.author_create_get);

// POST request for creating author
router.post('/author/create', author_controller.author_create_post);

// GET request to delete author
router.get('/author/:id/delete', author_controller.author_delete_get);

// POST request to delete author
router.post('/author/:id/delete', author_controller.author_delete_post);

// GET request to update author
router.get('/author/:id/update', author_controller.author_update_get);

// POST request to update author
router.post('/author/:id/update', author_controller.author_update_post);

// GET request for one author
router.get('/author/:id', author_controller.author_detail);

// GET request for list of all author
router.get('/authors', author_controller.author_list);



/// COMMENT ROUTES ///


// GET request for creating a comment (NOTE This must come before routes that display category (uses id))
router.get('/comment/create', comment_controller.comment_create_get);

// POST request for creating comment
router.post('/comment/create', comment_controller.comment_create_post);

// GET request to delete comment
router.get('/comment/:id/delete', comment_controller.comment_delete_get);

// POST request to delete comment
router.post('/comment/:id/delete', comment_controller.comment_delete_post);

// GET request to update comment
router.get('/comment/:id/update', comment_controller.comment_update_get);

// POST request to update comment
router.post('/comment/:id/update', comment_controller.comment_update_post);



/// USER ROUTES ///


// GET request for creating a user (NOTE This must come before routes that display category (uses id))
router.get('/user/create', user_controller.user_create_get);

// POST request for creating user
router.post('/user/create', user_controller.user_create_post);

// GET request to delete user
router.get('/user/:id/delete', user_controller.user_delete_get);

// POST request to delete user
router.post('/user/:id/delete', user_controller.user_delete_post);

// GET request to update user
router.get('/user/:id/update', user_controller.user_update_get);

// POST request to update user
router.post('/user/:id/update', user_controller.user_update_post);

// GET request for one user
router.get('/user/:id', user_controller.user_detail);

// GET request for list of all user
router.get('/users', user_controller.user_list);



//exports router module
module.exports = router;