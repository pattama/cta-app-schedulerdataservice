'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');

const requireSubvert = require('require-subvert')(__dirname);
const nodepath = require('path');
const appRootPath = require('app-root-path').path;
const pathToScheduler = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/', 'scheduler.js');
const pathToRequester = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/', 'requester.js');

const ObjectID = require('bson').ObjectID;



describe('BusinessLogics - Schedule - Scheduler - setupSchedule', function() {
  let scheduleObj;
  let spyRequester;
  let stubNodeSchedule;
  let scheduler;
  before(function() {

    scheduleObj = {
      scenarioId: (new ObjectID()).toString(),
      schedule: '* * * * *',
      rest: {
        method: 'POST',
        url: 'http://www.google.com',
        headers: {
          "Content-Type": 'application/json'
        },
        body: {
          "nothing in real": 'just to show people can add headers and body'
        }
      }
    };

    spyRequester = sinon.spy();
    requireSubvert.subvert(pathToRequester, { 'sendRequest': spyRequester });

    stubNodeSchedule = sinon.stub();
    requireSubvert.subvert('node-schedule', { 'scheduleJob': stubNodeSchedule });

    scheduler = requireSubvert.require(pathToScheduler);

  });

  context('when everything ok', function() {
    it('should call http request', function() {
      scheduler.setupSchedule(scheduleObj);
      stubNodeSchedule.callArg(2);
      expect(spyRequester.calledWith(scheduleObj.rest)).to.be.true;
    });
  });
});