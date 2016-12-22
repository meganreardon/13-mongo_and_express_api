'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipesSchema = Schema({
  title: { type: String, required: true },
  created: { type: Date, required: true }
});

module.exports = mongoose.model('recipes', recipesSchema);
