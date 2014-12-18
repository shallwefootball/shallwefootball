var db = require('../config/database');


	// var clubs = [45, 42, 49, 48, 50, 37, 40, 46, 44, 47];
	var clubs = [2, 3, 8, 4, 7, 1, 5, 10, 6, 9];
	// var clubs = ['승성', '쇼부', '위너', '호랑이', '유로', '무진', '니케', '신여주', '라온', '일심'];
	// var clubs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];


exports.generateMatch = function (req, res) {

	console.log('yeoju2014   : ', yeoju2014);
	// console.log('Object.keys(yeoju2014).length;     : ', Object.keys(yeoju2014).length);

var insertQuery = 'insert into `match` (matchName, leagueId, kickoffTime, homeClubId, awayClubId, homeScore, awayScore, stadium, note, link) values(?, 1, ?, ?, ?, NULL, NULL, "오학", NULL, NULL)'

	for (var i = 0; i < yeoju2014.match.length; i++) {

		var matchName 	= yeoju2014.match[i].matchName;
		var kickoffTime = yeoju2014.match[i].kickoffTime;
		var homeClubId  = yeoju2014.match[i].home;
		var awayClubId  = yeoju2014.match[i].away;
		var data  	    = [ matchName, kickoffTime, homeClubId, awayClubId ];

	    db.pool.acquire(function(err, conn){
	        if(err) return console.error('db - err : ', err);
	        conn.query(insertQuery, data, function (err, result) {
	            if (err) return console.log('err : ', err);

	            console.log('result   : ', result);
	        });
	        db.pool.release(conn);
	    });

	    if((Object.keys(yeoju2014).length + 1) == i){
	    	res.json({isSuccess : "success"});
	    }
	};



}

exports.insertMatch = function (req, res) {
// 4	제4경기	1	2014-03-08 21:00:00	NULL	NULL	NULL	NULL	오학
// matchName
// leagueId
// kickoffTime
// homeClubId
// awayClubId
// homeScore
// awayScore
// stadium
// link
	var date = "2014-04-09 21:00:00"

    db.pool.acquire(function(err, conn){
        if(err) console.error('db - err : ', err);
        conn.query('insert into `match` (matchName, kickoffTime, stadium) values ("테이트테스트", ?, "오학")', [date], function (err, result) {
            if (err) console.log('err : ', err);

            console.log('result   : ', result);
        });
        db.pool.release(conn);
    });

}






	var yeoju2014 = {};
	yeoju2014.match = [];

	//1일차
yeoju2014.match.push({
	matchName : "제 1경기",
	home : clubs[0],
	away : clubs[1],
	kickoffTime : "2014-03-01 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 2경기",
	home : clubs[7],
	away : clubs[8],
	kickoffTime : "2014-03-01 21:00:00"
});
yeoju2014.match.push({
	matchName : "제 3경기",
	home : clubs[5],
	away : clubs[6],
	kickoffTime : "2014-03-08 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 4경기",
	home : clubs[2],
	away : clubs[3],
	kickoffTime : "2014-03-08 21:00:00"
});

	//2일차
yeoju2014.match.push({
	matchName : "제 5경기",
	home : clubs[4],
	away : clubs[0],
	kickoffTime : "2014-03-22 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 6경기",
	home : clubs[6],
	away : clubs[7],
	kickoffTime : "2014-03-22 21:00:00"
});
yeoju2014.match.push({
	matchName : "제 7경기",
	home : clubs[9],
	away : clubs[5],
	kickoffTime : "2014-03-29 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 8경기",
	home : clubs[1],
	away : clubs[2],
	kickoffTime : "2014-03-29 21:00:00"
});

	//3일차
yeoju2014.match.push({
	matchName : "제 9경기",
	home : clubs[3],
	away : clubs[4],
	kickoffTime : "2014-04-12 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 10경기",
	home : clubs[5],
	away : clubs[7],
	kickoffTime : "2014-04-12 21:00:00"
});
yeoju2014.match.push({
	matchName : "제 11경기",
	home : clubs[8],
	away : clubs[9],
	kickoffTime : "2014-04-19 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 12경기",
	home : clubs[0],
	away : clubs[2],
	kickoffTime : "2014-04-19 21:00:00"
});

	//4일차
