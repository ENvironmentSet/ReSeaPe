var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/load', (req, res, next) => {
    var db = require('../db');
    var db_end = db => () => db.close();
    var hash = req.query.hash.replace(/ /g,"+");
    if(req.session.isLogined === "no") {
        res.redirect("../login");
    } else {
        db.connect()
            .then( (result) => {
                db_end = db_end(result);
                return db.loadArticle(hash);
            })
            .then( (result) => {
                if(result.length === 1) {
                    res.render('recipe',{'recipe' : result[0]});
                    db_end();
                } else {
                    var err = new Error('404 Not Found');
                    db_end();
                    next(err);
                }
            }, (err) => {
                var err = new Error(err);
                db_end();
                next(err);
            });
    }
});

module.exports = router;