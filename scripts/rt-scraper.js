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

// Rotten tomatoes limits requests to 5 per second, so this setTimeout is
//   necessary to pause the requests for a short while each time 5 requests
//   is made. Also need to check each time if have come to end of movies array
function timeoutLoop(i, movieTitles, moviesWithRatings, cb){
  setTimeout(function(){
    for(var temp = i; i < temp + 5 && i < movieTitles.length; i++){
      var title = movieTitles[i];
      var url = urlBuilder(title);

      request(url, function(err, rtResponse, data){
        var json = JSON.parse(data);
        var movieJson = json.movies[0];
        var movie = {
          critics: movieJson.ratings.critics_score,
          title: movieJson.title,
          audience: movieJson.ratings.audience_score
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