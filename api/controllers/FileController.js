/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  thumbnail: (req, res) => {

    req.file('uploadFiles').upload({dirname:'../../assets/images/thumbnail/'},function (err,uploadedFiles) {

      if (err) return res.serverError(err);
      // console.log(uploadedFiles);
      let [filesFound] = uploadedFiles;
      var fileName = filesFound.fd.split("/assets");
      // console.log('file name',fileName);
      Files.create({
        link:fileName[1],
        name:filesFound.filename,
        size:filesFound.size
      }).exec(function(err,result) {
        if (err) return res.negotiate(err);
      });
      sails.sockets.blast('upload/thumbnail',{img:fileName[1]});
      return false;

    });


  }
};

