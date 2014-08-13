var twScraper = require('./tw-scraper');
var rtScraper = require('./rt-scraper');
var UPDATE_TIME = 86,400,000; // one day in milliseconds

module.exports = function(){
  setInterval(function(){
    twScraper(rtScraper)
  }, UPDATE_TIME);
}