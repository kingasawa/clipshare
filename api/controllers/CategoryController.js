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
    let id = req.params.id;
    Category.findOne({id:id}).exec(function(err,foundCategory) {
      if (err) {
        return res.negotiate(err)
      }
      res.view('template/category/view',foundCategory)
    })
  }

};
