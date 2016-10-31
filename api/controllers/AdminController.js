/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs'),
    request = require('request');
module.exports = {
  index: (req,res) => {
    let data = {
      userName: 'Khanh Admin',
      testVariable: 'this is test value'
    };
    return res.view('template/admin/index', data)
  },

  userid: (req,res) => {
    let params = req.allParams();
    User.findOne({'id':params.id}).exec(function(err,userdata){
      res.view('template/admin/user/user-info',{userdata});
    })
  },

  userdel: (req,res) => {
    let params = req.allParams();
    console.log("check params:",params);
    User.destroy({id: [params.id]}).exec(function (err) {
      if (err) {
        return res.negotiate(err);
      }
      sails.log('xóa thành công : '+params.id);
      return res.redirect('/admin/user');
    });
  },

  category: (req,res) => {
    Category.find(function(err,allCategory) {
      if (err) {
        return res.negotiate(err)
      }
      res.view('template/admin/category/index',{allCategory})
    })
  },

  catid: (req,res) => {
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

  catadd: (req,res) => {
    if (!req.isSocket) {
      return res.badRequest('sai zồi')
    }
    let params = req.allParams();
    Category.create(params).exec(function(err,result) {
      if (err) {
        return res.negotiate(err)
      }
      res.json(result)
    })
  },

  catdel: (req,res) => {
    if (!req.isSocket) {
      return res.badRequest('sai zồi')
    }
    let params = req.allParams();
    Category.destroy({id:params.id}).exec(function(err,result) {
      if (err) {
        return res.negotiate(err)
      }
      res.ok(result)
    })
  },

  post: (req,res) => {
    Post.find(function(err,allPost) {
        if (err) return res.negotiate(err);
        res.view('template/admin/post/index',{allPost})
      })
  },

  postid: (req,res) => {
    let params = req.allParams();
    Post.findOne({id:params.id}).exec(function(err,result) {
      res.view('template/admin/post/edit',result)
    })
  },

  postedit: (req,res) => {
    if (!req.isSocket) {
      return res.badRequest('sai zồi')
    }
    let params = req.allParams();
    console.log('edit params',params);
    Post.update({id:params.id},
      params).exec(function(err,result) {
      if (err) {
        return res.negotiate(err)
      }
      return res.redirect('/admin/post')
    })
  },

  newpost: (req,res) => {
    Files.find(function(err,allThumb) {
      if (err) return res.negotiate(err);
      Category.find(function(err,allCategory) {
        res.view('template/admin/post/add',{allCategory,allThumb})
      })
    });
  },

  postadd: (req,res) => {
    if (!req.isSocket) {
      return res.badRequest('sai zồi')
    }
    let params = req.allParams();




    // var gm = require('gm');
    //
    // gm('https://'+params.thumbnail)
    //   .resize(300, 420)
    //   .autoOrient()
    //   .write('../../assets/images/thumbnail/', function (err,newimg) {
    //     if (err) console.log(err);
    //     console.log(newimg)
    //   });

    Post.create(params).exec(function(err,result) {
      if (err) {
        return res.negotiate(err)
      }
      console.log(result);
      res.json(result)
    })
  },

  postdel: (req,res) => {
    if (!req.isSocket) {
      return res.badRequest('sai zồi')
    }
    let params = req.allParams();
    Post.destroy({id:params.id}).exec(function(err,result) {
      if (err) {
        return res.negotiate(err)
      }
      res.ok(result)
    })
  }

};

