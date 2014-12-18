var db = require('../config/database');

exports.selectPlayersAClubForRecord = function(matchId, clubId, callback) {

    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query('select li.lineupId, li.playerId, concat(u.lastName, u.firstName) playerName, p.squadNumber, li.matchId, li.matchPosition, li.status, li.orderNumber from lineup li, user u, player p where li.matchId = ? and li.playerId = p.playerId and p.userId = u.userId and p.clubId = ? order by orderNumber', [ matchId, clubId ], function (err, result) {
            if (err) return console.log('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};

exports.selectMatchForRecord = function(matchId, callback) {

    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query('select m.matchName, month(m.kickoffTime) month, DAY(m.kickoffTime) day, hour(m.kickoffTime) hour, m.homeClubId, (select (select teamName from team t where t.teamId = c.teamId)teamName from club c where m.homeClubId = c.clubId)homeClubName, m.awayClubId, (select (select teamName from team t where t.teamId = c.teamId)teamName from club c where m.awayClubId = c.clubId)awayClubName, if ( m.kickoffTime < now() and isnull(m.homeScore), 0, m.homeScore) homeScore, if ( m.kickoffTime < now() and isnull(m.awayScore), 0, m.awayScore) awayScore from `match` m where matchId = ?', [ matchId ], function (err, result) {
            if (err) return console.log('err : ', err);

            callback(err, result[0]);
        });
        db.pool.release(conn);
    });
};

exports.selectPlayersRecorded = function (matchId, callback) {

    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query('select r.recordId, r.recordName, r.minutes, r.lineupId, concat(u.lastName, u.firstName) playerName, p.squadNumber, p.clubId, r.recordId, r.recordName, r.minutes, r.lineupId from record r, lineup l, user u, player p where r.lineupId = l.lineupId and u.userId = p.userId and l.playerId = p.playerId and l.matchId = ? order by minutes desc, recordId desc', matchId, function (err, results) {
            if (err) return console.log('err : ', err);

            callback(err, results);
        });
        db.pool.release(conn);
    });
};

exports.selectScorers = function (matchId, callback) {

    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query('select r.recordId, r.recordName, r.minutes, r.lineupId, r.`time`, p.clubId, m.homeClubId, m.awayClubId, concat(u.lastName, u.firstName) playerName, p.squadNumber from record r, lineup l, player p, `match` m, user u where r.lineupId = l.lineupId and u.userId = p.userId and l.playerId = p.playerId and m.matchId = l.matchId and r.recordName in("goalScored", "ownGoal", "penaltyScored") and l.matchId = ? order by minutes', matchId, function (err, results) {
            if (err) return console.log('err : ', err);

            callback(err, results);
        });
        db.pool.release(conn);
    });
};



exports.insertRecord = function (data, callback) {

    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query('insert into record(recordName, time, minutes, lineupId) values(?, ?, ?, ?)', data, function (err, result) {
            if (err) return console.log('err : ', err);

            callback(err, result);
            console.log('insert recordId   : ', result.insertId);
        });
        db.pool.release(conn);
    });

}

exports.updateScore = function (matchId, score, callback) {

    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query("update `match` set homeScore = ?, awayScore = ? where matchId = ?", [score[0], score[1], matchId], function (err, result) {
            if (err) return console.log('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });

}



exports.deleteRecord = function (recordId, callback) {
    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query('delete from record where recordId = ? ', recordId, function (err, result) {
            if (err) return console.log('err : ', err);

            console.log('delete recordId   : ', recordId);
            callback(err, result);
        });
        db.pool.release(conn);
    });

}







