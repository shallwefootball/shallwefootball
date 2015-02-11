"use strict";

var path            = require('path'),
	async           = require('async'),
	LocalStrategy   = require('passport-local').Strategy,
	bcrypt          = require('bcryptjs'),
	userModel       = require('../models/userModel'),
	teamModel		= require('../models/teamModel'),
	playerModel		= require('../models/playerModel');

var eachAsync 	= require('each-async');


global.cacheUser = null;


module.exports = function (passport) {


	passport.serializeUser(function (player, done) {
		done(null, player.email);
	});

	passport.deserializeUser(function (email, done) {

		console.log('deserializeUser called...........');

		if (global.cacheUser) return done(null, global.cacheUser);

		userModel.selectUser(email, function (err, user) {

			console.log('passport 가 db에 데이터를 요청합니다.');

			delete user.password;

			//set user config
			teamModel.selectCreateTeam(user.userId, function (err, createTeam) {

				playerModel.selectJoinedLeagues(user.userId, function (err, result) {

					var transfer 	  = [],
						currentLeague = [],
						joinedLeagues = [];

					eachAsync(result, function (item, index, eachDone) {

						if (item.leagueStatus == 'end') {
							joinedLeagues.push(item);

						//	playerStatus null이면 현재 이적협상중이거나, 거절된겁니다.
						//	end가 아니면 현재 리그시작전이거나 진행중입니다.
						}else if (item.leagueStatus != 'end' && item.playerStatus != null){
							currentLeague.push(item);
						}else {
							transfer.push(item);
						}
						eachDone();
					}, function (error) {
						if (err) return console.error('err : ', err);

						user.createTeam    = createTeam;
						user.transfer      = transfer;
						user.currentLeague = currentLeague;
						user.joinedLeagues = joinedLeagues;

						global.cacheUser   = user;

						done(err, global.cacheUser);

					});
				});
			});
	    });
	});

	passport.use('local-login', new LocalStrategy({
		//input name
		usernameField 	  : 'email',
		passwordField 	  : 'password',
		passReqToCallback : true
	},
	function (req, email, password, done) {

		userModel.selectUser(email, function (err, user) {

			if (user) {

				if(!bcrypt.compareSync(password, user.password)){
					console.log("비번틀림......");
					return done(null, false, req.flash('loginMessage', '비밀번호가 틀렸어,, 알지???'));
				} else {

					// console.log('local-login  user       : ', user);
					return done(null, user);
				}

			}else {
				console.log('선수 못찾음...');
				return done(null, false, req.flash('loginMessage', '선수를 찾지못했어. 등록안했지?'));
			}

		});
	}));

	passport.use('local-signup', new LocalStrategy({
		usernameField     : 'email',
		passwordField 	  : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done) {

		bcrypt.hash(password, 8, function(err, hash){
			if(err) return console.error('hash err', err);

			var player          = {};
			player.email        = email;
			player.hash         = hash;
			player.lastName     = req.body.lastName;
			player.firstName    = req.body.firstName;
			player.birthday     = req.body.birthday;

			var data = [
				player.email,
				player.hash,
				player.lastName,
				player.firstName,
				player.birthday
			];

			var playerFolderPath = path.resolve(__dirname, '..', 'images/users/', email);
			var profileImage = req.files.profileImage;

			userModel.selectUserEmail(email, function(err, arrayUser) {

				if (arrayUser[0]) {
					return done(null, false, req.flash('signupMessage', '존재하는 이메일입니다.'));
				} else {

					//transaction true => commit, false => rollback
					userModel.insertUser(data, function (err, result) {
						if (result.affectedRows == 1) {
							return done(null, player);    //success!!

						} else {
							return done(null, false, req.flash('signupMessage', '디비 인서트 에러여'));
						}
					});

				}     //end if existedUser
			});     //end selectPlayerEmail

		});

	}));


};