yeoju2014.match.push({
	matchName : "제 13경기",
	home : clubs[1],
	away : clubs[3],
	kickoffTime : "2014-05-03 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 14경기",
	home : clubs[7],
	away : clubs[9],
	kickoffTime : "2014-05-03 21:00:00"
});
yeoju2014.match.push({
	matchName : "제 15경기",
	home : clubs[6],
	away : clubs[8],
	kickoffTime : "2014-05-10 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 16경기",
	home : clubs[2],
	away : clubs[4],
	kickoffTime : "2014-05-10 21:00:00"
});

	//5일차
yeoju2014.match.push({
	matchName : "제 17경기",
	home : clubs[3],
	away : clubs[0],
	kickoffTime : "2014-05-24 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 18경기",
	home : clubs[6],
	away : clubs[9],
	kickoffTime : "2014-05-24 21:00:00"
});
yeoju2014.match.push({
	matchName : "제 19경기",
	home : clubs[8],
	away : clubs[5],
	kickoffTime : "2014-05-31 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 20경기",
	home : clubs[4],
	away : clubs[1],
	kickoffTime : "2014-05-31 21:00:00"
});

	//6일차
yeoju2014.match.push({
	matchName : "제 21경기",
	home : clubs[1],
	away : clubs[4],
	kickoffTime : "2014-06-14 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 22경기",
	home : clubs[5],
	away : clubs[8],
	kickoffTime : "2014-06-14 21:00:00"
});
yeoju2014.match.push({
	matchName : "제 23경기",
	home : clubs[9],
	away : clubs[6],
	kickoffTime : "2014-06-21 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 24경기",
	home : clubs[0],
	away : clubs[3],
	kickoffTime : "2014-06-21 21:00:00"
});

	//7일차
yeoju2014.match.push({
	matchName : "제 24경기",
	home : clubs[4],
	away : clubs[2],
	kickoffTime : "2014-07-05 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 26경기",
	home : clubs[8],
	away : clubs[6],
	kickoffTime : "2014-07-05 21:00:00"
});
yeoju2014.match.push({
	matchName : "제 27경기",
	home : clubs[9],
	away : clubs[7],
	kickoffTime : "2014-07-12 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 28경기",
	home : clubs[3],
	away : clubs[1],
	kickoffTime : "2014-07-12 21:00:00"
});

	//8일차
yeoju2014.match.push({
	matchName : "제 29경기",
	home : clubs[2],
	away : clubs[0],
	kickoffTime : "2014-07-26 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 30경기",
	home : clubs[9],
	away : clubs[8],
	kickoffTime : "2014-07-26 21:00:00"
});
yeoju2014.match.push({
	matchName : "제 31경기",
	home : clubs[7],
	away : clubs[5],
	kickoffTime : "2014-08-02 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 32경기",
	home : clubs[4],
	away : clubs[3],
	kickoffTime : "2014-08-02 21:00:00"
});

	//9일차
yeoju2014.match.push({
	matchName : "제 33경기",
	home : clubs[2],
	away : clubs[1],
	kickoffTime : "2014-08-16 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 34경기",
	home : clubs[5],
	away : clubs[9],
	kickoffTime : "2014-08-16 21:00:00"
});
yeoju2014.match.push({
	matchName : "제 35경기",
	home : clubs[7],
	away : clubs[6],
	kickoffTime : "2014-08-23 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 36경기",
	home : clubs[0],
	away : clubs[4],
	kickoffTime : "2014-08-23 21:00:00"
});

	//10일차
yeoju2014.match.push({
	matchName : "제 37경기",
	home : clubs[3],
	away : clubs[2],
	kickoffTime : "2014-09-06 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 38경기",
	home : clubs[6],
	away : clubs[5],
	kickoffTime : "2014-09-06 21:00:00"
});
yeoju2014.match.push({
	matchName : "제 39경기",
	home : clubs[8],
	away : clubs[7],
	kickoffTime : "2014-09-08 19:00:00"
});
yeoju2014.match.push({
	matchName : "제 40경기",
	home : clubs[1],
	away : clubs[0],
	kickoffTime : "2014-09-08 21:00:00"
});





function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}