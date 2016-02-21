Accounts.onEmailVerificationLink(function(token, done) {
  Meteor.call('verifiedToken', token, function() {
    console.log('인증이 완료되었습니다. ', arguments);
    alert('인증이 완료되었습니다.');
    return done();
  })
})
