var db = require('../config/database');


exports.foreignKeyChecks = function(isBool, callback){
	db.pool.acquire(function(err, conn){
		console.error('db err : ', err);
		conn.query('set foreign_key_checks = ?', isBool, function(err, result){
			console.error('db err : ', err);

			callback(err, result);
		});
		db.pool.release(conn);
	});
};