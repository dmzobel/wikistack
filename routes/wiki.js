const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Page = models.Page;
const User = models.User;


router.get('/', function(req, res) {
    res.redirect('/');
});

router.post('/', function (req, res, next) {
    User.findOrCreate({
        where: {
            name: req.body.name,
            email: req.body.email
        }
    })
    .then((values) => {
        var user = values[0];
        Page.create({
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            authorId: user.id
        });
    })
    .then((createdPage) => res.redirect(createdPage.urlTitle))
    .catch(next);
});

router.get('/add', function(req, res) {
    res.render("addpage");
});

router.get('/:urlTitle', (req, res, next) => {
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
    .then((page) => {
        console.log(page)

        page.getAuthor
        res.render("wikipage", {page});
    })
    .catch(next);
})

module.exports = router;
