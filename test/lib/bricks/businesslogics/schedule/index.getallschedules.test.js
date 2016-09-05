'use strict';

const appRootPath = require('app-root-path').path;
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const nodepath = require('path');

const requireSubvert = require('require-subvert')(__dirname);
const Context = require('cta-flowcontrol').Context;
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
  createContext: function() {},
};

describe('BusinessLogics - Schedule - getAllSchedules', function() {
  let logic;
  let stubCallback;
  context('when everything ok', function() {
    let mockOutputContext;
    let outputJOB;
    before(function() {

      outputJOB = {
        nature: {
          type: 'dbinterface',
          quality: 'find',
        },
        payload: {
          type: 'schedule',
          filter: { limit: 0, offset: 0 },
          query: {},
        },
      };
      mockOutputContext = new Context(DEFAULTCEMENTHELPER, outputJOB);
      mockOutputContext.publish = sinon.stub();

      const Logic = require(logicPath);
      logic = new Logic(DEFAULTCEMENTHELPER, DEFAULTCONFIG);
      sinon.stub(logic.cementHelper, 'createContext')
        .returns(mockOutputContext);

      stubCallback = sinon.stub();
      logic.getAllSchedules(stubCallback);
    });
    after(function() {
      requireSubvert.cleanUp();
      logic.cementHelper.createContext.restore();
    });

    it('should send a new Context find', function() {
      sinon.assert.calledWith(logic.cementHelper.createContext, outputJOB);
      sinon.assert.called(mockOutputContext.publish);
    });

    context('when outputContext emits done event', function() {
      it('should emit done event on inputContext', function() {
        const response = {};
        mockOutputContext.emit('done', 'dbinterface', response);
        sinon.assert.calledWith(stubCallback,
          'done', response);
      });
    });

    context('when outputContext emits reject event', function() {
      it('should emit reject event on inputContext', function() {
        const error = new Error('mockError');
        mockOutputContext.emit('reject', 'dbinterface', error);
        sinon.assert.calledWith(stubCallback,
          'reject', error);
      });
    });

    context('when outputContext emits error event', function() {
      it('should emit error event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbinterface';
        mockOutputContext.emit('error', brickName, error);
        sinon.assert.calledWith(stubCallback,
          'error', error);
      });
    });
  });
});
