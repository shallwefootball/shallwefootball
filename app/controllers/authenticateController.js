var fs 			= require('fs');
var path        = require('path');
var async       = require('async');
var passport    = require('passport');
var userModel   = require('../models/userModel');
var folderAPI   = require('./API/folderAPI');


exports.localsUser = function (req, res, next) {

	res.locals.user = req.user ? req.user : undefined;
	next();
}

exports.renderLoginView = function (req, res) {

	res.render('../views/player/login', { message: req.flash('loginMessage') });
};


exports.renderSignupView = function (req, res) {

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

	req.logout();
	res.redirect('/');
};

exports.signup = function (req, res, next) {

	passport.authenticate('local-signup', function (err, user, info) {
		if (err) { return next(err); }

		// 가입성공시 user에 user 정보가 들어오고, 가입실패시 user에 false가 온다.
		if (user === false) {

			return res.render('../views/player/signup',{ message: req.flash('signupMessage') });
			// return res.json({ message: req.flash('signupMessage') });
		}

		req.login(user, function (err) {
			if (err) { return next(err); }

			return res.redirect('/');
		});

	})(req, res, next);
};

exports.signout = function (req, res, next) {

	userModel.deletePlayer(req.user.email, function (err, result, transactions) {
		if (err) { return next(err); }

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















