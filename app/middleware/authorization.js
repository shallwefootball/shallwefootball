exports.requiresLogin = function (req, res, next) {
  // console.log("isAuthenticated   : ", req.isAuthenticated);
  if (req.isAuthenticated()) return next();
	if (req.method == 'GET') {
		// console.log('Auth임 req.session.returnTo   : ', req.session.returnTo);
		// console.log('req.originalUrl      : ', req.originalUrl);
		req.session.returnTo = req.originalUrl;
	}
	res.redirect('/login');
};



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