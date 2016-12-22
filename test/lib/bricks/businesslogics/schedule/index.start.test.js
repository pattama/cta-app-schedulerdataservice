'use strict';

const appRootPath = require('cta-common').root('cta-app-schedulerdataservice');
const sinon = require('sinon');
const nodepath = require('path');

const Logger = require('cta-logger');
const logicPath = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedules/', 'index.js');

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
    // eslint-disable-next-line global-require
    const Logic = require(logicPath);
    logic = new Logic(DEFAULTCEMENTHELPER, DEFAULTCONFIG);

    stubGetAllSchedules = sinon.stub(logic, 'getAllSchedules');
    spyLoggerError = sinon.spy(logic.logger, 'error');
  });
  afterEach(function() {
    stubGetAllSchedules.reset();
  });

  context('when everything ok', function() {
    it('should setup all schedules', function() {
      const spySetupAllSchedules = sinon.stub(logic, 'setupAllSchedules');
      const schedulesResult = ['aa'];
      stubGetAllSchedules.returns(Promise.resolve(schedulesResult));
      return logic.start().then(() => {
        sinon.assert.calledWith(spySetupAllSchedules, schedulesResult);
      });
    });
  });

  context('when getAllSchedules method return error', function() {
    it('should print log', function() {
      stubGetAllSchedules.returns(Promise.reject(new Error('foo')));
      return logic.start().then(() => {
        sinon.assert.calledWith(spyLoggerError, 'Cannot setup schedules from DB. Error: foo');
      });
    });
  });
});
