var teamModel = require('../models/teamModel');
var playerModel = require('../models/playerModel');

exports.createTeam = function (req, res, next) {
  var teamName    = req.body.teamName;
  var information = req.body.information;
  var createId = req.user.userId;
  var data = [ teamName, information, createId ];

  var locals = res.locals;

  teamModel.insertTeam(data, function (err, result){
    if (err) return console.error('err : ', err);

    if (result.affectedRows > 0) {
      locals.teamName = teamName;
      locals.information = information;
      locals.createId = createId;

      // return next();
      res.redirect('back');

    } else{
      return console.log('팀만들다 뭔가 실패여');
    }

  })

};

exports.joinLeague = function (req, res, next){
  var leaderId = req.body.leaderId;
  var formation = "4-3-3";
  var leagueId = req.params.leagueId;
  var teamId = req.body.teamId;

  var clubData = [ leaderId, formation, leagueId, teamId ];

  console.log('clubData    : ', clubData);


  teamModel.insertClub(clubData, function (err, clubResult){
    if (err) return console.error('err : ', err);
    if (clubResult.affectedRows > 0) {

      console.log('clubResult      : ', clubResult.insertId);

      var userId = req.user.userId
      //insert결과로 클럽아이디를 받습니다.
      var clubId = clubResult.insertId;
      var squadNumber = req.body.squadNumber
      var position = req.body.position;
      var matchPosition = req.body.position;
      var orderNumber = 0;
      var status = 'starting';

      var playerData = [userId, clubId, squadNumber, position, matchPosition, orderNumber, status];
      console.log('player data    : ', playerData);


        playerModel.insertPlayer(playerData, function (err, result){
          if (err) return console.error('err : ', err);
          res.redirect('back');

        });

    } else{
      console.log('팀만들다 뭔가 실패여');
    }

  });

}
