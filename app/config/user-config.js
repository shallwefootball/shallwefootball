// config for the express app
// depending on `process.env.NODE_ENV`, default is `development`

var path = require('path'),
		rootPath = path.normalize(__dirname + '/../..');

var config = {
	// Development config
	//
	development: {
		server: {
			port: 3026,
			hostname: 'localhost',
		},
		mysql: {
			host: 'userhost',
			port: 3306,
			user: 'userName',
			password: 'userPassword',
			database: 'userDatabase'
		},
		profileImageFolder : path.resolve(__dirname, '..', 'images/user'),
		profileImageURL : 'http://localhost:3026/images/user/',
		clubLogoURL : 'http://localhost:3026/images/club/',
		root     : rootPath,
		app      : {
			name : 'shallwefootball-Development'
		},
	},
	//
	// Production Config
	//
	production: {
		server: {
			port: 3001,
			hostname: process.env.HOSTNAME || '127.0.0.1',
		},
		BaseApiURL : 'http://localhost:3001/api/',
		root     : rootPath,
		app      : {
			name : 'shallwefootball-Product'
		},
	},

	//
	// Testing config
	//
	test: {
		server: {
			port: 4001,
			hostname: 'localhost',
		},
		database: {
			url: 'mongodb://localhost/express_test'
		}
	}
};

module.exports = config[process.env.NODE_ENV || 'development'];
