const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');

const env = nunjucks.configure('views', {noCache: true});
const server = app.listen(3000, () => {
    console.log('server listening on port 3000')
})


app.use(morgan('combined'));

app.get('/', (req, res, next) => {
    res.send('hello world');
})

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);