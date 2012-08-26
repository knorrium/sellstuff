module.exports = function(app){

    app.get('/', function(req, res){
        res.render('index', {
            title: 'Express Login'
        });
    });

    app.get('/items', function(req, res){
        res.render('items', {
            title: 'Items'
        });
    });

    app.get('/user/:name', function (req, res) {
        var User = new app.Schema({
            username: String,
            title: String
        });

        var userModel = app.mongoose.model('User', User);
        
        res.contentType('application/json');
        userModel.findOne({'username': req.params.name}, function(err, user) {
            if (user !== null) {
                res.send(JSON.stringify(user));
            } else {
                res.send({
                    'error': 'user not found'
                });
            }
        });
    });
}
