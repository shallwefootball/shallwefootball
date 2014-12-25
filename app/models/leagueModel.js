var db = require('../config/database');

exports.selectLeague = function(leagueId, userId, callback) {
    db.pool.acquire(function(err, conn){
        if(err) console.error('db - err : ', err);
        conn.query("select l.leagueId, l.community, l.season, l.start, l.end, if (l.end < now(), 'end', if(l.start < now() and now() < l.end, 'playing', 'before')) status,if ((select p.userId from player p left outer join club c on c.clubId = p.clubId where p.userId = ? and c.leagueId = ?), 1, 0) userJoined from league l where l.leagueId = ?", [userId, leagueId, leagueId], function (err, result) {
            if (err) return console.error('err : ', err);

            callback(err, result[0]);
        });
        db.pool.release(conn);
    });
};