'use strict'

const database = require('../database/database');

const wordController = {};

const sendQuery = (query) => {
  return new Promise((res, rej) => {
    database.generalQuery(query).then(res).catch(rej)
  }) 
}

wordController.getLessons = () => {
  const query = 'SELECT id, name, cost FROM lessons';
  return sendQuery(query);
}

wordController.getSingleLesson = (lesson_id) => {
  const query = `SELECT name, description FROM lessons WHERE id=${lesson_id}`;
  return new Promise((res, rej) => {
    database.getSingle(query).then(res).catch(rej);
  })
}

wordController.getWords = (id) => {
  const query = `SELECT korean, english, type FROM words WHERE lesson=${id};`
  return sendQuery(query);
}

module.exports = wordController;