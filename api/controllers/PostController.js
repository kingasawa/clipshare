/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req,res) => {
    Category.find(function(err,allCategory) {
      Post.find(function(err,result) {
        if (err) {
          return res.negotiate(err)
        }
        res.view('template/admin/post/index',{result,allCategory})
      })
    })
  },

  view: (req,res) => {
    let params = req.allParams();
    Category.find(function(err,allCategory) {
      Post.find({limit:5,sort: 'createdAt DESC'}).exec(function(err,fivePost) {
        Post.findOne({id: params.id}).exec(function (err,result) {
          if (err) {
            return res.negotiate(err)
          }
          let updateView = result.view+1;
          Post.update({id:params.id},{view:updateView}).exec(function(err,done){
            //do something
          });
          res.view('template/post',{result,allCategory,fivePost,title:result.name})
        })
      })
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
  },

  search: (req,res) => {
    let params = req.allParams();
    Post.find({
      slug:{'contains':params.keyword},sort:'createdAt DESC'
    }).exec(function(err,searchPost) {
      if (!searchPost) {
        res.negotiate('Không tìm thấy phim')
      } else {
        Category.find(function(err,allCategory) {
          Post.find({limit:5}).exec(function(err,fivePost) {
            res.view('template/search', {searchPost,allCategory,fivePost,title:'Clip Share - Tìm Phim'})
          })
        })
      }
    })
  }

};

