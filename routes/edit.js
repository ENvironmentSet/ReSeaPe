var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/edit', (req, res, next) => {
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
                    res.render('edit',{'recipe' : result[0]});
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

router.post('/edit', (req,res,next) => {
    var db = require('../db');
    var db_end = db => () => db.close();
    var author = req.session.id;
    var title = req.body.title;
    var ingredients = req.body.ingredients.split(",").map( (value, index, array) => {
        return value.replace(/ /g,"");
    });
    var how_to = req.body.how_to.split(".");
    var hash = req.body.hash;
    if(req.session.isLogined === "no") {
        res.redirect("../login");
    } else  {
        db.connect()
            .then( (connection) => {
                db_end = db_end(connection);
                if(how_to[how_to.length-1] === "") how_to.pop();
                return db.updateArticle(hash,title,[ingredients,how_to],author)
            })
            .then( () => {
                res.render('alert',{'message' : "WRITE ARTICLE IS SUCCESS", 'href' : "/" , 'time' : 3});
                db_end();
            }, (err) => {
                var err = new Error(err);
                db_end();
                next(err);
            });
    }
});

module.exports = router;