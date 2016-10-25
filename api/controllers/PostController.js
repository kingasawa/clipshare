/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req,res) => {
    Post.find(function(err,result) {
      if (err) {
        return res.negotiate(err)
      }
      res.view('template/admin/post/index',result)
    })
  },

  view: (req,res) => {
    let params = req.allParams();
    Post.findOne({id:params.id}).exec(function(err,result) {
      if (err) {
        return res.negotiate(err)
      }
      res.view('template/post',result)
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

