var db      = require('../config/database'),
    config  = require('../config/config');



exports.selectPlayer = function (email, callback) {
    db.pool.acquire(function (err, conn) {
        if(err) console.error('db - err : ', err);
        conn.query('select u.userId, concat(u.lastName, u.firstName)playerName, DATE_FORMAT(u.birthday, "%Y/%m/%d") birthday, u.email, u.password, p.playerId, p.squadNumber, p.position, p.matchPosition, p.status, p.clubId, c.leaderId, c.leagueId, l.community, l.season, t.teamId, t.teamName, te.teamName createTeamName, te.createId, te.teamId createTeamId from user u left outer join player p on u.userId = p.userId left outer join club c on p.clubId = c.clubId left outer join team t on c.teamId = t.teamId left outer join team te on u.userId = te.createId left outer join league l on l.leagueId = c.leagueId where u.email = ? group by u.userId', [email], function(err, arrPlayer) {
            if(err) console.error('err : ', err);

            if(arrPlayer.length > 0) {

                callback(err, arrPlayer[0]);
            }else {

                return callback(err, arrPlayer[0]);
            }
        });
        db.pool.release(conn);
    });
};

exports.selectJoinedLeagues = function (email, callback){
    db.pool.acquire(function (err, conn){
        if(err) return console.error('err : ', err);
        conn.query("select c.leagueId, if (l.end < now(), 'end', if(l.start < now() and now() < l.end, 'playing', 'before')) status from user u left outer join player p on u.userId = p.userId left outer join club c on p.clubId = c.clubId left outer join league l on l.leagueId = c.leagueId where u.email = ? order by l.start", email, function(err, joinedLeagues) {
            if (err) return console.error('err : ', err);

            callback(err, joinedLeagues);

        });
        db.pool.release(conn);
    });
};

exports.insertPlayer = function (data, callback){
    db.pool.acquire(function (err, conn){
        if(err) return console.error('err : ', err);
        conn.query('insert into player (userId, clubId, squadNumber, position, matchPosition, orderNumber, status) values (?, ?, ?, ?, ?, ?, ?)', data, function(err, result) {
            if (err) return console.error('err : ', err);

            if (result.affectedRows == 1) {
                callback(err, result);
            } else{
                callback(err);
            }
        });
        db.pool.release(conn);
    });
};


exports.deletePlayer = function (playerId, callback){
    db.pool.acquire(function (err, conn){
        if(err) return console.error('err : ', err);
        conn.query('delete from player where playerId = ?', playerId, function(err, result){
            if (err) return console.error('err : ', err);

            if (result.affectedRows == 1) {
                callback(err, result);
            } else{
                callback(err);
            }
        });
        db.pool.release(conn);
    });
};

exports.selectOrderNumber = function (clubId, callback){
    db.pool.acquire(function (err, conn){
        if(err) return console.error('err : ', err);
        conn.query('select orderNumber from player, (select @rownum:=0)tmp where clubId = ? order by orderNumber desc limit 1', clubId, function(err, orderNumber) {
            if (err) return console.error('err : ', err);

            callback(err, orderNumber[0]);

        });
        db.pool.release(conn);
    });
};

exports.updatePosition = function (playerId, position, callback){

    db.pool.acquire(function(err, conn) {
        if(err) console.error('db - err : ', err);
        conn.query('update player set position = ? where playerId = ?', [position, playerId], function(err, result) {
            if(err) console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });

}


exports.updateSquadNumber = function (playerId, squadNumber, callback){

    db.pool.acquire(function(err, conn) {
        if(err) console.error('db - err : ', err);
        conn.query('update player set squadNumber = ? where playerId = ?', [squadNumber, playerId], function(err, result) {
            if(err) console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });

}




