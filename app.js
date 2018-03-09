const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(morgan('combined'));

app.get('/', (req, res, next) => {
    res.send('hello world');
})

app.use(express.static(path.join(__dirname, '/public')));
