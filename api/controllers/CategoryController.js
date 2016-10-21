/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: (req,res) => {
	  Category.find(function(err,result) {
	    if (err) {
	      return res.negotiate(err)
      }
      res.view('template/admin/category/index',result)
    })
  },

  view: (req,res) => {
    let id = req.params.id;
    Category.findOne({id:id}).exec(function(err,result) {
      if (err) {
        return res.negotiate(err)
      }
      res.view('template/admin/category/view',result)
    })
  },

  edit: (req,res) => {
    if (!req.isSocket) {
      return res.badRequest('sai zồi')
    }
    let params = req.allParams();
    Category.update({id:params.id},{
      name: params.name,
      description: params.description,
      column: params.column,
      status: params.status
    }).exec(function(err,result) {
      if (err) {
        return res.negotiate(err)
      }
      res.json(result)
    })
  },

  create: (req,res) => {
    if (!req.isSocket) {
      return res.badRequest('sai zồi')
    }
    let params = req.allParams();
    Category.create({
      name: params.name,
      description: params.description,
      column: params.column,
      status: params.status
    }).exec(function(err,result) {
      if (err) {
        return res.negotiate(err)
      }
      res.json(result)
    })
  }

};
