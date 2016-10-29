/**
 * ImdbController
 *
 * @description :: Server-side logic for managing imdbs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
var imdb = require('imdb-api');
module.exports = {
	title : (req,res) => {
    // request.get({
    //   url: 'http://www.imdb.com/title/tt1300854/'
    // },function(error,response,body){
    //   if(error) {
    //     sails.log.error(error);
    //   }
    //   console.log(body);
    //   res.send(body)
    // })
    var movie;
    imdb.getById('tt0090190', function(err, things) {
      movie = things;
      console.log(movie)
    });
  }
};

