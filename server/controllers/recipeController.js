require('../models/database')
const { discriminator } = require('../models/Category');
const Category = require('../models/Category')
const Recipe = require('../models/Recipe')
/**
 * GET/
 * HomePage
 */

exports.homepage = async(req, res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
        const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber);

        const food = {latest, thai, american, chinese};



        res.render ('index', {title:'HRT - Homepage', categories, food});
    } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured"})
    }
}





/**
 * GET/categories
 * Categories
 */

 exports.exploreCategories = async(req, res) => {
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render ('categories', {title:'HRT - Categories', categories});
    } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured"})
    }
}


/**
 * GET/categories/:id
 * Categories By Id
 */

 exports.exploreCategoriesById = async(req, res) => {
    try {

        let categoryId = req.params.id;

        const limitNumber = 20;
        const categoryById = await Recipe.find({'category': categoryId}).limit(limitNumber);
        res.render ('categories', {title:'HRT - Categories', categoryById});
    } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured"})
    }
}

/**
 * GET/Recipe/:id
 * Recipe
 */

 exports.exploreRecipe = async(req, res) => {
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        res.render ('recipe', {title:'HRT - Recipe', recipe});
    } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured"});
    }
}


/**
 * POST/search
 * Search
 */
 exports.searchRecipe = async(req, res) => {
     // searchTerm
     try {
         let searchTerm = req.body.searchTerm;
         let recipe = await Recipe.find({ $text: {$search: searchTerm, $diacriticSensitive: true } });
          res.render ('search', {title:'HRT - Search', recipe});
     } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured"});
     }
}


/**
 * GET/Explore-latest
 * Explore Latest
 */

 exports.exploreLatest = async(req, res) => {
    try {
        const limitNumber = 20;
        const recipe = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        res.render ('explore-latest', {title:'HRT - Explore Latest', recipe});
    } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured"});
    }
}


/**
 * GET/Explore-Random
 * Explore Random as JSON
 */

 exports.exploreRandom = async(req, res) => {
    try {
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();
        res.render ('explore-random', {title:'HRT - Explore Random', recipe});
    } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured"});
    }
}



/**
 * GET/submit-Recipe
 * Submit Recipe
 */

 exports.submitRecipe = async(req, res) => {
    res.render ('submit-recipe', {title:'HRT - Submit Recipe'});
 }










// 用來添加資料進mongodb 雲端
// async function insertDymmyRecipeData(){
//     try{
//         await Recipe.insertMany([
//                   { 
//                     "name": "Recipe Name Goes Here",
//                     "description": `Recipe Description Goes Here`,
//                     "email": "recipeemail@raddy.co.uk",
//                     "ingredients": [
//                       "1 level teaspoon baking powder",
//                       "1 level teaspoon cayenne pepper",
//                       "1 level teaspoon hot smoked paprika",
//                     ],
//                     "category": "American", 
//                     "image": "southern-friend-chicken.jpg"
//                   },
//                   { 
//                     "name": "Recipe Name Goes Here",
//                     "description": `Recipe Description Goes Here`,
//                     "email": "recipeemail@raddy.co.uk",
//                     "ingredients": [
//                       "1 level teaspoon baking powder",
//                       "1 level teaspoon cayenne pepper",
//                       "1 level teaspoon hot smoked paprika",
//                     ],
//                     "category": "American", 
//                     "image": "southern-friend-chicken.jpg"
//                   },
//                 ]);
//     }catch(error){
//         console.log('err', + error)
//     }
// }

// insertDymmyRecipeData();