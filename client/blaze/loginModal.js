var ERRORS_KEY = 'loginErrors';

Template.loginModal.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.loginModal.events({
  'submit': function(event, template) {
    event.preventDefault();

    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();

    var errors = {};

    if (! email) {
      errors.email = 'Email is required';
    }

    if (! password) {
      errors.password = 'Password is required';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }

      console.log('login success???');

      // Router.go('home');
    });

  }
})