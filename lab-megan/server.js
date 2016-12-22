'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const recipeRouter = require('./route/recipe-route.js');
const debug = require('debug')('recipe:server');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/recipe';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(recipeRouter);

app.listen(PORT, () => {
  debug(`server up at: ${PORT}`);
});
