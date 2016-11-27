/**
 * HomepageController
 * Author       :: Kingasawa
 * @description :: Server-side logic for managing homepages
 * @help        :: https://facebook.com/kingasawa.chan
 */

module.exports = {

  index: (req,res) => {
    let presentDate = (new Date()).toString();
    let postLimit = 32;
    let params = req.allParams();

    // Count all post
    let findCountPost = new Promise((resolve, reject) => {
      Post.count().exec((err, countPost) => {
        if (err) {reject(err)}
        resolve(countPost);
      })
    });
    // Select all Featured Post - no limit
    let findFeaturedPost = new Promise((resolve, reject) => {
      Post.find({featured:1,sort:'createdAt DESC'}).exec((err, featuredPost) => {
        if (err) {reject(err)}
        resolve(featuredPost);
      })
    });
    // Select all Category - no limit
    let findAllCategory = new Promise((resolve, reject) => {
      Category.find().populate('posts').exec((err, allCategory) => {
        if (err) {reject(err)}
        resolve(allCategory);
      })
    });
    // Select all Post - limit 32
    let findAllPost = new Promise((resolve, reject) => {
      if (!params.page) {
        Post.find({sort:'createdAt DESC'}).limit(postLimit).exec((err, allPost) => {
          if (err) {
            reject(err)
          }
          resolve(allPost);
        })
      } else {
        Post.find({sort:'createdAt DESC'}).paginate({params,limit:postLimit}).exec((err, allPost) => {
          if (err) {
            reject(err)
          }
          resolve(allPost);
        })
      }
    });
    // Solve all using Async/Await
    (async () => {
      var [featuredPost,allCategory,allPost] = await Promise.all([
        findFeaturedPost,
        findAllCategory,
        findAllPost
      ]);
      return res.view("homepage", {featuredPost,allCategory,allPost})
    })
    ()
  }
};
