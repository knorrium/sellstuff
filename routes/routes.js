/*global module*/

module.exports = function (app) {
    "use strict";
    app.get('/', function (req, res) {
        res.redirect('/home');
    });

    app.get('/home', function (req, res) {
        res.render('index', {
            title: 'Welcome to our shop!',
            brand: 'SellStuff',
            id: 'home'
        });
    });

    app.get('/items', function (req, res) {
        var itemModel = app.mongoose.model('Item');
        itemModel.find({}, function (err, items) {
            res.render('items', {
                title: 'Items for sale',
                items: items,
                brand: 'SellStuff',
                id: 'items'
            });
        });
    });

    app.get('/item/:id', function (req, res) {
        var itemModel = app.mongoose.model('Item');
        itemModel.findOne({'_id': req.params.id}, function (err, item) {
            if (item !== null) {
                res.render('item', {
                    title: 'Item details',
                    item: item,
                    brand: 'SellStuff',
                    id: 'item'
                });
            } else {
                res.send({
                    'error': 'item not found'
                });
            }
        });
    });

    app.get('/user/:name', function (req, res) {
        var User = new app.Schema({
                username: String,
                title: String
            }),
            userModel = app.mongoose.model('User', User);

        userModel.findOne({'username': req.params.name}, function (err, user) {
            if (user !== null) {
                res.send(JSON.stringify(user));
            } else {
                res.send({
                    'error': 'user not found'
                });
            }
        });
    });
};
