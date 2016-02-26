var registerdPlayers = new MysqlSubscription('registerdPlayers');
var getClubs = new MysqlSubscription('getClubs');

var clubs = {};
getClubs.addEventListener('update', function(e, result) {
  result.map(function(club, index) {
    clubs[club.clubId] = new MysqlSubscription('registerdPlayers', club.clubId)
  })
})

Template.progressBar.helpers({
  getRegisteredPlayers: function() {
    return clubs[this.clubId].reactive().length;
  },
  getClubs: function() {
    return getClubs.reactive();
  },
  getPercent: function() {
    var playerCount = clubs[this.clubId].reactive().length
    var percent = (playerCount / 23) * 100

    if (percent >= 100) return 100;

    return percent;
  },
  getStatusClass: function() {

    var playerCount = clubs[this.clubId].reactive().length
    var percent = (playerCount / 23) * 100

    if (percent >= 100) return 'progress-bar-success';

    return 'progress-bar-warning'
  }
})
    // console.log('registerdPlayers.change(this.clubId)  : ', registerdPlayers.change(this.clubId));
