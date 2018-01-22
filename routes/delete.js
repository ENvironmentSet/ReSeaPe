var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/delete', (req, res, next) => {
    var db = require('../db');
    var db_end = db => () => db.close();
    var hash = req.query.hash.replace(/ /g,"+");;
    if(req.session.isLogined === "no") {
        res.redirect("../login");
    } else {
        db.connect()
            .then( (result) => {
                db_end = db_end(result);
                return db.deleteArticle(hash);
            })
            .then( (result) => {
                res.render('alert',{'message' : "DELETE SUCCESS", 'href' : "/" , 'time' : 3});
                db_end();
            }, (err) => {
                var err = new Error(err);
                db_end();
                next(err);
            });
    }
});

module.exports = router;