var path            = require('path');
var async           = require('async');
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt          = require('bcryptjs');
var userModel       = require('../models/userModel');
var playerModel     = require('../models/playerModel');

module.exports = function(passport) {

	passport.serializeUser(function (player, done) {
		done(null, player.email);
	});

	passport.deserializeUser(function (email, done) {

		playerModel.selectPlayer(email, function(err, player){
			if(err) return console.error('err : ', err);

			playerModel.selectPlayedLeagues(email, function (err, playedLeagues) {
				if(err) return console.error('err : ', err);

				player.playedLeagues = playedLeagues;

				if(err) return console.error('err-deserializeUser : ', err.stack);
				delete player.password;
				done(err, player);

			});
		});
	});

	passport.use('local-login', new LocalStrategy({
		//input name
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function (req, email, password, done) {

		playerModel.selectPlayer(email, function (err, player) {
			if(err) return console.error('err-deserializePlayer : ', err.stack);

			if (player) {

				if(!bcrypt.compareSync(password, player.password)){
					console.log("비번틀림......");
					return done(null, false, req.flash('loginMessage', '비밀번호가 틀렸어,, 알지???'));
				} else {

					delete player.password;
					// console.log("passport-player : ", player);

					return done(null, player);
				}
			}else {
				console.log('선수 못찾음...');
				return done(null, false, req.flash('loginMessage', '선수를 찾지못했어. 등록안했지?'));
			}

		});
	}));

	passport.use('local-signup', new LocalStrategy({
		usernameField   : 'email',
		passwordField   : 'password',
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

			userModel.selectPlayerEmail(email, function(err, arrayUser) {
				if (err) { return done(err); }
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




