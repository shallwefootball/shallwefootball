var db = require('../config/database');


	// var clubs = [45, 42, 49, 48, 50, 37, 40, 46, 44, 47];
	var clubs = [2, 3, 8, 4, 7, 1, 5, 10, 6, 9];
	// var clubs = ['승성', '쇼부', '위너', '호랑이', '유로', '무진', '니케', '신여주', '라온', '일심'];
	// var clubs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
	var club2015 = [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007];
		         // [null, "A", "B", "C", "D", "E", "F", "G"];



exports.generateMatch = function (req, res) {

	console.log('yeoju2015   : ', yeoju2015);
	// console.log('Object.keys(yeoju2015).length;     : ', Object.keys(yeoju2015).length);

var insertQuery = 'insert into `match` (matchName, leagueId, kickoffTime, homeClubId, awayClubId, homeScore, awayScore, stadium, note, link) values(?, 5, ?, ?, ?, NULL, NULL, "오학", NULL, NULL)'

	for (var i = 0; i < yeoju2015.match.length; i++) {

		var matchName 	= yeoju2015.match[i].matchName;
		var kickoffTime = yeoju2015.match[i].kickoffTime;
		var homeClubId  = yeoju2015.match[i].home;
		var awayClubId  = yeoju2015.match[i].away;
		var data  	    = [ matchName, kickoffTime, homeClubId, awayClubId ];

	    db.pool.acquire(function(err, conn){
	        if(err) return console.error('db - err : ', err);
	        conn.query(insertQuery, data, function (err, result) {
	            if (err) return console.log('err : ', err);

	            console.log('result   : ', result);
	        });
	        db.pool.release(conn);
	    });

	    if((Object.keys(yeoju2015).length + 1) == i){
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





	/* ---------------------------------------------------------
	 * 2014
	 */

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


	/* ---------------------------------------------------------
	 * 2015
	 */
     var yeoju2015 = {};
     yeoju2015.match = [];

     // 1일차
     yeoju2015.match.push({
          matchName: "제 1경기",
          home: club2015[6],
          away: club2015[7],
          kickoffTime: "2015-03-14 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 2경기",
          home: club2015[3],
          away: club2015[1],
          kickoffTime: "2015-03-14 21:00:00"
     });

     // 2일차
     yeoju2015.match.push({
          matchName: "제 3경기",
          home: club2015[2],
          away: club2015[4],
          kickoffTime: "2015-03-21 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 4경기",
          home: club2015[5],
          away: club2015[6],
          kickoffTime: "2015-03-21 21:00:00"
     });

     // 3일차
     yeoju2015.match.push({
          matchName: "제 5경기",
          home: club2015[2],
          away: club2015[1],
          kickoffTime: "2015-04-04 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 6경기",
          home: club2015[4],
          away: club2015[7],
          kickoffTime: "2015-04-04 21:00:00"
     });

     // 4일차
     yeoju2015.match.push({
          matchName: "제 7경기",
          home: club2015[1],
          away: club2015[4],
          kickoffTime: "2015-04-11 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 8경기",
          home: club2015[2],
          away: club2015[6],
          kickoffTime: "2015-04-11 21:00:00"
     });

     // 5일차
     yeoju2015.match.push({
          matchName: "제 9경기",
          home: club2015[3],
          away: club2015[5],
          kickoffTime: "2015-04-25 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 10경기",
          home: club2015[6],
          away: club2015[4],
          kickoffTime: "2015-04-25 21:00:00"
     });

     // 6일차
     yeoju2015.match.push({
          matchName: "제 11경기",
          home: club2015[7],
          away: club2015[3],
          kickoffTime: "2015-05-06 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 12경기",
          home: club2015[5],
          away: club2015[1],
          kickoffTime: "2015-05-06 21:00:00"
     });

     // 7일차
     yeoju2015.match.push({
          matchName: "제 13경기",
          home: club2015[4],
          away: club2015[5],
          kickoffTime: "2015-05-16 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 14경기",
          home: club2015[2],
          away: club2015[7],
          kickoffTime: "2015-05-16 21:00:00"
     });

     // 8일차
     yeoju2015.match.push({
          matchName: "제 15경기",
          home: club2015[3],
          away: club2015[6],
          kickoffTime: "2015-05-23 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 16경기",
          home: club2015[2],
          away: club2015[5],
          kickoffTime: "2015-05-23 21:00:00"
     });

     // 9일차
     yeoju2015.match.push({
          matchName: "제 17경기",
          home: club2015[7],
          away: club2015[1],
          kickoffTime: "2015-06-06 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 18경기",
          home: club2015[3],
          away: club2015[4],
          kickoffTime: "2015-06-06 21:00:00"
     });

     // 10일차
     yeoju2015.match.push({
          matchName: "제 19경기",
          home: club2015[1],
          away: club2015[6],
          kickoffTime: "2015-06-13 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 20경기",
          home: club2015[7],
          away: club2015[5],
          kickoffTime: "2015-06-13 21:00:00"
     });

     // 11일차
     yeoju2015.match.push({
          matchName: "제 21경기",
          home: club2015[2],
          away: club2015[3],
          kickoffTime: "2015-06-27 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 22경기",
          home: club2015[1],
          away: club2015[7],
          kickoffTime: "2015-06-27 21:00:00"
     });

     // 12일차
     yeoju2015.match.push({
          matchName: "제 23경기",
          home: club2015[5],
          away: club2015[2],
          kickoffTime: "2015-07-04 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 24경기",
          home: club2015[4],
          away: club2015[3],
          kickoffTime: "2015-07-04 21:00:00"
     });

     // 13일차
     yeoju2015.match.push({
          matchName: "제 25경기",
          home: club2015[4],
          away: club2015[1],
          kickoffTime: "2015-07-18 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 26경기",
          home: club2015[5],
          away: club2015[3],
          kickoffTime: "2015-07-18 21:00:00"
     });

     // 14일차
     yeoju2015.match.push({
          matchName: "제 26경기",
          home: club2015[6],
          away: club2015[2],
          kickoffTime: "2015-07-25 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 28경기",
          home: club2015[7],
          away: club2015[4],
          kickoffTime: "2015-07-25 21:00:00"
     });

     // 15일차
     yeoju2015.match.push({
          matchName: "제 29경기",
          home: club2015[6],
          away: club2015[5],
          kickoffTime: "2015-08-08 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 30경기",
          home: club2015[1],
          away: club2015[2],
          kickoffTime: "2015-08-08 21:00:00"
     });

     // 16일차
     yeoju2015.match.push({
          matchName: "제 31경기",
          home: club2015[4],
          away: club2015[6],
          kickoffTime: "2015-08-15 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 32경기",
          home: club2015[1],
          away: club2015[5],
          kickoffTime: "2015-08-15 21:00:00"
     });

     // 17일차
     yeoju2015.match.push({
          matchName: "제 33경기",
          home: club2015[3],
          away: club2015[7],
          kickoffTime: "2015-08-29 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 34경기",
          home: club2015[4],
          away: club2015[2],
          kickoffTime: "2015-08-29 21:00:00"
     });

     // 18일차
     yeoju2015.match.push({
          matchName: "제 35경기",
          home: club2015[1],
          away: club2015[3],
          kickoffTime: "2015-09-05 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 36경기",
          home: club2015[7],
          away: club2015[6],
          kickoffTime: "2015-09-05 21:00:00"
     });

     // 19일차
     yeoju2015.match.push({
          matchName: "제 37경기",
          home: club2015[5],
          away: club2015[4],
          kickoffTime: "2015-09-19 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 38경기",
          home: club2015[6],
          away: club2015[3],
          kickoffTime: "2015-09-19 21:00:00"
     });

     // 20일차
     yeoju2015.match.push({
          matchName: "제 39경기",
          home: club2015[7],
          away: club2015[2],
          kickoffTime: "2015-09-26 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 40경기",
          home: club2015[6],
          away: club2015[1],
          kickoffTime: "2015-09-26 21:00:00"
     });

     // 21일차
     yeoju2015.match.push({
          matchName: "제 41경기",
          home: club2015[5],
          away: club2015[7],
          kickoffTime: "2015-10-10 19:00:00"
     });
     yeoju2015.match.push({
          matchName: "제 42경기",
          home: club2015[3],
          away: club2015[2],
          kickoffTime: "2015-10-10 21:00:00"
     });


