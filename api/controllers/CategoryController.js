/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: (req,res) => {
	  Category.find(function(err,allCategory) {
	    if (err) {
	      return res.negotiate(err)
      }
      res.view('template/category/index',allCategory)
    })
  },

  view: (req,res) => {
  // (page1 - 1) * 12 = skip 0, (page2 - 1) * 12 = skip 12
    let params = req.allParams();
    var postLimit = 12;
    if (params.page) var perPage = (params.page - 1) * postLimit;
    else var perPage = 0;
    Category.find(function(err,allCategory) {
      Post.find({limit: 5,sort: 'createdAt DESC'}).exec(function (err, fivePost) {
        Category.findOne({id: params.id})
          .populate('posts',{skip:perPage,limit:postLimit})
          .exec(function (err, foundCategory) {
          if (err) {
            return res.negotiate(err)
          }
          res.view('template/category', {foundCategory, fivePost, allCategory,title:foundCategory.name})
        })
      })
    })
  }
};
