'use strict';

const appRootPath = require('app-root-path').path;
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const ObjectID = require('bson').ObjectID;
const nodepath = require('path');

const requireSubvert = require('require-subvert')(__dirname);
const Logger = require('cta-logger');
const logicPath = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/', 'index.js');
const pathToScheduler = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/', 'scheduler.js');

const DEFAULTCONFIG = require('./index.config.testdata.js');
const DEFAULTLOGGER = new Logger(null, null, DEFAULTCONFIG.name);
const DEFAULTCEMENTHELPER = {
  constructor: {
    name: 'CementHelper',
  },
  brickName: DEFAULTCONFIG.name,
  dependencies: {
    logger: DEFAULTLOGGER,
  },
};

describe('BusinessLogics - Schedule - setupAllSchedules', function() {
  let scheduleObj;
  let logic;
  let stubSetupSchedule;
  let spyLoggerError;
  let spyLoggerInfo;
  before(function() {

    scheduleObj = {
      id: (new ObjectID()).toString(),
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

    stubSetupSchedule = sinon.stub();
    //requireSubvert.subvert(pathToScheduler, { 'setupSchedule': stubSetupSchedule });
    requireSubvert.subvert(pathToScheduler, function() { return {'setupSchedule': stubSetupSchedule} });

    const Logic = requireSubvert.require(logicPath);
    logic = new Logic(DEFAULTCEMENTHELPER, DEFAULTCONFIG);

    spyLoggerError = sinon.spy(logic.logger, 'error');
    spyLoggerInfo = sinon.spy(logic.logger, 'info');

  });
  afterEach(function() {
    spyLoggerError.reset();
  })

  context('when everything ok', function() {

    it('should setup all schedules', function() {
      logic.setupAllSchedules([]);
      sinon.assert.calledWith(spyLoggerInfo, 'All schedules was setup: 0');
    });
  });

  context('when schedules is not array', function() {

    it('should print error log', function() {
      logic.setupAllSchedules('foo');
      sinon.assert.calledWith(spyLoggerError, 'Schedules object is not an array:', 'foo');
    });
  });

  context('when setting up schedule return false', function() {

    it('should print error log', function() {
      logic.setupAllSchedules([ scheduleObj ]);
      stubSetupSchedule.withArgs(scheduleObj).returns(false);
      expect(spyLoggerError.firstCall.calledWith('Cannot setup a schedule:', scheduleObj)).to.be.true;
      expect(spyLoggerError.secondCall.calledWith('Cannot setup 1 schedules out of 1')).to.be.true;
    });
  });
});
