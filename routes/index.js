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

}
