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
            id: '/home'
        });
    });

    app.get('/items', function (req, res) {
        var itemModel = app.mongoose.model('Item');
        itemModel.find({}, function (err, items) {
            res.render('items', {
                title: 'Items for sale',
                items: items,
                brand: 'SellStuff',
                id: '/items'
            });
        });
    });

    app.get('/item/:slug', function (req, res) {
        var itemModel = app.mongoose.model('Item');
        itemModel.findOne({'slug': req.params.slug}, function (err, item) {
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
};
