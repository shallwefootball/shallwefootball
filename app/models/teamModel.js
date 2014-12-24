var db      = require('../config/database'),
    config  = require('../config/config');


exports.selectCreateTeam = function (userId, callback) {
    db.pool.acquire(function (err, conn) {
        if(err) console.error('db - err : ', err);
        conn.query('select teamId, teamName, information, createId from team where createId = ?', [userId], function (err, result) {
            if (err) console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};

exports.insertTeam = function(data, callback) {
    db.pool.acquire(function (err, conn) {
        if(err) console.error('db - err : ', err);
        conn.query('insert into team (teamName, information, createId) values (?, ?, ?)', data, function(err, result) {
            if (err) console.error('err : ', err);
            if (result.affectedRows > 0) {
                callback(err, result);
            } else {
                callback(err);
            }

        });
        db.pool.release(conn);
    });

};


exports.insertClub = function(data, callback) {
    db.pool.acquire(function (err, conn) {
        if(err) console.error('db - err : ', err);
        conn.query('insert into club (leaderId, formation, leagueId, teamId) values (?, ?, ?, ?)', data, function(err, result) {
            if (err) console.error('err : ', err);
            if (result.affectedRows > 0) {
                callback(err, result);
            } else {
                callback(err);
            }

        });
        db.pool.release(conn);
    });

};