var db = require('../config/database');



exports.selectLeague = function(leagueId, callback) {
    db.pool.acquire(function(err, conn){
        if(err) console.error('db - err : ', err);
        conn.query('select leagueId, community, season from league where leagueId = ?', leagueId, function (err, result) {
            if (err) console.error('err : ', err);

            callback(err, result[0]);
        });
        db.pool.release(conn);
    });
};