'use strict'
process.env.NODE_ENV ? null : require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const router = require('./router');
const database = require('./database/database');
const listener = require('./util/internalHost');

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', router);

app.use('/', (req, res, next) => {
  return res.status(404).send({ error: `Endpoint doesn't exist.`, message: `API is located at /api/v1/ or Read docs at /api-docs` });
});

const PORT = process.env.PORT || 3000;

new database({}, () => {
  app.listen(PORT, () => {
    console.log(`Running on: localhost:${PORT}`);
  });
  // app.listen(80, '0.0.0.0', listener);
})
