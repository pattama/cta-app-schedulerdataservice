'use strict';

const sinon = require('sinon');

const requireSubvert = require('require-subvert')(__dirname);
const nodepath = require('path');
const appRootPath = require('cta-common').root('cta-app-schedulerdataservice');
const pathToScheduler = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/', 'scheduler.js');


describe('BusinessLogics - Schedule - Scheduler - deleteSchedule', function() {
  const scheduleId = '1234567890';
  let stubNodeSchedule;
  let scheduler;
  before(function() {
    stubNodeSchedule = sinon.stub();
    requireSubvert.subvert('node-schedule', { cancelJob: stubNodeSchedule });

    const Scheduler = requireSubvert.require(pathToScheduler);
    scheduler = new Scheduler();
  });

  context('when everything ok', function() {
    it('should call cancel method', function() {
      scheduler.deleteSchedule(scheduleId);
      sinon.assert.calledWith(stubNodeSchedule, scheduleId);
    });
  });
});
