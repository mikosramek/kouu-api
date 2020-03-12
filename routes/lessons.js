const express = require('express');
const router = express.Router();

const wordController = require('../database-controller/word-controller');
const userController = require('../database-controller/user-controller');

// Request generic lesson data
router.get('/', (req, res) => {
  wordController.getLessons().then(data => {
    return res.status(200).send(data);
  }).catch(e => {
    return res.status(503).send({ error: e });
  });
});

// Request all the info for a particular lesson
router.get('/:lesson_id', (req, res) => {
  const { lesson_id } = req.params;
  wordController.getSingleLesson(lesson_id).then(data => {
    return res.status(200).send(data);
  }).catch(e => {
    return res.status(404).send({ error:e, message:'Lesson with that id not found. Try /lessons endpoint for list of lessons.' })
  })
});

// Request a words from a lesson using user auth
router.get('/:lesson_id/words', (req, res) => {
  const { lesson_id } = req.params;
  const { user, session_id } = req.body;
  console.log(req.body);
  // Check if the user's entry in the database allows them to access the requested lesson
  userController.checkLessonAccess(user, session_id)
    .then((lesson_access) => {
      // If the user exists, and can access the lesson
      if(lesson_id <= lesson_access){
        // Query the database for the lesson words
        wordController.getWords(lesson_id).then(data => {
          return res.status(200).send(data);
        }).catch(e => {
          return res.status(503).send({ error:e });
        });
      }else{
        return res.status(403).send({ message:`User doesn't have access to this lesson.` });
      }
    }).catch((e) => {
      return res.status(403).send({ e: e, message:`User doesn't have access to this lesson.` });
    });
  });


module.exports = router;