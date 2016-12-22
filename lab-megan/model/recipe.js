'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = Schema({
  title: { type: String, required: true },
  created: { type: Date, required: true }
});

module.exports = mongoose.model('recipe', recipeSchema);
