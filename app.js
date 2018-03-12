const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const models = require('./db/models')
const routes = require('./routes')

const env = nunjucks.configure('views', {noCache: true});

app.get('/', (req, res) => {
    models.Page.findAll()
    .then(pages => {
        res.render('index', {pages})
    })
});

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/', routes)
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// wipe database when change models.
// models.db.sync({force: true})

models.db.sync()
.then(function () {
    console.log('All tables created!');
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error.bind(console));
