exports.requiresLogin = function (req, res, next) {
	// console.log("isAuthenticated   : ", req.isAuthenticated);

	//로그인 했는데 다시 로그인 화면으로 올때
	if (req.originalUrl == '/login' && req.isAuthenticated()) {

		return res.redirect('/');
	}

	// login으로 오게되면 그냥 로그인 뿌려줌(이거안하면 계속 로그인으로 순환됨)
	// if (req.originalUrl == '/login' || req.originalUrl == '/signup' ) return next();
	if (req.originalUrl == '/login') return next();

	// 유저가 없으니까 로그인 안한거야
	if (!req.user) return res.redirect('/login');

	if (req.method == 'GET') {
		// console.log('Auth임 req.session.returnTo   : ', req.session.returnTo);
		// console.log('req.originalUrl      : ', req.originalUrl);
		req.session.returnTo = req.originalUrl;
	}

	//인증되면 로그인과 동시에 user정보 뿌려줌
	if (req.isAuthenticated()) {
		res.locals.user = req.user;
		next();
	}

};

exports.requiresAdmin = function (req, res, next) {

	if (!(req.user.userId === 18)) {

		return res.json({ message : '권한이 없습니다.'})
	}

	next();

}


/*
 *  authorization routing middleware if user has login
 */
exports.APIrequiresUserLogin = function (req, res, next) {

	if( req.isAuthenticated()) {
		return next();
	} else {
		console.log('여기 옴/.????');
		var errPrint     = {};
		errPrint.status  = 403;
		errPrint.message = "Unauthorized, need user session to access this route";

		return res.json(200, errPrint);
	}
};