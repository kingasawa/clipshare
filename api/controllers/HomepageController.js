/**
 * HomepageController
 *
 * @description :: Server-side logic for managing homepages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req,res) => {
    // let sampleDate = (new Date()).toString();

    Post.find(function(err,foundPost) {
      return res.view("homepage",{foundPost})
    });
  }
};

