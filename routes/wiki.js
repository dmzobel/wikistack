const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Page = models.Page; 
const User = models.User; 


router.get('/', function(req, res) {
    res.redirect('/');
});

router.post('/', function (req, res, next) {
  const page = Page.build({
    title: req.body.title,
    content: req.body.content,
  });
  page.save()
  .then(res.redirect(page.urlTitle))
});

router.get('/add', function(req, res) {
    res.render("addpage");
});

router.get('/:urltitle', (req, res, next) => {
    Page.findOne({
        where: {
            urlTitle: req.params.urltitle
        }
    })
    .then((page) => {
        console.log(page)
        res.render("wikipage", {page});
    })
    .catch(next);
})

module.exports = router;
