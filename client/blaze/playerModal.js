var registeredTeam = (new MysqlSubscription('registeredTeam'));
var ERRORS_KEY = 'joinErrors';
var LEAGUE_ID = 6;

Template.playerModal.onRendered(function() {
  this.$('div[role="alert"]').hide();
})

Template.playerModal.helpers({
  errorMessage: function() {
    return _.values(Session.get(ERRORS_KEY))
  },
  registerTeam: function() {
    return registeredTeam.reactive();
  }
})

Template.playerModal.events({
  'submit': function(event, template) {
    event.preventDefault();
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();
    var confirm = template.$('[name=confirm]').val();
    var clubId = template.$('[name=teamRegister]').val();

    var errors = {};
    if (! email) errors.email = '이메일을 입력하세요.';
    if (! password) errors.password = ' 비밀번호가 필요합니다.';
    if (confirm !== password) errors.confirm = ' 비밀번호를 확인 해주세요.';
    if (! clubId) errors.clubId = '팀을 선택하세요.'
    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return showAlert.call(this, template);
    }

    var user_id = Accounts.createUser({
      email: email,
      password: password,
      userId: this.userId,
      clubId: clubId,
      position: this.position,
      squadNumber: this.squadNumber,
      leagueId: LEAGUE_ID
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