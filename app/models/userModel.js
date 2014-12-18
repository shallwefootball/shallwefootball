var db      = require('../config/database'),
    config  = require('../config/config');

exports.selectPlayerEmail = function (email, callback) {
    db.pool.acquire(function (err, conn) {
        if(err) console.error('db - err : ', err);
        conn.query('select email from user where email = ?', [email], function (err, result) {
            if (err) console.error('err : ', err);
            callback(err, result);
        });
        db.pool.release(conn);
    });
};


exports.selectUserPassword = function (userId, callback) {
    db.pool.acquire(function (err, conn) {
        if(err) console.error('db - err : ', err);
        conn.query('select password from user where userId = ?', [userId], function (err, result) {
            if (err) console.error('err : ', err);
            callback(err, result[0].password);
        });
        db.pool.release(conn);
    });
};



exports.insertUser = function (data, callback) {
    db.pool.acquire(function (err, conn) {
        if(err) console.error('db - err : ', err);
        conn.query('insert into user (email, password, lastName, firstName, birthday) values (?, ?, ?, ?, ?)', data, function(err, result) {
            if (err) console.error('err : ', err);
            if (result.affectedRows == 1) {
                callback(err, result);
            } else {
                callback(err);
            }

        });
        db.pool.release(conn);
    });

};



exports.updatePassword = function (password, userId, callback) {

    db.pool.acquire(function(err, conn) {
        if(err) console.error('db - err : ', err);
        conn.query('update user set password = ? where userId = ?', [password, userId], function(err, result) {
            if(err) console.error('err : ', err);
            callback(err, result);
        });
        db.pool.release(conn);
    });

};




exports.deleteUser = function(email, callback){
    db.pool.acquire(function(err, conn){
        if(err) console.error('db - err : ', err);
        conn.beginTransaction(function(err) {
            if(err) console.error('db - err : ', err);
            conn.query('delete from player where email = ?', email, function(err, result){
                if(err) console.error('db - err : ', err);
                callback(err, result, function(err, transactionsCallback){

                    if(err){
                        conn.rollback(function() {
                            throw err;
                        });

                    }else {
                        conn.commit(function(err) {
                            if (err) {
                                conn.rollback(function() {
                                    transactionsCallback(err);
                                    throw err;
                                });
                            }
                            transactionsCallback(err);
                            console.log('commit..... success!');
                        });
                    }

                });
            });
        });
        db.pool.release(conn);
    });
};

exports.updatePlayerForSignupClub = function(data, callback) {
    db.pool.acquire(function(err, conn) {
        if(err) console.error('db - err : ', err);
        // var data        = [ clubId, squadNumber, position, position, orderNumber, status, userId ];
        conn.query('update player set clubId = ?, squadNumber = ?, position = ?, matchPosition = ?, orderNumber = ?, status = ? where email = ?', data, function(err, result) {
            if(err) console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};

exports.updatePlayerForSignoutClub = function(data, callback) {
    db.pool.acquire(function(err, conn) {
        if(err) console.error('db - err : ', err);
        conn.query('update player set clubId = NULL, position = NULL, squadNumber = NULL, status = NULL, matchPosition = NULL, orderNumber = NULL where email = ? and clubId = ?', data, function(err, result) {
            if(err) console.error('err : ', err);

            callback(err, result);
        });
        db.pool.release(conn);
    });
};



exports.updateProfileUrl = function(fileName, userId, callback) {
    db.pool.acquire(function(err, conn) {
        conn.query('update user set profileImageUrl=? where userId=?', [fileName, userId], function (err, result) {
            if(err) console.error('err', err);
            // console.log('user registration profileImageUrl result', result);
            callback(err, result);
        });
        db.pool.release(conn);
    });
};


exports.updateMyInfo = function(datas, callback) {
    db.pool.acquire(function(err, conn) {
        async.waterfall([
            function(done) {
                conn.query('select profileImageUrl from user where userId = ?', [datas[3]], function(err, result) {
                    if (err) console.error('err', err);
                    console.log('profileImageUrl: ', result[0].profileImageUrl);
                    var profileImageUrl = result[0].profileImageUrl;
                    done(null, profileImageUrl);
                });
                db.pool.release(conn);
            },

            function(profileImageUrl, done) {
                conn.query('update user set password = ?, birthday = ?, position = ? where userId = ?', datas, function (err, result) {
                    if(err) console.error('err', err);
                    console.log('updateMyInfo result', result);
                    done(null, {result: 'success', profileImageUrl: profileImageUrl});
                });
                db.pool.release(conn);
            }
        ],
        function(err, results) {
            if(err) console.log('updateMyInfo err: ', err);
            console.log('updateMyInfo results: ');
            callback(err, results);
        });
    });
};









