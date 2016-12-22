'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Recipe = require('../model/recipe.js');
const debug = require('debug')('recipe:recipe-router');
const recipeRouter = module.exports = new Router();

recipeRouter.post('/api/recipe', jsonParser, function(req, res, next) {
  debug('POST: /api/recipe');

  req.body.created = new Date();
  new Recipe(req.body).save()
  .then( recipe => res.json(recipe))
  .catch(next);
});

recipeRouter.get('/api/recipe/:id', function(req, res, next) {
  debug('GET: /api/recipe/:id');

  Recipe.findById(req.params.id)
  .then( recipe => res.json(recipe))
  .catch(next);
});
