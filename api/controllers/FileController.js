/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  thumbnail: (req, res) => {

    let params = req.allParams();
    sails.log('params', params);

    req.file('uploadFiles').upload({dirname:'../../assets/images/thumbnail/'},function (err,uploadedFiles) {

      if (err) return res.serverError(err);
      console.log(uploadedFiles);
      let [filesFound] = uploadedFiles;
      var fileName = filesFound.fd.split("/assets");

      console.log('file name',fileName);
      // User.update(params,{avatar:fileName[1]}).exec(function(err,data) {
      //   if (err) console.log(err);
      //   return res.redirect('profile/'+params.phone);
      // })

    });


  }
};

