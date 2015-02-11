var fs 			= require('fs'),
	path        = require('path'),
	async       = require('async'),
	passport    = require('passport'),
	userModel   = require('../models/userModel'),
	playerModel = require('../models/playerModel'),
	teamModel	= require('../models/teamModel'),
	folderAPI   = require('./API/folderAPI');


exports.loginView = function (req, res) {

	res.render('../views/player/login', { message: req.flash('loginMessage') });
};


exports.signupView = function (req, res) {

	res.render('../views/player/signup', { message: req.flash('signupMessage') });
};


exports.login = function (req, res, next) {

	passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	})(req, res, next);
};

exports.logout = function (req, res) {

	// passport에서 저장되는 유저를 지워야함.
	delete global.cacheUser;
	req.logout();
	res.redirect('/');
};

exports.signup = function (req, res, next) {

	passport.authenticate('local-signup', function (err, user, info) {
		if (err) return next(err);

		// 가입성공시 user에 user 정보가 들어오고, 가입실패시 user에 false가 온다.
		if (user === false) {

			return res.render('../views/player/signup',{ message: req.flash('signupMessage') });
			// return res.json({ message: req.flash('signupMessage') });
		}

		req.login(user, function (err) {
			if (err) return next(err);

			return res.redirect('/');
		});

	})(req, res, next);
};

exports.signout = function (req, res, next) {

	userModel.deletePlayer(req.user.email, function (err, result, transactions) {
		if (err) return next(err);

		console.log('result   : ', result);
		if (result.affectedRows) {

			var playerFolder = path.resolve(__dirname, '..', 'images/users/', req.user.email);

			folderAPI.rm_rfFolder(playerFolder, function (err) {
				if(err){

					transactions(err, function (err) {
						res.json({ message: '트랜잭션 실패여' });
					});
				}else {

					transactions(null, function (err) {
						if(err){
							console.error('err : ', err);
						}else {

							req.logout();
							res.json({redirect : '/'});
						}
					});
				}
			});
		}else {
			console.log('affectedRows === 0 ');
		}
	});
};











