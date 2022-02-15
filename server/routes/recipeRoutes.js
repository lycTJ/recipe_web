const express = require('express')
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/*
* APP Routes
*/
router.get('/', recipeController.homepage);

module.exports = router;

