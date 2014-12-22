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

var API = {};
API.league = require('../controllers/API/leagueAPI');


//front-end route
Route
	.get ('/league/:leagueId/*', API.league.selectLeague)

	.get  ('/myInfo', Auth.requiresLogin, userController.renderMyInfoView)
	.post ('/updateProfileImg', userController.updateProfileImg)
	.put  ('/updatePassword', userController.updatePassword)




	//user route
	//로그인, 회원가입
	.get   ('/login',   authenticateController.renderLoginView)
	.get   ('/signup',  authenticateController.renderSignupView)
	.post  ('/login',   authenticateController.login)
	//not get. post???
	.get   ('/logout',  authenticateController.logout)
	.post  ('/signup',  authenticateController.signup)
	.delete('/signout', authenticateController.signout)

	.get   ('/', Auth.requiresLogin, leagueController.renderLeagueView)

	.post  ('/league/:leagueId/team', teamController.createTeam)
	.post  ('/league/:leagueId/joinLeague', teamController.joinLeague)

	//club route
	.get   ('/league/:leagueId/joinedClub', Auth.requiresLogin, clubController.renderJoinedClubsView)  //리그시작되기 전에
	.get   ('/league/:leagueId/club', clubController.renderClubsView)
	.get   ('/league/:leagueId/club/:clubId', Auth.requiresLogin, clubController.renderClubDetailView)
	.post  ('/league/:leagueId/club', clubController.createClub)
	.delete('/deleteClub', clubController.deleteClub)

	.post  ('/signupClub', playerController.signupClub)
	.delete('/signoutClub', playerController.signoutClub)

	.put  ('/updateSquadNumber', playerController.updateSquadNumber)
	.put  ('/updatePosition', playerController.updatePosition)

	// match
	.get  ('/league/:leagueId/match', matchController.renderMatchTimeLineView)
	.get  ('/league/:leagueId', leagueController.selectLeague)//why?

	//formation
	.get  ('/league/:leagueId/formation/:clubId', Auth.requiresLogin, formationController.renderFormationView)
	.put  ('/league/:leagueId/formation/:clubId', formationController.saveFormation)

	.post ('/sendLineups', formationController.sendLineups)


	.get    ('/league/:leagueId/records/:matchId/home/:homeClubId/away/:awayClubId', Auth.requiresLogin, recordController.renderRecordView)
	.post   ('/records/:matchId', recordController.insertRecord)
	.post   ('/recordSubs/:matchId', recordController.insertRecordSubs)
	.delete ('/records/:matchId', Auth.requiresLogin, recordController.deleteRecord)


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
