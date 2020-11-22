const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'pwd'));
const session = driver.session();
const queryString = `MATCH (User:User) MATCH (Session:sessions) `
  + `WHERE User.UserName = "admin" AND Session.sessionId = "sessionId123" `
  + 'CREATE (User)-[r:SESSION_USER]->(Session); ';

session.writeTransaction((tx) => {
  tx.run(queryString)
    .then((neo4jresult) => {
      console.log(`relationships created:  ${neo4jresult.summary.counters._stats.relationshipsCreated}`);              
    })
    .catch((error) => {
      console.log(`Neo4j error: ${JSON.stringify(error.message)}`);
    })
    .finally(() => {
      session.close();
      driver.close();
    });
});


