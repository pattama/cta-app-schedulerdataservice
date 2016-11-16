'use strict';

const appRootPath = require('app-root-path').path;
const sinon = require('sinon');
const requireSubvert = require('require-subvert')(__dirname);
const nodepath = require('path');

const Logger = require('cta-logger');
const Context = require('cta-flowcontrol').Context;
const pathToScheduler = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/', 'scheduler.js');
const Scheduler = require(pathToScheduler);

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
  createContext: function() {},
};

describe('BusinessLogics - Schedule - Scheduler - reserveSchedule', function() {
  const scheduleId = '1234567890';
  let scheduler;
  let stubCallback;
  context('when everything ok', function() {
    let mockOutputContext;
    let outputJOB;
    before(function() {
      stubCallback = sinon.stub();

      /*outputJOB = {
        nature: {
          type: 'dbinterface',
          quality: 'reserveschedule',
        },
        payload: {
          type: 'schedule',
          id: scheduleId,
          toleranceTime: 5,
          content: {
            scheduledBy: undefined,
            scheduledTimestamp: Date.now(),
          }
        },
      };*/
      mockOutputContext = new Context(DEFAULTCEMENTHELPER/*, outputJOB*/);
      mockOutputContext.publish = sinon.stub();

      scheduler = new Scheduler('name', DEFAULTCEMENTHELPER, DEFAULTLOGGER);
      sinon.stub(scheduler.cementHelper, 'createContext')
        //.withArgs(outputJOB)
        .returns(mockOutputContext);
      scheduler.reserveSchedule(scheduleId, stubCallback);
    });
    after(function() {
      requireSubvert.cleanUp();
      scheduler.cementHelper.createContext.restore();
    });

    it('should send a new Context insertone', function() {
      sinon.assert.calledWith(scheduler.cementHelper.createContext/*, outputJOB*/);   // cannot verify scheduledTimestamp
      sinon.assert.called(mockOutputContext.publish);
    });

    context('when outputContext emits done event', function() {
      it('should emit done event on inputContext', function() {
        const response = {};
        const brickName = 'dbinterface';
        mockOutputContext.emit('done', brickName, response);
        sinon.assert.calledWith(stubCallback,
          'done', brickName, response);
      });
    });

    context('when outputContext emits reject event', function() {
      it('should emit reject event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbinterface';
        mockOutputContext.emit('reject', brickName, error);
        sinon.assert.calledWith(stubCallback,
          'reject', brickName, error);
      });
    });

    context('when outputContext emits error event', function() {
      it('should emit error event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbinterface';
        mockOutputContext.emit('error', brickName, error);
        sinon.assert.calledWith(stubCallback,
          'error', brickName, error);
      });
    });
  });
});
