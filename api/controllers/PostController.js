/**
 * PostController
 * @Author      :: Trần Cát Khánh
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
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
          if (result.type == 4) {
            request.get({
              url: 'https://api.blogit.vn/getlink.php?link='+result.source
            },function(error,response,body){
              var data = JSON.parse(body);
              var check = data.result.data.link[0];
              if (typeof(check) != 'undefined') {
              result.source = data.result.data.link[0].file;
              result.source = result.source.replace('api.blogit.vn','vnmagic.net');
              } else result.source = 'http://vietapi.net/linkdie.mp4';
              return res.view('template/post',{result, allCategory, fivePost, title:result.name})
            })
          } else {
            if (err) return res.negotiate(err);
            let updateView = result.view + 1;
            Post.update({id: params.id}, {view: updateView}).exec(function (err, done) {
              //do something
            });
            res.view('template/post', {result, allCategory, fivePost, title: result.name})
          }
        })
      })
    })
  },

  edit: (req,res) => {
    if (!req.isSocket) return res.badRequest('sai zồi');

    let params = req.allParams();
    Category.update({id:params.id},{
      name: params.name,
      description: params.description,
      column: params.column,
      status: params.status
    }).exec(function(err,result) {
      if (err) return res.negotiate(err);
      res.json(result)
    })
  },

  create: (req,res) => {
    if (!req.isSocket) return res.badRequest('sai zồi');

    let params = req.allParams();
    Category.create({
      name: params.name,
      description: params.description,
      column: params.column,
      status: params.status
    }).exec(function(err,result) {
      if (err)return res.negotiate(err);
      res.json(result)
    })
  },

  search: (req,res) => {
    let params = req.allParams();
    let postLimit = 12;
    Post.find({slug:{'contains':params.keyword},sort:'createdAt DESC'})
      .paginate({page:params.page,limit:postLimit})
      .exec(function(err,searchPost) {
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
  },
  error: (req,res) => {
    // post/error?id=params_id&type=link
    let params = req.allParams();

      Post.update({id:params.id},{broken:1}).exec(function(err) {
        if (err) return res.negotiate(err);
        else console.log('Broken URL: '+params.id)
      })


  }

};

