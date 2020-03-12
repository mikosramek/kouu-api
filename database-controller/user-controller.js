//use mikodog_kouu;
//select email, name, password from users;
'use strict'

const database = require('../database/database');

const userController = {};

userController.checkUserExists = (name, email) => {
  const query = `SELECT COUNT(id) FROM users WHERE email = '${email}' OR name = '${name}'`;
  return new Promise((res, rej) => {
    database.generalQuery(query)
      .then((data) => {
        const count = data[0]['COUNT(id)'];
        if(count === 0){
          res();
        }else {
          rej('User already exists');
        }
      }).catch(rej);
  })
}

userController.logUserIn = (login, password) => {
  const query = `SELECT name, email, lesson, points, session_id FROM users WHERE (email = '${login}' OR name = '${login}') AND password = '${password}'`;
  return new Promise((res, rej) => {
    database.getSingle(query)
    .then((user) => {
      const { password, email, ...prunedUser } = user;
      res(prunedUser);
    }).catch(rej);
  })
}

userController.logUserInViaSession = (session_id) => {
  const query = `SELECT name, email, lesson, points, session_id FROM users WHERE session_id = '${session_id}'`;
  return new Promise((res, rej) => {
    database.getSingle(query)
    .then((user) => {
      const { password, email, ...prunedUser } = user;
      res(prunedUser);
    }).catch(rej);
  })
}

userController.signUserUp = (name, email, password, lesson, points, email_code, session_id) => {
  return new Promise((res, rej) => {
    userController.checkUserExists(name, email)
      .then(() => {
        const query = `INSERT INTO users (name, email, password, lesson, points, email_code, session_id)
                      VALUES ('${name}', '${email}', '${password}', ${lesson}, ${points}, '${email_code}', '${session_id}');`;
        database.insert(query).then(res).catch(rej);
      }).catch(rej);
    });
}

userController.checkLessonAccess = (user, session_id) => {
  return new Promise((res, rej) => {

    // Exit if the auth isn't supplied
    if(session_id === undefined) { return rej('Key:"session_id" missing from body.'); }
    if(user === undefined) { return rej('Key:"user" missing from body.'); }

    const query = `SELECT lesson FROM users where name="${user}" AND session_id="${session_id}";`;
    database.getSingle(query).then(data => {
      res(data.lesson);
    }).catch(rej);
  })
}

module.exports = userController;