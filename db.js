module.exports = function () {
    var mongoose = require('mongoose');
    var crypto = require('crypto');
    var salt = "KANU";
    var userSchema = new mongoose.Schema({
        'id' : String,
        'password' : String // sha-512(password)
    }, { collection: 'USERS' });
    var articleSchema = new mongoose.Schema({
        'title' : String,
        'ingredients' : Array,
        'recipe' : Array,
        'author' : String,
        'hash' : String // sha-512(title+salt+author) base64
    }, { collection: 'ARTICLES' });

    var USER = mongoose.model('USER', userSchema);
    var ARTICLE = mongoose.model('ARTICLE', articleSchema);

    function connect () {
        return new Promise( (resolve, reject) => {
            var db = mongoose.connection;
            db.on('error', err => reject(err));
            db.once('open', function(){
                // CONNECTED TO MONGODB SERVER
                resolve(mongoose.connection);
            });
            mongoose.connect('mongodb://localhost/MAXIM');
        });
    }

    function saveUser (id,password) {
        return new Promise( (resolve, reject) => {
            var user = new USER({
                'id' : id,
                'password' : crypto.createHash('sha512').update(password+salt).digest('base64')
            });
            if(!(typeof id === "string" && typeof password === "string")) reject('id or password is not a string');
            USER.find({ 'id' : id }, (err, result) => {
                if(err) reject(err);
                if(result.length > 0) {
                    reject('already exits id');
                } else user.save( (err, result) => {
                    if(err) reject(err);
                    resolve(result);
                });
            });
        });
    }

    function saveArticle (title,contents,author) { // contents = [ 재료들 , 레시피 ]
        return new Promise( (resolve, reject) => {
            var article = new ARTICLE({
                'title' : title,
                'ingredients' : contents[0],
                'recipe' : contents[1],
                'author' : crypto.createHash('sha512').update(author+salt).digest('base64'),
                'hash' : crypto.createHash('sha512').update(title+salt+author).digest('base64')
            });
            article.save( (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    function loadArticle (hash,title) {
        return new Promise( (resolve, reject) => {
            if(hash) {
                ARTICLE.find({ 'hash' : hash }, (err, result) => {
                    if(err) reject(err);
                    resolve(result);
                });
            } else ARTICLE.find({ 'title' : title }, (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    function updateArticle (hash,title,contents,author) {
        return new Promise( (resolve, reject) => {
            ARTICLE.update({ 'hash' : hash }, {'title' : title, 'ingredients' : contents[0], 'recipe' : contents[1], 'author' : author}, (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    function deleteArticle (hash) {
        return new Promise( (resolve, reject) => {
            ARTICLE.remove({ 'hash' : hash }, (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    function loadUser (id,password) {
        return new Promise( (resolve, reject) => {
            USER.find({ 'id' : id, 'password' : crypto.createHash('sha512').update(password+salt).digest('base64') }, (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    function searchArticle (...ingredients) { //db.ARTICLES.find({ "ingredients" : {$in:[...ingredients]} })
        return new Promise( (resolve, reject) => {
            ARTICLE.find({ 'ingredients' : {$in : ingredients } }, (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    return {
        'connect' : connect,
        'saveUser' : saveUser,
        'saveArticle' : saveArticle,
        'loadArticle' : loadArticle,
        'updateArticle' : updateArticle,
        'deleteArticle' : deleteArticle,
        'loadUser' : loadUser,
        'searchArticle' : searchArticle
    }
}();