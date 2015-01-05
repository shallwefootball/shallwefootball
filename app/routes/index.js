var express      = require('express'),
	Route        = express.Router(),
	db           = require('../config/database'),
	bcrypt       = require('bcryptjs');

var Auth 		 = require('../middleware/authorization'),
	authenticate = require('../controllers/authenticateController'),
	user         = require('../controllers/userController'),
	player       = require('../controllers/playerController'),
	team         = require('../controllers/teamController'),
	club         = require('../controllers/clubController'),
	formation    = require('../controllers/formationController'),
	record       = require('../controllers/recordController'),
	match        = require('../controllers/matchController'),
	admin        = require('../controllers/adminController'),
	league       = require('../controllers/leagueController'),
	search       = require('../controllers/searchController');

//front-end route
Route
	.get    ('/*', Auth.requiresLogin)

	.get    ('/', league.renderLeagueView)

	.get 	('/search/:query',		   search.player)
	.get 	('/search/player/:userId', search.playerInfo)

	//auth
	.get    ('/login',   authenticate.loginView)
	.post   ('/login',   authenticate.login)
	.get    ('/logout',  authenticate.logout) 			// logout은 post로 써야함. because pre-fetch
	// .get    ('/signup',  authenticate.signupView)
	// .post   ('/signup',  authenticate.signup)
	.delete ('/signout', authenticate.signout)

	//user
	.get    ('/myInfo',     		user.myInfoView)
	.put    ('/password',			user.password)
	.put    ('/profileImg', 		user.profileImg)
	.post   ('/requestCall/:clubId', user.insertPlayer)

	//team
	.post   ('/league/:leagueId/team', 		 	   team.team)
	.post   ('/league/:leagueId/joinLeagueLeader', team.joinLeagueLeader)		//createClub

	//club
	.get    ('/myClub/:clubId', 			   club.myClubView)		//개발준비...
	.get    ('/league/:leagueId/club/:clubId', club.clubDetailView)
	.post   ('/club/:clubId/player',  		   club.insertUserPlayer)
	.put    ('/club/:clubId/player/:playerId', club.transferedPlayer)
	.put    ('/player/:playerId', 			   club.rejectPlayer)

	//player
	.post   ('/signupClub',  		   player.signupClub)
	.delete ('/signoutClub/:playerId', player.signoutClub)
	.put    ('/squadNumber', 		   player.updateSquadNumber)
	.put    ('/position',    		   player.updatePosition)

	//match
	.get    ('/league/:leagueId/match', match.matchTimeLineView)

	//league
	.post 	('/league/:leagueId/joinLeague', league.joinLeague)
	.delete ('/league/:leagueId/outLeague',  league.outLeague)

	//formation
	.get    ('/league/:leagueId/formation/:clubId', formation.formationView)
	.put    ('/league/:leagueId/formation/:clubId', formation.saveFormation)
	.post   ('/sendLineups', 						formation.sendLineups)

	//record
	.get    ('/league/:leagueId/records/:matchId/home/:homeClubId/away/:awayClubId', Auth.requiresAdmin, record.recordView)
	.post   ('/records/:matchId', 	 record.postRecord)
	.post   ('/recordSubs/:matchId', record.recordSubs)
	.delete ('/records/:matchId', 	 record.deleteRecord)

	//API
	.get    ('/league/:leagueId',   league.leagueJson)
	.get 	('/playerList/:clubId', player.playerListJson)


	//매치생성
	.get('/genMatch', admin.generateMatch)
	.get('/insertDate', admin.insertMatch)

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
