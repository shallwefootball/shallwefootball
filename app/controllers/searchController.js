var searchModel = require('../models/searchModel');

exports.player = function (req, res) {

	searchModel.selectLikePlayer(req.params.query, function (err, results) {
		console.log('lengtH    : ', results);
		if (results.length > 0) {
			res.send(results);
		}else {
			console.log('true????    : ', results.length);
			res.send([{
				playerName : "Sorry :(",
				teamName : "검색결과가 없습니다."
			}]);
		}
	});
}