var db = require('../config/database');



exports.selectLeague = function(leagueId, callback) {
    db.pool.acquire(function(err, conn){
        if(err) console.error('db - err : ', err);
        conn.query("select leagueId, community, season, start, end, if (end < now(), 'end', if(start < now() and now() < end, 'playing', 'before')) status from league where leagueId = ?", leagueId, function (err, result) {
            if (err) return console.error('err : ', err);

            callback(err, result[0]);
        });
        db.pool.release(conn);
    });
};