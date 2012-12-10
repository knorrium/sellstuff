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

    app.post('/admin/login', function (req, res) {
        if (req.body && req.body.password) {
            var adminuser = app.db.model('User');
            adminuser.findOne({
                username: req.body.username,
                password: app.hashString(req.body.password) 
            }, 
            function (err, row) {
                if (err) {
                    res.render('admin/login', {
                        title: 'Login',
                        error_text: err,
                        brand: 'SellStuff',
                        id: '/admin/login'
                    });         
                } else {
                    if (row) {
                        req.session.loggedIn = true; // register user is logged in
                        res.redirect('/admin');
                    } else {
                        res.render('admin/login', {
                            title: 'Login',
                            error_text: 'User not found, Please try again',
                            username: req.body.username,
                            brand: 'SellStuff',
                            id: '/admin/login'
                        }); 
                    }
                }
            });
        } else {
            res.render('admin/login', {
                title: 'Login',
                error_text: 'Error processing login.',                
                brand: 'SellStuff',
                id: '/admin/login'
            }); 
        }
    });

    app.get('/admin/login', function (req, res) {
        if (!app.checkLogin(req, res)) {
            res.render('admin/login', {
                title: 'Login',
                brand: 'SellStuff',
                id: '/admin/login'
            });
        } else {
            res.redirect("/admin");
        }
    });

    app.get('/admin', function (req, res) {
        if (!app.checkLogin(req, res)) {
            res.redirect("/admin/login");
        } else {
            res.render('admin/index', {
                title: 'Admin Index',
                brand: 'SellStuff',
                id: '/admin/login'
            });
        }
    });

    app.get('/admin/logout', function (req, res) {
        if (req.session && req.session.loggedIn){
            delete req.session.loggedIn;
        }
        res.redirect('/admin/login');
    });
};
