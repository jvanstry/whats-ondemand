var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var logger = require('morgan');

var TWC_ONDEMAND_URL = 'http://www.twcondemand.com/movies/movies-on-demand';
var app = express();

app.set('port', process.env.PORT || 4114);
app.set('view engine', 'ejs');
// app.use(express.static, __dirname);
app.use(logger(process.env.NODE_ENV || 'dev'));

app.get('/', function(req, res){
  request(TWC_ONDEMAND_URL, function(err, twcResponse, html){
    var $ = cheerio.load(html);
    $('td.title a').each(function(){
      console.log($(this).text())
    });
    res.send('hi');
  });
});

app.listen(app.get('port'));
console.log('listening on port' + app.get('port'));