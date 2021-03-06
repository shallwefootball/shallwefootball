var registerUsers = (new MysqlSubscription('registerUsers'));
var registerdPlayersForAll = (new MysqlSubscription('registerdPlayersForAll'));
// var registerUsers = (new MysqlSubscription('amos'));
var registeredTeam = (new MysqlSubscription('registeredTeam'));

var ERRORS_KEY = 'joinErrors';

Template.register.onCreated(function() {
  Session.set(ERRORS_KEY, {});
})

Template.register.helpers({
  getRegisteredPlayers: function(param) {
    return registerUsers.reactive();
  },
  currentCount: function() {
    return registerUsers.reactive().length;
  },
  registerdPlayersForAll: function() {
    return registerdPlayersForAll.reactive().length;
  },
  getRegisteredTeams: function() {
    return registeredTeam.reactive();
  },
  getCurrentRegisterPlayers: function(clubId) {
    console.log('clubId   : ', clubId);
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