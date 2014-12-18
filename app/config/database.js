var generic_pool     = require('generic-pool');
var mysql            = require('mysql');
var databaseConfig   = require('../config/config').mysql;

var db = {};

db.pool = generic_pool.Pool({
    name: 'mysql',
    create: function(callback) {
        var config = {
            host     : databaseConfig.host,
            port     : databaseConfig.port,
            user     : databaseConfig.user,
            password : databaseConfig.password,
            database : databaseConfig.database
        };
        var client = mysql.createConnection(config);
        client.connect(function(err) {
            if(err) console.error('Database Connection Error', err);
            callback(err, client);
        });
    },
    destroy: function(client) {
        client.end();
    },
    max: 10,
    min: 2,
    idleTimeoutMillis : 30000, // 5분 동안 접속을 유지한다
    log : false
});


db.process = process.on('exit', function (){ // process 가 종료될 때
    pool.drain(function() {
        pool.destroyAllNow();
    });
});

module.exports = db
