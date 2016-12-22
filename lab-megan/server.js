'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('list:server');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  debug(`server up at: ${PORT}`);
});
