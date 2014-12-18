var db = require('../config/database');



exports.selectMatches = function(leagueId, callback) {
    db.pool.acquire(function(err, conn){
        if(err) console.error('db - err : ', err);
        conn.query('select concat("#", @RNUM := @RNUM + 1) AS rownum, m.matchId, m.matchName, month(m.kickoffTime) month, DAY(m.kickoffTime) day, hour(m.kickoffTime) hour, m.homeClubId, (select (select teamName from team t where t.teamId = c.teamId)teamName from club c where m.homeClubId = c.clubId)homeClubName, m.awayClubId, (select (select teamName from team t where t.teamId = c.teamId)teamName from club c where m.awayClubId = c.clubId)awayClubName, if ( m.kickoffTime < now() and isnull(m.homeScore), 0, m.homeScore) homeScore, if ( m.kickoffTime < now() and isnull(m.awayScore), 0, m.awayScore) awayScore, m.leagueId, m.stadium, m.note, m.link from `match` m, ( SELECT @RNUM := 0 ) R where m.leagueId = ? order by kickoffTime', leagueId, function (err, result) {
            if (err) console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};