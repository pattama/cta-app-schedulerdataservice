'use strict';

const appRootPath = require('app-root-path').path;
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const fs = require('fs');
const nodepath = require('path');

const Logger = require('cta-logger');
const logicPath = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/', 'index.js');

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

describe('BusinessLogics - Schedule - start', function() {
  let logic;
  let stubGetAllSchedules;
  let spyLoggerError;
  before(function() {
    const Logic = require(logicPath);
    logic = new Logic(DEFAULTCEMENTHELPER, DEFAULTCONFIG);

    stubGetAllSchedules = sinon.stub(logic, 'getAllSchedules');
    spyLoggerError = sinon.spy(logic.logger, 'error');
  });
  afterEach(function() {
    stubGetAllSchedules.reset();
  })

  context('when everything ok', function() {

    it('should arrange all schedules', function() {
      const spyArrangeAllSchedules = sinon.spy(logic, 'setupAllSchedules');
      const array = [];
      logic.start();
      stubGetAllSchedules.callArgWith(0, 'done', array);
      expect(spyArrangeAllSchedules.calledWith(array)).to.be.true;
    });
  });

  context('when getAllSchedules method return error', function() {

    it('should print log', function() {
      logic.start();
      stubGetAllSchedules.callArgWith(0, 'error', 'foo');
      expect(spyLoggerError.calledWith('Cannot query schedules from DB. error: foo')).to.be.true;
    });
  });
});
