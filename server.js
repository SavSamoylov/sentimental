const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
require('dotenv-safe').config({allowEmptyValues: true});

const app = express();

const PORT = process.env.PORT || 3001;

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));

app.use(express.static('client/build'));

app.use(morgan("dev"));


const twitterAPI = require('./controller/twitter-api.js').router;
app.use('/api', twitterAPI);

app.listen(PORT, () => console.log('App listening on port: ', PORT));