/**
 * UserController
 *
 * @description :: Server-side loXử lý mọi thông tin liên quan đến user
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: (req, res) => {
    //Kiểm tra xem data gửi đến từ client (main.js xử lý) có đúng là socket không?
    if (!req.isSocket) {return res.badRequest();}

    let params = req.allParams();
    User.login(params.email, params.password).then((result) => {

      req.session.user_id = result.id; // Store id vào sess user_id
      req.session.user = result; // store hết user data vào object user trong session

      let session_id = req.signedCookies['sails.sid'];


      sails.sockets.join(req, 'logged'); // Đưa user vừa đăng nhập vào room Logged
      sails.sockets.join(req, session_id); // Đưa user vừa đăng nhập vào room của chính bản thân user
      sails.sockets.broadcast(session_id, 'user/login-success', { message: "đăng nhập thành công", all_session_data: req.session});

      delete result.password;
      res.json(200, {result});

    }).catch((err) => {
      res.json(500, {"báo lỗi": err})
    });
  },
  //Xóa toàn bộ session của user khi logout
  logout: (req, res) => {
    req.session.destroy(function() {
      res.redirect('/trangchu');
    });
  },
  register: (req, res) => {
    //Kiểm tra xem data gửi đến từ client (main.js xử lý) có đúng là socket không?
    if (!req.isSocket) {return res.badRequest();}

    let params = req.allParams();
    User.findOne({email:params.email}).exec(function(err,record) {
      if (err) {
        return res.negotiate(err);
      }
      if (record) {
        sails.sockets.join(req, params.email);
        sails.sockets.broadcast(params.email,'user/exists');
        return res.status(500,'User already exists!');
      } else {
        User.create({email:params.email,password: params.password,name: params.name,birthday:params.birthday}).exec(function(err,result) {
          if (err) { return res.serverError(err); }
          sails.sockets.join(req, params.email);
          sails.sockets.broadcast(params.email,'user/registered');
          return res.ok();
        })
      }
    });

  },
  allusers: (req, res) => {
    User.find(function (err, users) {

      res.view('admin/users',{users})
    })
  },
  userid: (req,res) => {
    let params = req.allParams();

    if (req.session.user.id && req.session.user.id == params.id) {
      var edit = 'ok'
    } else {
      var edit = 'no'
    }
    User.findOne({'id':params.id}).exec(function(err,userdata){

      res.view('user/info',{userdata,edit});

    })
  }
};

