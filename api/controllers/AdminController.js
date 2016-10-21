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
  }
};

