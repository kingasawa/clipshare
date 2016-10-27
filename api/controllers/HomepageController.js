/**
 * HomepageController
 * Author       :: Kingasawa
 * @description :: Server-side logic for managing homepages
 * @help        :: https://facebook.com/kingasawa.chan
 */

module.exports = {

  index: (req,res) => {
    let presentDate = (new Date()).toString();

    let findFeaturedPost = new Promise((resolve, reject) => {
      Post.find({featured:1}).exec((err, featuredPost) => {
        if (err) {reject(err)}
        resolve(featuredPost);
      })
    });
    let findAllCategory = new Promise((resolve, reject) => {
      Category.find().populate('posts').exec((err, allCategory) => {
        if (err) {reject(err)}
        resolve(allCategory);
      })
    });
    (async () => {
      var [featuredPost,allCategory] = await Promise.all([findFeaturedPost,findAllCategory]);
      console.log(allCategory);
      return res.view("homepage", {featuredPost,allCategory})
    })
    ()
  }

};

