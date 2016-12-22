'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Recipe = require('../model/recipe.js');
const debug = require('debug')('recipe:recipe-router');
const recipeRouter = module.exports = new Router();

recipeRouter.post('/api/recipe', jsonParser, function(req, res, next) {
  debug('POST: /api/recipe');

  // console.log('::: inside recipe-route.js POST method');
  req.body.created = new Date();
  new Recipe(req.body).save()
  .then( recipe => res.json(recipe))
  .catch(next);
});

recipeRouter.get('/api/recipe/:id', function(req, res, next) {
  debug('GET: /api/recipe/:id');

  // console.log('::: inside recipe-route.js GET method');
  Recipe.findById(req.params.id)
  .then( recipe => res.json(recipe))
  .catch(next);
});

recipeRouter.put('/api/recipe/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/recipe/:id');

  // console.log('::: insdie recipe-router.js PUT method');
  // Recipe.updateRecipe(req.query.id, req.body) // orig
  // Recipe.update(req.query.id, req.body) // TODO this is incorrect
  // console.log('::: inside recipe-router.js, req.query.id is:', req.query.id); // undefined
  console.log('::: inside recipe-router.js, req.params.id is:', req.params.id);
  console.log('::: inside recipe-router.js, req.body is:', req.body);
  Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true}) // boll at end here
  // expects object firs tot match items that want to update and then second is thing to update with
  // updatebyid -- look this up
  // find by id and update
  .then( recipe => res.json(recipe))
  .catch(next);
});
