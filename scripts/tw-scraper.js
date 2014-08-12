var request = require('request');
var cheerio = require('cheerio');
var TWC_ONDEMAND_URL = 'http://www.twcondemand.com/movies/movies-on-demand';

module.exports = function(cb){
  request(TWC_ONDEMAND_URL, function(err, twcResponse, html){
    var availableMovies = [];
    var $ = cheerio.load(html);

    $('td.title a').each(function(){
      var movieTitle = $(this).text();
      var lastCharacterInTitle = movieTitle.slice(-1);

    // Filter out HD or "(Unedited)" movies in order to avoid duplication
      if(!(lastCharacterInTitle === 'D' || lastCharacterInTitle === ')')){
        availableMovies.push(movieTitle);
      }
    });

    cb(availableMovies);
  });
};