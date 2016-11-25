'use strict';

const appRootPath = require('cta-common').root('cta-app-schedulerdataservice');
const sinon = require('sinon');
const requireSubvert = require('require-subvert')(__dirname);
const nodepath = require('path');
const ObjectID = require('bson').ObjectID;

const Logger = require('cta-logger');
const Context = require('cta-flowcontrol').Context;
const pathToHelper = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/schedule/helpers/', 'update.js');
const Helper = require(pathToHelper);

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

describe('BusinessLogics - Schedule - Update - _process', function() {
  let helper;
  context('when everything ok', function() {
    const mockId = new ObjectID();
    const DEFAULTINPUTJOB = {
      nature: {
        type: 'schedule',
        quality: 'update',
      },
      payload: {
        id: mockId.toString(),
      },
    };
    const mockInputContext = new Context(DEFAULTCEMENTHELPER, DEFAULTINPUTJOB);
    let mockOutputContext;
    let outputJOB;
    before(function() {
      sinon.stub(mockInputContext, 'emit');
      outputJOB = {
        nature: {
          type: 'dbinterface',
          quality: 'updateone',
        },
        payload: {
          type: 'schedule',
          id: DEFAULTINPUTJOB.payload.id,
          content: {},
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
