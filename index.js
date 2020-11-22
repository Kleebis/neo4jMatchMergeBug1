const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'pwd'));
const session = driver.session();
const queryString1 = `MATCH (n) DELETE n;`;
const queryString2 = `CREATE ( User: Users { UserName: "admin" });`;
const queryString3 = `CREATE ( Session: Sessions { sessionId: "sessionId123" });`;
const queryString4 = `MATCH (User:Users) MATCH (Session:Sessions) `
  + `WHERE User.UserName = "admin" AND Session.sessionId = "sessionId123" `
  + 'CREATE (User)-[r:SESSION_USER]->(Session); ';

session.writeTransaction((tx) => {
  tx.run(queryString1)
    .then(tx.run(queryString2)
      .then(tx.run(queryString3)
        .then(tx.run(queryString4)
      )
    )
  );
})
.finally(() => {
  session.close();
  driver.close();
});


