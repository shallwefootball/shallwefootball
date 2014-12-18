var db = require('../config/database');

exports.selectPlayersForFormation = function(clubId, callback) {
    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query('select p.playerId, (select concat(u.lastName, u.firstName)playerName from user u where u.userId = p.userId)playerName, p.position, p.squadNumber, p.matchPosition, p.orderNumber, p.status from player p where p.clubId = ? order by p.orderNumber', [clubId], function (err, result) {
            if (err) return console.error('err : ', err);
            console.log('reqsult     : ', result);



            callback(err, result);
        });
        db.pool.release(conn);
    });
};


exports.selectFormation = function(clubId, callback) {
    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query('select formation from club where clubId = ?', [clubId], function (err, result) {
            if (err) return console.error('err : ', err);

            callback(err, result[0].formation);
        });
        db.pool.release(conn);
    });
};


exports.selectMatchesForAClub = function(clubId, leagueId, callback) {
    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query('select m.matchId, l.community, l.season, month(m.kickoffTime) month, DAY(m.kickoffTime) day, hour(m.kickoffTime) hour, m.homeClubId, (select (select teamName from team t where t.teamId = c.teamId)teamName from club c where m.homeClubId = c.clubId)homeClubName, m.awayClubId, (select (select teamName from team t where t.teamId = c.teamId)teamName from club c where m.awayClubId = c.clubId)awayClubName, note from `match` m, league l where (m.homeClubId = ? or m.awayClubId = ?) and m.leagueId = l.leagueId and m.matchId not in(select m.matchId from lineup l, `match` m, player p where l.playerId = p.playerId and l.matchId = m.matchId and p.clubId = ?) and l.leagueId = ? and m.note is null order by kickoffTime', [clubId, clubId, clubId, leagueId], function (err, result) {
            if (err) return console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};



exports.selectSubmittedMatchesForAClub = function(clubId, leagueId, callback) {
    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query('select l.matchId, month(m.kickoffTime) month, DAY(m.kickoffTime) day, hour(m.kickoffTime) hour, m.homeClubId, (select (select teamName from team t where t.teamId = c.teamId)teamName from club c where m.homeClubId = c.clubId)homeClubName, m.awayClubId, (select (select teamName from team t where t.teamId = c.teamId)teamName from club c where m.awayClubId = c.clubId)awayClubName from lineup l, `match` m, player p where l.playerId = p.playerId and l.matchId = m.matchId and p.clubId = ? and m.leagueId = ? group by l.matchId', [clubId, leagueId], function (err, result) {
            if (err) return console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};





exports.selectLineups = function(clubId, callback) {
    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query('select playerId, matchPosition, status, orderNumber from player where clubId = ? and (status = "starting" or status = "sub") order by orderNumber', [clubId], function (err, result) {
            if (err) return console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};

exports.insertLineup = function(data, callback) {
    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query('insert into lineup (playerId, matchId, matchPosition, status, orderNumber) values (?, ?, ?, ?, ?)', data, function (err, result) {
            if (err) return console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};


exports.updatePlayerStatusMatchFormation = function (data, callback) {
    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query('update player set matchPosition = ?, orderNumber = ?, status = ? where squadNumber = ? and clubId = ?', data, function (err, result) {
            if (err) return console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};

exports.updateClubFormation = function (data, callback) {
    db.pool.acquire(function(err, conn){
        if (err) return console.error('db - err : ', err);
        conn.query('update club set formation = ? where clubId = ?', data, function (err, result) {
            if (err) return console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};


