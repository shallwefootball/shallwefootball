Accounts.onEmailVerificationLink(function(token, done) {
  Meteor.call('verifiedToken', token, function() {
    console.log('인증이 완료되었습니다. ', arguments);
    alert('인증이 완료되었습니다.');
    return done();
  })
});

Template.registerList.events({
  'click button[name="cancel"]': function() {

    console.log('this cancel   : ', this);
    var email = this.email
    var playerId = this.playerId

    Meteor.call('existUser', email, function(err, user) {
      console.log('existUser  user  : ', user);
      Meteor.call('removeUserAndPlayer', playerId, email, function(err, result) {

        console.log('remove mongouser  : ', Meteor.users.remove({_id: user._id}));

        alert(email + '<- 등록이 취소되었습니다. ')
      })
    })
  },
  'click #playerModal': function() {
    console.log('click~~');
  }
})

Template.registerList.helpers({
  registerd: function() {
    if(this.season == 2016) return true;
  }
});