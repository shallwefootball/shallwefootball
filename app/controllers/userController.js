var fs          = require('fs'),
    path        = require('path'),
    async       = require('async'),
    passport    = require('passport'),
    userModel   = require('../models/userModel'),
    playerModel = require('../models/playerModel'),
    config      = require('../config/config'),
    easyimage   = require('easyimage'),
    rimraf      = require('rimraf'),
    bcrypt      = require('bcryptjs');


// resize and remove EXIF profile data
exports.myInfoView = function(req, res) {
    playerModel.selectPlayer(req.user.email, function (err, player) {
        res.render('../views/player/myInfo', {
            user : req.user
        });
    });
};


exports.profileImg = function(req, res) {
    var userId = req.user.userId;
    console.log('userId    : ', userId);
    var userfolder = path.resolve(__dirname, '..', 'images/user/', userId.toString());
    console.log('userfolder     : ', userfolder);
    if(fs.existsSync(userfolder)){
        rimraf.sync(userfolder);
    }
    fs.mkdirSync(userfolder);

    var profileImg = req.files.profileImg;
    var idx = profileImg.name.lastIndexOf('.');
    var ext = profileImg.name.substring(idx);   // --> jpg
    var fileName = userId + '.jpg';
    var srcPath = profileImg.path;
    var destPath = path.resolve(userfolder , fileName);

    // gm(srcPath)
    // .resize(60, 60)
    // .noProfile()
    // .write(destPath, function (err) {
    //     if (!err) console.log('done');
    // });

};


// exports.updateProfileImg = function(req, res) {
//     var userId = req.user.userId;
//     console.log('userId    : ', userId);
//     var userfolder = path.resolve(__dirname, '..', 'images/user/', userId.toString());
//     console.log('userfolder     : ', userfolder);
//     if(fs.existsSync(userfolder)){
//         rimraf.sync(userfolder);
//     }
//     fs.mkdirSync(userfolder);

//     var profileImg = req.files.profileImg;
//     var idx = profileImg.name.lastIndexOf('.');
//     var ext = profileImg.name.substring(idx);   // --> jpg
//     var fileName = userId + ext;
//     var srcPath = profileImg.path;
//     var destPath = path.resolve(userfolder , fileName);
//     var is = fs.createReadStream(srcPath);
//     var os = fs.createWriteStream(destPath);
//     is.pipe(os);
//     is.on('end', function(){
//         fs.unlinkSync(srcPath);
//         var srcimg = destPath;
//         var idx = destPath.lastIndexOf('.');
//         var originFileName = destPath.substring(0, idx);
//         var ext = destPath.substring(idx);
//         var smallImg = originFileName + '-small' + ext;
//         var normalImg = originFileName + '-normal' + ext;

//         console.log('smallImg  : ', smallImg);
//         easyimage.resize({
//             src : srcimg,
//             dst : smallImg,
//             width: 50,
//             height: 50
//         }).then(function (smallFile){

//             easyimage.resize({
//                 src : srcimg,
//                 dst : normalImg,
//                 width: 140,
//                 height: 140
//             }).then(function (normalFile){
//                 res.redirect('back');
//             }, function (err) { console.error(err); });
//         }, function (err) { console.error(err); });

//     });     //is.on

// };


exports.password = function (req, res){

    var userId = req.user.userId;

    var currentPassword = req.body.currentPassword;
    var newPassword = req.body.newPassword;

    console.log('currentPassword   : ', currentPassword);
    console.log('newPassword   : ', newPassword);

    userModel.selectUserPassword(userId, function (err, password){
        if (err) return console.error('err : ', err);
        if (!bcrypt.compareSync(currentPassword, password)){
          console.log("비번틀림......");
          return res.json({message : "dismatch"});
        }
        bcrypt.hash(newPassword, 8, function (err, hashPassword){
            if (err) return console.error("hash err    : ", err);
            userModel.updatePassword(hashPassword, userId, function (err, result){
                if (err) return console.error('err : ', err);
                if (result.affectedRows == 1) {
                    return res.json({message : "success"});
                }else {
                    return res.json({message : "fail"});
                }

            });
        });


    });

}

