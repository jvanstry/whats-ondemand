var request = require('request');
var rtApiKey = require('../rt-api-key');
var save = require('./save-movies');

module.exports = function(movieTitles){
  timeoutLoop(0, movieTitles);
};

function urlBuilder(movieName){
  var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey='
    + rtApiKey + '&q=' + movieName.split(' ').join('+') + '&page_limit=1';

  return url;
};

// Rotten tomatoes limits requests to 5 per second, so this setTimeout is
//   necessary to pause the requests for a short while each time 5 requests
//   is made. Also need to check each time if have come to end of movies array
function timeoutLoop(i, movieTitles){
  setTimeout(function(){
    for(var temp = i; i < temp + 5 && i < movieTitles.length; i++){
      var url = urlBuilder(movieTitles[i]);

      request(url, function(err, rtResponse, data){
        console.log(data);
      });
    };

    if(i < movieTitles.length){
      timeoutLoop(i, movieTitles)
    }    
  }, 1500);
}