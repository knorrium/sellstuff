/*global module*/

module.exports = function (app) {
    "use strict";
    app.get('/', function (req, res) {
        res.render('index', {
            title: 'Express Login'
        });
    });

    app.get('/items', function (req, res) {
        var Item = new app.Schema({
                title: String
            }),
            itemModel = app.mongoose.model('Item', Item);

        itemModel.find({}, function (err, items) {
            res.render('items', {
                title: 'Items for sale',
                items: items
            });
        });
    });

    app.get('/item/:id', function (req, res) {
        var Item = new app.Schema({
                title: String,
                description: String,
                price: String,
                tags: [String],
                pictures: [String]
            }),
            itemModel = app.mongoose.model('Item', Item);

        itemModel.findOne({'_id': req.params.id}, function (err, item) {
            if (item !== null) {
                res.render('item', {
                    title: 'Item details',
                    item: item
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
