var fs = require('fs');

module.exports = function(movies){
  var stringMovies = JSON.stringify(movies);

  fs.writeFile('data.json', stringMovies, function(err){
    if(err){
      throw err;
    }
    console.log('saved')
  })
}