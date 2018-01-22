var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/search', (req, res, next) => {
    var db = require('../db');
    var db_end = db => () => db.close();
    var word = req.query.search_word.split(",").map( (value, index, array) => {
        return value.replace(/ /g,"");
    });
    if(req.session.isLogined === "no") {
        res.redirect("../login");
    } else {
        db.connect()
            .then( (result) => {
                db_end = db_end(result);
                return db.searchArticle(...word);
            })
            .then( (result) => {
                if(result.length > 15) result.length = 15;
                res.render('view_list',{'recipes' : result});
                db_end();
            }, (err) => {
                var err = new Error(err);
                db_end();
                next(err);
            });
    }
});

module.exports = router;