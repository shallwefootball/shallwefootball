var fs        = require('fs');
var path      = require('path');
var rmdir     = require('rimraf');


exports.createFolder = function(folderPath, callback) {
	if (!fs.existsSync(folderPath)) {
		fs.mkdir(folderPath, function(err){
			if(err) {
				console.error('createUserer error : ', err);
				callback(err);
			}
			callback(null);
		});
	}else{
		//존재하는 폴더가 있을경우 비지니쓰를 만들어야함,, 일단 만들지 않기로함,,, 탈퇴하면 폴더도 날려버리게
		console.log('폴더가 존재합니다. 일단 그안에 다시 넣는걸로');
		callback(null);
	}
};

exports.removeFolder = function(folderPath, callback) {
	if(fs.existsSync(folderPath)){
		fs.rmdir(folderPath, function(err){
			if(err) {
				console.error('removeFolder error : ', err);
				return callback(err);
			}
			callback(null);
		});
	}else {
		console.log('폴더지울라하는데 폴더가 존재하지 않습니다.');
	}
};


exports.rm_rfFolder = function(folderPath, callback) {
	if(fs.existsSync(folderPath)){
		rmdir(folderPath, function(err){
			if(err) {
				console.error('rm_rfFolder error : ', err);
				return callback(err);
			}
			callback(null);
		});
	}else {
		console.log('폴더지울라하는데 폴더가 존재하지 않습니다.');
	}
};





exports.createProfileImage = function(folderPath, profileImage, callback) {

	var fileName = 'image.jpg';
	var srcPath = profileImage.path;
	var destPath = path.resolve(folderPath, fileName);
	var is = fs.createReadStream(srcPath);
	var os = fs.createWriteStream(destPath);

	try {
		is.pipe(os);
		callback(null);
	}catch(err) {
		console.error('createProfileImage error : ', err);
		callback(err);
	}
};


