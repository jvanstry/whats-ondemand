var fs = require('fs');
var MOVIE_DATA_FILE = '../data.json';

module.exports = function(movies){
  var stringMovies = JSON.stringify(movies);

  fs.writeFile(MOVIE_DATA_FILE, stringMovies, function(err){
    if(err){
      throw err;
    }
    console.log('saved')
  })
}