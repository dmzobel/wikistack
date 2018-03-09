const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const models = require('./db/models')

const env = nunjucks.configure('views', {noCache: true});


app.use(morgan('combined'));

app.get('/', (req, res, next) => {
    res.send('hello world');
})

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

models.User.sync()
.then(function () {
    console.log('User table created!');
    return models.Page.sync();
})
.then(function () {
    console.log('Page table created!');
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error.bind(console));
