var playerModel   = require('../models/playerModel');

exports.updateSquadNumber = function (req, res) {

	playerModel.updateSquadNumber(req.body.playerId, req.body.squadNumber, function (err, result) {
		if(err) return console.error('err : ', err);

		if(result.affectedRows > 0){
			res.json({message : "success"});
		}else {
			return console.log('fail update      :  ', result);
			res.json({message : "fail"});
		}
	});
}

exports.updatePosition = function (req, res) {

	playerModel.updatePosition(req.body.playerId, req.body.position, function (err, result) {
		if(err) return console.error('err : ', err);

		if(result.affectedRows > 0){
			res.json({message : "success"});
		}else {
			res.json({message : "fail"});
		}
	});
}

exports.playerListJson = function (req, res) {

	playerModel.selectPlayerList(req.params.clubId, function (err, playerList) {

		res.json({playerList : playerList});
	});
}
