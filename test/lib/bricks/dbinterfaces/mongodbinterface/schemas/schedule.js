'use strict';

const appRootPath = require('app-root-path').path;
const chai = require('chai');
const expect = chai.expect;
const nodepath = require('path');
const ObjectID = require('bson').ObjectID;

const Model = require(nodepath.join(appRootPath,
  '/lib/utils/datamodels', 'schedule.js'));
const Schema = require(nodepath.join(appRootPath,
  '/lib/bricks/dbinterfaces/mongodbinterface/schemas', 'schedule.js'));


describe('DatabaseInterfaces - MongoDB - Schema - Schedule', function() {
  describe('constructor', function() {
    const data = {
      id: (new ObjectID()).toString(),
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
    const schedule = new Model(data);
    it('should return an ExecutionSchema', function() {
      const object = new Schema(schedule);
      expect(object.id).to.not.exist; // eslint-disable-line no-unused-expressions
      expect(object._id).to.be.an.instanceof(ObjectID);
      expect(object._id.toString()).to.equal(schedule.id);
      expect(object.rest).to.deep.equal(schedule.rest);
    });
  });

  describe('toCTAData', function() {
    const mongodbDoc = {
      _id: (new ObjectID()),
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
    it('should return an Schedule', function() {
      const object = Schema.toCTAData(mongodbDoc);
      expect(object).to.be.an.instanceof(Model);
      expect(object._id).to.not.exist; // eslint-disable-line no-unused-expressions
      expect(object.id).to.equal(mongodbDoc._id.toString());
      expect(object.rest).to.deep.equal(mongodbDoc.rest);
    });
  });
});
