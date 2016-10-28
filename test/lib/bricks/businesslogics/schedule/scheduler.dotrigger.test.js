'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');

const Logger = require('cta-logger');
const nodepath = require('path');
const appRootPath = require('app-root-path').path;
const pathToScheduler = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/', 'scheduler.js');

const ObjectID = require('bson').ObjectID;



describe('BusinessLogics - Schedule - Scheduler - doTrigger', function() {
  let scheduleObj;
  let stubReserveSchedule;
  let stubSendRequest;
  let stubLoggerError;
  let stubLoggerInfo;
  let scheduler;
  before(function() {

    scheduleObj = {
      scheduleId: (new ObjectID()).toString(),
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

    const Scheduler = require(pathToScheduler);
    scheduler = new Scheduler(undefined, new Logger());

  });
  beforeEach(function() {
    stubReserveSchedule = sinon.stub(scheduler, 'reserveSchedule');
    stubSendRequest = sinon.stub(scheduler.requester, 'sendRequest');
    stubLoggerError = sinon.stub(scheduler.logger, 'error');
    stubLoggerInfo = sinon.stub(scheduler.logger, 'info');
  })
  afterEach(function() {
    stubReserveSchedule.restore();
    stubSendRequest.restore();
    stubLoggerError.restore();
    stubLoggerInfo.restore();
  });

  context('when everything ok', function() {
    it('should call http request', function() {
      stubSendRequest.returns(Promise.resolve());
      scheduler.doTrigger(scheduleObj.id, scheduleObj.rest);
      stubReserveSchedule.callArgWith(1, 'done', 'brickName', 'not null');
      sinon.assert.calledOnce(stubLoggerInfo);
      sinon.assert.calledWith(stubSendRequest, scheduleObj.rest);
    });
  });

  context('when reserving schedule has no response', function() {
    it('should do logging', function() {
      scheduler.doTrigger(scheduleObj.id, scheduleObj.rest);
      stubReserveSchedule.callArgWith(1, 'done', 'brickName', null);
      sinon.assert.calledOnce(stubLoggerInfo);
    });
  });

  context('when reserving schedule has an error', function() {
    it('should do logging', function() {
      scheduler.doTrigger(scheduleObj.id, scheduleObj.rest);
      const responseError = new Error();
      stubReserveSchedule.callArgWith(1, 'error', 'brickName', responseError);
      sinon.assert.calledOnce(stubLoggerError);
      sinon.assert.calledWith(stubLoggerError, 'Cannot reserve schedule. error:', responseError);
    });
  });
});