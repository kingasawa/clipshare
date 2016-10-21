/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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

  post: (req,res) => {
    Post.find(function(err,allPost) {
      if (err) {
        return res.negotiate(err)
      }
      res.view('template/admin/post/index',allPost)
    })
  }

};

