var request = require('request');
var rtApiKey = require('../rt-api-key');
var save = require('./save-movies');

module.exports = function(movieTitles){
  var moviesWithRatings = timeoutLoop(0, movieTitles, [], save);
};

function urlBuilder(movieName){
  var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey='
    + rtApiKey + '&q=' + movieName.split(' ').join('+') + '&page_limit=1';

  return url;
};

// Rotten tomatoes limits requests  per second, so this setTimeout is
//   necessary to pause the requests for a short while each time 2 requests
//   is made. Also need to check each time if have come to end of movies array
// This requests per second seems to change frequently so keep this in
function timeoutLoop(i, movieTitles, moviesWithRatings, cb){
  setTimeout(function(){
    console.log(movieTitles);
    for(var temp = i; i < temp + 2 && i < movieTitles.length; i++){
      var title = movieTitles[i];
      var url = urlBuilder(title);

      request(url, function(err, rtResponse, data){
        console.log(data)
        var json = JSON.parse(data);
        var movieJson = json.movies == [] ? json.movies[0] : { ratings: undefined };
        var movie = {};

        if(movieJson.ratings){
            movie.critics = movieJson.ratings.critics_score;
            movie.title = movieJson.title;
            movie.audience = movieJson.ratings.audience_score;
        }

        moviesWithRatings.push(movie);

        if(moviesWithRatings.length === movieTitles.length){
          cb(moviesWithRatings);
        }
      });
    };

    if(i < movieTitles.length){
      timeoutLoop(i, movieTitles, moviesWithRatings, cb)
    }   
  }, 1500);
}