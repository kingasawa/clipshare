/**
 * ImdbController
 *
 * @description :: Server-side logic for managing imdbs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// var request = require('request');
var imdb = require('imdb-api');
module.exports = {
	search : (req,res) => {
    // request.get({
    //   url: 'http://www.imdb.com/title/tt1300854/'
    // },function(error,response,body){
    //   if(error) {
    //     sails.log.error(error);
    //   }
    //   console.log(body);
    //   res.send(body)
    // })
    let params = req.allParams();
    let movie;
    imdb.getById(params.imdb, function(err, things) {
      movie = things;
      sails.sockets.blast('search/imdb',{data:movie})
    });
  }
};

