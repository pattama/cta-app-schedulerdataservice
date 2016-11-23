'use strict';

const appRootPath = require('app-root-path').path;
const sinon = require('sinon');
const requireSubvert = require('require-subvert')(__dirname);
const nodepath = require('path');

const Logger = require('cta-logger');
const Context = require('cta-flowcontrol').Context;
const pathToHelper = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/helpers/', 'create.js');
let Helper = require(pathToHelper);
const pathToSchedule = nodepath.join(appRootPath,
  '/lib/utils/datamodels', 'schedule.js');
const Schedule = require(pathToSchedule);

const DEFAULTCONFIG = require('../index.config.testdata.js');
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

describe('BusinessLogics - Schedule - Create - _process', function() {
  let helper;
  context('when everything ok', function() {
    const inputJOB = {
      nature: {
        type: 'schedule',
        quality: Helper.name.toLowerCase(),
      },
      payload: {},
    };
    const mockInputContext = new Context(DEFAULTCEMENTHELPER, inputJOB);
    let mockOutputContext;
    let outputJOB;
    before(function() {
      sinon.stub(mockInputContext, 'emit');

      const mockSchedule = new Schedule({
        id: 'foo',
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
      });
      const StubScheduleConstructor = sinon.stub().returns(mockSchedule);
      requireSubvert.subvert(pathToSchedule, StubScheduleConstructor);
      Helper = requireSubvert.require(pathToHelper);

      outputJOB = {
        nature: {
          type: 'dbinterface',
          quality: 'insertone',
        },
        payload: {
          type: 'schedule',
          content: mockSchedule,
        },
      };
      mockOutputContext = new Context(DEFAULTCEMENTHELPER, outputJOB);
      mockOutputContext.publish = sinon.stub();

      helper = new Helper(DEFAULTCEMENTHELPER, DEFAULTLOGGER);
      sinon.stub(helper.cementHelper, 'createContext')
        .withArgs(outputJOB)
        .returns(mockOutputContext);
    });
    after(function() {
      requireSubvert.cleanUp();
      helper.cementHelper.createContext.restore();
    });

    context('when outputContext emits done event', function() {
      it('should emit done event on inputContext', function() {
        const response = {};
        const stubBroadcast = sinon.stub(helper.synchronizer, 'broadcast');
        const promise = helper._process(mockInputContext);
        stubBroadcast.resolves(response);
        mockOutputContext.emit('done', 'dblayer', response);
        return promise.then(() => {
          sinon.assert.calledWith(mockInputContext.emit,
            'done', helper.cementHelper.brickName, response);
        });
      });
    });

    context('when outputContext emits reject event', function() {
      it('should emit reject event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbinterface';
        const promise = helper._process(mockInputContext);
        mockOutputContext.emit('reject', brickName, error);
        return promise.then(() => {
          sinon.assert.calledWith(mockInputContext.emit,
            'reject', brickName, error);
        });
      });
    });

    context('when outputContext emits error event', function() {
      it('should emit error event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbinterface';
        const promise = helper._process(mockInputContext);
        mockOutputContext.emit('error', brickName, error);
        return promise.then(() => {
          sinon.assert.calledWith(mockInputContext.emit,
            'error', brickName, error);
        });
      });
    });
  });
});
