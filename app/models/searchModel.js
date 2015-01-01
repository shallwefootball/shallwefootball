var db = require('../config/database');

exports.selectLikePlayer = function (query, callback){
    db.pool.acquire(function(err, conn){
        if(err) console.error('db - err : ', err);
        conn.query('SELECT concat(u.lastName, u.firstName)playerName, if(isnull(t.teamName), "소속팀없음", t.teamName) teamName FROM user u left outer join player p on p.userId = u.userId left outer join club c on c.clubId = p.clubId left outer join team t on c.teamId = t.teamId WHERE u.firstName LIKE "%' + query + '%" OR u.lastName LIKE "%' + query + '%" OR concat(u.lastName, u.firstName) LIKE "%' + query + '%" group by u.userId limit 5', [query, query, query], function (err, results) {
            if (err) console.error('err : ', err);

            callback(err, results)
        });
        db.pool.release(conn);
    });
}
