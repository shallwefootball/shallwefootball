var db = require('../config/database');

// 2014년 12월 16일
exports.selectClubForLeagueInMatchController = function(leagueId, callback) {
    db.pool.acquire(function(err, conn){
        if(err) console.error('db - err : ', err);
        conn.query('select t.teamId, clubId, leaderId, formation, leagueId, teamName, information, createId from club c, team t where c.teamId = t.teamId and not c.formation is null and c.leagueId = ?', leagueId, function (err, result) {
            if (err) console.log('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};

exports.selectClubId = function(clubName, leaderId, callback) {
    db.pool.acquire(function(err, conn){
        if(err) console.error('db - err : ', err);
        conn.query('select clubId from club where clubName = ? and leaderId = ?', [clubName, leaderId], function (err, result) {
            if (err) console.log('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};


exports.selectJoinedClubs = function(leagueId, callback) {
    db.pool.acquire(function(err, conn){
        if(err) console.error('db - err : ', err);
        conn.query('select * from club c, team t where c.teamId = t.teamId and c.leagueId = ?', leagueId, function (err, result) {
            if (err) console.log('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};


exports.selectClub = function(clubId, callback) {
    db.pool.acquire(function(err, conn){
        if(err) console.error('db - err : ', err);
        conn.query('select t.teamId, c.clubId, c.leaderId, t.teamName, t.information, concat(u.lastName, u.firstName)leaderName from team t left outer join club c on t.teamId = c.teamId left outer join user u on u.userId = c.leaderId where c.clubId = ?', [clubId], function (err, result) {
            if (err) console.log('err : ', err);

            callback(err, result[0]);
        });
        db.pool.release(conn);
    });
};

exports.selectClubStatDetail = function(clubId, callback) {
    db.pool.acquire(function(err, conn) {
        if(err) console.error('err : ', err);
        conn.query('select l.season, sum(if(isnull(m.homeScore) and isnull(m.awayScore), 0, 1)) played, sum(if((((c.clubId = m.homeClubId) and m.homeScore > if(isnull(m.awayScore), 0, m.awayScore)) or ((c.clubId = m.awayClubId) and m.awayScore > if(isnull(m.homeScore), 0, m.homeScore))), 1, 0)) won, sum(case when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) drawn, sum(case when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) < if(isnull(m.awayScore), 0, m.awayScore)) then 1 when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) < if(isnull(m.homeScore), 0, m.homeScore)) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) lost, sum(case when ((c.clubId = m.homeClubId) and m.homeScore > if(isnull(m.awayScore), 0, m.awayScore)) then m.homeScore when ((c.clubId = m.homeClubId) and m.homeScore < if(isnull(m.awayScore), 0, m.awayScore)) then m.homeScore when ((c.clubId = m.awayClubId) and m.awayScore > if(isnull(m.homeScore), 0, m.homeScore)) then m.awayScore when ((c.clubId = m.awayClubId) and m.awayScore < if(isnull(m.homeScore), 0, m.homeScore)) then m.awayScore when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then m.homeScore when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) `for`, sum(case when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) < if(isnull(m.awayScore), 0, m.awayScore)) then if(isnull(m.awayScore), 0, m.awayScore) when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) > if(isnull(m.awayScore), 0, m.awayScore)) then if(isnull(m.awayScore), 0, m.awayScore) when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) < if(isnull(m.homeScore), 0, m.homeScore)) then if(isnull(m.homeScore), 0, m.homeScore) when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) > if(isnull(m.homeScore), 0, m.homeScore)) then if(isnull(m.homeScore), 0, m.homeScore) when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then m.homeScore when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) `against`, sum(((case when ((c.clubId = m.homeClubId) and m.homeScore > if(isnull(m.awayScore), 0, m.awayScore)) then m.homeScore when ((c.clubId = m.homeClubId) and m.homeScore < if(isnull(m.awayScore), 0, m.awayScore)) then m.homeScore when ((c.clubId = m.awayClubId) and m.awayScore > if(isnull(m.homeScore), 0, m.homeScore)) then m.awayScore when ((c.clubId = m.awayClubId) and m.awayScore < if(isnull(m.homeScore), 0, m.homeScore)) then m.awayScore when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then m.homeScore when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) - (case when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) < if(isnull(m.awayScore), 0, m.awayScore)) then if(isnull(m.awayScore), 0, m.awayScore) when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) > if(isnull(m.awayScore), 0, m.awayScore)) then if(isnull(m.awayScore), 0, m.awayScore) when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) < if(isnull(m.homeScore), 0, m.homeScore)) then if(isnull(m.homeScore), 0, m.homeScore) when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) > if(isnull(m.homeScore), 0, m.homeScore)) then if(isnull(m.homeScore), 0, m.homeScore) when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then m.homeScore when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end))) different from `match` m, club c, league l where (m.homeClubId = ? or m.awayClubId = ?) and c.clubId = ? and m.leagueId = l.leagueId group by m.leagueId', [clubId, clubId, clubId], function(err, result) {
            if(err) console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};

exports.selectClubForLeague = function(leagueId, callback) {
    db.pool.acquire(function(err, conn) {
        if(err) console.error('err : ', err);
        conn.query('select c.clubId, c.clubName, c.leaderId, concat(u.lastName, u.firstName)leaderName from player p, club c, user u where p.leagueId = ? and p.clubId = c.clubId and c.leaderId = u.userId group by p.clubId', leagueId, function(err, result) {
            if(err) console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};

exports.selectClubStat = function(clubId, callback) {
    db.pool.acquire(function(err, conn) {
        if(err) console.error('err : ', err);
        conn.query('select l.season, sum(if(isnull(m.homeScore) and isnull(m.awayScore), 0, 1)) played, sum(if((((c.clubId = m.homeClubId) and m.homeScore > if(isnull(m.awayScore), 0, m.awayScore)) or ((c.clubId = m.awayClubId) and m.awayScore > if(isnull(m.homeScore), 0, m.homeScore))), 1, 0)) won, sum(case when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) drawn, sum(case when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) < if(isnull(m.awayScore), 0, m.awayScore)) then 1 when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) < if(isnull(m.homeScore), 0, m.homeScore)) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) lost from `match` m, club c, league l where (m.homeClubId = ? or m.awayClubId = ?) and c.clubId = ? and m.leagueId = l.leagueId group by m.leagueId', [clubId, clubId, clubId], function(err, result) {
            if(err) console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};

exports.selectClubRate = function(clubId, callback) {
    db.pool.acquire(function(err, conn) {
        if(err) console.error('err : ', err);
        conn.query('select sum(if(isnull(m.homeScore) and isnull(m.awayScore), 0, 1)) played, sum(if((((c.clubId = m.homeClubId) and m.homeScore > if(isnull(m.awayScore), 0, m.awayScore)) or ((c.clubId = m.awayClubId) and m.awayScore > if(isnull(m.homeScore), 0, m.homeScore))), 1, 0)) won, sum(case when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) drawn, sum(case when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) < if(isnull(m.awayScore), 0, m.awayScore)) then 1 when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) < if(isnull(m.homeScore), 0, m.homeScore)) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) lost, floor((sum(if((((c.clubId = m.homeClubId) and m.homeScore > if(isnull(m.awayScore), 0, m.awayScore)) or ((c.clubId = m.awayClubId) and m.awayScore > if(isnull(m.homeScore), 0, m.homeScore))), 1, 0)) / sum(if(isnull(m.homeScore) and isnull(m.awayScore), 0, 1))) * 100) wonRate, floor((sum(case when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) / sum(if(isnull(m.homeScore) and isnull(m.awayScore), 0, 1))) * 100) drawnRate, floor((sum(case when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) < if(isnull(m.awayScore), 0, m.awayScore)) then 1 when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) < if(isnull(m.homeScore), 0, m.homeScore)) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) / sum(if(isnull(m.homeScore) and isnull(m.awayScore), 0, 1))) * 100) lostRate from `match` m, club c where (m.homeClubId = ? or m.awayClubId = ?) and c.clubId = ? group by c.clubId', [clubId, clubId, clubId], function(err, result) {
            if(err) console.error('err : ', err);

            callback(err, result[0]);
        });
        db.pool.release(conn);
    });
};


exports.selectClubRate = function(clubId, callback) {
    db.pool.acquire(function(err, conn) {
        if(err) console.error('err : ', err);
        conn.query('select sum(if(isnull(m.homeScore) and isnull(m.awayScore), 0, 1)) played, sum(if((((c.clubId = m.homeClubId) and m.homeScore > if(isnull(m.awayScore), 0, m.awayScore)) or ((c.clubId = m.awayClubId) and m.awayScore > if(isnull(m.homeScore), 0, m.homeScore))), 1, 0)) won, sum(case when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) drawn, sum(case when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) < if(isnull(m.awayScore), 0, m.awayScore)) then 1 when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) < if(isnull(m.homeScore), 0, m.homeScore)) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) lost, floor((sum(if((((c.clubId = m.homeClubId) and m.homeScore > if(isnull(m.awayScore), 0, m.awayScore)) or ((c.clubId = m.awayClubId) and m.awayScore > if(isnull(m.homeScore), 0, m.homeScore))), 1, 0)) / sum(if(isnull(m.homeScore) and isnull(m.awayScore), 0, 1))) * 100) wonRate, floor((sum(case when (not(isnull(m.awayScore) and isnull(m.homeScore)) and m.homeScore = m.awayScore) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) / sum(if(isnull(m.homeScore) and isnull(m.awayScore), 0, 1))) * 100) drawnRate, floor((sum(case when ((c.clubId = m.homeClubId) and if(isnull(m.homeScore), 0, m.homeScore) < if(isnull(m.awayScore), 0, m.awayScore)) then 1 when ((c.clubId = m.awayClubId) and if(isnull(m.awayScore), 0, m.awayScore) < if(isnull(m.homeScore), 0, m.homeScore)) then 1 when (isnull(m.awayScore) and isnull(m.homeScore)) then 0 else 0 end) / sum(if(isnull(m.homeScore) and isnull(m.awayScore), 0, 1))) * 100) lostRate from `match` m, club c where (m.homeClubId = ? or m.awayClubId = ?) and c.clubId = ? group by c.clubId', [clubId, clubId, clubId], function(err, result) {
            if(err) console.error('err : ', err);

            callback(err, result[0]);
        });
        db.pool.release(conn);
    });
};

exports.insertClub = function(data, callback) {
    db.pool.acquire(function (err, conn) {
        if(err) console.error('db - err : ', err);
        conn.query('insert into club (leaderId, formation, leagueId, teamId) values (?, ?, ?, ?)', data, function(err, result) {
            if (err) return console.error('err : ', err);
            if (result.affectedRows > 0) {
                callback(err, result);
            } else {
                return console.log('insert is fail,,,, ', result)
            }

        });
        db.pool.release(conn);
    });
};

exports.deleteClub = function(data, callback) {
    db.pool.acquire(function (err, conn) {
        if(err) console.error('db - err : ', err);
        conn.query('delete from club where clubId = ?', data, function(err, result) {
            if (err) return console.error('err : ', err);
            if (result.affectedRows > 0) {
                callback(err, result);
            } else {
                return console.log('delete is fail,,,, ', result)
            }

        });
        db.pool.release(conn);
    });
};


