var express = require('express');
var router = express.Router();

//TODO : add Editor
/* GET home page. */
router.get('/write', (req, res) => {
    if(req.session.isLogined === "no") {
        res.redirect("../login");
    } else res.render('write');
});

router.post('/write', (req,res,next) => {
    var db = require('../db');
    var db_end = db => () => db.close();
    var author = req.session.id;
    var title = req.body.title;
    var ingredients = req.body.ingredients.split(",").map( (value, index, array) => {
        return value.replace(/ /g,"");
    });
    var how_to = req.body.how_to.split(".");
    if(req.session.isLogined === "no") {
        res.redirect("../login");
    } else {
        db.connect()
            .then( (connection) => {
                db_end = db_end(connection);
                if(how_to[how_to.length-1] === "") how_to.pop();
                return db.saveArticle(title,[ingredients,how_to],author)
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