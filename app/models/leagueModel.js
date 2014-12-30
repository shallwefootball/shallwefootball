var db = require('../config/database');

exports.selectLeague = function(leagueId, userId, callback) {
    db.pool.acquire(function(err, conn){
        if(err) console.error('db - err : ', err);
        conn.query("select l.leagueId, l.community, l.season, l.start, l.end, if (l.end < now(), 'end', if(l.start < now() and now() < l.end, 'playing', 'before')) status, (select sum(if ((p.status = 'transfered' or p.status = 'starting' or p.status = 'sub' or p.status = 'excepted'), true, false)) wait from player p left outer join club c on p.clubId = c.clubId where p.userId = ? and c.leagueId = ?) userJoined from league l where l.leagueId = ?", [userId, leagueId, leagueId], function (err, result) {
            if (err) return console.error('selectLeague err : ', err);

            callback(err, result[0]);
        });
        db.pool.release(conn);
    });
};