var express        = require('express');
var Route          = express.Router();
var db             = require('../config/database');
var bcrypt         = require('bcryptjs');

var Auth                    = require('../middleware/authorization');
var authenticateController  = require('../controllers/authenticateController');
var userController          = require('../controllers/userController');
var playerController        = require('../controllers/playerController');
var teamController          = require('../controllers/teamController');
var clubController          = require('../controllers/clubController');
var formationController     = require('../controllers/formationController');
var recordController        = require('../controllers/recordController');
var matchController         = require('../controllers/matchController');
var adminController         = require('../controllers/adminController');
var leagueController        = require('../controllers/leagueController');

//front-end route
Route
	.get    ('/*', Auth.requiresLogin)

	.get    ('/', leagueController.renderLeagueView)


	//auth
	.get    ('/login',   authenticateController.renderLoginView)
	.post   ('/login',   authenticateController.login)
	.get    ('/logout',  authenticateController.logout) 			// logout은 post로 써야함. because pre-fetch
	.get    ('/signup',  authenticateController.renderSignupView)
	.post   ('/signup',  authenticateController.signup)
	.delete ('/signout', authenticateController.signout)

	//user
	.get    ('/myInfo',     userController.renderMyInfoView)
	.put    ('/password',   userController.updatePassword)
	.put    ('/profileImg', userController.updateProfileImg)

	//team
	.post   ('/league/:leagueId/team', 		 teamController.createTeam)
	.post   ('/league/:leagueId/joinLeague', teamController.joinLeague)		//createClub

	//club
	.get    ('/myClub/:clubId', 			   clubController.renderMyClubView)
	.get    ('/league/:leagueId/club/:clubId', clubController.renderClubDetailView)
	.delete ('/club',  						   clubController.deleteClub)
	.post   ('/league/:leagueId/club', clubController.createClub)  // 지워질 예정

	//player
	.post   ('/signupClub',  playerController.signupClub)
	.delete ('/signoutClub', playerController.signoutClub)
	.put    ('/squadNumber', playerController.updateSquadNumber)
	.put    ('/position',    playerController.updatePosition)

	//match
	.get    ('/league/:leagueId/match', matchController.renderMatchTimeLineView)

	//formation
	.get    ('/league/:leagueId/formation/:clubId', formationController.renderFormationView)
	.put    ('/league/:leagueId/formation/:clubId', formationController.saveFormation)
	.post   ('/sendLineups', 						formationController.sendLineups)

	//record
	.get    ('/league/:leagueId/records/:matchId/home/:homeClubId/away/:awayClubId', recordController.renderRecordView)
	.post   ('/records/:matchId', 	 recordController.insertRecord)
	.post   ('/recordSubs/:matchId', recordController.insertRecordSubs)
	.delete ('/records/:matchId', 	 recordController.deleteRecord)


	//매치생성
	.get('/genMatch', adminController.generateMatch)
	.get('/insertDate', adminController.insertMatch)

	.post('/updatePasswordAdmin', function (req, res){
		console.log('req.body   : ', req.body);
		bcrypt.hash(req.body.password, 8, function(err, hash){
			db.pool.acquire(function(err, conn) {
				if(err) console.error('db - err : ', err);
				conn.query('update user set password = ? where email = ?', [hash, req.body.email], function(err, result) {
					if(err) console.error('err : ', err);

					res.json({result : result});
				});
				db.pool.release(conn);
			});
		});
	})



module.exports = Route;
