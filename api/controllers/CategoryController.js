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
    let params = req.allParams();
    Category.find(function(err,allCategory) {
      Post.find({limit: 5,sort: 'createdAt DESC'}).exec(function (err, fivePost) {
        Category.findOne({id: params.id}).populate('posts').exec(function (err, foundCategory) {
          if (err) {
            return res.negotiate(err)
          }
          res.view('template/category', {foundCategory, fivePost, allCategory,title:foundCategory.name})
        })
      })
    })
  }
};
