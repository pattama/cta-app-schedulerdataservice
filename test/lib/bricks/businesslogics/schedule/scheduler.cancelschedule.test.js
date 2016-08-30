'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const requireSubvert = require('require-subvert')(__dirname);
const nodepath = require('path');
const appRootPath = require('app-root-path').path;
const pathToScheduler = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/', 'scheduler.js');


describe('BusinessLogics - Schedule - Scheduler - cancelSchedule', function() {
  const scheduleId = '1234567890';
  let stubNodeSchedule;
  let scheduler;
  before(function() {

    stubNodeSchedule = sinon.stub();
    requireSubvert.subvert('node-schedule', { 'cancelJob': stubNodeSchedule });

    scheduler = requireSubvert.require(pathToScheduler);

  });

  context('when everything ok', function() {
    it('should call cancel method', function() {
      scheduler.cancelSchedule(scheduleId);
      expect(stubNodeSchedule.calledWith(scheduleId)).to.be.true;
    });
  });
});