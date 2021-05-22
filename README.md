NodeJs Blog Api

Getting Started

-Clone this repo
-"npm install" to install all required dependencies
-Replace MongoDB url with your own databse url in app.js
-If you have nodemon installed in your machene run "nodemon start" to start the local server, else run "npm run dev"

Dependencies

-async
-dotenv
-express
-express-validator
-mongoose

Application Structure


app.js - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.

routes/ - This folder contains the route definitions for our API.

models/ - This folder contains the schema definitions for our Mongoose models.

controllers/ - This folder contains the main functionality of our application


API End Points

localhost:3000/api
localhost:3000/api/articles
localhost:3000/api/article/:id
localhost:3000/api/article/create
localhost:3000/api/article/delete
localhost:3000/api/article/update

localhost:3000/api/authors
localhost:3000/api/author/:id
localhost:3000/api/author/create
localhost:3000/api/author/delete
localhost:3000/api/author/update

localhost:3000/api/users
localhost:3000/api/user/:id
localhost:3000/api/user/create
localhost:3000/api/user/delete
localhost:3000/api/user/update

localhost:3000/api/comment/create
localhost:3000/api/comment/delete
localhost:3000/api/comment/update
