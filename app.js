// https://youtu.be/OEdPH4fV7vY
// dependency 
// npm i connect-flash cookie-parser dotenv ejs express express-ejs-layouts express-fileupload express-session mongodb mongoose
// npm i nodemon --save-dev

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = process.env.port || 3000;

require('dotenv').config();


app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js')
app.use('/', routes)

app.listen(port, ()=> console.log(`Listening at http://127.0.0.1:${port}`))
