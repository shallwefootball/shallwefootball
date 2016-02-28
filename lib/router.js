
FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render("app", {content: "register"});
    BlazeLayout.setRoot('.container');
  }
});

var matchSection = FlowRouter.group({
    prefix: "/match"
});

matchSection.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render("app", {content: "match"});
  }
});

// matchSection.route('/:leagueId', {
//   action: function(params, queryParams) {
//     BlazeLayout.render("app", {content: "match"});
//   }
// });