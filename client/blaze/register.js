// var registerUsers = (new MysqlSubscription('registerUsers'));
var registerUsers = (new MysqlSubscription('amos'));
var registeredTeam = (new MysqlSubscription('registeredTeam'));

var ERRORS_KEY = 'joinErrors';

Template.register.onCreated(function() {
  Session.set(ERRORS_KEY, {});
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
    var team = $('select[name="teamFilter"]').val();

    registerUsers.change(player, team);
  },
  'change select[name="teamFilter"]': function(e) {
    var player = $('input[name="player"]').val();
    var team = e.currentTarget.value;

    registerUsers.change(player, team);
  },
  'click button[name="player-modal"]': function(event, template) {
    event.preventDefault();
    var modalSelector = '#playerModal' + this.userId;
    $(modalSelector).modal('show');
  }
})