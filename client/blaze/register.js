var registerUsers = (new MysqlSubscription('registerUsers'));
// var registerUsers = (new MysqlSubscription('amos'));
var registeredTeam = (new MysqlSubscription('registeredTeam'));

var ERRORS_KEY = 'joinErrors';

Template.register.onCreated(function() {
  Session.set(ERRORS_KEY, {});

  // Meteor.call('existUser', this.email, function(err, user) {
    // console.log("this.existEmail   : ', ", this.existEmail);
    // if(user) this.existEmail.set(true);
  // }.bind(this));
  console.time('amos');
})

Template.register.onRendered(function() {
  console.timeEnd('amos');
})

Template.register.helpers({
  registerUsers: function(param) {
    return registerUsers.reactive();
  },
  currentCount: function() {
    return registerUsers.reactive().length;
  },
  registeredTeam: function() {
    return registeredTeam.reactive();
  }
})

Template.register.events({
  'keyup input[name="search"]': function(e) {
    var player = e.currentTarget.value;
    var teamName = $('select[name="teamName"]').val();

    registerUsers.change(player, teamName);
  },
  'change select[name="teamName"]': function(e) {
    var player = $('input[name="player"]').val();
    var teamName = e.currentTarget.value;

    registerUsers.change(player, teamName);
  },
  'click button[name="player-modal"]': function(event, template) {
    event.preventDefault();
    Template.playerModal.show(this);
  }
})