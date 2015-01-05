var playerModel   = require('../models/playerModel');

exports.signupClub = function (req, res){

	var userId        = req.user.userId;
	var clubId        = req.body.clubId;
	var position      = req.body.position;
	var matchPosition = req.body.position;
	var squadNumber   = req.body.squadNumber;

	playerModel.selectOrderNumber (clubId, function (err, countResult) {
		console.log('countResult       : ', countResult);
		console.log('typeof countResult       : ', typeof countResult);
		console.log('parseInt(countResult)       : ', parseInt(countResult));


		var orderNumber = countResult.orderNumber++;
		var status      = '';

		if (orderNumber < 11) {
			status = "starting";
		}else if (orderNumber < 16 && orderNumber > 10) {
			status = "sub";
		}else if (orderNumber >= 16) {
			status = "excepted";
		}

		var data        = [ userId, clubId, squadNumber, position, matchPosition, orderNumber, status, null, null ];
		console.log('data     : ', data);

		playerModel.insertPlayer(data, function(err, result){

			if(result.affectedRows > 0) {
				res.redirect('back');
			}else {
				res.json({message : "클럽가입 실패입니다."});
			}
		});

	})


};

exports.signoutClub = function (req, res){

	playerModel.deletePlayer(req.params.playerId, function(err, result){
		if(result.affectedRows > 0) {
			res.json({message : 'success'});
		}else {
			console.log('delete fail.....        ', result);
			res.json({message : "fail"});
		}
	});
};


exports.updateSquadNumber = function (req, res){

	playerModel.updateSquadNumber(req.body.playerId, req.body.squadNumber, function (err, result){
		if(err) return console.error('err : ', err);

		if(result.affectedRows > 0){
			res.json({message : "success"});
		}else {
			return console.log('fail update      :  ', result);
			res.json({message : "fail"});
		}


	});

}


exports.updatePosition = function (req, res){

	playerModel.updatePosition(req.body.playerId, req.body.position, function (err, result){
		if(err) return console.error('err : ', err);

		if(result.affectedRows > 0){
			res.json({message : "success"});
		}else {
			res.json({message : "fail"});
		}

	});

}

exports.playerListJson = function (req, res){

	playerModel.selectPlayerList(req.params.clubId, function (err, playerList) {

		res.json({playerList : playerList});
	});
}
