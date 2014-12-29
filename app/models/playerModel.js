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

exports.selectPlayerList = function (clubId, callback) {
    db.pool.acquire(function (err, conn) {
        if(err) console.error('db - err : ', err);
        conn.query('select p.playerId, u.userId, concat(u.lastName, u.firstName)playerName, DATE_FORMAT(u.birthday, "%Y/%m/%d") birthday, u.email, p.squadNumber, p.position, p.matchPosition, p.status, p.orderNumber from player p left outer join user u on u.userId = p.userId where p.clubId = ? order by p.squadNumber', [clubId], function(err, playerList) {
            if(err) console.error('err : ', err);

            callback(err, playerList);
        });
        db.pool.release(conn);
    });
};

exports.selectJoinedLeagues = function (userId, callback){
    db.pool.acquire(function (err, conn){
        if(err) return console.error('err : ', err);
        conn.query("select if(p.userId = c.leaderId, 1, 0) leader, c.leagueId, l.community, l.season, if (l.end < now(), 'end', if(l.start < now() and now() < l.end, 'playing', if (now() < l.start, 'before', null))) leagueStatus, c.teamId, p.clubId, t.teamName, c.leaderId, p.playerId, p.squadNumber, p.position, p.matchPosition, p.status playerStatus, count(distinct m.matchId)`played`, sum(if(r.recordName = 'out', 1, 0))`out`, sum(if(r.recordName = 'in', 1, 0))`in`, sum(if(r.recordName = 'goalScored', 1, 0))`goalScored`, sum(if(r.recordName = 'penaltyScored', 1, 0))`penaltyScored`, sum(if(r.recordName = 'ownGoal', 1, 0))`ownGoal`, sum(if(r.recordName = 'penaltyMissed', 1, 0))`penaltyMissed`, sum(if(r.recordName = 'yellowCard', 1, 0))`yellowCard`, sum(if(r.recordName = 'redCard', 1, 0))`redCard`, sum(if(r.recordName = 'secondYellowCard', 1, 0))`secondYellowCard` from player p left outer join club c on c.clubId = p.clubId left outer join league l on l.leagueId = c.leagueId left outer join team t on t.teamId = c.teamId left outer join lineup li on li.playerId = p.playerId left outer join record r on r.lineupId = li.lineupId left outer join `match` m on m.matchId = li.matchId where userId = ? group by l.leagueId order by l.start desc", userId, function(err, joinedLeagues) {
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
            }else {
                return console.log('delete error : ', result);
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




