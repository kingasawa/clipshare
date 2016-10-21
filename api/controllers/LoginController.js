/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req, res) => {
    res.view("user/login");
  },

  register: (req, res) => {
    res.view("user/register");
  }
};

