'use strict'

const express = require('express');
const router = express.Router();

const account = require('./routes/account');
const lessons = require('./routes/lessons');

router.use('/accounts', account);
router.use('/lessons', lessons);

//Catch for if a route doesn't exist
router.use('/', (req, res, next) => {
  return res.status(404).send({ error: `Endpoint doesn't exist.`, message: `please check /api-docs to learn how to use this api.` });
});

module.exports = router;