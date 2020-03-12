const express = require('express');
const router = express.Router();

const userController = require('../database-controller/user-controller.js');
const { CreateEmailCode, CreateSessionID } = require('../util/general');

router.post('/login', (req, res) => {
  // check for param of key=true
  // if it is do different db query that only looks for session key, that's taken from body instead of user/pass
  const data = req.body;
  if(data){
    const email = data.user;
    const pass = data.pass;
    const session_id = data.session_id;
    if(email && pass){
      userController.logUserIn(email, pass).then(user => {
        return res.status(200).send(user);
      }).catch(e => {
        return res.status(401).send({ error: e, message: 'Username or Password bad.' });
      });
    }else if (session_id){
      userController.logUserInViaSession(session_id).then(user => {
        return res.status(200).send(user);
      }).catch(e => {
        return res.status(401).send({ error: e, message: 'Username or Password bad.' });
      });
    }else{
      return res.status(400).send({ error: 'Improperly formated or no login credentials supplied!' });
    }
  }else{
    return res.status(400).send({ error: 'No login credentials supplied!' });
  }
});

router.put('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const session_id = CreateSessionID();
  console.log(req.body);
  userController.signUserUp(name, email, password, 0, 0, CreateEmailCode(), session_id)
    .then(() => {
      return res.status(200).send({session_id: session_id});
    }).catch(e => {
      return res.status(401).send({ error: e });
    });
});


router.delete('/logout', (req, res) => {
  //delete the session token :)
  res.send(true);
});

module.exports = router;