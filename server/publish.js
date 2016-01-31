// need to modify config.js because of __dirname
var LiveDb = new LiveMysql(require('../config.js').mysql);
var Future = Npm.require( 'fibers/future' );


var closeAndExit = function() {
  LiveDb.end();
  process.exit();
};
// Close connections on hot code push
process.on('SIGTERM', closeAndExit);
// Close connections on exit (ctrl + c)
process.on('SIGINT', closeAndExit);

Meteor.publish('registerUsers', function(user, team) {
  user = user ? user : '';
  team = team ? team : '';

  return LiveDb.select(
    'select * from (select * from (select u.userId, concat(u.lastName, u.firstName)playerName, u.email, p.playerId, p.clubId, p.position, p.squadNumber, t.teamName, l.community, l.season, l.end from user u left outer join player p on p.userId = u.userId  left outer join club c on c.clubId = p.clubId left outer join team t on t.teamId = c.teamId left outer join league l on c.leagueId = l.leagueId WHERE (u.firstName LIKE "%' + user + '%" OR u.lastName LIKE "%' + user + '%" OR concat(u.lastName, u.firstName) LIKE "%' + user + '%") AND t.teamName LIKE "%' + team + '%" order by l.end desc, c.clubId asc) us group by us.userId) pl order by pl.end desc, pl.teamName asc',
    [{table: 'user'}]
  );
})

//for test
Meteor.publish('amos', function(user, team) {
  user = user ? user : '';
  team = team ? team : '';

  return LiveDb.select(
    'select * from (select * from (select u.userId, concat(u.lastName, u.firstName)playerName, u.email, p.playerId, p.clubId, p.position, p.squadNumber, t.teamName, l.community, l.season, l.end from user u left outer join player p on p.userId = u.userId  left outer join club c on c.clubId = p.clubId left outer join team t on t.teamId = c.teamId left outer join league l on c.leagueId = l.leagueId WHERE u.userId = 18 order by l.end desc, c.clubId asc) us group by us.userId) pl order by pl.end desc, pl.teamName asc',
    [{table: 'user'}]
  );
})

Meteor.publish('registeredTeam', function() {
  return LiveDb.select(
    'select c.clubId, t.teamId, t.teamName, l.community, l.season, c.createdAt from club c left join team t on t.teamId = c.teamId left join league l on l.leagueId = c.leagueId where l.leagueId = 6 order by c.createdAt',
    [{table: 'club'}]
  );
})

Meteor.methods({
  addPlayer: function(options) {

    var future = new Future();

    LiveDb.db.beginTransaction(function (err) {
      if (err) future.throw(err);
      LiveDb.db.query('UPDATE user SET email = ?, createdAt = ? WHERE userId = ?', [
          options.email,
          options.createdAt,
          options.userId
        ], function(err, result) {
          if (err) return LiveDb.db.rollback(function() { future.throw(err); });

          console.log('update User result : ', result)

          LiveDb.db.query('select u.userId, concat(u.lastName, u.firstName)playerName, u.email, c.clubId, t.teamName, l.community, l.season, c.createdAt from player p left join user u on p.userId = u.userId left join club c on p.clubId = c.clubId left join team t on t.teamId = c.teamId left join league l on c.leagueId = l.leagueId where l.leagueId = ? and p.userId = ?', [
              options.leagueId,
              options.userId
           ], function(err, result) {
              if (err) return LiveDb.db.rollback(function() { future.throw(err); });
              if (result.length > 0) {
                return LiveDb.db.rollback(function() {
                  future.throw(new Meteor.Error('rollback!! because of exist user', '이미 "' + result[0].season + result[0].teamName + '"으로 등록되어있습니다.! 확인하세요!'));
                });
              }

              console.log('select player result : ', result)

              LiveDb.db.query('insert into player (userId, clubId, squadNumber, position, matchposition, createdAt) values (?, ?, ?, ?, ?, ?)', [
                options.userId,
                options.clubId,
                options.squadNumber,
                options.position,
                options.position,
                options.createdAt
              ], function(err, result) {
                if (err) return LiveDb.db.rollback(function() { future.throw(err); });

                console.log('add player result : ', result)

                LiveDb.db.commit(function(err) {
                  if (err) return LiveDb.db.rollback(function() { future.throw(err); });
                  future.return(result)
                });
              }); //end add Player
          }); // end select Player
      }); // end user Update
    })  //end transaction
    return future.wait();
  }
});





