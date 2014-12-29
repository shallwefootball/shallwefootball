var fs 			= require('fs'),
	path        = require('path'),
	async       = require('async'),
	passport    = require('passport'),
	userModel   = require('../models/userModel'),
	playerModel = require('../models/playerModel'),
	teamModel	= require('../models/teamModel'),
	folderAPI   = require('./API/folderAPI');

var eachAsync 	= require('each-async');


exports.loginView = function (req, res) {

	res.render('../views/player/login', { message: req.flash('loginMessage') });
};


exports.signupView = function (req, res) {

	res.render('../views/player/signup', { message: req.flash('signupMessage') });
};


exports.login = function (req, res, next) {

	passport.authenticate('local-login', function(err, user, info) {
	    if (err) { return next(err); }
	    if (!user) { return res.redirect('/login'); }
	    req.logIn(user, function(err) {
			if (err) return next(err);

			console.log('authenticate info    : ', info);

			//set user config
			teamModel.selectCreateTeam(user.userId, function (err, createTeam) {

				playerModel.selectJoinedLeagues(user.userId, function (err, result) {

					var transfer 	  = [],
						joinedLeagues = [];

					eachAsync(result, function (item, index, eachDone) {

						if (item.leagueStatus == 'end') {
							joinedLeagues.push(item);
						}else if (item.leagueStatus == 'before'){
							transfer.push(item);
						}
						eachDone();
					}, function (error) {
						if (err) return console.error('err : ', err);

						user.createTeam    = createTeam;
						user.transfer      = transfer;
						user.joinedLeagues = joinedLeagues;


						req.session.user = user;
						console.log('set user    : ', req.session.user);

						return res.redirect('/');
					});
				});
			});
	    });
	})(req, res, next);

};

exports.logout = function (req, res) {

	delete req.session.user;
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











