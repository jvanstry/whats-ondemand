var express = require('express');
var path = require('path');
var logger = require('morgan');

var TWC_ONDEMAND_URL = 'http://www.twcondemand.com/movies/movies-on-demand';
var app = express();

app.set('port', process.env.PORT || 4114);
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));
app.use(logger(process.env.NODE_ENV || 'dev'));

app.get('/', function(req, res){
   res.render('home');
});

app.listen(app.get('port'));
console.log('listening on port' + app.get('port'));