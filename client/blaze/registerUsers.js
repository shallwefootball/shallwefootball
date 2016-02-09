Template.registerPlayers.onCreated(function() {
  this.existEmail = new ReactiveVar(false);
  Meteor.call('existUser', this.data.email, function(err, user) {
    if(user) this.existEmail.set(true);
  }.bind(this));
})

Template.registerPlayers.helpers({
  existEmail: function(obj, template) {

    return Template.instance().existEmail.get();
  }
})
