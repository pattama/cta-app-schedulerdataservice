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



describe('BusinessLogics - Schedule - Scheduler - updateSchedule', function() {
  const scheduleId = '1234567890';
  let scheduleObj;
  let stubCancelJob;
  let stubSetupSchedule;
  let scheduler;
  before(function() {

    scheduleObj = {
      id: scheduleId,
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

    stubCancelJob = sinon.stub();
    requireSubvert.subvert('node-schedule', { 'cancelJob': stubCancelJob });

    const Scheduler = requireSubvert.require(pathToScheduler);
    scheduler = new Scheduler();

    stubSetupSchedule = sinon.stub(scheduler, 'setupSchedule');

  });

  context('when everything ok', function() {
    it('should cancel current schedule then setup new schedule', function() {
      stubCancelJob.returns(true);
      stubSetupSchedule.returns(true);
      const result = scheduler.updateSchedule( scheduleObj);

      expect(result).to.be.true;
      sinon.assert.calledWith(stubCancelJob, scheduleId);
      sinon.assert.calledWith(stubSetupSchedule, scheduleObj);
    });
  });

  //TODO
  //context('when cancelling job returns false', function() {
  //  it('should return false', function() {
  //    stubNodeSchedule.returns(false);
  //    const result = scheduler.updateSchedule(scheduleId, scheduleObj);
  //
  //    expect(result).to.be.false;
  //    expect(stubNodeSchedule.calledWith(scheduleId)).to.be.true;
  //  });
  //});
  //
  //context('when arranging schedule returns false', function() {
  //  it('should return false', function() {
  //    stubNodeSchedule.returns(true);
  //    stubScheduler.returns(false);
  //    const result = scheduler.updateSchedule(scheduleId, scheduleObj);
  //
  //    expect(result).to.be.false;
  //    expect(stubNodeSchedule.calledWith(scheduleId)).to.be.true;
  //    expect(stubScheduler.calledWith(scheduleObj)).to.be.true;
  //  });
  //});
});