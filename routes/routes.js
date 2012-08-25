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

    app.get('/user', function (req, res) {
        var User = new app.Schema({
            username: String,
            title: String
        });

        var userModel = app.mongoose.model('User', User);
        res.contentType('application/json');
        userModel.findOne({'username': 'Felipe'}, function(err, user) {
            if (user !== null) {
                console.log('Found the User: ' + user.username);
                res.send(JSON.stringify(user));
            } else {
                console.log("User not found");
                res.send({
                    'error': 'user not found'
                });
            }
        });
    });
}
