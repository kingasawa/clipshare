/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req, res) => {
    Category.find(function(err,allCategory) {
      res.view("template/user/login",{allCategory});
    })
  },

  register: (req, res) => {
    Category.find(function(err,allCategory) {
      res.view("template/user/register",{allCategory});
    })
  }
};

