var db = require('../config/database');

exports.selectLikePlayer = function (query, callback){
    db.pool.acquire(function(err, conn){
        if(err) console.error('db - err : ', err);
        conn.query('SELECT SQL_CALC_FOUND_ROWS u.userId, concat(u.lastName, u.firstName)playerName, if(isnull(t.teamName), "소속팀없음", t.teamName) teamName FROM user u left outer join player p on p.userId = u.userId left outer join club c on c.clubId = p.clubId left outer join team t on c.teamId = t.teamId WHERE u.firstName LIKE "%' + query + '%" OR u.lastName LIKE "%' + query + '%" OR concat(u.lastName, u.firstName) LIKE "%' + query + '%" group by u.userId limit 5', [query, query, query], function (err, results) {
            if (err) console.error('err : ', err);

            conn.query('SELECT FOUND_ROWS() rows', [], function (err, rows) {

	            callback(err, results, (rows[0].rows - 1));
        	});
        });
        db.pool.release(conn);
    });
}

