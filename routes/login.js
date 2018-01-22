var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res ,next) => {
    var db = require('../db');
    var db_end = db => () => db.close();
    var id = req.body.id_section;
    var password = req.body.password_section;
    db.connect()
        .then( (result) => {
            db_end = db_end(result);
            return db.loadUser(id,password);
        })
        .then( (result) => {
           if(result.length > 0) {
               req.session.isLogined = "yes";
               req.session.id = id;
               res.render('alert',{'message' : "LOGIN SUCCESS", 'href' : "/" , 'time' : 3});
           } else{
               req.session.isLogined = "no";
               res.render('alert',{'message' : "LOGIN FAIL", 'href' : "/" , 'time' : 3});
               db_end();
           }
        }, (err) => {
            req.session.isLogined = "no";
            var err = new Error(err);
            db_end();
            next(err);
        });

});

module.exports = router;