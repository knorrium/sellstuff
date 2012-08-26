/*global module*/

module.exports = function (app) {
    "use strict";
    app.get('/', function (req, res) {
        res.render('index', {
            title: 'Express Login'
        });
    });

    app.get('/items', function (req, res) {
        res.render('items', {
            title: 'Items'
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
