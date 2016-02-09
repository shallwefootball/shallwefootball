Template.registeredPlayers.onCreated(function() {
  this.existEmail = new ReactiveVar(false);
  this.verificationEmail = new ReactiveVar(false);
  Meteor.call('existUser', this.data.email, function(err, user) {
    if(user) {

      if (user.emails[0].verified) this.verificationEmail.set(true);
      this.existEmail.set(true)
    }
  }.bind(this));
})

Template.registeredPlayers.helpers({
  existEmail: function() {
    return Template.instance().existEmail.get();
  },
  verificationEmail: function() {
    return Template.instance().verificationEmail.get();
  }
})
