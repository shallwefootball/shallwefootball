var Future = Npm.require( 'fibers/future' );

// Accounts.config({ sendVerificationEmail: true });

Accounts.onCreateUser(function(options, user) {
  var future = new Future();

  options.createdAt = user.createdAt;

  if(options.new2016) {
    Meteor.call('addUserPlayer', options, function(err, result) {
      if (err) future.throw(err);

      // console.log('info', 'success user')
      future.return(user)
    });
  }else {
    Meteor.call('addPlayer', options, function(err, result) {
      if (err) future.throw(err);

      // console.log('info', 'success player')
      future.return(user)
    });
  }
  return future.wait();

})

Meteor.methods({
  checkVerification: function(email) {
    var user = Accounts.findUserByEmail(email);
    if(!user) return undefined;
    user.emails.forEach(function(email, index) {
      if (email.verified) {return true}
    })
    return false;
  },
  existUser: function(email) {
    var user = Accounts.findUserByEmail(email);
    if(!user) return false;
    return true;
  }
})


