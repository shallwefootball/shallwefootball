var registeredTeam = (new MysqlSubscription('registeredTeam'));
var registerdPlayers = (new MysqlSubscription('registerdPlayers'));

var ERRORS_KEY = 'joinErrors';
var LEAGUE_ID = 6;

Template.joinModal.onRendered(function() {
  this.$('div[role="alert"]').hide();
  this.$('input[name="datepicker"]').datepicker({
    format: "yyyy/mm/dd",
    autoclose: true
  });
})

Template.joinModal.helpers({
  errorMessage: function() {
    return _.values(Session.get(ERRORS_KEY))
  },
  clubs: function() {
    return registeredTeam.reactive();
  },
  currentRestNumber: function() {
    registerdPlayers.depend();

    var totalSquadNumber = [];
    for (var i = 1; i < 101; i++) totalSquadNumber.push(i);
    registerdPlayers.forEach(function(item, index) {
      totalSquadNumber.splice(item.squadNumber - 1, 1)
    })
    return totalSquadNumber;
  }
})

Template.joinModal.events({
  'submit': function(event, template) {
    event.preventDefault();
    var email = template.$('[name=email]').val();
    var lastName = template.$('[name=lastName]').val();
    var firstName = template.$('[name=firstName]').val();
    var password = template.$('[name=password]').val();
    var confirm = template.$('[name=confirm]').val();
    var clubId = template.$('[name=clubId]').val();
    var squadNumber = template.$('[name=squadNumber]').val();
    var position = template.$('[name=position]').val();
    var birthDay = template.$('[name=datepicker]').datepicker('getDate');

    var errors = {};
    if (! email) errors.email = '이메일을 입력하세요.';
    if (! lastName) errors.lastName = '성을 입력하세요.';
    if (! firstName) errors.firstName = '이름을 입력하세요.';
    if (! password) errors.password = ' 비밀번호가 필요합니다.';
    if (confirm !== password) errors.confirm = ' 비밀번호를 확인 해주세요.';
    if (! clubId) errors.clubId = '팀을 선택하세요.'
    if (! squadNumber) errors.squadNumber = '등번호를 선택하세요.'
    if (! position) errors.position = '포지션을 선택하세요.'
    if (! birthDay) errors.birthDay = '생년월일을 선택하세요.'
    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return showAlert.call(this, template);
    }

    // 생년월일!!!

    var user_id = Accounts.createUser({
      email: email,
      lastName: lastName,
      firstName: firstName,
      password: password,
      clubId: clubId,
      position: position,
      squadNumber: squadNumber,
      birthDay: birthDay,
      leagueId: LEAGUE_ID,
      new2016: true
    }, function(error) {
      if (error) {
        console.error("error  : ", error);
        Session.set(ERRORS_KEY, {'none': error.reason});
        return showAlert.call(this, template);
      }

      alert(email + ' 으로 인증메일이 전송되었습니다. 메일을 확인하세요!');
      template.$('div[role="dialog"]').modal('hide');
    })
  },
  'click button[name="fadeOut"]': function(event, template) {
    template.$('div[role="alert"]').fadeOut();
  },
  'change select[name="clubId"]': function(event, template) {
    event.preventDefault();
    console.log('this : ', this);
    var clubId = template.$('select[name="clubId"]').val();
    registerdPlayers.change(clubId);
  }
})

function showAlert(template) {
  if(arguments.length == 0) return console.error('no arguments  : ', arguments);
  return template.$('div[role="alert"]').show(function() {
    setTimeout(function() {
      $(this).fadeOut(1500);
    }.bind(this), 5000);
  });
}

