Template.navBtnGroup.events({
  'click button[role="showLoginModal"]': function() {
    $('#loginModal').modal('show');
  },
  'click button[role="logout"]': function() {
    Meteor.logout();
  }
})