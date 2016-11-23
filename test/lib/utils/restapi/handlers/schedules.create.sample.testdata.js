'use strict';
const ObjectID = require('bson').ObjectID;

const schedule = {
  scenarioId: (new ObjectID()).toString(),
  schedule: '* * * * *',
  rest: {
    method: 'POST',
    url: 'http://www.google.com',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      'nothing in real': 'just to show people can add headers and body',
    },
  },
};

module.exports = schedule;
