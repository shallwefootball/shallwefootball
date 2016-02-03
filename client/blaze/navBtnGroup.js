Template.navBtnGroup.events({
  'click button[role="showLoginModal"]': function() {
    $('#loginModal').modal('show');
  },
  'click button[role="logout"]': function() {
    Meteor.logout();
  },
  'click button[role="showJoinModal"]': function() {
    $('#joinModal').modal('show');
  }
})

Template.navBtnGroup.helpers({
  emailLocalPart: function() {
    var email = Meteor.user().emails[0].address;
    return email.substring(0, email.indexOf('@'));
  }
})
