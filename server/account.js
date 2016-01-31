var Future = Npm.require( 'fibers/future' );
// Accounts.config({ sendVerificationEmail: true });

Accounts.onCreateUser(function(options, user) {
  var future = new Future();

  options.createdAt = user.createdAt;

  Meteor.call('addPlayer', options, function(err, result) {
    if (err) future.throw(err);
    future.return(user)
  });
  return future.wait();
})