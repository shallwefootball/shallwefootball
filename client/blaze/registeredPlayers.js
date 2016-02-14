Template.registeredPlayers.onCreated(function() {
  this.existEmail = new ReactiveVar(false);
  this.verificationEmail = new ReactiveVar(false);
  this.statusClass = new ReactiveVar('');

  Tracker.autorun(function() {
    Meteor.call('existUser', this.data.email, function(err, user) {
      if(user) {

        this.existEmail.set(true)
        this.statusClass.set('active');

        if (user.emails[0].verified) {
          this.verificationEmail.set(true);
          this.statusClass.set('success')
        }
      }
    }.bind(this));
  }.bind(this))
  // if(!this.verificationEmail.get() && !this.existEmail.get()) this.statusClass.set('');
  // if(this.verificationEmail.get() && this.existEmail.get()) this.statusClass.set('success');
  // if(this.existEmail.get()) {
  //   console.log('this.existEmailthis.existEmail?')
  //   this.statusClass.set('active');
  // }
})

Template.registeredPlayers.helpers({
  existEmail: function() {
    return Template.instance().existEmail.get();
  },
  verificationEmail: function() {
    return Template.instance().verificationEmail.get();
  },
  statusClass: function() {
    // var tpl = Template.instance()
    // if(!tpl.verificationEmail.get() && !tpl.statusClass.get()) return '';
    // if(tpl.verificationEmail.get() && tpl.existEmail.get()) return 'success';
    // if(tpl.existEmail.get()) return 'active';
    return Template.instance().statusClass.get();
  }
})
